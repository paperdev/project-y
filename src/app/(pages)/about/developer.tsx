'use client';

import ComponentProfile from '@/components/(about)/profile';
import React from 'react';
import { profile } from '@/shared/data/profile';
import { IonBackButton, IonButtons, IonHeader, IonTitle, IonToolbar } from '@ionic/react';
import TemplatePage from '@/components/template/_page';

export default function DeveloperPage() {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Developer</IonTitle>
        </IonToolbar>
      </IonHeader>

      <TemplatePage showHeader={false}>
        <div className='h-screen flex flex-col justify-center inset-x-0 inset-y-0 fixed' >
          <ComponentProfile className='mt-2' dataProfile={profile} />
        </div>
      </TemplatePage>
    </>
  );
}
