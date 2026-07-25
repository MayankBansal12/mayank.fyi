import { ArrowUpRight } from 'lucide-react';
import type { FormEvent } from 'react';
import RoughBox from '@/components/rough/RoughBox';
import { profile } from '@/data/portfolio';

export default function NewsletterSection() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.open(profile.substack, '_blank', 'noopener,noreferrer');
  }

  return (
    <RoughBox
      seed={801}
      className='newsletter-card'
      contentClassName='relative overflow-hidden p-5 sm:p-7'
      paddingClassName='p-0'
      fill='solid'
      fillColor='var(--portfolio-surface)'
    >
      <div className='newsletter-hatch' aria-hidden />
      <div className='relative z-10 max-w-xl'>
        <p className='text-xs font-semibold tracking-widest text-board-muted uppercase'>
          occasional notes
        </p>
        <h2 className='mt-2 text-2xl font-semibold md:text-3xl'>join my newsletter</h2>
        <p className='mt-2 text-sm opacity-75 md:text-base'>
          writing about backend work, experiments, things i build, and lessons worth keeping.
        </p>
        <form className='mt-5 flex flex-col gap-3 sm:flex-row' onSubmit={handleSubmit}>
          <label htmlFor='newsletter-email' className='sr-only'>
            email address
          </label>
          <input
            id='newsletter-email'
            name='email'
            type='email'
            required
            autoComplete='email'
            placeholder='you@example.com'
            className='portfolio-input min-w-0 flex-1'
          />
          <button type='submit' className='portfolio-button justify-center'>
            subscribe <ArrowUpRight size={15} aria-hidden />
          </button>
        </form>
        <p className='mt-2 text-xs text-board-muted'>you&apos;ll finish signing up on substack.</p>
      </div>
    </RoughBox>
  );
}
