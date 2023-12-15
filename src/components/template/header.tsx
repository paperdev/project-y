'use client';

import React from 'react';
import { ThemeSwitcher } from './ThemeSwitcher';
import { RegionSelecter } from '@/components/RegionSelecter';
import { Navbar, NavbarContent } from '@nextui-org/react';
import { MdDataThresholding } from 'react-icons/md';

export default function Header({
  className,
}: {
  className?: string;
}) {
  return (
    <>
      <Navbar className={`${className}`}>
        <NavbarContent justify='start' className='text-3xl'>
          <MdDataThresholding />
        </NavbarContent>

        <NavbarContent justify='center' className='sm:w-5/12 w-7/12 '>
          <RegionSelecter />
        </NavbarContent>

        <NavbarContent justify='end'>
          <ThemeSwitcher />
        </NavbarContent>
      </Navbar>
    </>
  );
}
