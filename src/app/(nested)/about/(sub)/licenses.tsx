'use client';

import React from 'react';
import { IonText } from '@ionic/react';
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
                  window.open(
                    'https://developers.google.com/youtube/terms/api-services-terms-of-service',
                    '_blank',
                    'noopener,noreferrer'
                  );
                }}
              > YouTube API Services Terms of Service </IonText>
              and
              <IonText 
                color={'primary'}
                onClick={() => {
                  window.open('https://www.youtube.com/t/terms', '_blank', 'noopener,noreferrer');
                }}
              > YouTube Terms of Service.</IonText>
            </li>
            <br />
            <li>
              YouTube-Player-iOS-Helper made by YouTube is licensed by
              <IonText 
                color={'primary'}
                onClick={() => {
                  window.open('https://www.apache.org/licenses/LICENSE-2.0', '_blank', 'noopener,noreferrer');
                }}
              > Apache License, Version 2.0.</IonText>
            </li>
          </ul>
        </IonText>
      </SubTemplate>
    </>
  );
}
