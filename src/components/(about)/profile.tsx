'use client';

import React from 'react';
import { Avatar, Link } from '@nextui-org/react';
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
              <Link
                showAnchorIcon
                href={dataProfile.github}
                isExternal
                color='secondary'
                anchorIcon={<LuGithub className='w-6 h-6' />}
              ></Link>

              <Link
                showAnchorIcon
                href={dataProfile.linkedin}
                isExternal
                color='secondary'
                anchorIcon={<LuLinkedin className='w-6 h-6' />}
              ></Link>

              <Link
                showAnchorIcon
                href={`mailto:${dataProfile.email}`}
                isExternal
                color='secondary'
                anchorIcon={<LuMail className='w-6 h-6' />}
              ></Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
