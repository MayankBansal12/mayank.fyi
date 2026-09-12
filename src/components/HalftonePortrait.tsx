import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const SIZE = 256;
const SPACING = 2.4;

type Dot = {
  x: number;
  y: number;
  radius: number;
  highlightRadius: number;
  seed: number;
};

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const noise = (x: number, y: number) => {
  const value = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return value - Math.floor(value);
};

function samplePortrait(image: HTMLImageElement): Dot[] {
  const sample = document.createElement('canvas');
  sample.width = SIZE;
  sample.height = SIZE;
  const context = sample.getContext('2d', { willReadFrequently: true });
  if (!context) return [];

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
  const { data } = context.getImageData(0, 0, SIZE, SIZE);
  const luminance = new Float32Array(SIZE * SIZE);
  const histogram = new Uint32Array(256);
  for (let index = 0; index < luminance.length; index++) {
    const offset = index * 4;
    const value = data[offset] * 0.299 + data[offset + 1] * 0.587 + data[offset + 2] * 0.114;
    luminance[index] = value;
    histogram[Math.round(value)]++;
  }

  // The source is intentionally dark. Open up its midtones before making ink dots.
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
  const dots: Dot[] = [];

  for (let y = SPACING / 2; y < SIZE; y += SPACING) {
    for (let x = SPACING / 2; x < SIZE; x += SPACING) {
      const seed = noise(x, y);
      const edge = Math.min(x, y, SIZE - x, SIZE - y);
      const edgeFade = clamp(edge / (12 + noise(y, x) * 24));
      if (seed > edgeFade) continue;
      const value = luminance[Math.floor(y) * SIZE + Math.floor(x)];
      const brightness = clamp((value - black) / range) ** 0.55;
      const radius = SPACING * 0.76 * (1 - brightness) ** 0.85;
      const highlightRadius = SPACING * 0.76 * brightness ** 0.85;
      dots.push({ x, y, radius, highlightRadius, seed });
    }
  }
  return dots;
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

      let dots: Dot[];
      try {
        dots = samplePortrait(image);
      } catch {
        // A readable monochrome photo remains if canvas sampling is unavailable.
        return;
      }
      if (!dots.length) return;

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
        const follow = 1 - Math.exp(-delta / 65);
        pointer.lagX += (pointer.x - pointer.lagX) * follow;
        pointer.lagY += (pointer.y - pointer.lagY) * follow;
        const target = active && !motion.matches ? 1 : 0;
        strength += (target - strength) * (1 - Math.exp(-delta / (active ? 90 : 110)));
        if (!active && strength < 0.002) strength = 0;
        velocity *= Math.exp(-delta / 100);

        context.clearRect(0, 0, SIZE, SIZE);
        context.fillStyle = ink;
        context.beginPath();
        for (const dot of dots) {
          const dx = dot.x - pointer.lagX;
          const dy = dot.y - pointer.lagY;
          const distance = Math.hypot(dx, dy);
          const influence = clamp(1 - distance / (70 + velocity * 20)) ** 2 * strength;
          const recovery = 0.55 + 0.45 * Math.sin(time / (170 + dot.seed * 280) + dot.seed * 30);
          const dissolve = influence * (0.35 + dot.seed * 0.6) * (0.65 + recovery * 0.35);
          const radius = (dark ? dot.highlightRadius : dot.radius) * (1 - dissolve);
          if (radius < 0.12) continue;
          const displacement = influence * (3 + dot.seed * 5);
          const x = dot.x + (dx / Math.max(distance, 1)) * displacement;
          const y = dot.y + (dy / Math.max(distance, 1)) * displacement;
          context.moveTo(x + radius, y);
          context.arc(x, y, radius, 0, Math.PI * 2);
        }
        context.fill();
        // No idle render loop, and no animation in hidden tabs or offscreen.
        if ((active || strength > 0) && !motion.matches && inView && !document.hidden) {
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
        if (motion.matches || event.pointerType !== 'mouse') return;
        const rect = canvas.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * SIZE;
        const y = ((event.clientY - rect.top) / rect.height) * SIZE;
        velocity = Math.min(1, Math.hypot(x - pointer.x, y - pointer.y) / 35);
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
