'use client';

import React from 'react';
import { Link } from '@nextui-org/react';
import { iTitle } from '@/shared/interface/trendItem';

export default function ComponentRelatedSearch({
  className,
  relatedSearches,
}: {
  className: string;
  relatedSearches: iTitle[];
}) {
  if (0 === relatedSearches.length) {
    return <>No related searches!</>;
  }

  return (
    <>
      <div className={`${className}`}>
        {relatedSearches.map((title: iTitle, index: number) => {
          return (
            <Link
              key={index}
              isExternal
              showAnchorIcon
              href={
                process.env.GOOGLE_TREND_URL + title.exploreLink
              }
              className='flex-none'
            >
              {title.query}
            </Link>
          );
        })}
      </div>
    </>
  );
}