'use client';

import React, { useRef } from 'react';
import { iTrendItem } from '@/shared/interface/trendItem';
import ComponentImage from '@/components/(trend)/image';
import ComponentRelatedSearch from '@/components/(trend)/relatedSearch';
import ComponentRelatedNews from '@/components/(trend)/relatedNews';
import { Browser } from '@capacitor/browser';
import DecodedText from '../template/decodedText';
import { Link, ListItem } from 'konsta/react';
import { MdOutlineOpenInNew } from 'react-icons/md';

export default function ComponentItemCard({ item }: { item: iTrendItem }) {
  const hiddenRef = useRef<HTMLDivElement>(null);

  const onClickExpand = () => {
    if (!hiddenRef || !hiddenRef.current) {
      return;
    }

    const isHidden = hiddenRef.current.classList.contains('hidden');
    if (isHidden) {
      hiddenRef.current.classList.remove('hidden');
    } else {
      hiddenRef.current.classList.add('hidden');
    }
  };

  return (
    <>
      {/* <List strongIos outlineIos dividers={false}> */}
        <ListItem
          onClick={onClickExpand}
          title={
            <DecodedText
              text={item.title.query}
              className='text-2xl font-bold text-primary whitespace-pre-wrap'
            />
          }
          subtitle={
            <span className='text-xs ml-2'>
              Searches : {item.formattedTraffic}
            </span>
          }
          text={
            <Link
              className='flex mt-2 gap-1'
              onClick={() => {
                Browser.open({
                  url: process.env.GOOGLE_TREND_URL + item.title.exploreLink,
                });
              }}
            >
              Statistics
              <MdOutlineOpenInNew className='pl-2 w-7 h-7' />
            </Link>
          }
          contentChildren={
            <ComponentImage
              className=''
              dataImage={item.image}
              isShownLink={true}
            />
          }
        />

        <div ref={hiddenRef} className='hidden'>
          <ComponentRelatedSearch
            className='flex flex-row gap-1'
            relatedSearches={item.relatedQueries}
          />

          <ComponentRelatedNews
            className='flex flex-row gap-1'
            relatedNews={item.articles}
          />
        </div>
      {/* </List> */}
    </>
  );
}
