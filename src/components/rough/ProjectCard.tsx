import RoughBox from './RoughBox';
import RoughLink from './RoughLink';

type ProjectCardProps = {
  title: string;
  date: string;
  description: string[];
  githubLink?: string;
  liveLink?: string;
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
      className='h-full'
      contentClassName='flex h-full flex-col gap-2'
      paddingClassName='p-4'
    >
      <div className='flex flex-col gap-1 md:flex-row md:items-center md:justify-between'>
        <h3 className='text-xl font-bold'>{title}</h3>
        <p className='text-sm opacity-70'>{date}</p>
      </div>
      {(githubLink || liveLink) && (
        <p className='flex flex-wrap items-center gap-2 text-sm opacity-90'>
          {githubLink ? (
            <RoughLink href={githubLink} seed={seed + 1}>
              view on github
            </RoughLink>
          ) : null}
          {githubLink && liveLink ? <span className='opacity-50'>|</span> : null}
          {liveLink ? (
            <RoughLink href={liveLink} seed={seed + 2}>
              live link
            </RoughLink>
          ) : null}
        </p>
      )}
      <div className='flex flex-col gap-1 text-base opacity-90 md:text-lg'>
        {description.map((line) => (
          <span key={line}>-&gt; {line}</span>
        ))}
      </div>
    </RoughBox>
  );
};

export default ProjectCard;
