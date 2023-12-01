'use client';

import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { Switch } from '@nextui-org/react';
import { MdLightMode, MdDarkMode } from 'react-icons/md';

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isSelected, setIsSelected] = useState(theme === 'dark' ? true : false);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.checked ? setTheme('dark') : setTheme('light');
    setIsSelected(event.target.checked);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <Switch
        isSelected={isSelected}
        onValueChange={setIsSelected}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          onChange(event);
        }}
        size='md'
        color='primary'
        startContent={<MdLightMode />}
        endContent={<MdDarkMode />}
      />
    </>
  );
}
