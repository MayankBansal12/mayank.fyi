import type { ReactNode } from 'react';
import { baseStrokeOptions } from '@/lib/rough/theme';
import { useRoughDraw } from '@/lib/rough/useRoughDraw';

type RoughBoxProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  seed?: number;
  /** solid | none | hachure */
  fill?: 'none' | 'solid' | 'hachure';
  fillColor?: string;
  paddingClassName?: string;
  strokeWidth?: number;
  dashed?: boolean;
};

const RoughBox: React.FC<RoughBoxProps> = ({
  children,
  className = '',
  contentClassName = '',
  seed = 11,
  fill = 'none',
  fillColor,
  paddingClassName = 'p-4 md:p-5',
  strokeWidth = 1.6,
  dashed = false,
}) => {
  const { containerRef, svgRef } = useRoughDraw({
    seed,
    deps: [fill, fillColor, strokeWidth, dashed],
    draw: ({ rc, svg, width, height, palette, reducedMotion }) => {
      const inset = 3;
      const opts = {
        ...baseStrokeOptions(palette, { seed, reducedMotion, strokeWidth }),
        ...(dashed
          ? {
              strokeLineDash: [8, 6] as number[],
            }
          : {}),
        ...(fill === 'none'
          ? {}
          : {
              fill: fillColor ?? (fill === 'hachure' ? 'transparent' : palette.paper),
              fillStyle: fill === 'hachure' ? 'hachure' : 'solid',
              fillWeight: 0.6,
              hachureGap: 6,
            }),
      };

      if (fill === 'hachure') {
        opts.fill = fillColor ?? palette.muted;
        opts.fillStyle = 'hachure';
      }

      svg.appendChild(
        rc.rectangle(
          inset,
          inset,
          Math.max(0, width - inset * 2),
          Math.max(0, height - inset * 2),
          opts,
        ),
      );
    },
  });

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <svg
        ref={svgRef}
        className='pointer-events-none absolute inset-0 h-full w-full'
        aria-hidden
      />
      <div className={`relative z-10 ${paddingClassName} ${contentClassName}`}>{children}</div>
    </div>
  );
};

export default RoughBox;
