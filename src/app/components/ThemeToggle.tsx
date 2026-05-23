import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

type Theme = 'light' | 'dark';

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light';
    return (window.localStorage.getItem('cbmc-theme') as Theme) || 'light';
  });

  useEffect(() => {
    document.body.dataset.theme = theme;
    window.localStorage.setItem('cbmc-theme', theme);
  }, [theme]);

  const Icon = theme === 'dark' ? Sun : Moon;

  return (
    <button
      type="button"
      onClick={() => setTheme((value) => (value === 'dark' ? 'light' : 'dark'))}
      className="inline-flex items-center justify-center border border-gray-300 bg-white text-[#1a8000] p-2 hover:bg-gray-100 transition-colors"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <Icon className="w-5 h-5" />
    </button>
  );
}
