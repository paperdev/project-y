import React from 'react';
import Header from './header';
import Body from './body';
import Footer from './footer';
import { getRegionList } from '@/utils/request';

export default async function TemplateHome({
  children,
}: {
  children: React.ReactNode;
}) {
  const regionList = await getRegionList();
  const regionCode: Record<string, string> = {};
  regionList.items.forEach((region: any) => {
    regionCode[region.snippet.gl] = region.snippet.name;
  });
  
  return (
    <>
      <div className='h-screen max-w-2xl mx-auto flex flex-col justify-between pt-16 sm:pt-0 pb-4 sm:pb-0'>
        <Header className='bg-primary-500 flex-none flex justify-between sticky top-0 z-50 h-14' regionCode={regionCode} />
        <Body className='overflow-auto'>
          {children}
        </Body>
        <Footer className='bg-primary-500 flex-none flex justify-center sticky bottom-0 h-14' />
      </div>
    </>
  );
}
