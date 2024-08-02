import Link from 'next/link';
import { useState } from 'react';
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

export default function Home() {
  const [isTextVisible, setIsTextVisible] = useState(false);

  const handleToggleText = () => {
    setIsTextVisible(!isTextVisible);
  };

  return (
    <div className="w-full h-[83vh] flex flex-col items-center justify-between">
      <div className="flex flex-col h-full w-full gap-4 justify-center items-center">
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

        <div className={`text-lg opacity-80 w-2/3 text-center transition-all duration-500 ${isTextVisible ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden`}>
          i am a software developer from india with working experience of around a year. <br />
          i have been learning, practicising, working on web development and related projects since 2022
          and have previously worked on developing frontend and managing backend for startups both on freelance and full-time basis.
        </div>

        <div className="flex gap-2 items-center">
          <div className="h-2 w-2 bg-green-600 rounded-full">
            <div className="h-1.5 w-1.5 bg-green-400 blur-sm rounded-full"></div>
          </div>
          <Link href="/hire" className="text-sm hover:underline hover:opacity-80 transition-all"><small>available for hire</small></Link>
        </div>
      </div>
      <div className="flex gap-4">
        <Link href="/about" className="text-sm hover:underline hover:opacity-80 transition-all">about</Link>
        <Link href="/work" className="text-sm hover:underline hover:opacity-80 transition-all">works</Link>
        <Link href="/contact" className="text-sm hover:underline hover:opacity-80 transition-all">contact</Link>
      </div>
    </div >
  );
}
