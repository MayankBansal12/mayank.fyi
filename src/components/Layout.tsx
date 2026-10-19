import { useRouter } from 'next/router';
import { type CSSProperties, type ReactNode, useEffect } from 'react';
import { backgrounds, fonts, useAppearance } from '@/components/AppearanceProvider';
import Header from '@/components/Header';
import InteractionSounds from '@/components/InteractionSounds';
import Preloader from '@/components/Preloader';
import Metadata from './Metadata';

interface ILayout {
  children: ReactNode;
}

const Layout: React.FC<ILayout> = ({ children }) => {
  const router = useRouter();
  const { background, font } = useAppearance();
  const isHome = router.pathname === '/';
  const backgroundOption = backgrounds.find((option) => option.id === background) ?? backgrounds[0];
  const fontOption = fonts.find((option) => option.id === font) ?? fonts[0];
  const appearanceStyle = {
    '--board-background-light': backgroundOption.light,
    '--board-background-dark': backgroundOption.dark,
    '--active-font': fontOption.family,
  } as CSSProperties;

  // Mirror the board colours onto <html> so any area outside <main> (overscroll,
  // horizontal overflow) paints the selected background instead of the default paper.
  useEffect(() => {
    const root = document.documentElement.style;
    root.setProperty('--board-background-light', backgroundOption.light);
    root.setProperty('--board-background-dark', backgroundOption.dark);
  }, [backgroundOption]);

  return (
    <>
      <Metadata />
      <Preloader />
      <InteractionSounds />
      <main
        className={`board-surface flex w-full flex-col items-center lowercase ${
          isHome ? 'min-h-dvh px-3 py-3 sm:px-5 sm:py-4' : 'h-dvh px-4 py-6 lg:py-8'
        }`}
        style={appearanceStyle}
      >
        <Header />
        <section
          id='container'
          className={isHome ? 'w-full flex-1' : 'container min-h-0 flex-1 overflow-y-auto'}
        >
          {children}
        </section>
      </main>
    </>
  );
};

export default Layout;
