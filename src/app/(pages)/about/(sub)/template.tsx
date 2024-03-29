'use client';

import React from 'react';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/react';

export default function SubTemplate({
  children,
  title,
  padding,
}: {
  children: React.ReactNode;
  title: string;
  padding?: string | undefined;
}) {
  return (
    <>
      <IonHeader className='ion-padding-top ion-padding-bottom'>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle color={'primary'}>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent className={`${padding ? padding : 'ion-padding'}`}>
        {children}
      </IonContent>
    </>
  );
}
