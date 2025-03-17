import { memo } from 'react';
import { Theme } from './ThemeContext';
import { useTheme } from './useTheme';
import SunIcon  from '../../assets/icons/sun.svg';
import MoonIcon  from '../../assets/icons/moon-not-filled.svg';
import './ThemeSwitcher.scss';

export const ThemeSwitcher = memo(() => {
  const { theme, toggleTheme } = useTheme();

  const toggleIcon = () => {
    switch (theme) {
      case Theme.DARK:
        return <SunIcon />;
      case Theme.LIGHT:
        return <MoonIcon />;
      default:
        return null;
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className='theme-button'
    >
      {toggleIcon()}
    </button>
  );
});
