'use client';

import React from 'react';
import { ThemeSwitcher } from './ThemeSwitcher';
import { RegionSelecter } from '@/components/RegionSelecter';
import { IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/react';
import { barChart } from 'ionicons/icons';

export default function Header() {
  return (
    <IonHeader collapse='fade'>
      <IonToolbar>
        <IonIcon color='primary' size='large' icon={barChart}></IonIcon>
        <IonTitle color='primary'>TrendInsight</IonTitle>
        <ThemeSwitcher />
      </IonToolbar>
    </IonHeader>
  );
}
