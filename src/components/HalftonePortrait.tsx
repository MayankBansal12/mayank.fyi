import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const SIZE = 256;
const SPACING = 2.4;
const CORNER_RADIUS = SIZE * 0.1;
const REVEAL_RADIUS = 52;
const INFLUENCE_RADIUS = 78;
const LOCAL_GROWTH = 0.12;
/** Plain photo creases like folded paper, then the halftone cracks through */
const INTRO_MS = 2000;
/** Distance (px) over which a dot grows in behind the crack front */
const CRACK_DOT_SPAN = 7;
/** Distance (px) over which the plain photo thins out ahead of the crack front */
const CRACK_SOFTNESS = 4;

type Segment = { ax: number; ay: number; bx: number; by: number };

// Two slightly off-axis folds, like a sheet folded in quarters, drawn in this order.
const CREASES: Segment[] = [
  { ax: -4, ay: SIZE * 0.4, bx: SIZE + 4, by: SIZE * 0.47 },
  { ax: SIZE * 0.58, ay: -4, bx: SIZE * 0.5, by: SIZE + 4 },
];
/** Jittered grid of crackle cells; the glaze breaks along their borders */
const CRACK_CELLS = 6;

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

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
const easeInOutSine = (t: number) => (1 - Math.cos(Math.PI * t)) / 2;

function valueNoise(x: number, y: number) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const u = (x - xi) * (x - xi) * (3 - 2 * (x - xi));
  const v = (y - yi) * (y - yi) * (3 - 2 * (y - yi));
  const a = noise(xi, yi);
  const b = noise(xi + 1, yi);
  const c = noise(xi, yi + 1);
  const d = noise(xi + 1, yi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

function segmentDistance(x: number, y: number, { ax, ay, bx, by }: Segment) {
  const dx = bx - ax;
  const dy = by - ay;
  const t = clamp(((x - ax) * dx + (y - ay) * dy) / (dx * dx + dy * dy));
  return Math.hypot(x - ax - dx * t, y - ay - dy * t);
}

type CrackField = { field: Float32Array; max: number };
let crackField: CrackField | null = null;

// Per-pixel "when does this open" distance. Cracks run along the borders of an irregular
// cell network, spreading outward from the folds; each piece then fills in from its edges.
function getCrackField(): CrackField {
  if (crackField) return crackField;
  const cell = SIZE / CRACK_CELLS;
  const seeds: [number, number][] = [];
  for (let row = 0; row < CRACK_CELLS; row++) {
    for (let column = 0; column < CRACK_CELLS; column++) {
      seeds.push([
        (column + 0.15 + noise(column + 3.1, row + 7.3) * 0.7) * cell,
        (row + 0.15 + noise(row + 5.7, column + 1.9) * 0.7) * cell,
      ]);
    }
  }

  const field = new Float32Array(SIZE * SIZE);
  let max = 0;
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      // Ragged edges: warp the lookup a little so borders wander like real cracks.
      const wx = x + (valueNoise(x / 11, y / 11) - 0.5) * 9;
      const wy = y + (valueNoise(y / 11 + 40, x / 11) - 0.5) * 9;
      let nearest = Number.POSITIVE_INFINITY;
      let second = Number.POSITIVE_INFINITY;
      for (const [sx, sy] of seeds) {
        const distance = Math.hypot(wx - sx, wy - sy);
        if (distance < nearest) {
          second = nearest;
          nearest = distance;
        } else if (distance < second) {
          second = distance;
        }
      }
      const fold = Math.min(...CREASES.map((segment) => segmentDistance(wx, wy, segment)));
      const grain = (valueNoise(x / 3, y / 3) - 0.5) * 4;
      // Folds open first, borders follow outward from them, cell centers fill last.
      const value = Math.min(fold * 1.1, fold * 0.55 + 6 + (second - nearest) * 2.4) + grain;
      field[y * SIZE + x] = value;
      max = Math.max(max, value);
    }
  }
  crackField = { field, max };
  return crackField;
}

const fieldAt = (field: Float32Array, x: number, y: number) =>
  field[
    Math.max(0, Math.min(SIZE - 1, Math.floor(y))) * SIZE +
      Math.max(0, Math.min(SIZE - 1, Math.floor(x)))
  ];

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
  /** The fallback <img> look (grayscale, brightness, contrast, radial mask) per pixel */
  plainTone: Float32Array;
  plainMask: Float32Array;
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
  const plainTone = new Float32Array(SIZE * SIZE);
  const plainMask = new Float32Array(SIZE * SIZE);
  for (let index = 0; index < plainTone.length; index++) {
    const offset = index * 4;
    // Mirrors `.portfolio-portrait-fallback`: grayscale(1) brightness(1.55) contrast(3)
    const gray =
      (data[offset] * 0.2126 + data[offset + 1] * 0.7152 + data[offset + 2] * 0.0722) / 255;
    plainTone[index] = clamp((Math.min(1, gray * 1.55) - 0.5) * 3 + 0.5);
    // ...and its mask: radial-gradient(ellipse, black 48%, transparent 72%) on the
    // oversized <img>, whose center and farthest-corner radii land here in frame space.
    const x = (index % SIZE) / SIZE;
    const y = Math.floor(index / SIZE) / SIZE;
    const t = Math.hypot((x - 0.518) / 1.24, (y - 0.68) / 1.654);
    plainMask[index] = clamp((0.72 - t) / 0.24);
  }
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
  return { dots, color: sample, plainTone, plainMask };
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

// Fold lines pressed into the plain photo: a soft shade on one side of the first fold,
// then a hairline highlight and shadow along each crease, fading as the pattern takes over.
function drawCreases(context: CanvasRenderingContext2D, intro: number, ink: string, dark: boolean) {
  const visible = 1 - smoothstep(0.24, 0.55, intro);
  if (visible <= 0) return;

  const fold = Math.sin(Math.PI * clamp(intro / 0.32)) * visible;
  if (fold > 0) {
    const { ax, ay, bx, by } = CREASES[0];
    const length = Math.hypot(bx - ax, by - ay);
    const nx = -(by - ay) / length;
    const ny = (bx - ax) / length;
    const midX = (ax + bx) / 2;
    const midY = (ay + by) / 2;
    // Starts just behind the crease so only the far side of the fold is shaded.
    const shade = context.createLinearGradient(
      midX - nx,
      midY - ny,
      midX + nx * 38,
      midY + ny * 38,
    );
    shade.addColorStop(0, 'rgba(0, 0, 0, 0)');
    shade.addColorStop(0.03, `rgba(0, 0, 0, ${(dark ? 0.22 : 0.1) * fold})`);
    shade.addColorStop(1, 'rgba(0, 0, 0, 0)');
    context.fillStyle = shade;
    context.fillRect(0, 0, SIZE, SIZE);
  }

  context.save();
  context.lineCap = 'round';
  CREASES.forEach(({ ax, ay, bx, by }, index) => {
    const drawn = easeInOutCubic(clamp((intro - index * 0.05) / 0.14));
    if (drawn <= 0) return;
    const length = Math.hypot(bx - ax, by - ay);
    const nx = -(by - ay) / length;
    const ny = (bx - ax) / length;
    const endX = ax + (bx - ax) * drawn;
    const endY = ay + (by - ay) * drawn;

    context.globalAlpha = visible * (dark ? 0.5 : 0.28);
    context.strokeStyle = dark ? '#000' : ink;
    context.lineWidth = 1.1;
    context.beginPath();
    context.moveTo(ax + nx * 0.7, ay + ny * 0.7);
    context.lineTo(endX + nx * 0.7, endY + ny * 0.7);
    context.stroke();

    context.globalAlpha = visible * (dark ? 0.22 : 0.55);
    context.strokeStyle = '#fff';
    context.lineWidth = 0.7;
    context.beginPath();
    context.moveTo(ax - nx * 0.4, ay - ny * 0.4);
    context.lineTo(endX - nx * 0.4, endY - ny * 0.4);
    context.stroke();
  });
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
      const { dots, color, plainTone, plainMask } = portrait;
      const plain = document.createElement('canvas');
      plain.width = SIZE;
      plain.height = SIZE;
      const plainContext = plain.getContext('2d');
      if (!plainContext) return;
      const plainImage = plainContext.createImageData(SIZE, SIZE);
      const cracks = getCrackField();
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
      let introStart = 0;
      let inView = true;
      const isPreloading = () => {
        const { classList } = document.documentElement;
        return classList.contains('preloader-pending') || classList.contains('preloader-active');
      };
      let ink = getComputedStyle(canvas).color;
      let dark = document.documentElement.classList.contains('dark');

      const draw = (time: number) => {
        frame = 0;
        const delta = Math.min(time - (previousTime || time - 16.67), 40);
        previousTime = time;
        const reducedMotion = motion.matches;
        // Hold the photo until the welcome preloader has cleared, so the resolve is seen.
        if (!introStart && !isPreloading()) {
          introStart = time;
          setReady(true);
        }
        const intro = reducedMotion || !introStart ? 1 : clamp((time - introStart) / INTRO_MS);
        // The crack front spreads out from the folds once they have creased in.
        const front = -14 + (cracks.max + 20) * easeInOutSine(clamp((intro - 0.12) / 0.88));
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
        if (intro < 1) {
          // Plain photo where the cracks have not reached yet. Black over the paper (and
          // white in dark mode) reproduces the fallback's multiply/screen blend exactly.
          const pixels = plainImage.data;
          const shade = dark ? 255 : 0;
          for (let index = 0; index < plainTone.length; index++) {
            const offset = index * 4;
            const cover = clamp((cracks.field[index] - front) / CRACK_SOFTNESS);
            const tone = dark ? plainTone[index] : 1 - plainTone[index];
            pixels[offset] = shade;
            pixels[offset + 1] = shade;
            pixels[offset + 2] = shade;
            pixels[offset + 3] = 255 * tone * plainMask[index] * cover;
          }
          plainContext.putImageData(plainImage, 0, 0);
          context.drawImage(plain, 0, 0);
        }

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
          let radius =
            (dark ? dot.highlightRadius : dot.radius) * (1 + localGrowth) * (1 - dissolve);
          if (intro < 1) {
            // Dots lead the front slightly, so its edge reads as an ink crack, not a gap.
            const appear = clamp(
              (front + CRACK_SOFTNESS - fieldAt(cracks.field, dot.x, dot.y)) / CRACK_DOT_SPAN,
            );
            radius *= 1 - (1 - appear) ** 3;
          }
          if (radius < 0.12) continue;
          const x = dot.x + dx * localGrowth;
          const y = dot.y + dy * localGrowth;
          context.moveTo(x + radius, y);
          context.arc(x, y, radius, 0, Math.PI * 2);
        }
        context.fill();

        if (intro < 1) drawCreases(context, intro, ink, dark);

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
          intro < 1 ||
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
        if (!event.isPrimary) return;
        if (event.pointerType !== 'mouse' && event.buttons === 0) return;
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
      const release = (event: PointerEvent) => {
        if (event.isPrimary && event.pointerType !== 'mouse') leave();
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
      resizeObserver.observe(canvas);
      visibilityObserver.observe(canvas);
      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class'],
      });
      canvas.addEventListener('pointerdown', move);
      canvas.addEventListener('pointermove', move);
      canvas.addEventListener('pointerup', release);
      canvas.addEventListener('pointerleave', leave);
      canvas.addEventListener('pointercancel', leave);
      motion.addEventListener('change', reset);
      document.addEventListener('visibilitychange', reset);

      cleanup = () => {
        cancelAnimationFrame(frame);
        resizeObserver.disconnect();
        visibilityObserver.disconnect();
        themeObserver.disconnect();
        canvas.removeEventListener('pointerdown', move);
        canvas.removeEventListener('pointermove', move);
        canvas.removeEventListener('pointerup', release);
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
