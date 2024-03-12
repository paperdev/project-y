'use client';

import React, { useEffect, useRef } from 'react';
import Header from './header';
import Footer from './footer';
import { Capacitor } from '@capacitor/core';
import { IonContent, IonPage } from '@ionic/react';
import { RegionSelectorMenu } from '@/components/RegionSelectorMenu';

export default function TemplatePage({
  children,
  showHeader = true,
  showContent = true,
  showFooter = true,
}: {
  children: React.ReactNode;
  showHeader?: boolean;
  showContent?: boolean;
  showFooter?: boolean;
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
    <>
      <IonPage id='rootPage' className='safe-area-padding'>
        {
          showHeader && <Header />
        }

        {
          showContent ? <IonContent ref={navTopRef}>{children}</IonContent> : <>{children}</>
        }

        {
          showFooter && <Footer />
        }
        
      </IonPage>

      <RegionSelectorMenu rootPageId='rootPage'/>
    </>
  );
}
