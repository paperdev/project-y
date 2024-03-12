'use client';

import React from 'react';
import { IonNav } from '@ionic/react';
import ListPage from './listPage';

export default function Page() {
  return (
    <>
      <IonNav animated={true} swipeGesture={true} root={() => <ListPage />} />
    </>
  )
}