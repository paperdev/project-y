'use client';

import React from 'react';
import { MdHome, MdWhatshot, MdHistory } from 'react-icons/md';
import { Tabs, Tab } from '@nextui-org/react';
import { usePathname, useRouter } from 'next/navigation';
import {
  Navbar,
  NavbarItem,
  Link,
  Button,
} from '@nextui-org/react';

const bottomMenu = [
  {
    name: 'home',
    href: 'home',
    icon: <MdHome />,
  },
  {
    name: 'trend',
    href: 'youtube',
    icon: <MdWhatshot />,
  },
  {
    name: 'history',
    href: 'history',
    icon: <MdHistory />,
  },
];

function NavgationFooter({ className }: { className?: string }) {
  return (
    <>
      <div className={`${className}`}>
        <Navbar position='sticky' >
          {bottomMenu.map((menu, index) => (
            <NavbarItem key={index}>
              {/* <Button
                href={menu.href}
                as={Link}
              >
                {menu.name}
              </Button> */}
              <Link href={menu.href}>{menu.name}</Link>
            </NavbarItem>
          ))}
        </Navbar>
      </div>
    </>
  );
}

function TabsFooter({ className }: { className?: string }) {
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

export { TabsFooter, NavgationFooter };
