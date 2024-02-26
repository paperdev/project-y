'use client';

import ComponentProfile from '@/components/(about)/profile';
import React from 'react';
import { profile } from '@/shared/data/profile';

export default function Page() {
  return (
    <>
      <div className='h-screen flex flex-col justify-center inset-x-0 inset-y-0 fixed' >
        <div className='flex justify-center mx-auto font-extrabold text-purple-500 '>
          Developer
        </div>
        <ComponentProfile className='mt-2' dataProfile={profile} />
      </div>
    </>
  );
}
