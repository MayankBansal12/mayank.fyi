import Link from 'next/link';
import { useState } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

export default function Home() {
  const [isTextVisible, setIsTextVisible] = useState(false);

  const handleToggleText = () => {
    setIsTextVisible(!isTextVisible);
  };

  return (
    // <div className='flex flex-col relative mt-20 md:mt-28'>
    //   <div className='flex justify-between w-full'>
    //     <section>
    //       <h1>
    //         hey, i am mayank.
    //       </h1>

    //       {/* <div className='flex gap-4'>
    //         <Link
    //           target='_blank'
    //           href=''
    //           rel='noreferrer noopener'
    //         >
    //           <FaLinkedin className='text-3xl mt-8 text-dark-heading dark:text-white hover:scale-110 transition-transform' />
    //         </Link>
    //         <Link
    //           target='_blank'
    //           href=''
    //           rel='noreferrer noopener'
    //         >
    //           <FaGithub className='text-3xl mt-8 text-dark-heading dark:text-white hover:scale-110 transition-transform' />
    //         </Link>
    //       </div> */}
    //     </section>
    //   </div>

    //   <section className='mt-20 md:mt-28 mb-56'>
    //     <p className='md:mt-4 text-md lg:text-xl leading-7'>
    //       i am a software developer from india with working experience of around a year. <br />
    //       i have been learning, practicising, working on web development and related projects since 2022 <br />
    //       and have previously worked on developing frontend and managing backend for startups both on freelance and full-time basis. <br />
    //       see more of my work here and feel free to reach out to me here
    //     </p>
    //   </section>
    // </div>

    <div className="flex flex-col gap-4 w-full h-[83vh] justify-center items-center">
      <div className="flex flex-col text-center gap-2">
        <h1 className="text-4xl font-medium">hey. i am mayank.</h1>
        <p className="text-lg opacity-80 flex items-center">your friendly neighborhood developer <span>
          <span onClick={handleToggleText} className="cursor-pointer transition-all">
            {isTextVisible ? (
              <RiArrowDropUpLine className="!text-3xl hover:opacity-80 transition-all" />
            ) : (
              <RiArrowDropDownLine className="!text-3xl hover:opacity-80 transition-all" />
            )}
          </span>
        </span> </p>
      </div>
      {isTextVisible && (
        <p className="text-lg opacity-80 w-2/3 text-center transition-all">
          i am a software developer from india with working experience of around a year. <br />
          i have been learning, practicising, working on web development and related projects since 2022
          and have previously worked on developing frontend and managing backend for startups both on freelance and full-time basis.
        </p>
      )}
      <div className="flex gap-2 items-center">
        <div className="h-2 w-2 bg-green-600 rounded-full">
          <div className="h-1.5 w-1.5 bg-green-400 blur-sm rounded-full"></div>
        </div>
        <Link href="/hire" className="text-sm hover:underline hover:opacity-80 transition-all"><small>available for hire</small></Link>
      </div>
    </div >
  );
}
