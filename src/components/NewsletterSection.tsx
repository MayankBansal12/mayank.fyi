import { ArrowUpRight } from 'lucide-react';
import type { FormEvent } from 'react';
import RoughBox from '@/components/rough/RoughBox';
import { links, newsletter } from '@/data/portfolio';

export default function NewsletterSection() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.open(links.subscribe, '_blank', 'noopener,noreferrer');
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
        {newsletter.eyebrow ? (
          <p className='text-xs font-semibold tracking-widest text-board-muted uppercase'>
            {newsletter.eyebrow}
          </p>
        ) : null}
        <h2 className={`text-2xl font-semibold md:text-3xl ${newsletter.eyebrow ? 'mt-2' : ''}`}>
          {newsletter.heading}
        </h2>
        <p className='mt-2 text-sm opacity-75 md:text-base'>{newsletter.description}</p>
        <form className='mt-5 flex flex-col gap-3 sm:flex-row' onSubmit={handleSubmit}>
          <label htmlFor='newsletter-email' className='sr-only'>
            {newsletter.emailLabel}
          </label>
          <input
            id='newsletter-email'
            name='email'
            type='email'
            required
            autoComplete='email'
            placeholder={newsletter.placeholder}
            className='portfolio-input min-w-0 flex-1'
          />
          <button type='submit' className='portfolio-button group justify-center'>
            {newsletter.buttonLabel}{' '}
            <ArrowUpRight size={15} className='subscribe-arrow' aria-hidden />
          </button>
        </form>
        <p className='mt-2 text-xs text-board-muted'>{newsletter.helpText}</p>
      </div>
    </RoughBox>
  );
}
