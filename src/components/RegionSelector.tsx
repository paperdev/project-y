'use client';

import React from 'react';
import { IonIcon, IonMenuButton } from '@ionic/react';
import { globeOutline } from 'ionicons/icons';

export function RegionSelector() {
  return (
    <IonMenuButton slot='start' menu='region-selector'>
      <IonIcon color='primary' size='large' icon={globeOutline} />
    </IonMenuButton>
  );
}
