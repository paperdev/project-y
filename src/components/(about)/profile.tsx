'use client';

import React from 'react';
import { iProfile } from '@/shared/interface/profile';
import { Browser } from '@capacitor/browser';
import { IonButton, IonIcon } from '@ionic/react';
import { logoGithub, logoLinkedin, mail } from 'ionicons/icons';

export default function ComponentProfile({
  className,
  dataProfile,
}: {
  className: string;
  dataProfile: iProfile;
}) {
  return (
    <>
      <div
        className={`${className} flex flex-col justify-center items-center text-center mx-auto`}
      >
        <img src={dataProfile.avatar} className='w-24 h-24'></img>

        <div className='sm:pl-4'>
          <div className='py-2'>
            <div className='text-blue-500 text-lg font-semibold'>
              {dataProfile.name}
            </div>

            <div className='font-medium'>
              {dataProfile.jobTitle}
            </div>

            <div className='flex gap-2 mt-2 justify-center'>
              <IonButton
                fill='clear'
                className='text-purple-500'
                onClick={() => {
                  Browser.open({
                    url: dataProfile.github
                  })
                }}
              >
                <IonIcon size='large' icon={logoGithub} />
              </IonButton>

              <IonButton
                fill='clear'
                className='text-purple-500'
                onClick={() => {
                  Browser.open({
                    url: dataProfile.linkedin
                  })
                }}
              >
                <IonIcon size='large' icon={logoLinkedin} />
              </IonButton>

              <IonButton
                fill='clear'
                className='text-purple-500'
                onClick={() => {
                  Browser.open({
                    url: `mailto:${dataProfile.email}`
                  })
                }}
              >
                <IonIcon size='large' icon={mail} />
              </IonButton>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
