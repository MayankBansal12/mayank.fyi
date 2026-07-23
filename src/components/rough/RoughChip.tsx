import Link from 'next/link';
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

type RoughChipProps = {
  children: ReactNode;
  href?: string;
  className?: string;
  seed?: number;
  onClick?: () => void;
};

const RoughChip: React.FC<RoughChipProps> = ({
  children,
  href,
  className = '',
  seed = 51,
  onClick,
}) => {
  const { containerRef, svgRef } = useRoughDraw({
    seed,
    draw: ({ rc, svg, width, height, palette, reducedMotion }) => {
      const inset = ROUGH_INSET.chip;
      svg.appendChild(
        rc.path(
          roundedRectPath(
            inset,
            inset,
            Math.max(0, width - inset * 2),
            Math.max(0, height - inset * 2),
            ROUGH_RADIUS,
          ),
          {
            ...baseStrokeOptions(palette, {
              seed,
              reducedMotion,
              strokeWidth: 1.3,
              roughness: ROUGH_FRAME_SKETCH.roughness,
              bowing: ROUGH_FRAME_SKETCH.bowing,
            }),
          },
        ),
      );
    },
  });

  const body = (
    <span
      ref={containerRef}
      className={`relative inline-flex items-center ${ROUGH_PADDING.chip} text-sm transition-opacity hover:opacity-80 ${className}`}
    >
      <svg
        ref={svgRef}
        className='pointer-events-none absolute inset-0 h-full w-full'
        aria-hidden
      />
      <span className='relative z-10'>{children}</span>
    </span>
  );

  if (href) {
    const external = href.startsWith('http') || href.startsWith('mailto:');
    if (external) {
      return (
        <a href={href} target='_blank' rel='noreferrer noopener' className='inline-flex'>
          {body}
        </a>
      );
    }
    return (
      <Link href={href} className='inline-flex'>
        {body}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button type='button' onClick={onClick} className='inline-flex cursor-pointer'>
        {body}
      </button>
    );
  }

  return body;
};

export default RoughChip;
