import PageShell from '@/components/rough/PageShell';
import RoughBox from '@/components/rough/RoughBox';
import RoughLink from '@/components/rough/RoughLink';
import RoughSticky from '@/components/rough/RoughSticky';

const Hire: React.FC = () => {
  return (
    <PageShell title='hire me'>
      <RoughSticky seed={501} color='green' rotate={-1} className='w-fit max-w-sm'>
        <p className='text-base font-medium'>available for part-time, contract & full-time</p>
      </RoughSticky>

      <RoughBox seed={502}>
        <div className='flex flex-col gap-4 text-lg opacity-90 md:text-xl'>
          <p>
            -&gt; i am currently working at an early-age startup and am available to take on
            part-time or contract work. <br />
            -&gt; i have previously worked as a freelancer and as an intern and managed both
            frontend and backend for startups. <br />
            -&gt; i have recently graduated and am available for full-time opportunities too.{' '}
            <span className='font-medium'>
              read more{' '}
              <RoughLink href='/about' seed={503}>
                about me
              </RoughLink>{' '}
              or see my work{' '}
              <RoughLink href='/work' seed={504}>
                here
              </RoughLink>
            </span>
          </p>
          <p>
            i take pride in my work ethic and commitment. i have a knack <br />
            for handling multiple projects simultaneously (hope that won&apos;t be a problem for
            you).
          </p>
        </div>
      </RoughBox>

      <p className='text-lg md:text-xl'>reach out:</p>
      <div className='flex flex-wrap gap-3'>
        <RoughSticky seed={505} color='blue'>
          <RoughLink href='https://x.com/SimplerMayank' seed={506} className='text-sm'>
            twitter
          </RoughLink>
        </RoughSticky>
        <RoughSticky seed={507} color='salmon'>
          <RoughLink href='mailto:mayankbansal125@gmail.com' seed={508} className='text-sm'>
            mail
          </RoughLink>
        </RoughSticky>
        <RoughSticky seed={509} color='green'>
          <RoughLink href='https://cal.com/mayankbansal' seed={510} className='text-sm'>
            schedule a meet
          </RoughLink>
        </RoughSticky>
      </div>
    </PageShell>
  );
};

export default Hire;
