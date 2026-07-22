import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoIosArrowRoundBack } from 'react-icons/io';
import RoughChip from '@/components/rough/RoughChip';
import ThemeToggler from './ThemeToggler';

const Header: React.FC = () => {
  const router = useRouter();
  const isHomePage = router.pathname !== '/';

  return (
    <header className='container flex w-full items-center justify-between pb-4 md:pb-2'>
      {isHomePage ? (
        <Link href='/' title='back' className='inline-flex'>
          <RoughChip seed={3} className='text-sm'>
            <span className='inline-flex items-center gap-0.5'>
              <IoIosArrowRoundBack className='text-lg' /> back to home
            </span>
          </RoughChip>
        </Link>
      ) : (
        <div />
      )}
      <ThemeToggler />
    </header>
  );
};

export default Header;
