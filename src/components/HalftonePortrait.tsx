import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const SIZE = 256;
const SPACING = 2.4;
const CORNER_RADIUS = SIZE * 0.1;
const REVEAL_RADIUS = 52;
const INFLUENCE_RADIUS = 78;
const LOCAL_GROWTH = 0.12;

type Dot = {
  x: number;
  y: number;
  radius: number;
  highlightRadius: number;
  seed: number;
};

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const smoothstep = (start: number, end: number, value: number) => {
  const t = clamp((value - start) / (end - start));
  return t * t * (3 - 2 * t);
};
const noise = (x: number, y: number) => {
  const value = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return value - Math.floor(value);
};

// Signed distance inside the same 10% rounded frame used by the CSS and canvas clip.
function edgeDistance(x: number, y: number) {
  const dx = Math.abs(x - SIZE / 2) - (SIZE / 2 - CORNER_RADIUS);
  const dy = Math.abs(y - SIZE / 2) - (SIZE / 2 - CORNER_RADIUS);
  return (
    CORNER_RADIUS - Math.hypot(Math.max(dx, 0), Math.max(dy, 0)) - Math.min(Math.max(dx, dy), 0)
  );
}

type Portrait = {
  dots: Dot[];
  color: HTMLCanvasElement;
};

function samplePortrait(image: HTMLImageElement): Portrait | null {
  const sample = document.createElement('canvas');
  sample.width = SIZE;
  sample.height = SIZE;
  const context = sample.getContext('2d', { willReadFrequently: true });
  if (!context) return null;

  // Keep the original photograph intact; crop to the head and shoulders at render time.
  const cropSize = image.naturalWidth * 0.57;
  context.drawImage(
    image,
    image.naturalWidth * 0.205,
    image.naturalHeight * 0.21,
    cropSize,
    cropSize,
    0,
    0,
    SIZE,
    SIZE,
  );
  const imageData = context.getImageData(0, 0, SIZE, SIZE);
  const { data } = imageData;
  const luminance = new Float32Array(SIZE * SIZE);
  const histogram = new Uint32Array(256);
  for (let index = 0; index < luminance.length; index++) {
    const offset = index * 4;
    const value = data[offset] * 0.299 + data[offset + 1] * 0.587 + data[offset + 2] * 0.114;
    luminance[index] = value;
    histogram[Math.round(value)]++;
  }

  // Normalize the source, then merge the lower midtones into a strong ink silhouette.
  const percentile = (fraction: number) => {
    let count = 0;
    for (let value = 0; value < histogram.length; value++) {
      count += histogram[value];
      if (count >= luminance.length * fraction) return value;
    }
    return 255;
  };
  const black = percentile(0.04);
  const range = Math.max(1, percentile(0.98) - black);
  const tones = Array.from(luminance, (value) => {
    const exposure = clamp((value - black) / range);
    return clamp((exposure - 0.4) / 0.5) ** 1.6;
  });
  // Follow the central silhouette, bridging small highlight holes in the face.
  const rightOutline = new Float32Array(SIZE);
  const reflection = new Float32Array(SIZE);
  const anchor = Math.round(SIZE * 0.46);
  for (let y = 0; y < SIZE; y++) {
    const edges = [anchor, anchor];
    for (const [side, direction] of [-1, 1].entries()) {
      let gap = 0;
      for (let x = anchor; x >= 0 && x < SIZE; x += direction) {
        if (tones[y * SIZE + x] < 0.25) {
          edges[side] = x;
          gap = 0;
        } else if (++gap > 8) break;
      }
    }
    rightOutline[y] = edges[1];
    // Keep the head's alignment when the shoulders merge into the left shadow.
    reflection[y] = Math.max(SIZE * 0.85, Math.min(SIZE * 0.97, edges[0] + edges[1]));
  }
  // Smooth the reflected background so individual hairs do not make horizontal seams.
  const axes = reflection.map((_, y) => {
    let sum = 0;
    for (let offset = -6; offset <= 6; offset++) {
      sum += reflection[Math.max(0, Math.min(SIZE - 1, y + offset))];
    }
    return sum / 13;
  });
  const dots: Dot[] = [];

  for (let y = SPACING / 2; y < SIZE; y += SPACING) {
    for (let x = SPACING / 2; x < SIZE; x += SPACING) {
      const seed = noise(x, y);
      const edge = edgeDistance(x, y);
      const edgeFade = clamp(edge / (12 + noise(y, x) * 24));
      if (seed > edgeFade) continue;
      const row = Math.floor(y);
      const originalBrightness = tones[row * SIZE + Math.floor(x)];
      // Match the left background at the same distance from the figure, keeping
      // the original silhouette and crop intact. Only the right background changes.
      const sourceX = Math.max(0, Math.min(SIZE - 1, Math.round(axes[row] - x)));
      const blend = smoothstep(rightOutline[row] + 1, rightOutline[row] + 7, x);
      const brightness = Math.min(
        originalBrightness,
        originalBrightness + (tones[row * SIZE + sourceX] - originalBrightness) * blend,
      );
      // Fixed grain keeps the print textured without introducing random flicker.
      const grain = noise(x + 43.2, y + 17.8);
      const dotSize = SPACING * 0.78 * (grain < 0.025 ? 0.3 : 0.9 + grain * 0.14);
      const radius = dotSize * (1 - brightness) ** 0.85;
      const highlightRadius = dotSize * brightness ** 0.85;
      dots.push({
        x: x + (noise(y, x) - 0.5) * SPACING * 0.18,
        y: y + (noise(y + 11, x + 29) - 0.5) * SPACING * 0.18,
        radius,
        highlightRadius,
        seed,
      });
    }
  }
  // Lift the original photo's dark exposure for the reveal, preserving its warm colors.
  // This is prepared once; pointer movement only changes the reveal mask.
  for (let index = 0; index < luminance.length; index++) {
    const offset = index * 4;
    const value = luminance[index];
    const brightness = clamp((value - black) / range) ** 0.6;
    const gain = Math.min(5, (brightness * 210) / Math.max(value, 1));
    data[offset] = Math.min(255, data[offset] * gain);
    data[offset + 1] = Math.min(255, data[offset + 1] * gain);
    data[offset + 2] = Math.min(255, data[offset + 2] * gain);
    const x = index % SIZE;
    const y = Math.floor(index / SIZE);
    data[offset + 3] = 255 * clamp(edgeDistance(x, y) / 18);
  }
  context.putImageData(imageData, 0, 0);
  return { dots, color: sample };
}

function drawRevealMask(
  context: CanvasRenderingContext2D,
  dots: Dot[],
  x: number,
  y: number,
  radius: number,
) {
  context.clearRect(0, 0, SIZE, SIZE);
  context.save();
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.clip();
  context.fillStyle = '#000';
  context.beginPath();
  const core = radius * 0.26;
  context.arc(x, y, core, 0, Math.PI * 2);
  // A clear center opens into growing ink-sized dots, rather than a blurry circle.
  for (const dot of dots) {
    const distance = Math.hypot(dot.x - x, dot.y - y);
    if (distance < core - SPACING || distance > radius) continue;
    const coverage = 1 - smoothstep(core, radius, distance);
    const dotRadius = SPACING * 0.8 * coverage ** 0.65 * (0.92 + dot.seed * 0.16);
    context.moveTo(dot.x + dotRadius, dot.y);
    context.arc(dot.x, dot.y, dotRadius, 0, Math.PI * 2);
  }
  context.fill();
  context.restore();
}

export default function HalftonePortrait() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [source, setSource] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!source || !canvas) return;
    const image = new window.Image();
    let cleanup: (() => void) | undefined;
    // A detached image uses actual pixel dimensions. Responsive img elements report
    // density-corrected naturalWidth, which would offset the canvas crop.
    image.onload = () => {
      const context = canvas.getContext('2d');
      if (!context) return;

      let portrait: Portrait | null;
      try {
        portrait = samplePortrait(image);
      } catch {
        // A readable monochrome photo remains if canvas sampling is unavailable.
        return;
      }
      if (!portrait?.dots.length) return;
      const { dots, color } = portrait;
      const reveal = document.createElement('canvas');
      reveal.width = SIZE;
      reveal.height = SIZE;
      const revealContext = reveal.getContext('2d');
      if (!revealContext) return;
      const revealMask = document.createElement('canvas');
      revealMask.width = SIZE;
      revealMask.height = SIZE;
      const maskContext = revealMask.getContext('2d');
      if (!maskContext) return;

      const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
      const pointer = { x: SIZE / 2, y: SIZE / 2, lagX: SIZE / 2, lagY: SIZE / 2 };
      let active = false;
      let strength = 0;
      let velocity = 0;
      let frame = 0;
      let previousTime = 0;
      let inView = true;
      let ink = getComputedStyle(canvas).color;
      let dark = document.documentElement.classList.contains('dark');

      const draw = (time: number) => {
        frame = 0;
        const delta = Math.min(time - (previousTime || time - 16.67), 40);
        previousTime = time;
        const reducedMotion = motion.matches;
        const follow = reducedMotion ? 1 : 1 - Math.exp(-delta / 45);
        pointer.lagX += (pointer.x - pointer.lagX) * follow;
        pointer.lagY += (pointer.y - pointer.lagY) * follow;
        if (Math.abs(pointer.x - pointer.lagX) < 0.04) pointer.lagX = pointer.x;
        if (Math.abs(pointer.y - pointer.lagY) < 0.04) pointer.lagY = pointer.y;
        const target = active ? 1 : 0;
        strength = reducedMotion
          ? target
          : strength + (target - strength) * (1 - Math.exp(-delta / (active ? 90 : 110)));
        if (Math.abs(target - strength) < 0.002) strength = target;
        velocity *= Math.exp(-delta / 120);
        if (velocity < 0.002) velocity = 0;

        // The portrait stays anchored. Only the small area beneath the cursor grows.
        const cursorX = pointer.lagX;
        const cursorY = pointer.lagY;
        const edgeLock = clamp(edgeDistance(cursorX, cursorY) / 32);
        const growth = reducedMotion ? 0 : LOCAL_GROWTH * strength * edgeLock;

        context.clearRect(0, 0, SIZE, SIZE);
        context.save();
        // The rounded frame and the surrounding ink never scale or translate.
        context.beginPath();
        context.roundRect(0, 0, SIZE, SIZE, CORNER_RADIUS);
        context.clip();
        context.fillStyle = ink;
        context.beginPath();
        for (const dot of dots) {
          const dx = dot.x - cursorX;
          const dy = dot.y - cursorY;
          const distance = Math.hypot(dx, dy);
          const falloff = 1 - smoothstep(REVEAL_RADIUS * 0.55, INFLUENCE_RADIUS, distance);
          const pinnedEdge = clamp(edgeDistance(dot.x, dot.y) / 24);
          const influence = reducedMotion ? 0 : falloff * strength * pinnedEdge;
          const dissolve = influence * (0.08 + dot.seed * 0.5) * (0.7 + velocity * 0.3);
          const localGrowth = growth * falloff * pinnedEdge;
          const radius =
            (dark ? dot.highlightRadius : dot.radius) * (1 + localGrowth) * (1 - dissolve);
          if (radius < 0.12) continue;
          const x = dot.x + dx * localGrowth;
          const y = dot.y + dy * localGrowth;
          context.moveTo(x + radius, y);
          context.arc(x, y, radius, 0, Math.PI * 2);
        }
        context.fill();

        if (strength > 0) {
          revealContext.clearRect(0, 0, SIZE, SIZE);
          revealContext.globalCompositeOperation = 'source-over';
          // Magnify within the reveal mask, anchored at the cursor instead of panning.
          revealContext.save();
          revealContext.translate(cursorX, cursorY);
          revealContext.scale(1 + growth, 1 + growth);
          revealContext.translate(-cursorX, -cursorY);
          revealContext.drawImage(color, 0, 0);
          revealContext.restore();
          drawRevealMask(
            maskContext,
            dots,
            cursorX,
            cursorY,
            REVEAL_RADIUS * (0.82 + strength * 0.18),
          );
          revealContext.globalCompositeOperation = 'destination-in';
          revealContext.drawImage(revealMask, 0, 0);
          context.globalAlpha = strength;
          context.drawImage(reveal, 0, 0);
          context.globalAlpha = 1;
        }
        context.restore();
        // Settle completely when the cursor rests; movement wakes the effect again.
        const settling =
          strength !== target ||
          pointer.lagX !== pointer.x ||
          pointer.lagY !== pointer.y ||
          velocity > 0;
        if (settling && !reducedMotion && inView && !document.hidden) {
          frame = requestAnimationFrame(draw);
        }
      };

      const requestDraw = () => {
        if (!frame && inView && !document.hidden) frame = requestAnimationFrame(draw);
      };
      const leave = () => {
        active = false;
        requestDraw();
      };
      const move = (event: PointerEvent) => {
        if (event.pointerType !== 'mouse') return;
        const rect = canvas.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * SIZE;
        const y = ((event.clientY - rect.top) / rect.height) * SIZE;
        velocity = active
          ? Math.min(1, velocity * 0.4 + Math.hypot(x - pointer.x, y - pointer.y) / 35)
          : 0;
        if (!active) {
          pointer.lagX = x;
          pointer.lagY = y;
        }
        pointer.x = x;
        pointer.y = y;
        active = true;
        requestDraw();
      };
      const resize = () => {
        const pixels = Math.round(canvas.clientWidth * Math.min(window.devicePixelRatio || 1, 2));
        canvas.width = pixels;
        canvas.height = pixels;
        context.setTransform(pixels / SIZE, 0, 0, pixels / SIZE, 0, 0);
        requestDraw();
      };
      const reset = () => {
        active = false;
        strength = 0;
        velocity = 0;
        pointer.lagX = pointer.x;
        pointer.lagY = pointer.y;
        cancelAnimationFrame(frame);
        frame = 0;
        requestDraw();
      };
      const themeObserver = new MutationObserver(() => {
        ink = getComputedStyle(canvas).color;
        dark = document.documentElement.classList.contains('dark');
        requestDraw();
      });
      const resizeObserver = new ResizeObserver(resize);
      const visibilityObserver = new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting;
        reset();
      });

      resize();
      cancelAnimationFrame(frame);
      draw(performance.now());
      setReady(true);
      resizeObserver.observe(canvas);
      visibilityObserver.observe(canvas);
      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class'],
      });
      canvas.addEventListener('pointermove', move);
      canvas.addEventListener('pointerleave', leave);
      canvas.addEventListener('pointercancel', leave);
      motion.addEventListener('change', reset);
      document.addEventListener('visibilitychange', reset);

      cleanup = () => {
        cancelAnimationFrame(frame);
        resizeObserver.disconnect();
        visibilityObserver.disconnect();
        themeObserver.disconnect();
        canvas.removeEventListener('pointermove', move);
        canvas.removeEventListener('pointerleave', leave);
        canvas.removeEventListener('pointercancel', leave);
        motion.removeEventListener('change', reset);
        document.removeEventListener('visibilitychange', reset);
      };
    };
    image.src = source;
    return () => {
      image.onload = null;
      cleanup?.();
    };
  }, [source]);

  return (
    <div className='portfolio-portrait' data-ready={ready}>
      <Image
        src='/images/mayank-portrait.jpg'
        alt='Mayank Bansal'
        width={768}
        height={1024}
        sizes='280px'
        loading='eager'
        className='portfolio-portrait-fallback'
        onLoad={(event) => setSource(event.currentTarget.currentSrc)}
      />
      <canvas
        ref={canvasRef}
        className='portfolio-portrait-canvas'
        aria-hidden='true'
        tabIndex={-1}
      />
    </div>
  );
}
