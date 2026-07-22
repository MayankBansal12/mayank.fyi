import type { ReactNode } from 'react';
import { baseStrokeOptions, type RoughPalette } from '@/lib/rough/theme';
import { useRoughDraw } from '@/lib/rough/useRoughDraw';

export type StickyColor = 'yellow' | 'green' | 'blue' | 'salmon' | 'purple';

type RoughStickyProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  seed?: number;
  color?: StickyColor;
  rotate?: number;
};

function stickyFill(palette: RoughPalette, color: StickyColor): string {
  switch (color) {
    case 'green':
      return palette.stickyGreen;
    case 'blue':
      return palette.stickyBlue;
    case 'salmon':
      return palette.stickySalmon;
    case 'purple':
      return palette.stickyPurple;
    default:
      return palette.stickyYellow;
  }
}

const RoughSticky: React.FC<RoughStickyProps> = ({
  children,
  className = '',
  contentClassName = '',
  seed = 21,
  color = 'yellow',
  rotate = 0,
}) => {
  const { containerRef, svgRef } = useRoughDraw({
    seed,
    deps: [color],
    draw: ({ rc, svg, width, height, palette, reducedMotion }) => {
      const inset = 2;
      svg.appendChild(
        rc.rectangle(
          inset,
          inset,
          Math.max(0, width - inset * 2),
          Math.max(0, height - inset * 2),
          {
            ...baseStrokeOptions(palette, {
              seed,
              reducedMotion,
              strokeWidth: 1.4,
              roughness: 1.4,
            }),
            fill: stickyFill(palette, color),
            fillStyle: 'solid',
          },
        ),
      );
    },
  });

  const style = rotate ? { transform: `rotate(${rotate}deg)` } : undefined;

  return (
    <div ref={containerRef} style={style} className={`relative inline-block ${className}`}>
      <svg
        ref={svgRef}
        className='pointer-events-none absolute inset-0 h-full w-full'
        aria-hidden
      />
      <div className={`relative z-10 px-3 py-2 ${contentClassName}`}>{children}</div>
    </div>
  );
};

export default RoughSticky;
