import ExperienceAccordion from '@/components/ExperienceAccordion';
import ProjectCard from '@/components/rough/ProjectCard';
import RoughChip from '@/components/rough/RoughChip';
import RoughDivider from '@/components/rough/RoughDivider';
import { experiences, projects } from '@/data/portfolio';

const Work: React.FC = () => {
  return (
    <div className='mt-12 mb-10 flex flex-col items-center justify-center gap-3 md:mt-16'>
      <div className='w-[95%] md:w-2/3 lg:w-3/5 xl:w-1/2'>
        <h2 className='mb-6 text-3xl font-semibold'>work</h2>

        <div className='flex flex-col gap-6 text-xl opacity-90'>
          <RoughDivider seed={210} label='volunteering experience' />

          <ExperienceAccordion items={experiences} />

          <RoughDivider seed={213} label='personal & hackathon projects' className='mt-2' />

          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            {projects.map((project, index) => (
              <ProjectCard key={project.title} {...project} seed={201 + index} />
            ))}
          </div>

          <RoughDivider
            seed={214}
            label='view all works related to language on github'
            className='mt-2'
          />

          <div className='flex flex-wrap gap-3'>
            <RoughChip
              seed={215}
              href='https://github.com/MayankBansal12?tab=repositories&q=&type=public&language=typescript&sort='
            >
              typescript
            </RoughChip>
            <RoughChip
              seed={216}
              href='https://github.com/MayankBansal12?tab=repositories&q=&type=public&language=javascript&sort='
            >
              javascript
            </RoughChip>
            <RoughChip
              seed={217}
              href='https://github.com/MayankBansal12?tab=repositories&q=&type=public&language=css&sort='
            >
              design proj
            </RoughChip>
            <RoughChip
              seed={218}
              href='https://github.com/MayankBansal12?tab=repositories&q=&type=public&language=java&sort='
            >
              java
            </RoughChip>
          </div>
          <p className='text-sm opacity-70'>(note:- used java mostly at work)</p>
        </div>

        <p className='py-4 text-right text-xs opacity-50'>last update: 2026-08-05</p>
      </div>
    </div>
  );
};

export default Work;
