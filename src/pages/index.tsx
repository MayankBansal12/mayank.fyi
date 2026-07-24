import Link from 'next/link';
import RoughChip from '@/components/rough/RoughChip';
import RoughCurvedArrow from '@/components/rough/RoughCurvedArrow';

export default function Home() {
  return (
    <div className='flex h-full w-full flex-col items-center justify-between'>
      <div className='flex w-full flex-1 flex-col items-center justify-center'>
        <div className='relative px-4 text-center'>
          <h1 className='text-4xl font-medium md:text-5xl'>
            hey.{' '}
            <span className='relative inline-block'>
              <Link
                href='/hire'
                className='absolute right-12 bottom-[calc(100%+3rem)] flex flex-col items-end transition-opacity hover:opacity-80 md:right-[6.25rem]'
              >
                <span className='whitespace-nowrap text-[0.78rem] opacity-55 md:text-[0.85rem]'>
                  available for hire
                </span>
                <RoughCurvedArrow seed={102} width={42} height={28} className='-mt-0.5 mr-2' />
              </Link>
              i&apos;m
            </span>{' '}
            mayank.
          </h1>
        </div>
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
