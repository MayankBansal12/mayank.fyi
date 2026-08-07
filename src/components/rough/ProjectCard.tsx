import Image from 'next/image';
import { FiGithub } from 'react-icons/fi';
import RoughBox from './RoughBox';

type ProjectCardProps = {
  title: string;
  date: string;
  image?: string;
  imageAlt?: string;
  description: string[];
  githubLink?: string;
  liveLink?: string;
  seed?: number;
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  date,
  image,
  imageAlt,
  description,
  githubLink,
  liveLink,
  seed = 80,
}) => {
  const previewUrl = liveLink?.replace(/^https?:\/\//, '').replace(/\/$/, '') ?? 'project preview';

  const card = (
    <RoughBox
      seed={seed}
      className='portfolio-project-card group relative h-full'
      contentClassName='flex h-full flex-col p-1'
      paddingClassName='p-0'
      fill='solid'
      fillColor='var(--portfolio-surface)'
    >
      {liveLink ? (
        <a
          href={liveLink}
          target='_blank'
          rel='noreferrer noopener'
          className='project-card-hit-area'
          aria-label={`open ${title} website`}
        >
          <span className='sr-only'>open {title} website</span>
        </a>
      ) : null}
      <div className='project-preview'>
        <div className='project-preview-bar'>
          <span />
          <span />
          <span />
          {liveLink ? (
            <a
              href={liveLink}
              target='_blank'
              rel='noreferrer noopener'
              className='project-preview-url'
              title={liveLink}
            >
              {previewUrl}
            </a>
          ) : (
            <small className='project-preview-url'>{previewUrl}</small>
          )}
          {githubLink ? (
            <a
              href={githubLink}
              target='_blank'
              rel='noreferrer noopener'
              className='project-preview-github'
              aria-label={`view ${title} on GitHub`}
              title={githubLink}
            >
              <FiGithub size={11} aria-hidden />
            </a>
          ) : null}
        </div>
        <div className='project-preview-stage'>
          {image ? (
            <Image
              src={image}
              alt={imageAlt ?? `${title} project preview`}
              className={`project-preview-image ${title === 'shift-read' ? 'project-preview-image-center' : ''}`}
              width={1440}
              height={900}
              loading='lazy'
            />
          ) : (
            <div className='project-preview-canvas' aria-hidden>
              <span className='project-preview-shape' />
              <strong>{title.slice(0, 2)}</strong>
              <span className='project-preview-line project-preview-line-one' />
              <span className='project-preview-line project-preview-line-two' />
            </div>
          )}
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
      </div>
    </RoughBox>
  );

  return (
    <div className={liveLink ? 'h-full cursor-pointer' : 'h-full'} data-sound-hover>
      {card}
    </div>
  );
};

export default ProjectCard;
