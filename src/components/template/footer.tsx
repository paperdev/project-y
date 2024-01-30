'use client';

import React from 'react';
import { MdSearch, MdSmartDisplay, MdWhatshot, MdInfo } from 'react-icons/md';
import { Tabs, Tab } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

const bottomMenu = [
  {
    name: 'home',
    href: 'home',
    icon: <MdSmartDisplay />,
  },
  {
    name: 'search',
    href: 'search',
    icon: <MdSearch />,
  },
  {
    name: 'trend',
    href: 'trend',
    icon: <MdWhatshot />,
  },
  {
    name: 'about',
    href: 'about',
    icon: <MdInfo />,
  },
];

export default function Footer({ className }: { className?: string }) {
  const router = useRouter();

  const onSelectionChange = (key: React.Key) => {
    router.replace(key.toString(), {scroll: false});
  };

  return (
    <>
      <div className={`${className}`}>
        <Tabs
          color='default'
          radius='md'
          variant='light'
          fullWidth={true}
          onSelectionChange={onSelectionChange}
        >
          {bottomMenu.map((menu) => (
            <Tab
              key={menu.href}
              className='h-12'
              title={
                <div className='flex items-center font-bold text-base text-default-300 group-data-[selected=true]:text-primary-500'>
                  {menu.icon}
                  <div className='capitalize'>{menu.name}</div>
                </div>
              }
            />
          ))}
        </Tabs>
      </div>
    </>
  );
}
