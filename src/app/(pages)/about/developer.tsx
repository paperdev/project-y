'use client';

import ComponentProfile from '@/components/(about)/profile';
import React from 'react';
import { profile } from '@/shared/data/profile';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/react';

export default function DeveloperPage() {
  return (
    <>
      <IonHeader className='ion-padding-top ion-padding-bottom'>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Developer</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className='ion-padding-top ion-padding-bottom'>
        <ComponentProfile className='mt-10' dataProfile={profile} />
      </IonContent>
    </>
  );
}
