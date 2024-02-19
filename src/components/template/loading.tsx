import React from 'react';
import { IonSpinner } from '@ionic/react';

export default function Loading() {
  return (
    <>
      <div className="flex justify-center items-center inset-x-0 inset-y-0">
        <IonSpinner name="circular"></IonSpinner>
      </div>
    </>
  );
}
