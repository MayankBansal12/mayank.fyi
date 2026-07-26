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
        -&gt; working as a backend developer at{' '}
        <RoughLink href='https://echio.in' seed={301}>
          echio
        </RoughLink>
      </p>
      <p>
        -&gt; i have been building products, dev tools, tech projects. obsessed over learning more
        tech and pushing my limits of what i can build.
      </p>
      <p>
        -&gt; i have worked in different programming languages and frameworks both professionally
        and in projects, hackathons...java and javascript are the two i have used the most. <br />
        javascript has become my go-to language whenever i need to experiment or try out a new idea.
      </p>
      <p>
        -&gt; i am always looking to work on more projects so if you have something interesting,
        feel free to{' '}
        <RoughLink href='/contact' seed={302}>
          contact
        </RoughLink>{' '}
        me and let&apos;s discuss how can i add value.
      </p>

      <div className='flex flex-wrap gap-2 pt-1'>
        <RoughChip href='/work' seed={303}>
          work
        </RoughChip>
        <RoughChip href='https://github.com/mayankbansal12' seed={304}>
          github
        </RoughChip>
        <RoughChip href='/hire' seed={305}>
          hire me
        </RoughChip>
        <RoughChip href='/now' seed={306}>
          now
        </RoughChip>
        <RoughChip href='/more' seed={307}>
          journey
        </RoughChip>
      </div>

      <RoughSticky seed={308} color='yellow' rotate={-0.8} className='mt-2 max-w-md'>
        <p className='text-sm opacity-90'>
          p.s.) ) if you are wondering why is everything in lowercase, it&apos;s my cool design
          blend.
        </p>
      </RoughSticky>

      <RoughBox
        seed={309}
        dashed
        paddingClassName={ROUGH_PADDING.compact}
        className='ml-auto w-fit'
      >
        <p className='text-xs opacity-60'>last update: 2024-12-30</p>
      </RoughBox>
    </PageShell>
  );
};

export default About;
