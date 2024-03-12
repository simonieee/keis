import { IconMoon, IconSun } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

const DarkModeToggle = () => {
  const localStorageChecker = (): string => {
    if (!localStorage.theme) {
      return 'light';
    }
    return localStorage.theme === 'dark' ? 'dark' : 'light';
  };

  const [mode, setMode] = useState(localStorageChecker());

  const onChangeMode = () => {
    setMode((state) => {
      const newState = state === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newState);
      return newState;
    });
  };

  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [mode]);
  return (
    <button
      onClick={onChangeMode}
      className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
      aria-label={`Toggle ${mode ? 'Light' : 'Dark'} Mode`}
    >
      {mode === 'dark' ? <IconMoon size={32} /> : <IconSun size={32} />}
    </button>
  );
};

export default DarkModeToggle;
