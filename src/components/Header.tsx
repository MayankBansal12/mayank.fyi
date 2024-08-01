import Link from 'next/link';
import Dropdown from './UI/Dropdown';
import ThemeToggler from './UI/ThemeToggler';
import { NavLink } from '../../types/header';

const LINKS: Array<NavLink> = [
  { title: 'Home', to: '/' },
  { title: 'Projects', to: '/projects' },
  { title: 'About', to: '/about' },
  { title: 'Contact', to: '/contact' },
];

const Header: React.FC = () => {
  return (
    <header className='container w-full flex justify-end'>
      <ThemeToggler className='block' />
    </header>
  );
};

export default Header;
