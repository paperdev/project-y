'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { iTab } from '@/shared/interface/tab';
import {
  IonFooter,
  IonIcon,
  IonLabel,
  IonTabButton,
  IonGrid,
  IonRow,
  IonToolbar,
} from '@ionic/react';
import {
  logoYoutube,
  search,
  trendingUp,
  informationCircle,
} from 'ionicons/icons';

const bottomMenu: Record<string, iTab> = {
  home: {
    href: 'home',
    isActive: true,
    icon: logoYoutube,
  },
  search: {
    href: 'search',
    isActive: false,
    icon: search,
  },
  trend: {
    href: 'trend',
    isActive: false,
    icon: trendingUp,
  },
  about: {
    href: 'about',
    isActive: false,
    icon: informationCircle,
  },
};

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();
  const [tabList, setTabList] = useState(bottomMenu);
  const [previousTab, setPreviousTab] = useState('home');

  useEffect(() => {
    const currentTab = pathname.slice(1);
    if (-1 === Object.keys(bottomMenu).indexOf(currentTab)) {
      return;
    }

    setCurrentTab(previousTab, currentTab);
  }, [pathname]);

  const setCurrentTab = (previousTab: string, currentTab: string) => {
    if (previousTab) {
      tabList[previousTab].isActive = false;
    }

    tabList[currentTab].isActive = true;
    setTabList(Object.assign({}, tabList));
    setPreviousTab(currentTab);
  };

  const onClickTab = (event: CustomEvent) => {
    const currentTab = event.detail.href;
    if (!currentTab || tabList[currentTab].isActive) {
      return;
    }

    setCurrentTab(previousTab, currentTab);
    router.replace(currentTab, { scroll: false });
  };

  return (
    <>
      <IonFooter translucent={false}>
        <IonToolbar>
          <IonGrid>
            <IonRow>
              {Object.keys(tabList).map((key, index) => (
                <IonTabButton
                  tab={key}
                  href={key}
                  className={tabList[key].isActive ? 'text-primary' : ''}
                  onClick={onClickTab}
                  key={index}
                >
                  <IonIcon icon={tabList[key].icon} />
                  {/* <IonLabel>{key}</IonLabel> */}
                </IonTabButton>
              ))}
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonFooter>
    </>
  );
}
