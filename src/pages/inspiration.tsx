import { ArrowUpRight, SketchIcon } from 'sketchicon';
import PageShell from '@/components/rough/PageShell';
import { inspiration, inspirationIntro, inspirationLastUpdate } from '@/data/inspiration';

export default function Inspiration() {
  return (
    <PageShell title='cool ppls'>
      <p className='portfolio-page-prose'>{inspirationIntro}</p>

      <ul className='writing-list grid gap-x-6 sm:grid-cols-2'>
        {inspiration.map(({ name, href, note }) => (
          <li key={name} className='writing-item'>
            <a
              href={href}
              target='_blank'
              rel='noreferrer noopener'
              className='writing-row portfolio-directory-row'
              data-sound-hover
              data-sound-click
            >
              <div>
                <span className='writing-title'>
                  <span aria-hidden>{'->'}</span>
                  <span>{name}</span>
                </span>
                {note ? <p className='mt-1 pl-4 text-sm'>{note}</p> : null}
              </div>
              <SketchIcon
                icon={ArrowUpRight}
                size={14}
                roughness={1.8}
                className='mt-1 shrink-0'
                aria-hidden
              />
            </a>
          </li>
        ))}
      </ul>

      <p className='text-xs text-(--portfolio-ink-muted)'>
        last update: <time dateTime={inspirationLastUpdate}>{inspirationLastUpdate}</time>
      </p>
    </PageShell>
  );
}
