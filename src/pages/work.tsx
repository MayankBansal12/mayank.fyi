import { SquareArrowOutUpRight } from 'lucide-react';
import Link from 'next/link';

const Work: React.FC = () => {
  return (
    <div className='mt-20 my-10 flex flex-col gap-3 justify-center items-center'>
      <div className='w-[95%] md:w-2/3 lg:w-1/2'>
        <h2 className='text-3xl font-semibold mb-4'>work</h2>
        <div className='flex flex-col gap-4 text-xl opacity-90'>
          {/* professional experience */}
          <h2 className='text-2xl font-semibold mt-4'>-&#58; professional experience</h2>
          <div className='flex flex-col gap-2 my-2'>
            <div className='flex gap-2 justify-between flex-col md:flex-row'>
              <h3 className='text-xl font-bold'>
                echio{' '}
                <Link
                  href='https://echio.in'
                  className='font-semibold text-sm opacity-90 hover:underline hover:opacity-70 transition-all'
                >
                  (echio.in <SquareArrowOutUpRight size={10} className='inline' />)
                </Link>
              </h3>
              <p className='text-sm'>jan&apos;24 - present</p>
            </div>
            <p className='text-lg opacity-90'>
              -&gt; working as a backend developer and involved in the development of core product.{' '}
              <br />
              -&gt; writing rest apis for the app backend in java and springboot and website backend
              (bun.js).
              <br />
              -&gt; worked on setting up a azure function for media optimization using blob trigger
              (node.js, azure)
              <br />
              -&gt; managing deployments using docker and occassionally fixing bugs in web app
              frontend (next.js)
              <br />
            </p>
          </div>
          <p className='text-sm opacity-80 block sm:inline'>
            (note:- freelance works not included in professional experience.)
          </p>

          {/* personal projects */}
          <h2 className='text-2xl font-semibold mt-6'>-&#58; personal & hackathon projects</h2>
          {/* browserpop */}
          <div className='flex flex-col gap-2 my-2'>
            <div className='flex gap-2 flex-col md:flex-row justify-between items-start md:items-center'>
              <h3 className='text-xl font-bold'>browserpop</h3>
              <p className='text-sm'>dec&apos;24</p>
            </div>
            <p className='flex flex-col gap-2 text-lg opacity-90'>
              <span className='opacity-90 text-sm'>
                <Link
                  href='https://github.com/MayankBansal12/browser-pop-main'
                  className='font-semibold hover:underline hover:opacity-90 transition-all'
                >
                  view on github <SquareArrowOutUpRight size={10} className='inline' />
                </Link>{' '}
                |{' '}
                <Link
                  href='https://browserpop.vercel.app/'
                  className='font-semibold hover:underline hover:opacity-90 transition-all'
                >
                  live link <SquareArrowOutUpRight size={10} className='inline' />
                </Link>
              </span>
              <span>-&gt; an extension to manage your browser activities</span>
              <span>
                -&gt; used plain html, css, js, features include blocking websites, setting up focus
                hours, with site time tracking (to be implemented)
              </span>
            </p>
          </div>

          {/* feedback */}
          <div className='flex flex-col gap-2 my-2'>
            <div className='flex gap-2 flex-col md:flex-row justify-between items-start md:items-center'>
              <h3 className='text-xl font-bold'>feedback</h3>
              <p className='text-sm'>july&apos;24 - present</p>
            </div>
            <p className='flex flex-col gap-2 text-lg opacity-90'>
              <span className='opacity-90 text-sm'>
                <Link
                  href='https://github.com/MayankBansal12/Feedback'
                  className='font-semibold hover:underline hover:opacity-90 transition-all'
                >
                  view on github <SquareArrowOutUpRight size={10} className='inline' />
                </Link>{' '}
                |{' '}
                <Link
                  href='https://feedback-easy.vercel.app/'
                  className='font-semibold hover:underline hover:opacity-90 transition-all'
                >
                  live link <SquareArrowOutUpRight size={10} className='inline' />
                </Link>
              </span>
              <span>
                -&gt; trying to build a developer tool for managing and collecting user feedbacks on
                apps and websites.
              </span>
              <span>
                -&gt; i worked on writing backend apis and third party apis to be used by developers
                and documentation for the usage.
              </span>
              <span>
                -&gt; now working on improving the dashboard and adding more features as i learn
                more.
              </span>
            </p>
          </div>

          {/* getogether */}
          <div className='flex flex-col gap-2 my-2'>
            <div className='flex gap-2 flex-col md:flex-row justify-between items-start md:items-center'>
              <h3 className='text-xl font-bold'>getogether</h3>
              <p className='text-sm'>may&apos;24 - june&apos;24</p>
            </div>
            <p className='flex flex-col gap-2 text-lg opacity-90'>
              <span className='opacity-90 text-sm'>
                <Link
                  href='https://github.com/MayankBansal12/Getogether'
                  className='font-semibold hover:underline hover:opacity-90 transition-all'
                >
                  view on github <SquareArrowOutUpRight size={10} className='inline' />
                </Link>{' '}
                |{' '}
                <Link
                  href='https://getogether-ten.vercel.app'
                  className='font-semibold hover:underline hover:opacity-90 transition-all'
                >
                  live link <SquareArrowOutUpRight size={10} className='inline' />
                </Link>
              </span>
              <span>
                -&gt; a platform to help you manage your event in a better and organised way! built
                in a hackathon along with couple of my friends.
              </span>
              <span>
                -&gt; i worked on both frontend and backend (used React.js, Express.js, PostgreSQL,
                Prisma)
              </span>
            </p>
          </div>

          {/* pushnote */}
          <div className='flex flex-col gap-2 my-2'>
            <div className='flex gap-2 flex-col md:flex-row justify-between items-start md:items-center'>
              <h3 className='text-xl font-bold'>pushnote</h3>
              <p className='text-sm'>oct&apos;23 - nov&apos;23</p>
            </div>
            <p className='flex flex-col gap-2 text-lg opacity-90'>
              <span className='opacity-90 text-sm'>
                <Link
                  href='https://github.com/MayankBansal12/pushnote'
                  className='font-semibold hover:underline hover:opacity-90 transition-all'
                >
                  view on github <SquareArrowOutUpRight size={10} className='inline' />
                </Link>{' '}
                |{' '}
                <Link
                  href='https://pushnote-mayankbansal12.vercel.app'
                  className='font-semibold hover:underline hover:opacity-90 transition-all'
                >
                  live link <SquareArrowOutUpRight size={10} className='inline' />
                </Link>
              </span>
              <span>
                -&gt; PushNote lets you manage your team effectively by making it easy for you to
                organize your projects and tasks.
              </span>
              <span>
                -&gt; i worked on writing backend in express.js and integrating apis in the frontend
                (react.js)
              </span>
              <span>
                -&gt; it was a 3 week hackthon and i participated with couple of my friends and won
                second prize in the hackathon.
              </span>
            </p>
          </div>

          {/* mb docs */}
          <div className='flex flex-col gap-2 my-2'>
            <div className='flex gap-2 flex-col md:flex-row justify-between items-start md:items-center'>
              <h3 className='text-xl font-bold'>mb docs</h3>
              <p className='text-sm'>dec&apos;23</p>
            </div>
            <p className='flex flex-col gap-2 text-lg opacity-90'>
              <span className='opacity-90 text-sm'>
                <Link
                  href='https://github.com/MayankBansal12/MB-Docs'
                  className='font-semibold hover:underline hover:opacity-90 transition-all'
                >
                  view on github <SquareArrowOutUpRight size={10} className='inline' />
                </Link>{' '}
                |{' '}
                <Link
                  href='http://mb-docs.vercel.app/'
                  className='font-semibold hover:underline hover:opacity-90 transition-all'
                >
                  live link <SquareArrowOutUpRight size={10} className='inline' />
                </Link>
              </span>
              <span>
                -&gt; MB Docs is a collaborative document editing platform that allows users to
                edit, and collaborate on documents in real time.
              </span>
              <span>-&gt; Used React.js, socket.io, vanilla CSS and MongoDB, quill.js etc.</span>
            </p>
          </div>

          {/* examgpt */}
          <div className='flex flex-col gap-2 my-2'>
            <div className='flex gap-2 flex-col md:flex-row justify-between items-start md:items-center'>
              <h3 className='text-xl font-bold'>examgpt</h3>
              <p className='text-sm'>sept&apos;23</p>
            </div>
            <p className='flex flex-col gap-2 text-lg opacity-90'>
              <span className='opacity-90 text-sm'>
                <Link
                  href='https://github.com/MayankBansal12/Exam-GPT'
                  className='font-semibold hover:underline hover:opacity-90 transition-all'
                >
                  view on github <SquareArrowOutUpRight size={10} className='inline' />
                </Link>{' '}
                |{' '}
                <Link
                  href='https://examgpt.vercel.app/'
                  className='font-semibold hover:underline hover:opacity-90 transition-all'
                >
                  live link <SquareArrowOutUpRight size={10} className='inline' />
                </Link>
              </span>
              <span>
                -&gt; Conduct oral exams based on pdf provided. Uses OpenAI APIs for generating
                response.
              </span>
              <span>
                -&gt; Used React.js, Express.js, pdfjs-dist to extract text from pdf, react speech
                recogination library for speech-to-text and speechSynthesis for text-to-speech
              </span>
            </p>
          </div>

          {/* list of projects categorized by languages */}
          <h2 className='font-semibold mt-3 text-2xl'>
            -&#58; view all works related to language on github
          </h2>
          <div className='flex flex-col gap-2 my-2'>
            <div className='flex gap-4'>
              <h3 className='text-lg font-semibold'>typescript:</h3>
              <Link
                href='https://github.com/MayankBansal12?tab=repositories&q=&type=public&language=typescript&sort='
                className='text-lg hover:underline hover:opacity-90 transition-all'
              >
                view on github <SquareArrowOutUpRight size={10} className='inline' />
              </Link>
            </div>

            <div className='flex gap-4'>
              <h3 className='text-lg font-semibold'>javascript:</h3>
              <Link
                href='https://github.com/MayankBansal12?tab=repositories&q=&type=public&language=javascript&sort='
                className='text-lg hover:underline hover:opacity-90 transition-all'
              >
                view on github <SquareArrowOutUpRight size={10} className='inline' />
              </Link>
            </div>

            <div className='flex gap-4'>
              <h3 className='text-lg font-semibold'>design proj:</h3>
              <Link
                href='https://github.com/MayankBansal12?tab=repositories&q=&type=public&language=css&sort='
                className='text-lg hover:underline hover:opacity-90 transition-all'
              >
                view on github <SquareArrowOutUpRight size={10} className='inline' />
              </Link>
            </div>

            <div className='flex gap-4 items-center'>
              <h3 className='text-lg font-semibold'>java:</h3>
              <Link
                href='https://github.com/MayankBansal12?tab=repositories&q=&type=public&language=java&sort='
                className='text-lg hover:underline hover:opacity-90 transition-all'
              >
                view on github <SquareArrowOutUpRight size={10} className='inline' />
              </Link>
            </div>
            <p className='text-sm opacity-80 block sm:inline'>(note:- used java mostly at work)</p>
          </div>
        </div>
        <p className='text-xs opacity-50 py-2 text-right'>last update: 2024-12-30</p>
      </div>
    </div>
  );
};

export default Work;
