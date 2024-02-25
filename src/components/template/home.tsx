'use client';

import React, { useEffect, useRef } from 'react';
import Header from './header';
import Footer from './footer';
import { Capacitor } from '@capacitor/core';
import { IonApp, IonContent, IonPage } from '@ionic/react';
import { RegionSelectorMenu } from '@/components/RegionSelectorMenu';

export default function TemplateHome({
  children,
}: {
  children: React.ReactNode;
}) {
  const navTopRef = useRef<HTMLIonContentElement>(null);

  useEffect(() => {
    if ('ios' === Capacitor.getPlatform()) {
      if (window) {
        window.addEventListener('statusTap', function () {
          scrollToTop();
        });
      }
    }
  }, []);

  const scrollToTop = () => {
    if (!navTopRef.current) {
      return;
    }

    navTopRef.current.scrollToTop(500);
  };

  return (
    <IonApp>
      <IonPage id='rootPage' className='safe-area-padding'>
        <Header />

        <IonContent ref={navTopRef}>{children}</IonContent>

        <Footer />
      </IonPage>

      <RegionSelectorMenu rootPageId='rootPage'/>

    </IonApp>
  );
}
