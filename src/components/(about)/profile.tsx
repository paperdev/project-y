'use client';

import React from 'react';
import { Avatar, Button } from '@nextui-org/react';
import { LuGithub, LuMail, LuLinkedin } from 'react-icons/lu';
import { iProfile } from '@/shared/interface/profile';

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
        <Avatar src={dataProfile.avatar} className='w-24 h-24'></Avatar>

        <div className='sm:pl-4'>
          <div className='py-2'>
            <div className='text-primary-500 text-lg font-semibold'>
              {dataProfile.name}
            </div>

            <div className='font-medium text-default-500'>
              {dataProfile.jobTitle}
            </div>

            <div className='flex gap-2 mt-2 justify-center'>
              <Button
                color='secondary'
                isIconOnly
                variant='light'
                onPress={() => {
                  window.open(dataProfile.github, '_blank', 'noopener,noreferrer');
                }}
              >
                <LuGithub className='w-6 h-6' />
              </Button>

              <Button
                color='secondary'
                isIconOnly
                variant='light'
                onPress={() => {
                  window.open(dataProfile.linkedin, '_blank', 'noopener,noreferrer');
                }}
              >
                <LuLinkedin className='w-6 h-6' />
              </Button>

              <Button
                color='secondary'
                isIconOnly
                variant='light'
                onPress={() => {
                  window.location.href = `mailto:${dataProfile.email}`;
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
