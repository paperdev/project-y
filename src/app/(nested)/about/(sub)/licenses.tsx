'use client';

import React from 'react';
import { IonText } from '@ionic/react';
import { Browser } from '@capacitor/browser';
import SubTemplate from './template';

export default function LicensesPage() {
  return (
    <>
      <SubTemplate title='Licenses'>
        <IonText className='indent-4'>
          <ul className='list-outside'>
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
          </ul>
        </IonText>
      </SubTemplate>
    </>
  );
}
