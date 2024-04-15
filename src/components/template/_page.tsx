'use client';

import React, { useContext, useEffect, useRef, useState } from 'react';
import Header from './header';
import Footer from './footer';
import { Capacitor } from '@capacitor/core';
import { IonContent, IonPage } from '@ionic/react';
import { RegionSelectorMenu } from '@/components/RegionSelectorMenu';
import { OptionsContext } from '@/app/providers';

export default function TemplatePage({
  children,
}: {
  children: React.ReactNode;
}) {
  const navTopRef = useRef<HTMLIonContentElement>(null);
  const [showHeader, setShowHeader] = useState<boolean>(true);
  const [showContent, setShowContent] = useState<boolean>(true);
  const [showFooter, setShowFooter] = useState<boolean>(true);

  const options = useContext(OptionsContext);

  useEffect(() => {
    setShowHeader(options.showHeader);
    setShowContent(options.showContent);
    setShowFooter(options.showFooter);
  }, [options]);


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
      <IonPage id='rootPage' className='safe-area-padding paper-default-view'>
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
