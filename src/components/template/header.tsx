'use client';

import React, { useContext } from 'react';
import { ThemeSwitcher } from '@/components/template/ThemeSwitcher';
import { RegionSelector } from '@/components/RegionSelector';
import { IonHeader, IonText, IonTitle, IonToolbar } from '@ionic/react';
import ComponentSearchInput from '@/components/(youtube)/(search)/searchInput';
import ComponentVideoCategory from '@/components/(youtube)/videoCategory';
import { usePathname } from 'next/navigation';
import { QueryContext } from '@/app/providers';

const displayRegionName = new Intl.DisplayNames(['EN'], { type: 'region' });

export default function Header() {
  const pathname = usePathname();
  const query = useContext(QueryContext);
  const regionCode = query.regionCode;

  return (
    <IonHeader collapse='condense'>
      <IonToolbar>
        
        <RegionSelector />
        
        <IonTitle color='primary' >
          <IonText>Trend Insight</IonText>
          <p>
            <IonText color={'secondary'} className='text-xs'>{displayRegionName.of(regionCode)}</IonText>
          </p>
        </IonTitle>

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
