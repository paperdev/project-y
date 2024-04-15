'use client';

import ComponentProfile from '@/components/(about)/profile';
import React from 'react';
import { profile } from '@/shared/data/profile';
import SubTemplate from './template';

export default function DeveloperPage() {
  return (
    <>
      <SubTemplate title='Developer'>
        <ComponentProfile className='mt-10' dataProfile={profile} />
      </SubTemplate>
    </>
  );
}
