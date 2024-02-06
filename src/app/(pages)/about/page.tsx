'use client';

import ComponentProfile from '@/components/(about)/profile';
import React from 'react';
import { profile } from '@/shared/data/profile';
import { Block } from 'konsta/react';

export default function Page() {
  return (
    <>
      <Block className='h-screen flex flex-col justify-center inset-x-0 inset-y-0 fixed' nested={true} >
        <div className='flex justify-center mx-auto font-extrabold text-purple-500 '>
          Developer
        </div>
        <ComponentProfile className='mt-2' dataProfile={profile} />
      </Block>
    </>
  );
}
