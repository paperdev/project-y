'use client';

import React from 'react';
import { iTitle } from '@/shared/interface/trendItem';
import { Browser } from '@capacitor/browser';
import { openOutline } from 'ionicons/icons';
import { IonIcon, IonItem } from '@ionic/react';

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
            <IonItem
              button={true}
              key={index}
              onClick={() => {
                Browser.open({
                  url: process.env.GOOGLE_TREND_URL + title.exploreLink
                })
              }}
              className='flex-none rounded-lg shadow-md m-1 pl-1'
            >
              {title.query}
              <IonIcon slot='end' icon={openOutline} className='ml-1' />
            </IonItem>
          );
        })}
      </div>
    </>
  );
}