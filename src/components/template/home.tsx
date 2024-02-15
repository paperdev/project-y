'use client';

import React, { useEffect, useRef } from 'react';
import Header from './header';
import Footer from './footer';
import { Capacitor } from '@capacitor/core';
import {
  IonContent,
  IonPage,
} from '@ionic/react';

const ScoollHevavior: Record<string, ScrollBehavior> = {
  smooth: 'smooth',
  instant: 'instant',
  auto: 'auto',
};

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
          scrollToTop(ScoollHevavior.smooth);
        });
      }
    }
  }, []);

  const scrollToTop = (behavior: ScrollBehavior) => {
    if (!navTopRef.current) {
      return;
    }

    navTopRef.current.scrollToTop(500);
  };

  return (
    <>
      <IonPage>
        <Header />

        <IonContent ref={navTopRef} className='ion-padding'>
          {children}
        </IonContent>

        <Footer />
      </IonPage>
    </>
  );
}
