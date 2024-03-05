'use client';

import React from 'react';
import { iProfile } from '@/shared/interface/profile';
import { AppLauncher } from '@capacitor/app-launcher';
import { IonButton, IonIcon } from '@ionic/react';
import { logoGithub, logoLinkedin, mail } from 'ionicons/icons';

export default function ComponentProfile({
  className,
  dataProfile,
}: {
  className: string;
  dataProfile: iProfile;
}) {

  const clickToOpen = async (url: string) => {
    const { value } = await AppLauncher.canOpenUrl({url: url});

    if (value) {
      AppLauncher.openUrl({url: url});
    }
  }

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
                onClick={() => { clickToOpen(dataProfile.github); }}
              >
                <IonIcon size='large' icon={logoGithub} />
              </IonButton>

              <IonButton
                fill='clear'
                className='text-purple-500'
                onClick={() => { clickToOpen(dataProfile.linkedin); }}
              >
                <IonIcon size='large' icon={logoLinkedin} />
              </IonButton>

              <IonButton
                fill='clear'
                className='text-purple-500'
                onClick={() => { clickToOpen(`mailto:${dataProfile.email}`); }}
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
