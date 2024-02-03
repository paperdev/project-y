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
      titleClassName=''
      subtitleClassName='dark:opacity-90'
      className={`${className} text-primary dark:text-primary dark:text-opacity-65`}
      left={
        <MdDataThresholding className='w-9 h-9 ' />
      }
      right={<ThemeSwitcher className='bg-primary bg-opacity-65'/>}
    />
  );
}
