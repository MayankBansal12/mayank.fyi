import { ArrowUpRight } from 'lucide-react';
import RoughBox from './RoughBox';
import RoughLink from './RoughLink';

type ProjectCardProps = {
  title: string;
  date: string;
  description: string[];
  githubLink?: string;
  liveLink?: string;
  skills?: string[];
  seed?: number;
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  date,
  description,
  githubLink,
  liveLink,
  seed = 80,
}) => {
  return (
    <RoughBox
      seed={seed}
      className='portfolio-project-card group h-full'
      contentClassName='flex h-full flex-col p-1'
      paddingClassName='p-0'
      fill='solid'
      fillColor='var(--portfolio-surface)'
    >
      <div className='project-preview' aria-hidden>
        <div className='project-preview-bar'>
          <span />
          <span />
          <span />
          <small>preview</small>
        </div>
        <div className='project-preview-canvas'>
          <span className='project-preview-shape' />
          <strong>{title.slice(0, 2)}</strong>
          <span className='project-preview-line project-preview-line-one' />
          <span className='project-preview-line project-preview-line-two' />
        </div>
      </div>
      <div className='flex flex-1 flex-col gap-2 px-3 pt-3 pb-2'>
        <div className='flex items-baseline justify-between gap-3'>
          <h3 className='text-base font-bold'>{title}</h3>
          <p className='shrink-0 text-[0.65rem] text-board-muted'>{date}</p>
        </div>
        <div className='flex flex-1 flex-col gap-1 text-xs leading-relaxed opacity-75'>
          {description.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        {(githubLink || liveLink) && (
          <div className='mt-auto flex flex-wrap items-center gap-3 pt-1 text-xs'>
            {githubLink ? (
              <RoughLink href={githubLink} seed={seed + 1} className='font-semibold'>
                github
              </RoughLink>
            ) : null}
            {liveLink ? (
              <a
                href={liveLink}
                target='_blank'
                rel='noreferrer noopener'
                className='project-live-link ml-auto inline-flex items-center gap-1 font-semibold'
              >
                view project <ArrowUpRight size={14} aria-hidden />
              </a>
            ) : null}
          </div>
        )}
      </div>
    </RoughBox>
  );
};

export default ProjectCard;
