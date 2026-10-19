import { useTheme } from 'next-themes';
import { useLayoutEffect, useRef, useState } from 'react';
import rough from 'roughjs';
import type { RoughSVG } from 'roughjs/bin/svg';
import { getRoughPalette, type RoughPalette } from './theme';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

export type RoughDrawContext = {
  rc: RoughSVG;
  svg: SVGSVGElement;
  width: number;
  height: number;
  palette: RoughPalette;
  isDark: boolean;
  reducedMotion: boolean;
  seed: number;
};

type UseRoughDrawOptions = {
  seed?: number;
  /** Extra deps that should trigger a redraw */
  deps?: unknown[];
  draw: (ctx: RoughDrawContext) => void;
};

export function useRoughDraw({ seed = 1, deps = [], draw }: UseRoughDrawOptions) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const drawRef = useRef(draw);
  drawRef.current = draw;

  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const reducedMotion = usePrefersReducedMotion();
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!mounted) return;

    const el = containerRef.current;
    const svg = svgRef.current;
    if (!el || !svg) return;

    const paint = () => {
      const { width, height } = el.getBoundingClientRect();
      if (width < 2 || height < 2) return;

      const w = Math.ceil(width);
      const h = Math.ceil(height);
      svg.setAttribute('width', String(w));
      svg.setAttribute('height', String(h));
      svg.setAttribute('viewBox', `0 0 ${w} ${h}`);

      while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
      }

      const palette = getRoughPalette(isDark);
      const rc = rough.svg(svg);
      drawRef.current({
        rc,
        svg,
        width: w,
        height: h,
        palette,
        isDark,
        reducedMotion,
        seed,
      });
    };

    paint();
    // ResizeObserver fires after layout and before paint, so redrawing here keeps the
    // outline in lockstep with animated size changes (a rAF hop would trail by a frame).
    const ro = new ResizeObserver(paint);
    ro.observe(el);

    return () => {
      ro.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- deps passed by caller
  }, [mounted, isDark, reducedMotion, seed, ...deps]);

  return { containerRef, svgRef, mounted, isDark, reducedMotion };
}
