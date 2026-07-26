import { baseStrokeOptions } from '@/lib/rough/theme';
import { useRoughDraw } from '@/lib/rough/useRoughDraw';

type RoughDividerProps = {
  className?: string;
  seed?: number;
  label?: string;
};

const RoughDivider: React.FC<RoughDividerProps> = ({ className = '', seed = 41, label }) => {
  const { containerRef, svgRef } = useRoughDraw({
    seed,
    draw: ({ rc, svg, width, height, palette, reducedMotion }) => {
      const y = height / 2;
      const mid = width / 2;
      const points: [number, number][] = [
        [4, y],
        [mid * 0.5, y + (reducedMotion ? 0 : 1.5)],
        [mid, y - (reducedMotion ? 0 : 1)],
        [mid * 1.5, y + (reducedMotion ? 0 : 1.2)],
        [width - 4, y],
      ];
      svg.appendChild(
        rc.linearPath(points, {
          ...baseStrokeOptions(palette, {
            seed,
            reducedMotion,
            strokeWidth: 1.3,
            roughness: 1.8,
          }),
        }),
      );
    },
  });

  return (
    <div className={`w-full ${className}`}>
      {label ? <p className='mb-2 text-2xl font-semibold opacity-90'>-: {label}</p> : null}
      <div ref={containerRef} className='relative h-3 w-full'>
        <svg
          ref={svgRef}
          className='pointer-events-none absolute inset-0 h-full w-full'
          aria-hidden
        />
      </div>
    </div>
  );
};

export default RoughDivider;
