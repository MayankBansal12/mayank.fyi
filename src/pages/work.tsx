import Link from "next/link";

const Work: React.FC = () => {
  return (
    <div className="mt-20 flex flex-col gap-3 justify-center items-center">
      <div className="w-1/2">
        <h2 className="text-3xl font-semibold mb-4">work</h2>
        <div className="flex flex-col gap-4 text-xl opacity-80">
          {/* professional experience */}
          <h2 className="font-semibold mt-3">-&#58; professional experience</h2>
          <div className="flex flex-col gap-2 my-2">
            <div className="flex gap-4 justify-between">
              <h3 className="text-xl font-bold">echio - sde intern</h3>
              <p className="text-sm">jan&apos;24 - present</p>
            </div>
            <p className="opacity-80">
              worked on frontend in react.js for a product on a freelance basis
              was hired as an intern and handling backend for the app in java
              and springboot. occasionally working on website (next.js, express.js,
              typescript).
            </p>
          </div>

          {/* personal projects */}
          <h2 className="font-semibold mt-4">-&#58; personal & hackathon projects</h2>
          {/* feedback */}
          <div className="flex flex-col gap-2 my-2">
            <div className="flex gap-4 justify-between items-center">
              <h3 className="text-xl font-bold">feedback</h3>
              <p className="text-sm">july&apos;24 - present</p>
            </div>
            <p className="flex flex-col gap-2 opacity-80">
              <span>
                <Link href="https://github.com/MayankBansal12/Feedback" className="font-semibold text-lg hover:underline hover:opacity-90 transition-all">view on github</Link> | <Link href="https://feedback-easy.vercel.app/" className="font-semibold text-lg hover:underline hover:opacity-90 transition-all">live link</Link>
              </span>
              <span>
                -&gt; trying to build a developer tool for managing and collecting user feedbacks on apps and websites.
              </span>
              <span>
                -&gt; i worked on writing backend apis and third party apis to be used by developers and documentation for the usage.
              </span>
              <span>
                -&gt; now working on improving the dashboard and adding more features as i learn more.
              </span>
            </p>
          </div>

          {/* getogether */}
          <div className="flex flex-col gap-2 my-2">
            <div className="flex gap-4 justify-between items-center">
              <h3 className="text-xl font-bold">getogether</h3>
              <p className="text-sm">may&apos;24 - june&apos;24</p>
            </div>
            <p className="flex flex-col gap-2 opacity-80">
              <span>
                <Link href="https://github.com/MayankBansal12/Getogether" className="font-semibold text-lg hover:underline hover:opacity-90 transition-all">view on github</Link> | <Link href="https://getogether-ten.vercel.app" className="font-semibold text-lg hover:underline hover:opacity-90 transition-all">live link</Link>
              </span>
              <span>
                -&gt; a platform to help you manage your event in a better and organised way! built in a hackathon along with couple of my friends.
              </span>
              <span>
                -&gt; i worked on both frontend and backend (used React.js, Express.js, PostgreSQL, Prisma)
              </span>
            </p>
          </div>

          {/* pushnote */}
          <div className="flex flex-col gap-2 my-2">
            <div className="flex gap-4 justify-between items-center">
              <h3 className="text-xl font-bold">pushnote</h3>
              <p className="text-sm">oct&apos;23 - dec&apos;23</p>
            </div>
            <p className="flex flex-col gap-2 opacity-80">
              <span>
                <Link href="https://github.com/MayankBansal12/pushnote" className="font-semibold text-lg hover:underline hover:opacity-90 transition-all">view on github</Link> | <Link href="https://pushnote-mayankbansal12.vercel.app" className="font-semibold text-lg hover:underline hover:opacity-90 transition-all">live link</Link>
              </span>
              <span>
                -&gt; PushNote lets you manage your team effectively by making it easy for you to organize your projects and tasks.
              </span>
              <span>
                -&gt; i worked on writing backend in express.js and integrating apis in the frontend (react.js)
              </span>
              <span>
                -&gt; it was a 3 week hackthon and i participated with couple of my friends and won second prize in the hackathon.
              </span>
            </p>
          </div>

          {/* mb docs */}
          <div className="flex flex-col gap-2 my-2">
            <div className="flex gap-4 justify-between items-center">
              <h3 className="text-xl font-bold">mb docs</h3>
              <p className="text-sm">dec&apos;23</p>
            </div>
            <p className="flex flex-col gap-2 opacity-80">
              <span>
                <Link href="https://github.com/MayankBansal12/MB-Docs" className="font-semibold text-lg hover:underline hover:opacity-90 transition-all">view on github</Link> | <Link href="http://mb-docs.vercel.app/" className="font-semibold text-lg hover:underline hover:opacity-90 transition-all">live link</Link>
              </span>
              <span>
                -&gt; MB Docs is a collaborative document editing platform that allows
                users to edit, and collaborate on documents in real time.
              </span>
              <span>
                -&gt; Used React.js, socket.io, vanilla CSS and MongoDB, quill.js etc.
              </span>
            </p>
          </div>

          {/* examgpt */}
          <div className="flex flex-col gap-2 my-2">
            <div className="flex gap-4 justify-between">
              <h3 className="text-xl font-bold">examgpt</h3>
              <p className="text-sm">sept&apos;23</p>
            </div>
            <p className="flex flex-col gap-2 opacity-80">
              <span>
                <Link href="https://github.com/MayankBansal12/Exam-GPT" className="font-semibold text-lg hover:underline hover:opacity-90 transition-all">view on github</Link> | <Link href="https://examgpt.vercel.app/" className="font-semibold text-lg hover:underline hover:opacity-90 transition-all">live link</Link>
              </span>
              <span>
                -&gt; Conduct oral exams based on pdf provided. Uses OpenAI APIs for
                generating response.
              </span>
              <span>
                -&gt; Used React.js, Express.js, pdfjs-dist to extract text from pdf, react speech recogination library for speech-to-text and speechSynthesis for text-to-speech
              </span>
            </p>
          </div>

          {/* list of projects categorized by languages */}
          <h2 className="font-semibold mt-3">-&#58; view all works related to language on github</h2>
          <div className="flex flex-col gap-2 my-2">
            <div className="flex gap-4">
              <h3 className="text-xl font-semibold">typescript:</h3>
              <Link href="https://github.com/MayankBansal12?tab=repositories&q=&type=public&language=typescript&sort=" className="font-semibold text-lg hover:underline hover:opacity-90 transition-all">view on github</Link>
            </div>

            <div className="flex gap-4">
              <h3 className="text-xl font-semibold">javascript:</h3>
              <Link href="https://github.com/MayankBansal12?tab=repositories&q=&type=public&language=javascript&sort=" className="font-semibold text-lg hover:underline hover:opacity-90 transition-all">view on github</Link>
            </div>

            <div className="flex gap-4 items-center">
              <h3 className="text-xl font-semibold">java:</h3>
              <Link href="https://github.com/MayankBansal12?tab=repositories&q=&type=public&language=java&sort=" className="font-semibold text-lg hover:underline hover:opacity-90 transition-all">view on github</Link>
              <p className="text-sm opacity-80">(note:- used java mostly at work)</p>
            </div>

            <div className="flex gap-4">
              <h3 className="text-xl font-semibold">design projects:</h3>
              <Link href="https://github.com/MayankBansal12?tab=repositories&q=&type=public&language=css&sort=" className="font-semibold text-lg hover:underline hover:opacity-90 transition-all">view on github</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
