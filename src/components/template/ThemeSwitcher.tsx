'use client';

import { Toggle } from 'konsta/react';
import React, { useEffect, useState } from 'react';
import { MdLightMode, MdDarkMode } from 'react-icons/md';

export function ThemeSwitcher({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    if (!document) {
      return;
    }
    document
      .getElementsByTagName('html')[0]
      .setAttribute('class', event.target.checked ? 'dark theme-dark' : '');
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <Toggle checked={isChecked} onChange={onChange} component='label' className={`${className}`}>
        <MdLightMode className='w-6 h-6 relative -top-6.5 left-0.5 fill-primary dark:fill-none ' />
        <MdDarkMode className='w-7 h-7 relative -top-13 -right-5 fill-none dark:fill-black ' />
      </Toggle>
    </>
  );
}
