import type { ReactNode } from 'react';
import RoughDivider from '@/components/rough/RoughDivider';

type PortfolioSectionProps = {
  id: string;
  title: string;
  note?: string;
  children: ReactNode;
  seed: number;
  className?: string;
};

export default function PortfolioSection({
  id,
  title,
  note,
  children,
  seed,
  className = '',
}: PortfolioSectionProps) {
  return (
    <section id={id} className={`portfolio-section scroll-mt-32 ${className}`}>
      <header className='mb-5 flex items-end justify-between gap-4'>
        <h2 className='text-2xl font-semibold md:text-3xl'>{title}</h2>
        {note ? <p className='pb-1 text-right text-xs text-board-muted'>{note}</p> : null}
      </header>
      {children}
      <RoughDivider seed={seed} className='mt-9 opacity-55' />
    </section>
  );
}
