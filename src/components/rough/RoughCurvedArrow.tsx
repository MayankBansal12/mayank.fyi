import { baseStrokeOptions } from '@/lib/rough/theme';
import { useRoughDraw } from '@/lib/rough/useRoughDraw';

type RoughCurvedArrowProps = {
  className?: string;
  seed?: number;
  width?: number;
  height?: number;
};

const RoughCurvedArrow: React.FC<RoughCurvedArrowProps> = ({
  className = '',
  seed = 62,
  width = 48,
  height = 34,
}) => {
  const { containerRef, svgRef } = useRoughDraw({
    seed,
    deps: [width, height],
    draw: ({ rc, svg, width: sw, height: sh, palette, reducedMotion }) => {
      const opts = {
        ...baseStrokeOptions(palette, {
          seed,
          reducedMotion,
          strokeWidth: 1.1,
          roughness: 1,
        }),
        stroke: palette.muted,
      };

      const startX = sw * 0.08;
      const startY = sh * 0.08;
      const endX = sw * 0.82;
      const endY = sh * 0.92;

      svg.appendChild(
        rc.curve(
          [
            [startX, startY],
            [sw * 0.35, sh * 0.45],
            [endX, endY],
          ],
          opts,
        ),
      );

      svg.appendChild(
        rc.linearPath(
          [
            [endX - 7, endY - 7],
            [endX, endY],
            [endX - 9, endY - 1],
          ],
          opts,
        ),
      );
    },
  });

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ width, height }}
      aria-hidden
    >
      <svg ref={svgRef} className='pointer-events-none absolute inset-0 h-full w-full' />
    </div>
  );
};

export default RoughCurvedArrow;
