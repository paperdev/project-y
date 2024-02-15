'use client';

import React, { useEffect, useState } from 'react';
import { IonGrid, IonIcon, IonToggle, ToggleCustomEvent } from '@ionic/react';
import { moon, sunny } from 'ionicons/icons';

export function ThemeSwitcher() {
  const [themeToggle, setThemeToggle] = useState(false);

  const toggleChange = (event: ToggleCustomEvent) => {
    toggleDarkTheme(event.detail.checked);
  };

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

  return (
    <>
      <IonGrid slot='end'>
        <IonIcon color='secondary' size='large' icon={sunny} />
        <IonToggle
          color={'tertiary'}
          checked={themeToggle}
          onIonChange={toggleChange}
          justify='space-between'
        />
        <IonIcon color='secondary' size='large' icon={moon} />
      </IonGrid>
    </>
  );
}
