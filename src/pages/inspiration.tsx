import PageShell from '@/components/rough/PageShell';
import RoughBox from '@/components/rough/RoughBox';
import RoughLink from '@/components/rough/RoughLink';
import { inspiration } from '@/data/inspiration';
import { ROUGH_PADDING } from '@/lib/rough/geometry';

const Inspiration: React.FC = () => {
  return (
    <PageShell title='inspiration'>
      <p>
        people whose work, writing, or way of building has shaped how i think about shipping things.
        not a ranking — just a list of creators, indie hackers, engineers, and builders who left a
        mark.
      </p>

      <ul className='flex flex-col gap-4'>
        {inspiration.map((person, index) => (
          <li
            key={person.name}
            className='flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3'
          >
            <span className='shrink-0'>
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

      <RoughBox
        seed={920}
        dashed
        paddingClassName={ROUGH_PADDING.compact}
        className='ml-auto w-fit'
      >
        <p className='text-xs opacity-60'>last update: 2026-07-27</p>
      </RoughBox>
    </PageShell>
  );
};

export default Inspiration;
