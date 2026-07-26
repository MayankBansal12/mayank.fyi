import { baseStrokeOptions } from '@/lib/rough/theme';
import { useRoughDraw } from '@/lib/rough/useRoughDraw';

type RoughArrowProps = {
  className?: string;
  seed?: number;
  /** vertical down (default) or horizontal right */
  direction?: 'down' | 'right';
  height?: number;
  width?: number;
};

const RoughArrow: React.FC<RoughArrowProps> = ({
  className = '',
  seed = 61,
  direction = 'down',
  height = 28,
  width = 24,
}) => {
  const w = direction === 'down' ? width : Math.max(width, 40);
  const h = direction === 'down' ? height : width;

  const { containerRef, svgRef } = useRoughDraw({
    seed,
    deps: [direction, w, h],
    draw: ({ rc, svg, width: sw, height: sh, palette, reducedMotion }) => {
      const opts = baseStrokeOptions(palette, {
        seed,
        reducedMotion,
        strokeWidth: 1.4,
        roughness: 1.2,
      });

      if (direction === 'down') {
        const cx = sw / 2;
        svg.appendChild(rc.line(cx, 2, cx, sh - 10, opts));
        svg.appendChild(
          rc.linearPath(
            [
              [cx - 7, sh - 14],
              [cx, sh - 3],
              [cx + 7, sh - 14],
            ],
            opts,
          ),
        );
      } else {
        const cy = sh / 2;
        svg.appendChild(rc.line(2, cy, sw - 10, cy, opts));
        svg.appendChild(
          rc.linearPath(
            [
              [sw - 14, cy - 6],
              [sw - 3, cy],
              [sw - 14, cy + 6],
            ],
            opts,
          ),
        );
      }
    },
  });

  return (
    <div
      ref={containerRef}
      className={`relative mx-auto ${className}`}
      style={{ width: w, height: h }}
      aria-hidden
    >
      <svg ref={svgRef} className='pointer-events-none absolute inset-0 h-full w-full' />
    </div>
  );
};

export default RoughArrow;
