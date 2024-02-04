'use client';

import React from 'react';
import { ThemeSwitcher } from './ThemeSwitcher';
import { RegionSelecter } from '@/components/RegionSelecter';
import { MdDataThresholding } from 'react-icons/md';
import {
  Navbar,
} from 'konsta/react';

export default function Header({ className }: { className?: string }) {
  return (
    <Navbar
      title='TrendInsight'
      subtitle='Trend Insight'
      titleClassName='text-primary'
      subtitleClassName=''
      className={`${className} `}
      left={
        <MdDataThresholding className='w-9 h-9 text-primary' />
      }
      right={<ThemeSwitcher className='bg-primary'/>}
    />
  );
}
