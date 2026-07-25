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
  skills = [],
  seed = 80,
}) => {
  return (
    <RoughBox
      seed={seed}
      className='portfolio-project-card group h-full'
      contentClassName='flex h-full flex-col gap-3 p-5'
      paddingClassName='p-0'
      fill='solid'
      fillColor='var(--portfolio-surface)'
    >
      <span className='project-card-wash' aria-hidden />
      <div className='flex flex-col gap-1 md:flex-row md:items-center md:justify-between'>
        <h3 className='relative z-10 text-xl font-bold'>{title}</h3>
        <p className='relative z-10 text-xs text-board-muted'>{date}</p>
      </div>
      <div className='relative z-10 flex flex-1 flex-col gap-1 text-sm opacity-80 md:text-base'>
        {description.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      {skills.length > 0 ? (
        <div className='relative z-10 flex flex-wrap gap-2'>
          {skills.map((skill) => (
            <span key={skill} className='portfolio-tag'>
              {skill}
            </span>
          ))}
        </div>
      ) : null}
      {(githubLink || liveLink) && (
        <div className='relative z-10 mt-auto flex flex-wrap items-center gap-3 pt-1 text-sm'>
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
    </RoughBox>
  );
};

export default ProjectCard;
