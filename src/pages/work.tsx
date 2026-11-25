import { useCallback, useState } from 'react';
import { ArrowDown, ArrowUpRight, SketchIcon } from 'sketchicon';
import ExperienceAccordion from '@/components/ExperienceAccordion';
import PortfolioSection from '@/components/PortfolioSection';
import ProjectPreviewModal from '@/components/ProjectPreviewModal';
import PageShell from '@/components/rough/PageShell';
import ProjectCard from '@/components/rough/ProjectCard';
import { experiences, links, type Project, projects } from '@/data/portfolio';

const repositoryFilters = [
  { language: 'typescript', label: 'typescript' },
  { language: 'javascript', label: 'javascript' },
  { language: 'css', label: 'design proj' },
  { language: 'java', label: 'java' },
];

export default function Work() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const closeProjectPreview = useCallback(() => setSelectedProject(null), []);

  return (
    <>
      <PageShell title='work'>
        <nav aria-label='work sections' className='flex flex-wrap gap-2'>
          <a href='#projects' className='social-chip'>
            projects <SketchIcon icon={ArrowDown} size={13} roughness={1.8} aria-hidden />
          </a>
          <a href='#experience' className='social-chip'>
            experience <SketchIcon icon={ArrowDown} size={13} roughness={1.8} aria-hidden />
          </a>
        </nav>

        <PortfolioSection
          id='projects'
          title='projects'
          note='personal & hackathon projects'
          seed={213}
        >
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                {...project}
                seed={201 + index}
                onPreview={() => setSelectedProject(project)}
              />
            ))}
          </div>

          <div className='mt-6'>
            <h3 className='mb-2 text-sm text-(--portfolio-ink-muted)'>repositories by language</h3>
            <div className='flex flex-wrap gap-2'>
              {repositoryFilters.map(({ language, label }) => (
                <a
                  key={language}
                  href={`${links.repositories}&q=&type=public&language=${language}&sort=`}
                  target='_blank'
                  rel='noreferrer noopener'
                  className='social-chip'
                >
                  {label}
                  <SketchIcon
                    icon={ArrowUpRight}
                    size={13}
                    roughness={1.8}
                    className='social-chip-arrow'
                    aria-hidden
                  />
                </a>
              ))}
            </div>
            <p className='mt-2 text-xs text-(--portfolio-ink-muted)'>used java mostly at work</p>
          </div>
        </PortfolioSection>

        <PortfolioSection id='experience' title='experience' seed={210}>
          <ExperienceAccordion items={experiences} />
        </PortfolioSection>

        <p className='text-xs text-(--portfolio-ink-muted)'>
          last update: <time dateTime='2026-08-05'>2026-08-05</time>
        </p>
      </PageShell>
      <ProjectPreviewModal
        key={selectedProject?.liveLink ?? 'closed'}
        project={selectedProject}
        onClose={closeProjectPreview}
      />
    </>
  );
}
