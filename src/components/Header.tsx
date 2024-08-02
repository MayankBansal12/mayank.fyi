import Link from 'next/link';
import ThemeToggler from './ThemeToggler';
import { IoIosArrowRoundBack } from "react-icons/io";
import { useRouter } from 'next/router';

const Header: React.FC = () => {
  const router = useRouter();
  const isHomePage = router.pathname !== "/";

  return (
    <header className='container w-full flex justify-between items-center'>
      {isHomePage ? <Link title="back" href="/" className="flex items-center text-sm hover:underline hover:opacity-80 transition-all"><IoIosArrowRoundBack /> back</Link> : <div></div>}
      <ThemeToggler />
    </header>
  );
};

export default Header;
