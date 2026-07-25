import { ChevronDown, SquareArrowOutUpRight } from 'lucide-react';
import { useState } from 'react';
import type { Experience } from '@/data/portfolio';

type ExperienceAccordionProps = {
  items: Experience[];
};

export default function ExperienceAccordion({ items }: ExperienceAccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(() => new Set([items[0]?.id]));

  function toggleItem(id: string) {
    setOpenItems((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className='portfolio-list-frame overflow-hidden'>
      {items.map((item) => {
        const isOpen = openItems.has(item.id);
        const panelId = `experience-${item.id}`;

        return (
          <article key={item.id} className='experience-item'>
            <button
              type='button'
              className='experience-trigger group'
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggleItem(item.id)}
            >
              <span className='min-w-0 text-left'>
                <span className='flex flex-wrap items-baseline gap-x-2 gap-y-1'>
                  <span className='text-lg font-semibold md:text-xl'>{item.company}</span>
                  {item.companyUrl ? (
                    <span className='inline-flex items-center gap-0.5 text-xs text-board-muted'>
                      visit <SquareArrowOutUpRight size={10} aria-hidden />
                    </span>
                  ) : null}
                </span>
                <span className='mt-0.5 block text-sm opacity-75'>{item.role}</span>
              </span>
              <span className='flex shrink-0 items-center gap-3'>
                <span className='text-right text-xs text-board-muted sm:text-sm'>
                  <span className='block'>{item.period}</span>
                  {item.location ? <span className='block'>{item.location}</span> : null}
                </span>
                <ChevronDown className='experience-chevron' size={18} aria-hidden />
              </span>
            </button>

            <div id={panelId} className='experience-panel' data-open={isOpen} aria-hidden={!isOpen}>
              <div className='overflow-hidden'>
                <div className='px-4 pt-1 pb-5 sm:px-5'>
                  <p className='mb-3 text-sm opacity-80'>{item.summary}</p>
                  <ul className='space-y-2 text-sm opacity-[0.85]'>
                    {item.highlights.map((highlight) => (
                      <li key={highlight} className='flex gap-2'>
                        <span aria-hidden>-&gt;</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  <div className='mt-4 flex flex-wrap gap-2'>
                    {item.skills.map((skill) => (
                      <span key={skill} className='portfolio-tag'>
                        {skill}
                      </span>
                    ))}
                  </div>
                  {item.companyUrl ? (
                    <a
                      href={item.companyUrl}
                      target='_blank'
                      rel='noreferrer noopener'
                      className='portfolio-text-link mt-4 inline-flex items-center gap-1 text-sm font-semibold'
                    >
                      visit {item.company} <SquareArrowOutUpRight size={12} aria-hidden />
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
