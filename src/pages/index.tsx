import Link from 'next/link';
import { useState } from 'react';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import RoughArrow from '@/components/rough/RoughArrow';
import RoughBox from '@/components/rough/RoughBox';
import RoughChip from '@/components/rough/RoughChip';
import RoughSticky from '@/components/rough/RoughSticky';
import { ROUGH_PADDING } from '@/lib/rough/geometry';

export default function Home() {
  const [isTextVisible, setIsTextVisible] = useState(false);

  return (
    <div className='flex h-full w-full flex-col items-center justify-between'>
      <div className='flex h-full w-full flex-col items-center justify-center gap-5'>
        <RoughBox
          seed={101}
          className='w-full max-w-xl'
          contentClassName='flex flex-col items-center gap-2 text-center'
          paddingClassName={ROUGH_PADDING.hero}
        >
          <h1 className='text-4xl font-medium'>hey. i am mayank.</h1>
          <p className='flex items-center text-lg opacity-80'>
            <span>your friendly neighbourhood developer</span>
            <button
              type='button'
              onClick={() => setIsTextVisible((v) => !v)}
              className='cursor-pointer transition-all'
              aria-expanded={isTextVisible}
              aria-label={isTextVisible ? 'hide bio' : 'show bio'}
            >
              {isTextVisible ? (
                <RiArrowDropUpLine className='!text-3xl transition-all hover:opacity-80' />
              ) : (
                <RiArrowDropDownLine className='!text-3xl transition-all hover:opacity-80' />
              )}
            </button>
          </p>
        </RoughBox>

        {isTextVisible ? (
          <>
            <RoughArrow seed={102} direction='down' height={32} />
            <RoughBox
              seed={103}
              dashed
              className='w-full max-w-xl'
              contentClassName='text-center text-base opacity-80 md:text-lg'
              paddingClassName={ROUGH_PADDING.wide}
            >
              <p>
                -&gt; i am a software developer from india with working experience of around a year.
              </p>
              <p>
                -&gt; learning, practicising, working on web development and related projects since
                2022.
              </p>
              <p>
                -&gt; have previously worked on developing frontend and managing backend for
                startups both on freelance and full-time basis.
              </p>
            </RoughBox>
          </>
        ) : null}

        <Link href='/hire' className='mt-1 inline-flex'>
          <RoughSticky seed={104} color='green' rotate={-1.5} className='max-w-xs'>
            <span className='flex items-center gap-2 text-sm'>
              <span className='relative flex h-2.5 w-2.5'>
                <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60' />
                <span className='relative inline-flex h-2.5 w-2.5 rounded-full bg-green-600' />
              </span>
              available for hire
            </span>
          </RoughSticky>
        </Link>
      </div>

      <div className='flex flex-wrap items-center justify-center gap-3 pt-4 md:pt-0'>
        <RoughChip href='/about' seed={105}>
          about
        </RoughChip>
        <RoughChip href='/work' seed={106}>
          works
        </RoughChip>
        <RoughChip href='/contact' seed={107}>
          contact
        </RoughChip>
      </div>
    </div>
  );
}
