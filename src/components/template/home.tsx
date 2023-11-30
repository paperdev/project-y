import React from 'react';
import Header from './header';
import Body from './body';
import { TabsFooter, NavgationFooter } from './footer';

export default function TemplateHome({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className='bg-emerald-500 h-screen max-w-2xl mx-auto flex flex-col justify-between'>
        <Header className='bg-indigo-500 flex-none flex justify-between sticky top-0 z-50 h-12' />
        <Body className='bg-slate-500 overflow-auto'>
          {children}
        </Body>
        {/* <TabsFooter className='bg-indigo-500 flex-none flex justify-center sticky bottom-0' /> */}
        <NavgationFooter className='bg-indigo-500 flex-none flex justify-center sticky bottom-0' />
      </div>
    </>
  );
}
