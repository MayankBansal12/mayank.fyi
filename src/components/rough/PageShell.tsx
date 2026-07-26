import type { ReactNode } from 'react';
import { ROUGH_PADDING } from '@/lib/rough/geometry';
import RoughBox from './RoughBox';

type PageShellProps = {
  title: string;
  children: ReactNode;
  seed?: number;
  /** wrap body in a rough frame (default true for short pages) */
  framed?: boolean;
};

const PageShell: React.FC<PageShellProps> = ({ title, children, seed = 71, framed = false }) => {
  return (
    <div className='mt-12 mb-10 flex flex-col items-center justify-center gap-3 md:mt-16'>
      <div className='w-[95%] md:w-2/3 lg:w-1/2'>
        <h2 className='mb-4 text-3xl font-semibold'>{title}</h2>
        {framed ? (
          <RoughBox seed={seed} paddingClassName={ROUGH_PADDING.box}>
            <div className='flex flex-col gap-6 text-xl opacity-90'>{children}</div>
          </RoughBox>
        ) : (
          <div className='flex flex-col gap-6 text-xl opacity-90'>{children}</div>
        )}
      </div>
    </div>
  );
};

export default PageShell;
