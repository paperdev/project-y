'use client';

import React, { useEffect, useRef } from 'react';
import Header from './header';
import Body from './body';
import Footer from './footer';
import { Capacitor } from '@capacitor/core';
import { Page } from 'konsta/react';

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
    if ('ios' === Capacitor.getPlatform()) {
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
    <Page>
      <Header className='sticky top-0'/>

      <Body className='overflow-y-auto overflow-x-hidden'>
        <div ref={navTopRef}></div>
        {children}
      </Body>

      <Footer className='bottom-0 fixed capitalize' /> 
    </Page>
  );
}
