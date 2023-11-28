'use client';

import React, { useEffect, useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import HistoryIcon from '@mui/icons-material/History';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

const bottomMenu = [
  {
    name: 'home',
    href: 'home',
    icon: <HomeIcon />,
  },
  {
    name: 'trend',
    href: 'youtube',
    icon: <WhatshotIcon />,
  },
  {
    name: 'history',
    href: 'history',
    icon: <HistoryIcon />,
  },
];

function NavgationFooter({
  className
}: {
  className?: string
}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <div className={`${className}`}>
          <BottomNavigation
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
          </BottomNavigation>
      </div>
    </>
  )
}

function TabsFooter({
  className
}: {
  className?: string
}) {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <div className={`${className}`}>
        <Tabs
          aria-label='bottom tabs'
          value={value}
          onChange={handleChange}
        >
          {
            bottomMenu.map((menu, index) => (
              <Tab
                key={index}
                label={menu.name}
                href={menu.href}
                icon={menu.icon}
              />
            ))
          }
        </Tabs>
      </div>
    </>
  );
}

export {
  TabsFooter,
  NavgationFooter,
};