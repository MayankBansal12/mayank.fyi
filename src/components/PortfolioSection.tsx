import type { ReactNode } from 'react';

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
      <header
        className='mb-5 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center sm:gap-4'
        data-sound='tap'
      >
        <h2 className='text-2xl font-semibold md:text-3xl'>{title}</h2>
        {note ? <p className='text-left text-xs text-board-muted sm:text-right'>{note}</p> : null}
      </header>
      {children}
      <div className='portfolio-section-divider mt-9' data-seed={seed} aria-hidden />
    </section>
  );
}
