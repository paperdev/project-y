'use client';

import React from 'react';
import { ThemeSwitcher } from './ThemeSwitcher';
import {
  Navbar,
  NavbarItem,
  NavbarContent,
} from '@nextui-org/react';
import { MdDataThresholding } from "react-icons/md";

export default function Header({
  className
}: {
  className?: string
}) {
  return (
    <>
      <div className={`${className}`}>
        <Navbar>
          <NavbarContent justify='start' className='text-3xl'>
            <MdDataThresholding />
          </NavbarContent>

          <NavbarContent justify='center'>
            <NavbarItem>
              <div></div>
            </NavbarItem>
          </NavbarContent>

          <NavbarContent justify='end'>
            <ThemeSwitcher />
          </NavbarContent>
        </Navbar>
      </div>
    </>
  );
}
