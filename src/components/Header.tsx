import { useRouter } from 'next/router';
import { IoIosArrowRoundBack } from 'react-icons/io';
import RoughLink from '@/components/rough/RoughLink';
import AppearanceControls from './AppearanceControls';
import ThemeToggler from './ThemeToggler';

const Header: React.FC = () => {
  const router = useRouter();
  const showBackLink = router.pathname !== '/';

  if (!showBackLink) {
    return (
      <header className='portfolio-controls sticky top-0 z-40 flex w-full justify-end'>
        <div className='flex items-center gap-1'>
          <AppearanceControls />
          <ThemeToggler />
        </div>
      </header>
    );
  }

  return (
    <header className='container flex w-full items-center justify-between pb-4 md:pb-2'>
      <RoughLink href='/' seed={3} showIcon={false} className='text-sm'>
        <span className='inline-flex items-center gap-0.5'>
          <IoIosArrowRoundBack className='text-lg' /> back to home
        </span>
      </RoughLink>
      <div className='flex items-center gap-2'>
        <AppearanceControls />
        <ThemeToggler />
      </div>
    </header>
  );
};

export default Header;
