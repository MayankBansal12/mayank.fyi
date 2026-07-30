import PageShell from '@/components/rough/PageShell';
import RoughLink from '@/components/rough/RoughLink';
import { inspiration, inspirationIntro, inspirationLastUpdate } from '@/data/inspiration';

const Inspiration: React.FC = () => {
  return (
    <PageShell title='cool ppls'>
      <p>{inspirationIntro}</p>

      <ul className='flex flex-col gap-4'>
        {inspiration.map((person, index) => (
          <li
            key={person.name}
            className='flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3'
          >
            <span className='shrink-0'>
              <span className='text-sm opacity-40'>{'-> '}</span>
              <RoughLink href={person.href} seed={900 + index}>
                {person.name}
              </RoughLink>
            </span>
            {person.note ? (
              <span className='text-base opacity-60 md:text-lg'>— {person.note}</span>
            ) : null}
          </li>
        ))}
      </ul>

      <p className='py-4 text-right text-xs opacity-50'>last update: {inspirationLastUpdate}</p>
    </PageShell>
  );
};

export default Inspiration;
