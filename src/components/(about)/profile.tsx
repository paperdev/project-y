'use client';

import React from 'react';
import { LuGithub, LuMail, LuLinkedin } from 'react-icons/lu';
import { iProfile } from '@/shared/interface/profile';
import { Browser } from '@capacitor/browser';
import { Button } from 'konsta/react';

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
            <div className='text-primary text-lg font-semibold'>
              {dataProfile.name}
            </div>

            <div className='font-medium'>
              {dataProfile.jobTitle}
            </div>

            <div className='flex gap-2 mt-2 justify-center'>
              <Button
                className='text-purple-500'
                clear
                onClick={() => {
                  Browser.open({
                    url: dataProfile.github
                  })
                }}
              >
                <LuGithub className='w-6 h-6' />
              </Button>

              <Button
                className='text-purple-500'
                clear
                onClick={() => {
                  Browser.open({
                    url: dataProfile.linkedin
                  })
                }}
              >
                <LuLinkedin className='w-6 h-6' />
              </Button>

              <Button
                className='text-purple-500'
                clear
                onClick={() => {
                  Browser.open({
                    url: `mailto:${dataProfile.email}`
                  })
                }}
              >
                <LuMail className='w-6 h-6' />
              </Button>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
