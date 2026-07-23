import type { ReactNode } from 'react';
import Header from '@/components/Header';
import Preloader from '@/components/Preloader';
import Metadata from './Metadata';

interface ILayout {
  children: ReactNode;
}

const Layout: React.FC<ILayout> = ({ children }) => {
  return (
    <>
      <Metadata />
      <Preloader />
      <main className='board-surface flex min-h-screen w-full flex-col items-center px-4 py-6 font-primary lowercase lg:py-8'>
        <Header />
        <section id='container' className='container h-[calc(100vh-5.5rem)] overflow-y-scroll'>
          {children}
        </section>
      </main>
    </>
  );
};

export default Layout;
