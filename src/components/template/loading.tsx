import React from 'react';
import { IonContent, IonSpinner } from '@ionic/react';

export default function Loading() {
  return (
    <>
      <IonContent className='ion-padding-top ion-padding-bottom text-center'>
        <IonSpinner color={'primary'} name='circular'></IonSpinner>
      </IonContent>
    </>
  );
}
