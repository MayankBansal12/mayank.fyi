import { SquareArrowOutUpRight } from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { baseStrokeOptions } from '@/lib/rough/theme';
import { useRoughDraw } from '@/lib/rough/useRoughDraw';

type RoughLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
  seed?: number;
  showIcon?: boolean;
};

const RoughLink: React.FC<RoughLinkProps> = ({
  href,
  children,
  className = '',
  external,
  seed = 31,
  showIcon = true,
}) => {
  const isExternal =
    external ?? (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('//'));

  const { containerRef, svgRef } = useRoughDraw({
    seed,
    draw: ({ rc, svg, width, height, palette, reducedMotion }) => {
      const y = height - 2;
      svg.appendChild(
        rc.line(0, y, width, y + (reducedMotion ? 0 : 0.5), {
          ...baseStrokeOptions(palette, {
            seed,
            reducedMotion,
            strokeWidth: 1.2,
            roughness: 1.6,
          }),
          stroke: palette.ink,
        }),
      );
    },
  });

  const content = (
    <span ref={containerRef} className={`relative inline-flex items-baseline gap-1 ${className}`}>
      <svg
        ref={svgRef}
        className='pointer-events-none absolute inset-0 h-full w-full'
        aria-hidden
      />
      <span className='relative z-10 font-semibold'>{children}</span>
      {showIcon && isExternal ? (
        <SquareArrowOutUpRight size={10} className='relative z-10 inline shrink-0 opacity-80' />
      ) : null}
    </span>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target={href.startsWith('mailto:') ? undefined : '_blank'}
        rel={href.startsWith('mailto:') ? undefined : 'noreferrer noopener'}
        className='inline-flex hover:opacity-80 transition-opacity'
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className='inline-flex hover:opacity-80 transition-opacity'>
      {content}
    </Link>
  );
};

export default RoughLink;
