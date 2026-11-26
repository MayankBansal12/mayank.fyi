import { useRouter } from 'next/router';
import { ArrowLeft, SketchIcon } from 'sketchicon';
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
    <header className='portfolio-controls sticky top-0 z-40 flex w-full items-center justify-between'>
      <RoughLink href='/' seed={3} showIcon={false} className='text-sm'>
        <span className='inline-flex items-center gap-1'>
          <SketchIcon icon={ArrowLeft} size={15} roughness={1.8} aria-hidden /> back to home
        </span>
      </RoughLink>
      <div className='flex items-center gap-1'>
        <AppearanceControls />
        <ThemeToggler />
      </div>
    </header>
  );
};

export default Header;
