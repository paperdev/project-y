'use client';

import React from 'react';
import { iTitle } from '@/shared/interface/trendItem';
import { Browser } from '@capacitor/browser';
import { Link } from 'konsta/react';
import { MdOutlineOpenInNew } from 'react-icons/md';

export default function ComponentRelatedSearch({
  className,
  relatedSearches,
}: {
  className: string;
  relatedSearches: iTitle[];
}) {
  if (0 === relatedSearches.length) {
    return <></>;
  }

  return (
    <>
      <div className={`${className} flex overflow-x-scroll ml-2`}>
        {relatedSearches.map((title: iTitle, index: number) => {
          return (
            <Link
              key={index}
              onClick={() => {
                Browser.open({
                  url: process.env.GOOGLE_TREND_URL + title.exploreLink
                })
              }}
              className='flex-none rounded-lg shadow-md m-1 pl-1'
            >
              {title.query}
              <MdOutlineOpenInNew className='pl-2 w-7 h-7'/>
            </Link>
          );
        })}
      </div>
    </>
  );
}