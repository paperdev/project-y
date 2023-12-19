'use client';

import React, { useEffect, useRef } from 'react';
import Header from './header';
import Body from './body';
import Footer from './footer';
import { Capacitor } from '@capacitor/core';
// import { StatusBar, Style } from '@capacitor/status-bar';

const ScoollHevavior: Record<string, ScrollBehavior> = {
  smooth: 'smooth',
  instant: 'instant',
  auto: 'auto',
}

export default function TemplateHome({
  children,
}: {
  children: React.ReactNode;
}) {  
  const navTopRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (Capacitor.getPlatform() === 'ios') {
      if (window) {
        window.addEventListener('statusTap', function () {
          scrollToTop(ScoollHevavior.smooth);
        }); 
      }
    }
  }, [])
   
  const scrollToTop = (behavior: ScrollBehavior) => {
    if (!navTopRef.current) {
      return;
    }
    navTopRef.current.scrollIntoView({ behavior: behavior, block: 'start', inline: 'nearest' });
  }

  return (
    <>
      <div className='h-screen max-w-2xl mx-auto flex flex-col justify-between pt-16 sm:pt-0 pb-4 sm:pb-0'>
        <Header className='bg-primary-500 flex-none flex justify-between sticky top-0 z-50 h-14' />
        <Body className='overflow-y-auto overflow-x-hidden'>
          <div ref={navTopRef}></div>
          {children}
        </Body>
        <Footer className='bg-primary-500 flex-none flex justify-center sticky bottom-0 h-14' />
      </div>
    </>
  );
}
