import { useTheme } from 'next-themes';
import { type HtmlHTMLAttributes, useEffect, useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

type IThemeToggler = HtmlHTMLAttributes<HTMLButtonElement>;

const ThemeToggler: React.FC<IThemeToggler> = ({ className = '', ...rest }) => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const nextTheme = resolvedTheme === 'light' ? 'dark' : 'light';

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className='h-9 w-9' aria-hidden />;
  }

  return (
    <button
      className={`appearance-trigger ${className}`}
      aria-label={`Toggle ${nextTheme} theme`}
      title={`Toggle ${nextTheme} theme`}
      type='button'
      onClick={() => setTheme(nextTheme)}
      data-sound-click
      {...rest}
    >
      {resolvedTheme === 'light' ? <FiMoon /> : <FiSun />}
    </button>
  );
};

export default ThemeToggler;
