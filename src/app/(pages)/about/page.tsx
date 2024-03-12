'use client';

import ComponentProfile from '@/components/(about)/profile';
import React from 'react';
import { profile } from '@/shared/data/profile';
import TemplatePage from '@/components/template/_page';
import { IonItem, IonList, IonNav, IonNavLink, IonPage } from '@ionic/react';
import DeveloperPage from './developer';

function RootPage() {
  return (
    <>
      <TemplatePage>
        <IonList>

          <IonNavLink routerDirection="forward" component={() => <DeveloperPage />}>
            <IonItem detail={true} >Developer</IonItem>
          </IonNavLink>

        </IonList>
      </TemplatePage>
    </>
  )
}

export default function Page() {
  return (
    <>
      <IonNav animated={true} swipeGesture={true} root={() => <RootPage />} />
    </>
  )
}