'use client';

import React, { SyntheticEvent, useState } from 'react';
import { MdSearch, MdSmartDisplay, MdWhatshot, MdInfo } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { Tabbar, TabbarLink } from 'konsta/react';
import { iTab } from '@/shared/interface/tab';

const iconSize = 'w-7 h-7';
const bottomMenu: Record<string, iTab> = {
  home: {
    href: 'home',
    isActive: true,
    icon: <MdSmartDisplay className={iconSize} />,
  },
  search: {
    href: 'search',
    isActive: false,
    icon: <MdSearch className={iconSize} />,
  },
  trend: {
    href: 'trend',
    isActive: false,
    icon: <MdWhatshot className={iconSize} />,
  },
  about: {
    href: 'about',
    isActive: false,
    icon: <MdInfo className={iconSize} />,
  },
};

export default function Footer({ className }: { className?: string }) {
  const router = useRouter();
  const [tabList, setTabList] = useState(bottomMenu);
  const [previousTab, setPreviousTab] = useState('home');

  const onClickTab = (event: SyntheticEvent) => {
    const currentTabName = event.currentTarget.getAttribute('id');
    if (!currentTabName || tabList[currentTabName].isActive) {
      return;
    }

    if (previousTab) {
      tabList[previousTab].isActive = false;
    }

    tabList[currentTabName].isActive = true;
    setTabList(Object.assign({}, tabList));
    setPreviousTab(currentTabName);

    // router.replace(currentTabName, { scroll: false });
  };

  return (
    <>
      <Tabbar
        labels={true}
        icons={true}
        className={`${className}`}
      >
        {Object.keys(tabList).map((key, index) => (
          <TabbarLink
            id={key}
            key={index}
            active={tabList[key].isActive}
            onClick={onClickTab}
            icon={tabList[key].icon}
            label={key}
          />
        ))}
      </Tabbar>
    </>
  );
}
