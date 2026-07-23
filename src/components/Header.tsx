import { useRouter } from 'next/router';
import { IoIosArrowRoundBack } from 'react-icons/io';
import RoughLink from '@/components/rough/RoughLink';
import ThemeToggler from './ThemeToggler';

const Header: React.FC = () => {
  const router = useRouter();
  const showBackLink = router.pathname !== '/';

  return (
    <header className='container flex w-full items-center justify-between pb-4 md:pb-2'>
      {showBackLink ? (
        <RoughLink href='/' seed={3} showIcon={false} className='text-sm'>
          <span className='inline-flex items-center gap-0.5'>
            <IoIosArrowRoundBack className='text-lg' /> back to home
          </span>
        </RoughLink>
      ) : (
        <div />
      )}
      <ThemeToggler />
    </header>
  );
};

export default Header;
