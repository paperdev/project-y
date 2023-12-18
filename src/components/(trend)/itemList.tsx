'use client';

import React, { useState } from 'react';
import { iTrendItem } from '@/shared/interface/trendItem';
import {
  Divider,
  Spinner,
} from '@nextui-org/react';
import InfiniteScroll from 'react-infinite-scroll-component';
import ComponentItemCard from './itemCard';

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
            <Spinner label='Loading...' color='primary' />
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
              <Divider />
            </div>
          );
        })}

      </InfiniteScroll>
    </>
  );
}