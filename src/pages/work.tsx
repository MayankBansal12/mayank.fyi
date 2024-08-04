import Link from 'next/link';

const Work: React.FC = () => {
  return (
    <div className="my-20 flex flex-col gap-3 justify-center items-center">
      <div className="w-1/2">
        <h2 className="text-3xl font-semibold mb-4">work</h2>
        <div className="flex flex-col gap-6 text-xl opacity-80">
          <p></p>
        </div>
      </div>
      {/* <ProjectCard
        title='This'
        description='my portfolio'
        externalLink='/'
        githubLink='https://github.com/MayankBansal12/Portfolio'
        tech='Typescript'
        techColor='#3178c6'
      /> */}
    </div>
  );
};

export default Work;
