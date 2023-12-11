'use client';

import React, { useEffect, useState } from 'react';
import { iSearchItem } from '@/shared/interface/searchItem';
import {
  Divider,
  Spinner,
} from '@nextui-org/react';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function ComponentItem({
  dataItem: dataItem,
}: {
  dataItem: iSearchItem[],
}) {

  const loadMoreItem = async () => {
    
  };
  
  return (
    <>
      <InfiniteScroll
        dataLength={dataItem.length}
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

        {dataItem.map((item: iSearchItem, index: number) => {
          return (
            <div key={index}>
              <div>{item.title.query}</div>
              <Divider />
            </div>
          );
        })}

      </InfiniteScroll>
    </>
  );
}
