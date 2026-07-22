import { useTheme } from 'next-themes';
import { type HtmlHTMLAttributes, useEffect, useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';
import RoughChip from '@/components/rough/RoughChip';

type IThemeToggler = HtmlHTMLAttributes<HTMLButtonElement>;

const ThemeToggler: React.FC<IThemeToggler> = ({ className = '', ...rest }) => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const nextTheme = resolvedTheme === 'light' ? 'dark' : 'light';

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className='h-8 w-8' aria-hidden />;
  }

  return (
    <button
      className={`cursor-pointer ${className}`}
      title={`Toggle ${nextTheme} theme`}
      type='button'
      onClick={() => setTheme(nextTheme)}
      {...rest}
    >
      <RoughChip seed={7} className='text-base'>
        {resolvedTheme === 'light' ? <FiMoon /> : <FiSun />}
      </RoughChip>
    </button>
  );
};

export default ThemeToggler;
