import type { ReactNode } from 'react';
import {
  ROUGH_FRAME_SKETCH,
  ROUGH_INSET,
  ROUGH_PADDING,
  ROUGH_RADIUS,
  roundedRectPath,
} from '@/lib/rough/geometry';
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
  paddingClassName = ROUGH_PADDING.box,
  strokeWidth = 1.6,
  dashed = false,
}) => {
  const { containerRef, svgRef } = useRoughDraw({
    seed,
    deps: [fill, fillColor, strokeWidth, dashed],
    draw: ({ rc, svg, width, height, palette, reducedMotion }) => {
      const inset = ROUGH_INSET.box;
      const opts = {
        ...baseStrokeOptions(palette, {
          seed,
          reducedMotion,
          strokeWidth,
          roughness: ROUGH_FRAME_SKETCH.roughness,
          bowing: ROUGH_FRAME_SKETCH.bowing,
        }),
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
        rc.path(
          roundedRectPath(
            inset,
            inset,
            Math.max(0, width - inset * 2),
            Math.max(0, height - inset * 2),
            ROUGH_RADIUS,
          ),
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
