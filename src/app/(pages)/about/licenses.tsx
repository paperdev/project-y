'use client';

import React from 'react';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonText, IonTitle, IonToolbar } from '@ionic/react';
import Link from 'next/link';

export default function LicensesPage() {
  return (
    <>
      <IonHeader className='ion-padding-top ion-padding-bottom'>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Licenses</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className='ion-padding-top ion-padding-bottom'>
        <IonText className='p-10'>
          <li>
            Audio streaming data developed with YouTube.com are licensed by 
            <Link href='https://developers.google.com/youtube/terms/api-services-terms-of-service'>
              <IonText color={'primary'}> YouTube API Services Terms of Service </IonText>
            </Link>
            and 
            <Link href='https://www.youtube.com/t/terms'>
              <IonText color={'primary'}> YouTube Terms of Service.</IonText>
            </Link>
          </li>
          <br />
          <li>
            YouTube-Player-iOS-Helper made by YouTube is licensed by
            <Link href='https://www.apache.org/licenses/LICENSE-2.0'>
              <IonText color={'primary'}> Apache License, Version 2.0.</IonText>
            </Link>
          </li>
        </IonText>
      </IonContent>
    </>
  );
}
