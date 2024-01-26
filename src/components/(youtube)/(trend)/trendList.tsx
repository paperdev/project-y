'use client';

import React, { useContext, useEffect, useState } from 'react';
import {
  Divider,
  Spinner,
} from '@nextui-org/react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getTrendVideoList } from '@/utils/request';
import { iTrendVideoItem } from '@/shared/interface/trendVideo';
import ComponentTrendVideoCard from './trendVideoCard';
import { QueryContext } from '@/app/providers';

export default function ComponentTrendList({
  videoList,
  nextPageToken,
  totalResults,
}: {
  videoList: iTrendVideoItem[],
  nextPageToken: string
  totalResults: number
}) {
  const [recentVideo, setRecentVideo] = useState<iTrendVideoItem[]>(videoList);
  const [pageToken, setPageToken] = useState<string>(nextPageToken);
  const [videoCount, setVideoCount] = useState<number>(totalResults);
  const [loadMore, setLoadMore] = useState<boolean>(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const query = useContext(QueryContext);
  const regionCode = query.regionCode;
  const videoCategoryId = query.videoCategoryId;

  const loadMoreVideo = async () => {
    if (recentVideo.length >= videoCount) {
      setLoadMore(false);
      return;
    }

    const resData = await getTrendVideoList(regionCode, videoCategoryId, pageToken);
    
    if (!resData) {
      return;
    }
    
    setRecentVideo((video) => [...video, ...resData.items]);
    setPageToken(resData.nextPageToken);
  };

  useEffect(() => {
    setRefreshing(true);
    getTrendVideoList(regionCode, videoCategoryId).then(resData => {
      if (resData) {
        setRecentVideo(resData.items);
        setPageToken(resData.nextPageToken);
        setVideoCount(resData.pageInfo.totalResults);
      }
    }).finally(() => {
      setRefreshing(false);
    });
  }, [query]);

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
