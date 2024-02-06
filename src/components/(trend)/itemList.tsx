'use client';

import React, { useState } from 'react';
import { iTrendItem } from '@/shared/interface/trendItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import ComponentItemCard from './itemCard';
import { Preloader } from 'konsta/react';

export default function ComponentItemList({
  dataItem: dataItem,
}: {
  dataItem: iTrendItem[],
}) {
  const [recentItem, setRecentItem] = useState<iTrendItem[]>(dataItem);

  const loadMoreItem = async () => {
    
  };

  return (
    <>
      <InfiniteScroll
        dataLength={recentItem.length}
        next={loadMoreItem}
        scrollThreshold={'200px'}
        hasMore={false}
        loader={
          <div className='flex justify-center'>
            <Preloader />
          </div>
        }
        endMessage={
          <div className='flex justify-center font-bold'>No more items!</div>
        }
        scrollableTarget='scrollableElementDiv'
      >

        {recentItem.map((item: iTrendItem, index: number) => {
          return (
            <div key={index}>
              <ComponentItemCard item={item} />
            </div>
          );
        })}

      </InfiniteScroll>
    </>
  );
}