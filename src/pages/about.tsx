import Link from 'next/link';
import { ArrowUpRight, SketchIcon } from 'sketchicon';
import PageShell from '@/components/rough/PageShell';
import RoughLink from '@/components/rough/RoughLink';
import RoughSticky from '@/components/rough/RoughSticky';
import { links } from '@/data/portfolio';

export default function About() {
  return (
    <PageShell title='about'>
      <div className='portfolio-page-prose space-y-3'>
        <p>hey. i am mayank.</p>
        <p>
          -&gt; i&apos;m{' '}
          <RoughLink href='/inspiration' seed={301} showIcon={false}>
            inspired by the people
          </RoughLink>{' '}
          on the internet who make stuff purely out of love for the craft.
        </p>
        <p>
          -&gt; i&apos;ve worked with early-stage teams, moving between frontend, backend, and
          deployments wherever the product needed me.
        </p>
        <p>
          -&gt; i&apos;m currently running a bunch of experiments to see how far i can push myself,
          and what i can build with models.
        </p>
        <p>
          -&gt; if you are building something thoughtful and need an engineer who can move across
          the stack, feel free to{' '}
          <RoughLink href='/contact' seed={303}>
            contact
          </RoughLink>{' '}
          me.
        </p>
      </div>

      <nav aria-label='more about mayank' className='flex flex-wrap gap-2'>
        <Link href='/work' className='social-chip'>
          work
        </Link>
        <a href={links.github} target='_blank' rel='noreferrer noopener' className='social-chip'>
          github
          <SketchIcon
            icon={ArrowUpRight}
            roughness={1.8}
            size={13}
            className='social-chip-arrow'
            aria-hidden
          />
        </a>
        <Link href='/hire' className='social-chip'>
          hire me
        </Link>
        <Link href='/now' className='social-chip'>
          now
        </Link>
        <Link href='/more' className='social-chip'>
          journey
        </Link>
        <Link href='/inspiration' className='social-chip'>
          inspiration
        </Link>
      </nav>

      <RoughSticky seed={310} color='yellow' rotate={-0.8} className='w-fit max-w-md'>
        <p className='text-sm'>
          p.s. the lowercase is intentional. the occasional typo may not be.
        </p>
      </RoughSticky>
    </PageShell>
  );
}
