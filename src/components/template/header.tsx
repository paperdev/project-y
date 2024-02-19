'use client';

import React from 'react';
import { ThemeSwitcher } from '@/components/template/ThemeSwitcher';
import { RegionSelecter } from '@/components/RegionSelecter';
import { IonButton, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/react';
import { globeOutline } from 'ionicons/icons';

export default function Header() {
  return (
    <IonHeader collapse='fade'>
      <IonToolbar>
        
        <RegionSelecter />
        
        <IonTitle color='primary' >Trend Insight</IonTitle>

        <ThemeSwitcher />

      </IonToolbar>
    </IonHeader>
  );
}
