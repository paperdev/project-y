'use client';

import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import Switch from '@mui/material/Switch';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isChecked, setIsChecked] = useState(theme === 'dark' ? true : false);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.checked ? setTheme('dark') : setTheme('light');
    setIsChecked(event.target.checked);
  }

  useEffect(() => {
    setMounted(true);
  }, [])

  if (!mounted) return null;

  return (
    <>
      <Switch
        checked={isChecked}
        checkedIcon={
          <LightModeIcon />
        }
        icon={
          <DarkModeIcon />
        }
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => { onChange(event); }}
        size='medium'
        color='primary'
      />
    </>
  )
};