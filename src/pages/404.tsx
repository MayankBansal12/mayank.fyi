import RoughArrow from '@/components/rough/RoughArrow';
import RoughBox from '@/components/rough/RoughBox';
import RoughChip from '@/components/rough/RoughChip';
import { ROUGH_PADDING } from '@/lib/rough/geometry';

const NotFound: React.FC = () => {
  return (
    <div className='flex h-full w-full flex-col items-center justify-center gap-5'>
      <RoughBox
        seed={801}
        dashed
        className='w-full max-w-md'
        contentClassName='flex flex-col items-center gap-2 text-center'
        paddingClassName={ROUGH_PADDING.spacious}
      >
        <h1 className='text-4xl font-medium'>404 not found</h1>
        <p className='text-lg opacity-80'>wrong url, let me help you</p>
      </RoughBox>

      <RoughArrow seed={802} direction='down' height={28} />

      <div className='flex flex-wrap items-center justify-center gap-3'>
        <RoughChip href='/' seed={803}>
          home
        </RoughChip>
        <RoughChip href='/about' seed={804}>
          about
        </RoughChip>
        <RoughChip href='/work' seed={805}>
          works
        </RoughChip>
        <RoughChip href='/contact' seed={806}>
          contact
        </RoughChip>
        <RoughChip href='/inspiration' seed={807}>
          inspiration
        </RoughChip>
      </div>
    </div>
  );
};

export default NotFound;
