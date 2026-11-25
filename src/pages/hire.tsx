import { ArrowUpRight, CalendarDays, Mail, SketchIcon } from 'sketchicon';
import PageShell from '@/components/rough/PageShell';
import RoughLink from '@/components/rough/RoughLink';
import RoughSticky from '@/components/rough/RoughSticky';
import { links } from '@/data/portfolio';

export default function Hire() {
  return (
    <PageShell title='hire me'>
      <RoughSticky seed={501} color='yellow' rotate={-0.8} className='w-fit max-w-sm'>
        <p className='text-sm font-medium'>available for part-time, contract & full-time</p>
      </RoughSticky>

      <div className='portfolio-page-prose space-y-3'>
        <p>
          -&gt; i am currently working at an early-age startup and am available to take on part-time
          or contract work.
        </p>
        <p>
          -&gt; i have previously worked as a freelancer and as an intern and managed both frontend
          and backend for startups.
        </p>
        <p>-&gt; i have recently graduated and am available for full-time opportunities too.</p>
        <p>
          i take pride in my work ethic and commitment. i have a knack for handling multiple
          projects simultaneously (hope that won&apos;t be a problem for you).
        </p>
        <p>
          read more{' '}
          <RoughLink href='/about' seed={503}>
            about me
          </RoughLink>{' '}
          or see{' '}
          <RoughLink href='/work' seed={504}>
            my work
          </RoughLink>
          .
        </p>
      </div>

      <div className='flex flex-wrap items-center gap-3'>
        <a
          href={links.calendar}
          target='_blank'
          rel='noreferrer noopener'
          className='portfolio-button'
        >
          <SketchIcon icon={CalendarDays} size={15} roughness={1.8} aria-hidden />
          schedule a meet
        </a>
        <a href={links.email} className='portfolio-button portfolio-button-secondary'>
          <SketchIcon icon={Mail} size={15} roughness={1.8} aria-hidden />
          mail
        </a>
        <a href={links.twitter} target='_blank' rel='noreferrer noopener' className='social-chip'>
          twitter
          <SketchIcon
            icon={ArrowUpRight}
            size={13}
            roughness={1.8}
            className='social-chip-arrow'
            aria-hidden
          />
        </a>
      </div>
    </PageShell>
  );
}
