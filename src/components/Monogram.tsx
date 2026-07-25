import RoughBox from '@/components/rough/RoughBox';

export default function Monogram() {
  return (
    <RoughBox
      seed={101}
      className='portfolio-monogram shrink-0'
      contentClassName='flex h-full items-center justify-center'
      paddingClassName='p-0'
      fill='solid'
      fillColor='var(--portfolio-surface)'
      strokeWidth={1.8}
    >
      <span className='-rotate-3 text-2xl font-bold tracking-tight' aria-hidden>
        mb
      </span>
      <span className='sr-only'>mayank bansal</span>
    </RoughBox>
  );
}
