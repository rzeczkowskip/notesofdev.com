'use client';

import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useTheme } from 'next-themes';
import { useState, useEffect, useRef } from 'react';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import cn from '@/utils/cn';

type ThemeSwitcherProps = {
  className?: string;
};

const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const ref = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const close = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  useOnClickOutside(ref, close);

  const changeThemeOnClick = (theme?: string) => {
    setTheme(theme || 'system');
    close();
  };

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const options = [
    { icon: <SunIcon className="h-6 w-6" />, text: 'System', value: 'system' },
    { icon: <SunIcon className="h-6 w-6" />, text: 'Light', value: 'light' },
    { icon: <MoonIcon className="h-6 w-6" />, text: 'Dark', value: 'dark' },
  ];

  return (
    <div className={cn(className, 'relative')} ref={ref}>
      <button className="flex flex-nowrap gap-2" onClick={toggle}>
        {resolvedTheme === 'dark' && <MoonIcon className="h-6 w-6" />}
        {resolvedTheme === 'light' && <SunIcon className="h-6 w-6" />}
        <span className="lg:hidden">Theme</span>
      </button>

      <div
        className={cn(
          'absolute top-full left-1/2 bg-solid -translate-x-1/2',
          isOpen ? 'block' : 'hidden',
        )}
      >
        <ul className="list-none border rounded-lg mt-1 w-max overflow-hidden">
          {options.map((option) => (
            <li key={option.value} className="block">
              <button
                onClick={() => changeThemeOnClick(option.value)}
                className={cn(
                  'flex items-center',
                  'w-full px-3 py-2 gap-2',
                  'hover:bg-gray-4 active:bg-gray-5',
                  option.value === theme && 'bg-gray-3',
                )}
              >
                {option.icon} {option.text}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ThemeSwitcher;
