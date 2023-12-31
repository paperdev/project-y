'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation'
import {
  Divider,
  Spinner,
} from '@nextui-org/react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getTrendList } from '@/utils/request';
import { iTrendItem } from '@/shared/interface/trendVideo';
import ComponentTrendVideoCard from './trendVideoCard';

export default function ComponentTrendList({
  videoList,
  nextPageToken,
  totalResults,
}: {
  videoList: iTrendItem[],
  nextPageToken: string
  totalResults: number
}) {
  const searchParams = useSearchParams();
  const [recentVideo, setRecentVideo] = useState<iTrendItem[]>(videoList);
  const [pageToken, setPageToken] = useState<string>(nextPageToken);
  const [loadMore, setLoadMore] = useState<boolean>(true);

  const loadMoreVideo = async () => {
    if (recentVideo.length >= totalResults) {
      setLoadMore(false);
      return;
    }

    const regionCode = searchParams.get('regionCode');
    const resData = await getTrendList(regionCode, pageToken);
    setRecentVideo((video) => [...video, ...resData.items]);
    setPageToken(resData.nextPageToken);
  };

  return (
    <>
      <InfiniteScroll
        dataLength={recentVideo.length}
        next={loadMoreVideo}
        scrollThreshold={'200px'}
        hasMore={loadMore}
        loader={
          <div className='flex justify-center'>
            <Spinner label='Loading...' color='primary' />
          </div>
        }
        endMessage={
          <div className='flex justify-center font-bold'>No more videos!</div>
        }
        scrollableTarget='scrollableElementDiv'
      >

        {recentVideo.map((video, index) => {
          return (
            <div key={index}>
              <ComponentTrendVideoCard video={video} />
              <Divider />
            </div>
          );
        })}

      </InfiniteScroll>
    </>
  );
}
