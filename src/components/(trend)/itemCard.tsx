'use client';

import React, { useRef } from 'react';
import { iTrendItem } from '@/shared/interface/trendItem';
import { Card, CardHeader, CardBody, Link } from '@nextui-org/react';
import ComponentImage from '@/components/(trend)/image';
import ComponentRelatedSearch from '@/components/(trend)/relatedSearch';
import ComponentRelatedNews from '@/components/(trend)/relatedNews';
import { Browser } from '@capacitor/browser';
import DecodedText from '../template/decodedText';

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
      <Card shadow='none' className='rounded-none'>
        <CardHeader className='flex justify-between' onClick={onClickExpand}>
          <div>
            <DecodedText text={item.title.query} className='text-2xl font-bold text-primary-500 whitespace-pre-wrap' />
            <span className='text-xs ml-2 text-default-500'>
              Searches : {item.formattedTraffic}
            </span>
            <div className='flex mt-2 gap-1'>
              <Link
                showAnchorIcon
                onPress={() => {
                  Browser.open({
                    url: process.env.GOOGLE_TREND_URL + item.title.exploreLink,
                  });
                }}
                isBlock
              >
                Statistics
              </Link>
            </div>
          </div>
          <ComponentImage dataImage={item.image} isShownLink={true} />
        </CardHeader>

        <div ref={hiddenRef} className='hidden'>
          <CardBody>
            <ComponentRelatedSearch
              className='flex flex-row gap-1'
              relatedSearches={item.relatedQueries}
            />
          </CardBody>

          <CardBody>
            <ComponentRelatedNews
              className='flex flex-row gap-1'
              relatedNews={item.articles}
            />
          </CardBody>
        </div>
      </Card>
    </>
  );
}
