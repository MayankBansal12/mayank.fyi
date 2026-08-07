import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import RoughBox from '@/components/rough/RoughBox';
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
    <div className='experience-list'>
      {items.map((item, index) => {
        const isOpen = openItems.has(item.id);
        const panelId = `experience-${item.id}`;

        return (
          <RoughBox
            key={item.id}
            seed={330 + index}
            className='experience-card'
            paddingClassName='p-0'
            fill='solid'
            fillColor='var(--portfolio-surface)'
          >
            <article>
              <button
                type='button'
                className='experience-trigger group'
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleItem(item.id)}
                data-sound-hover
              >
                <span className='min-w-0 text-left'>
                  <span className='flex flex-wrap items-baseline gap-x-2 gap-y-1'>
                    <span className='text-lg font-semibold md:text-xl'>{item.company}</span>
                  </span>
                  <span className='mt-0.5 block text-sm opacity-75'>{item.role}</span>
                  <span className='mt-1 block text-sm opacity-80'>{item.summary}</span>
                </span>
                <span className='flex shrink-0 items-center gap-3'>
                  <span className='text-right text-xs text-board-muted sm:text-sm'>
                    <span className='block'>{item.period}</span>
                    {item.location ? <span className='block'>{item.location}</span> : null}
                  </span>
                  <ChevronDown className='experience-chevron' size={18} aria-hidden />
                </span>
              </button>

              <div
                id={panelId}
                className='experience-panel'
                data-open={isOpen}
                aria-hidden={!isOpen}
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
      })}
    </div>
  );
}
