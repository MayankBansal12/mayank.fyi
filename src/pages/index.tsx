import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Home() {
  return (
    <div className='flex flex-col relative mt-20 md:mt-28'>
      <div className='flex justify-between w-full'>
        <section>
          <h1>
            hey, i am mayank.
          </h1>

          <div className='flex gap-4'>
            <Link
              target='_blank'
              href=''
              rel='noreferrer noopener'
            >
              <FaLinkedin className='text-3xl mt-8 text-dark-heading dark:text-white hover:scale-110 transition-transform' />
            </Link>
            <Link
              target='_blank'
              href=''
              rel='noreferrer noopener'
            >
              <FaGithub className='text-3xl mt-8 text-dark-heading dark:text-white hover:scale-110 transition-transform' />
            </Link>
          </div>
        </section>
      </div>

      <section className='mt-20 md:mt-28 mb-56'>
        <p className='md:mt-4 text-md lg:text-xl leading-7'>
          i am a software developer from india with working experience of around a year. <br />
          i have been learning, practicising, working on web development and related projects since 2022 <br />
          and have previously worked on developing frontend and managing backend for startups both on freelance and full-time basis. <br />
          see more of my work here and feel free to reach out to me here
        </p>
      </section>
    </div>
  );
}
