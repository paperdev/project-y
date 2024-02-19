'use client';

import React, { useEffect, useRef } from 'react';
import Header from './header';
import Footer from './footer';
import { Capacitor } from '@capacitor/core';
import { IonApp, IonContent, IonPage } from '@ionic/react';

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
    <IonApp >
      <IonPage id='rootPage' className='ion-padding-top ion-padding-bottom'>
        <Header />

        <IonContent ref={navTopRef}>
          {children}
        </IonContent>

        <Footer />
      </IonPage>
    </IonApp>
  );
}
