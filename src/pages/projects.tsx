import ProjectCard from '@/components/ProjectCard';

const Projects: React.FC = () => {
  return (
    <div className='mt-10 md:mt-20'>
      <h1 className='text-2xl text-dark-heading dark:text-light-heading md:text-4xl xl:text-5xl xl:leading-tight font-bold'>
        projects
      </h1>
      <p className='md:mt-4 py-6 text-lg leading-6 md:leading-7'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium aut nobis magnam? Tenetur, perspiciatis rem suscipit consectetur quo animi eos!
      </p>
      <section className='grid grid-cols-1 md:grid-cols-2 gap-x-10 mt-2'>
        <ProjectCard
          title='This'
          description='my portfolio'
          externalLink='/'
          githubLink='https://github.com/MayankBansal12/Portfolio'
          tech='Typescript'
          techColor='#3178c6'
        />
      </section>
    </div>
  );
};

export default Projects;
