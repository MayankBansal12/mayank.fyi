import type { CSSProperties, ReactNode } from 'react';
import { backgrounds, fonts, useAppearance } from '@/components/AppearanceProvider';
import Header from '@/components/Header';
import Preloader from '@/components/Preloader';
import Metadata from './Metadata';

interface ILayout {
  children: ReactNode;
}

const Layout: React.FC<ILayout> = ({ children }) => {
  const { background, font } = useAppearance();
  const backgroundOption = backgrounds.find((option) => option.id === background) ?? backgrounds[0];
  const fontOption = fonts.find((option) => option.id === font) ?? fonts[0];
  const appearanceStyle = {
    '--board-background-light': backgroundOption.light,
    '--board-background-dark': backgroundOption.dark,
    '--active-font': fontOption.family,
  } as CSSProperties;

  return (
    <>
      <Metadata />
      <Preloader />
      <main
        className='board-surface flex h-dvh w-full flex-col items-center px-4 py-6 lowercase lg:py-8'
        style={appearanceStyle}
      >
        <Header />
        <section id='container' className='container min-h-0 flex-1 overflow-y-auto'>
          {children}
        </section>
      </main>
    </>
  );
};

export default Layout;
