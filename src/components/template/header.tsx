'use client';

import React from 'react';
import { ThemeSwitcher } from './ThemeSwitcher';

export default function Header({
  className
}: {
  className?: string
}) {
  return (
    <>
      <div className={`${className}`}>
        <div>Header1</div>
        <div>Header2</div>

        <div className='flex'>
          <ThemeSwitcher />
          <div>Header3</div>
        </div>
      </div>
    </>
  );
}
