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
      <header className='portfolio-header sticky top-0 z-40 w-full max-w-[760px]'>
        <div className='flex items-center justify-between gap-3'>
          <a href='#top' className='portfolio-wordmark' aria-label='mayank bansal, back to top'>
            mb.
          </a>
          <nav className='portfolio-nav hidden items-center gap-1 md:flex' aria-label='portfolio'>
            <a href='#about'>about</a>
            <a href='#experience'>experience</a>
            <a href='#projects'>projects</a>
            <a href='#blogs'>blogs</a>
            <a href='#skills'>skills</a>
          </nav>
          <div className='flex items-center gap-1'>
            <AppearanceControls />
            <ThemeToggler />
          </div>
        </div>
        <nav
          className='portfolio-nav portfolio-nav-mobile mt-2 flex overflow-x-auto md:hidden'
          aria-label='portfolio'
        >
          <a href='#about'>about</a>
          <a href='#experience'>experience</a>
          <a href='#projects'>projects</a>
          <a href='#blogs'>blogs</a>
          <a href='#skills'>skills</a>
        </nav>
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
