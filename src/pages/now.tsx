import PageShell from '@/components/rough/PageShell';
import RoughLink from '@/components/rough/RoughLink';
import RoughSticky from '@/components/rough/RoughSticky';

export default function Now() {
  return (
    <PageShell title='what am i doing now?'>
      <div className='portfolio-page-prose space-y-3'>
        <p>
          i am working as a backend developer in an early-stage startup where i am working on
          developing the core product mainly handling backend development in java and springboot and
          deployments using docker.
        </p>
        <p>
          apart from that, i am trying to build more complex side projects and exploring and
          learning more topics.
        </p>
        <p>
          i am learning more about docker these days. have the basic understanding of how it works,
          i am trying to learn more advanced topics and using it more.
        </p>
      </div>

      <RoughSticky seed={602} color='yellow' rotate={0.6} className='w-fit max-w-md'>
        <p className='text-sm'>
          p.s. what am i doing now? i would probably be watching movies or sleeping, if not staring
          into my coding editor.
        </p>
      </RoughSticky>

      <p className='portfolio-page-prose'>
        p.p.s. i am available for{' '}
        <RoughLink href='/hire' seed={603}>
          hire
        </RoughLink>{' '}
        ... it might look i am doing a lot but i am exaggerating...need more work ^-^*
      </p>
    </PageShell>
  );
}
