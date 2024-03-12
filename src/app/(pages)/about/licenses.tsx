'use client';

import React from 'react';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonText, IonTitle, IonToolbar } from '@ionic/react';
import Link from 'next/link';
import { Browser } from '@capacitor/browser';

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
            <IonText 
              color={'primary'}
              onClick={() => {
                Browser.open({
                  url: 'https://developers.google.com/youtube/terms/api-services-terms-of-service',
                });
              }}
            > YouTube API Services Terms of Service </IonText>
            and
            <IonText 
              color={'primary'}
              onClick={() => {
                Browser.open({
                  url: 'https://www.youtube.com/t/terms',
                });
              }}
            > YouTube Terms of Service.</IonText>
          </li>
          <br />
          <li>
            YouTube-Player-iOS-Helper made by YouTube is licensed by
            <IonText 
              color={'primary'}
              onClick={() => {
                Browser.open({
                  url: 'https://www.apache.org/licenses/LICENSE-2.0',
                });
              }}
            > Apache License, Version 2.0.</IonText>
          </li>
        </IonText>
      </IonContent>
    </>
  );
}
