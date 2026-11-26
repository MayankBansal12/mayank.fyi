import { ChevronDown, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import RoughBox from '@/components/rough/RoughBox';
import type { Experience } from '@/data/portfolio';

type ExperienceView = 'tldr' | 'details';

function ExperienceCard({ item, seed }: { item: Experience; seed: number }) {
  const [view, setView] = useState<ExperienceView | null>(null);
  const tldrOpen = view === 'tldr';
  const detailsOpen = view === 'details';
  const detailsId = `experience-${item.id}`;
  const tldrId = `${detailsId}-tldr`;

  function toggleView(nextView: ExperienceView) {
    setView((current) => (current === nextView ? null : nextView));
  }

  return (
    <RoughBox
      seed={seed}
      className='experience-card'
      paddingClassName='p-0'
      fill='solid'
      fillColor='var(--portfolio-surface)'
    >
      <article>
        <header className='px-4 py-3.5 sm:px-5'>
          <div className='flex items-start justify-between gap-3'>
            <div className='min-w-0'>
              <h3 className='text-lg font-semibold md:text-xl'>{item.company}</h3>
              <p className='mt-0.5 text-sm opacity-75'>{item.role}</p>
            </div>
            <div className='shrink-0 text-right text-xs text-board-muted sm:text-sm'>
              <p>{item.period}</p>
              {item.location ? <p>{item.location}</p> : null}
            </div>
          </div>
          <div className='mt-3 flex flex-wrap gap-2'>
            <button
              type='button'
              className='social-chip experience-view-trigger'
              aria-label={`tl;dr for ${item.company}`}
              aria-controls={tldrId}
              aria-expanded={tldrOpen}
              onClick={() => toggleView('tldr')}
              data-sound-hover
            >
              <MessageCircle size={14} aria-hidden />
              tl;dr
            </button>
            <button
              type='button'
              className='social-chip experience-view-trigger'
              aria-label={`full details for ${item.company}`}
              aria-controls={detailsId}
              aria-expanded={detailsOpen}
              onClick={() => toggleView('details')}
              data-sound-hover
            >
              full details
              <ChevronDown className='experience-chevron' size={15} aria-hidden />
            </button>
          </div>
        </header>

        <div
          id={tldrId}
          className='experience-panel'
          data-open={tldrOpen}
          aria-hidden={!tldrOpen}
          inert={!tldrOpen}
        >
          <div className='overflow-hidden'>
            <div className='px-4 pb-4 sm:px-5'>
              <div className='experience-tldr'>
                <p className='experience-tldr-question'>what did you build?</p>
                <div className='experience-tldr-reply'>
                  <p className='experience-tldr-author'>mayank</p>
                  <ul className='list-disc space-y-1 pl-4 text-sm'>
                    {item.tldr.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          id={detailsId}
          className='experience-panel'
          data-open={detailsOpen}
          aria-hidden={!detailsOpen}
          inert={!detailsOpen}
        >
          <div className='overflow-hidden'>
            <div className='px-4 pt-1 pb-5 sm:px-5'>
              <ul className='space-y-2 text-sm opacity-[0.85]'>
                {item.highlights.map((highlight) => (
                  <li key={highlight} className='flex gap-2'>
                    <span className='shrink-0 whitespace-nowrap' aria-hidden>
                      -&gt;
                    </span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
              <p className='mt-3 text-sm opacity-80'>{item.personalNote}</p>
              <div className='mt-4 flex flex-wrap gap-2'>
                {item.skills.map((skill) => (
                  <span key={skill} className='portfolio-tag'>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>
    </RoughBox>
  );
}

export default function ExperienceAccordion({ items }: { items: Experience[] }) {
  return (
    <div className='experience-list'>
      {items.map((item, index) => (
        <ExperienceCard key={item.id} item={item} seed={330 + index} />
      ))}
    </div>
  );
}
