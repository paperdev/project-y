'use client';

import React, { useEffect, useRef } from 'react';
import Header from './header';
import Body from './body';
import Footer from './footer';

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
    // Capacitor의 statusTap 이벤트는 웹에서는 존재하지 않음
  }, [])
   
  const scrollToTop = (behavior: ScrollBehavior) => {
    if (!navTopRef.current) {
      return;
    }
    navTopRef.current.scrollIntoView({ behavior: behavior, block: 'start', inline: 'nearest' });
  }

  const divClass = 'h-screen mx-auto flex flex-col justify-between max-w-2xl';

  return (
    <>
      <div className={`${divClass}`}>
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
