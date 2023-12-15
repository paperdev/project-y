import React from 'react';
import Header from './header';
import Body from './body';
import Footer from './footer';

export default async function TemplateHome({
  children,
}: {
  children: React.ReactNode;
}) {  
  return (
    <>
      <div className='h-screen max-w-2xl mx-auto flex flex-col justify-between pt-16 sm:pt-0 pb-4 sm:pb-0'>
        <Header className='bg-primary-500 flex-none flex justify-between sticky top-0 z-50 h-14' />
        <Body className='overflow-auto'>
          {children}
        </Body>
        <Footer className='bg-primary-500 flex-none flex justify-center sticky bottom-0 h-14' />
      </div>
    </>
  );
}
