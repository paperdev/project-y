'use client';

import React from 'react';
import { MdWhatshot, MdSmartDisplay, MdInfo } from 'react-icons/md';
import { Tabs, Tab } from '@nextui-org/react';
import { usePathname, useRouter } from 'next/navigation';

const bottomMenu = [
  {
    name: 'trend',
    href: 'trend',
    icon: <MdWhatshot />,
  },
  {
    name: 'youtube',
    href: 'youtube',
    icon: <MdSmartDisplay />,
  },
  {
    name: 'about',
    href: 'about',
    icon: <MdInfo />,
  },
];

export default function Footer({ className }: { className?: string }) {
  const router = useRouter();
  const currentUrl = usePathname();
  const currentMenuHref = currentUrl.slice(1);

  const onSelectionChange = (key: React.Key) => {
    router.push(key.toString());
  };

  return (
    <>
      <div className={`${className}`}>
        <Tabs
          selectedKey={currentMenuHref}
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
                <div className='flex items-center gap-2 font-bold text-base'>
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
