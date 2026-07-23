import ProjectCard from '@/components/rough/ProjectCard';
import RoughBox from '@/components/rough/RoughBox';
import RoughChip from '@/components/rough/RoughChip';
import RoughDivider from '@/components/rough/RoughDivider';
import RoughLink from '@/components/rough/RoughLink';

const projects = [
  {
    title: 'browserpop',
    date: "dec'24",
    githubLink: 'https://github.com/MayankBansal12/browser-pop-main',
    liveLink: 'https://browserpop.vercel.app/',
    description: [
      'an extension to manage your browser activities',
      'used plain html, css, js, features include blocking websites, setting up focus hours, with site time tracking (to be implemented)',
    ],
    seed: 201,
  },
  {
    title: 'feedback',
    date: "july'24 - present",
    githubLink: 'https://github.com/MayankBansal12/Feedback',
    liveLink: 'https://feedback-easy.vercel.app/',
    description: [
      'trying to build a developer tool for managing and collecting user feedbacks on apps and websites.',
      'i worked on writing backend apis and third party apis to be used by developers and documentation for the usage.',
      'now working on improving the dashboard and adding more features as i learn more.',
    ],
    seed: 202,
  },
  {
    title: 'getogether',
    date: "may'24 - june'24",
    githubLink: 'https://github.com/MayankBansal12/Getogether',
    liveLink: 'https://getogether-ten.vercel.app',
    description: [
      'a platform to help you manage your event in a better and organised way! built in a hackathon along with couple of my friends.',
      'i worked on both frontend and backend (used React.js, Express.js, PostgreSQL, Prisma)',
    ],
    seed: 203,
  },
  {
    title: 'pushnote',
    date: "oct'23 - nov'23",
    githubLink: 'https://github.com/MayankBansal12/pushnote',
    liveLink: 'https://pushnote-mayankbansal12.vercel.app',
    description: [
      'PushNote lets you manage your team effectively by making it easy for you to organize your projects and tasks.',
      'i worked on writing backend in express.js and integrating apis in the frontend (react.js)',
      'it was a 3 week hackthon and i participated with couple of my friends and won second prize in the hackathon.',
    ],
    seed: 204,
  },
  {
    title: 'mb docs',
    date: "dec'23",
    githubLink: 'https://github.com/MayankBansal12/MB-Docs',
    liveLink: 'http://mb-docs.vercel.app/',
    description: [
      'MB Docs is a collaborative document editing platform that allows users to edit, and collaborate on documents in real time.',
      'Used React.js, socket.io, vanilla CSS and MongoDB, quill.js etc.',
    ],
    seed: 205,
  },
  {
    title: 'examgpt',
    date: "sept'23",
    githubLink: 'https://github.com/MayankBansal12/Exam-GPT',
    liveLink: 'https://examgpt.vercel.app/',
    description: [
      'Conduct oral exams based on pdf provided. Uses OpenAI APIs for generating response.',
      'Used React.js, Express.js, pdfjs-dist to extract text from pdf, react speech recogination library for speech-to-text and speechSynthesis for text-to-speech',
    ],
    seed: 206,
  },
];

const Work: React.FC = () => {
  return (
    <div className='mt-12 mb-10 flex flex-col items-center justify-center gap-3 md:mt-16'>
      <div className='w-[95%] md:w-2/3 lg:w-3/5 xl:w-1/2'>
        <h2 className='mb-6 text-3xl font-semibold'>work</h2>

        <div className='flex flex-col gap-6 text-xl opacity-90'>
          <RoughDivider seed={210} label='professional experience' />

          <RoughBox seed={211}>
            <div className='flex flex-col gap-2'>
              <div className='flex flex-col justify-between gap-2 md:flex-row md:items-center'>
                <h3 className='text-xl font-bold'>
                  echio{' '}
                  <RoughLink href='https://echio.in' seed={212} className='text-sm font-semibold'>
                    echio.in
                  </RoughLink>
                </h3>
                <p className='text-sm opacity-70'>jan&apos;24 - present</p>
              </div>
              <p className='text-base opacity-90 md:text-lg'>
                -&gt; working as a backend developer and involved in the development of core
                product.
                <br />
                -&gt; writing rest apis for the app backend in java and springboot and website
                backend (bun.js).
                <br />
                -&gt; worked on setting up a azure function for media optimization using blob
                trigger (node.js, azure)
                <br />
                -&gt; managing deployments using docker and occassionally fixing bugs in web app
                frontend (next.js)
              </p>
            </div>
          </RoughBox>

          <p className='block text-sm opacity-70 sm:inline'>
            (note:- freelance works not included in professional experience.)
          </p>

          <RoughDivider seed={213} label='personal & hackathon projects' className='mt-2' />

          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            {projects.map((project) => (
              <ProjectCard key={project.title} {...project} />
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

        <p className='py-4 text-right text-xs opacity-50'>last update: 2024-12-30</p>
      </div>
    </div>
  );
};

export default Work;
