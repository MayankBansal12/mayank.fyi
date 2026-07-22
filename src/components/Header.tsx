import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoIosArrowRoundBack } from 'react-icons/io';
import ThemeToggler from './ThemeToggler';

const Header: React.FC = () => {
  const router = useRouter();
  const isHomePage = router.pathname !== '/';

  return (
    <header className='container w-full flex justify-between items-center pb-4 md:pb-0'>
      {isHomePage ? (
        <Link
          title='back'
          href='/'
          className='flex items-center text-sm hover:underline hover:opacity-80 transition-all'
        >
          <IoIosArrowRoundBack /> back to home
        </Link>
      ) : (
        <div></div>
      )}
      <ThemeToggler />
    </header>
  );
};

export default Header;
