import type { ReactNode } from 'react';

type PageShellProps = {
  title: string;
  children: ReactNode;
};

export default function PageShell({ title, children }: PageShellProps) {
  return (
    <div className='portfolio-page mx-auto w-full max-w-[760px]'>
      <div className='portfolio-opening' aria-hidden>
        <span className='portfolio-cross portfolio-cross-left' />
        <span className='portfolio-cross portfolio-cross-right' />
      </div>
      <div className='portfolio-rail'>
        <header className='portfolio-section portfolio-page-heading'>
          <h1 className='text-3xl leading-tight font-semibold md:text-4xl'>{title}</h1>
        </header>
        <div className='portfolio-section portfolio-page-body'>{children}</div>
      </div>
      <div className='portfolio-closing' aria-hidden>
        <span className='portfolio-cross portfolio-cross-left' />
        <span className='portfolio-cross portfolio-cross-right' />
      </div>
    </div>
  );
}
