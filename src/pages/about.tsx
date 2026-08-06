import PageShell from '@/components/rough/PageShell';
import RoughBox from '@/components/rough/RoughBox';
import RoughChip from '@/components/rough/RoughChip';
import RoughLink from '@/components/rough/RoughLink';
import RoughSticky from '@/components/rough/RoughSticky';
import { ROUGH_PADDING } from '@/lib/rough/geometry';

const About: React.FC = () => {
  return (
    <PageShell title='about'>
      <p>hey. i am mayank.</p>
      <p>
        -&gt; i am a software engineer based in hyderabad. i enjoy taking ideas from a rough sketch
        to software people can actually use.
      </p>
      <p>
        -&gt; my work spans backend systems, AI agents, developer tools, and product interfaces. i
        care about reliable infrastructure as much as the small details that make a product feel
        good.
      </p>
      <p>
        -&gt; currently volunteering with{' '}
        <RoughLink href='https://evoljewels.com' seed={301}>
          evol jewels
        </RoughLink>
        , where i build ERP and AI-assisted jewelry design systems. i also contribute to{' '}
        <RoughLink href='https://realdevsquad.com' seed={302}>
          real dev squad
        </RoughLink>{' '}
        and its open-source developer tooling.
      </p>
      <p>
        -&gt; recently i have been exploring deterministic icon rendering, translated reader modes,
        LLM game agents, and agentic writing through my open-source projects.
      </p>
      <p>
        -&gt; if you are building something thoughtful and need an engineer who can move across the
        stack, feel free to{' '}
        <RoughLink href='/contact' seed={303}>
          contact
        </RoughLink>{' '}
        me.
      </p>

      <div className='flex flex-wrap gap-2 pt-1'>
        <RoughChip href='/work' seed={304}>
          work
        </RoughChip>
        <RoughChip href='https://github.com/mayankbansal12' seed={305}>
          github
        </RoughChip>
        <RoughChip href='/hire' seed={306}>
          hire me
        </RoughChip>
        <RoughChip href='/now' seed={307}>
          now
        </RoughChip>
        <RoughChip href='/more' seed={308}>
          journey
        </RoughChip>
        <RoughChip href='/inspiration' seed={309}>
          inspiration
        </RoughChip>
      </div>

      <RoughSticky seed={310} color='yellow' rotate={-0.8} className='mt-2 max-w-md'>
        <p className='text-sm opacity-90'>
          p.s. the lowercase is intentional. the occasional typo may not be.
        </p>
      </RoughSticky>

      <RoughBox
        seed={311}
        dashed
        paddingClassName={ROUGH_PADDING.compact}
        className='ml-auto w-fit'
      >
        <p className='text-xs opacity-60'>last update: 2026-08-06</p>
      </RoughBox>
    </PageShell>
  );
};

export default About;
