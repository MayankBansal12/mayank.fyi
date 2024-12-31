import { useState, useEffect, HtmlHTMLAttributes } from 'react';
import { useTheme } from 'next-themes';
import { FiMoon, FiSun } from 'react-icons/fi';

type IThemeToggler = HtmlHTMLAttributes<HTMLButtonElement>;

const ThemeToggler: React.FC<IThemeToggler> = ({ className, ...rest }) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const nextTheme = theme === 'light' ? 'dark' : 'light';

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      className={`text-xl cursor-pointer ${className} hover:scale-[1.02] duration-150 transition ease-in-out delay-150 cursor-pointer`}
      title={`Toggle ${nextTheme} theme`}
      type='button'
      onClick={() => setTheme(nextTheme)}
      {...rest}
    >
      {theme === 'light' ? <FiMoon /> : <FiSun />}
    </button>
  );
};

export default ThemeToggler;
