'use client';

import React, { useEffect, useState } from 'react';
import { IonButton, IonIcon } from '@ionic/react';
import { contrast, contrastOutline } from 'ionicons/icons';
import { getTheme, setTheme } from '@/utils/preferences';

export function ThemeSwitcher() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const toggleDarkTheme = (shouldAdd: boolean) => {
    document.body.classList.toggle('dark', shouldAdd);
  };

  useEffect(() => {
    const getCurrentTheme = async () => {
      setIsLoading(true);
      const value = await getTheme();
      
      let isDark: boolean;
      if (value) {
        isDark = 'dark' === value ? true : false;
        toggleDarkTheme(isDark);
        await saveDarkTheme(isDark);
        setIsLoading(false);
        return;
      }

      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
      isDark = prefersDark.matches;
      toggleDarkTheme(isDark);
      await saveDarkTheme(isDark);
      setIsLoading(false);
    };

    getCurrentTheme();
  }, []);

  const onClick = () => {
    toggleDarkTheme(!isDarkTheme);
    saveDarkTheme(!isDarkTheme);
  }

  const saveDarkTheme = async (isDark: boolean) => {
    setIsDarkTheme(isDark);
    await setTheme(isDark ? 'dark' : 'light');
  }

  return (
    <>
      {
        !isLoading && 
          <IonButton slot='end' fill='clear' onClick={onClick} >
            <IonIcon color='primary' size='large' icon={isDarkTheme ? contrastOutline : contrast} /> 
          </IonButton>
      }
    </>
  );
}
