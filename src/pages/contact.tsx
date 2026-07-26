import PageShell from '@/components/rough/PageShell';
import RoughLink from '@/components/rough/RoughLink';
import RoughSticky from '@/components/rough/RoughSticky';

const channels = [
  {
    plain: "twitter (don't like to call it x)",
    href: 'https://x.com/SimplerMayank',
    text: 'simplermayank',
    color: 'blue' as const,
    seed: 401,
  },
  {
    plain: 'github (trying to be consistent)',
    href: 'https://github.com/MayankBansal12',
    text: 'mayankbansal12',
    color: 'purple' as const,
    seed: 402,
  },
  {
    plain: 'gmail (i read all my emails ^-^)',
    href: 'mailto:mayankbansal125@gmail.com',
    text: 'mayankbansal125@gmail.com',
    color: 'salmon' as const,
    seed: 403,
  },
  {
    plain: 'linkedin (forgot linkedin passwd)',
    href: 'https://www.linkedin.com/in/mayank-bansal200604012/',
    text: '--mb2004--',
    color: 'blue' as const,
    seed: 404,
  },
  {
    plain: 'my blog (not super consistent..)',
    href: 'https://mayank12.substack.com/',
    text: 'substack',
    color: 'yellow' as const,
    seed: 405,
  },
  {
    plain: 'you can schedule a online meet',
    href: 'https://cal.com/mayankbansal',
    text: 'cal.com',
    color: 'green' as const,
    seed: 406,
  },
  {
    plain: 'leave anonymous mess/feedback',
    href: 'https://mayank.sayout.net/',
    text: 'sayout',
    color: 'salmon' as const,
    seed: 407,
  },
];

const Contact: React.FC = () => {
  return (
    <PageShell title='contact'>
      <p>you can find me online on:</p>
      <div className='flex flex-col gap-4'>
        {channels.map((ch) => (
          <div
            key={ch.href}
            className='flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between'
          >
            <p className='text-lg opacity-90 md:text-xl'>-&gt; {ch.plain}</p>
            <RoughSticky seed={ch.seed} color={ch.color} className='shrink-0'>
              <RoughLink href={ch.href} seed={ch.seed + 10} className='text-sm'>
                {ch.text}
              </RoughLink>
            </RoughSticky>
          </div>
        ))}
      </div>
    </PageShell>
  );
};

export default Contact;
