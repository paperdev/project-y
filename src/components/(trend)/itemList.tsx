'use client';

import React, { useState } from 'react';
import { iTrendItem } from '@/shared/interface/trendItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import ComponentItemCard from './itemCard';
import { List, Preloader } from 'konsta/react';

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

        <List strongIos outlineIos nested dividers={false}>
          {recentItem.map((item: iTrendItem, index: number) => {
            if (0 === Object.keys(item.image).length) {
              return <></>
            }

            return (
              <div key={index} className={`border mx-2 rounded-lg ${1 === index ? '' : 'my-1'}`}>
                <ComponentItemCard item={item} />
              </div>
            );
          })}
        </List>

      </InfiniteScroll>
    </>
  );
}