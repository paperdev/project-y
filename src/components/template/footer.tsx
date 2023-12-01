'use client';

import React, { useEffect, useState } from 'react';
import { MdHome, MdWhatshot, MdHistory } from 'react-icons/md';
import { Tabs, Tab } from '@nextui-org/react';

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
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <div className={`${className}`}>
        {/* <BottomNavigation
            showLabels
            value={value}
            onChange={handleChange}
          >
            {
              bottomMenu.map((menu, index) => (
                <BottomNavigationAction
                  key={index}
                  label={menu.name}
                  href={menu.href}
                  icon={menu.icon}
                />
              ))
            }
          </BottomNavigation> */}
      </div>
    </>
  );
}

function TabsFooter({ className }: { className?: string }) {
  const [value, setValue] = useState('home');

  const handleChange = (key: React.Key) => {
    setValue(key.toString());
  };

  return (
    <>
      <div className={`${className}`}>
        <Tabs
          aria-label='bottom tabs'
          selectedKey={value}
          onSelectionChange={handleChange}
          // onChange={handleChange}
        >
          {bottomMenu.map((menu, index) => (
            <Tab
              key={index}
              // label={menu.name}
              href={menu.href}
              // icon={menu.icon}
            />
          ))}
        </Tabs>
      </div>
    </>
  );
}

export { TabsFooter, NavgationFooter };
