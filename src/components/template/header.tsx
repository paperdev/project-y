'use client';

import React from 'react';
import { ThemeSwitcher } from '@/components/template/ThemeSwitcher';
import { RegionSelecter } from '@/components/RegionSelecter';
import { IonHeader, IonTitle, IonToolbar } from '@ionic/react';
import ComponentSearchInput from '@/components/(youtube)/(search)/searchInput';
import ComponentVideoCategory from '@/components/(youtube)/videoCategory';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <IonHeader collapse='condense'>
      <IonToolbar>
        
        <RegionSelecter />
        
        <IonTitle color='primary' >Trend Insight</IonTitle>

        <ThemeSwitcher />

      </IonToolbar>

      {
        ('/search' === pathname) && 
          <IonToolbar>
            <ComponentSearchInput />
          </IonToolbar>
      }

      {
        ('/home' === pathname) && 
          <IonToolbar>
            <ComponentVideoCategory />
          </IonToolbar>
      }

    </IonHeader>
  );
}
