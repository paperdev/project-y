'use client';

import React, { useContext } from 'react';
import { ThemeSwitcher } from '@/components/template/ThemeSwitcher';
import { RegionSelector } from '@/components/RegionSelector';
import { IonHeader, IonText, IonTitle, IonToolbar } from '@ionic/react';
import ComponentSearchInput from '@/components/(youtube)/(search)/searchInput';
import ComponentVideoCategory from '@/components/(youtube)/videoCategory';
import { usePathname } from 'next/navigation';
import { OptionsContext, QueryContext } from '@/app/providers';

const displayRegionName = new Intl.DisplayNames(['EN'], { type: 'region' });

export default function Header() {
  const pathname = usePathname();
  const options = useContext(OptionsContext);
  const query = useContext(QueryContext);
  const regionCode = query.regionCode;

  return (
    <IonHeader collapse='condense'>
      <IonToolbar>
        
        <RegionSelector />
        
        <IonTitle color='primary' >
          <IonText>{options.title}</IonText>
          <p className='text-center flex justify-center items-center gap-1'>
            {/* <IonIcon src={`https://flagcdn.com/${regionCode.toLocaleLowerCase()}.svg`} /> */}
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
