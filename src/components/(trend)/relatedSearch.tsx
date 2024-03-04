'use client';

import React from 'react';
import { iTitle } from '@/shared/interface/trendItem';
import { Browser } from '@capacitor/browser';
import { openOutline } from 'ionicons/icons';
import { IonChip, IonIcon, IonLabel } from '@ionic/react';

export default function ComponentRelatedSearch({
  className,
  relatedSearches,
}: {
  className: string;
  relatedSearches: iTitle[];
}) {
  if (0 === relatedSearches.length) {
    return <></>;
  }

  return (
    <>
      <div className={`${className} flex overflow-x-scroll ml-2`}>
        {relatedSearches.map((title: iTitle, index: number) => {
          return (
            <IonChip
              className='flex-none'
              color={'primary'}
              onClick={() => {
                Browser.open({
                  url: process.env.GOOGLE_TREND_URL + title.exploreLink
                })
              }}
            >
              <IonLabel>{title.query}</IonLabel>
              <IonIcon icon={openOutline} />
            </IonChip>
          );
        })}
      </div>
    </>
  );
}