'use client';

import React from 'react';
import { IonNav } from '@ionic/react';
import ListPage from './listPage';

export default function Page() {
  return (
    <>
      <IonNav className='paper-default-view' id='aboutNav' animated={true} swipeGesture={true} root={() => <ListPage />} />
    </>
  )
}