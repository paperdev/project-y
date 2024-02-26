'use client';

import React, { useEffect, useState } from 'react';
import { IonButton, IonIcon } from '@ionic/react';
import { contrast, contrastOutline } from 'ionicons/icons';

export function ThemeSwitcher() {
  const [themeToggle, setThemeToggle] = useState(false);

  const toggleDarkTheme = (shouldAdd: boolean) => {
    document.body.classList.toggle('dark', shouldAdd);
  };

  const initializeDarkTheme = (isDark: boolean) => {
    setThemeToggle(isDark);
    toggleDarkTheme(isDark);
  };

  useEffect(() => {
    // Use matchMedia to check the user preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // Initialize the dark theme based on the initial
    // value of the prefers-color-scheme media query
    initializeDarkTheme(prefersDark.matches);

    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addEventListener('change', (mediaQuery) =>
      initializeDarkTheme(mediaQuery.matches)
    );
  }, []);

  const onClick = () => {
    const themeToggleFlag = !themeToggle;
    setThemeToggle(themeToggleFlag);
    toggleDarkTheme(themeToggleFlag);
  }

  return (
    <>
      <IonButton slot='end' fill='clear' onClick={onClick} >
        <IonIcon color='primary' size='large' icon={themeToggle ? contrastOutline : contrast} /> 
      </IonButton>
    </>
  );
}
