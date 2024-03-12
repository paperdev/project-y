'use client';

import React from 'react';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonText, IonTitle, IonToolbar } from '@ionic/react';

export default function LicensesPage() {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Licenses</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonText>Licenses</IonText>
      </IonContent>
    </>
  );
}
