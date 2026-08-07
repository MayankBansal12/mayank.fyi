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
      <svg
        className='newsletter-postmark'
        viewBox='0 0 320 180'
        preserveAspectRatio='xMidYMid slice'
        aria-hidden
      >
        <title>Decorative hand-drawn postmark</title>
        <g fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round'>
          <path d='M246 20c25-2 46 17 47 42 2 24-17 45-41 47-25 2-47-16-49-40-3-25 17-47 43-49Z' />
          <path
            d='M245 25c22-1 41 15 43 37 2 21-14 40-36 42-22 2-42-14-44-36-2-22 15-42 37-43Z'
            opacity='.62'
          />
          <path
            d='M250 36c15 1 27 13 27 28 0 16-12 29-28 29-16 1-29-11-30-27-1-16 12-30 31-30Z'
            strokeDasharray='3 5'
          />
          <path d='M146 49c30 3 55 1 83-2 28-4 55-2 87 2' />
          <path d='M142 60c31 4 58 2 87-2 28-3 56-1 89 3' opacity='.72' />
          <path d='M145 72c30 3 57 1 84-2 30-4 57-2 89 2' />
          <path d='M151 84c29 2 52 0 79-3 29-3 55-1 84 3' opacity='.58' />
          <path d='m65 33 2 10m-6-4 12-2' />
          <path d='m105 125 2 13m-7-5 14-2' opacity='.72' />
          <path d='M279 133c7 3 11 8 13 15-7-2-13 0-18 5 1-8-2-14-8-18 7 2 12 1 13-2Z' />
          <path d='M34 143c16-7 33-6 49 2 14 7 29 8 45 3' strokeDasharray='2 6' opacity='.7' />
        </g>
      </svg>
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
