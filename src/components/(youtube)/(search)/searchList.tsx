'use client';

import React, { useContext, useEffect, useState } from 'react';
import {
  Divider,
  Spinner,
} from '@nextui-org/react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getSearchVideoList } from '@/utils/request';
import { iSearchVideoItem } from '@/shared/interface/searchVideo';
import ComponentSearchVideoCard from './searchVideoCard';
import { QueryContext } from '@/app/providers';

export default function ComponentSearchList({
  videoList,
  nextPageToken,
  totalResults,
  searchKey,
}: {
  videoList: iSearchVideoItem[],
  nextPageToken: string,
  totalResults: number,
  searchKey: string,
}) {
  const [recentVideo, setRecentVideo] = useState<iSearchVideoItem[]>(videoList);
  const [pageToken, setPageToken] = useState(nextPageToken);
  const [loadMore, setLoadMore] = useState(true);
  const query = useContext(QueryContext);
  const regionCode = query.regionCode;

  const loadMoreVideo = async () => {
    if (recentVideo.length >= totalResults) {
      setLoadMore(false);
      return;
    }

    const resData = await getSearchVideoList(regionCode, searchKey, pageToken);

    setRecentVideo((video) => [...video, ...resData.items]);
    setPageToken(resData.nextPageToken);
  };

  useEffect(() => {
    recentVideo.map((video) => {
      video.descExpanded = false;
    });

    setRecentVideo(recentVideo);
  }, [videoList.length]);

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

        {recentVideo.map((video: iSearchVideoItem, index) => {
          if (video.id.channelId) {
            return (<div key={index}></div>)
          }

          return (
            <div key={index}>
              <ComponentSearchVideoCard video={video} />
              <Divider />
            </div>
          );
        })}

      </InfiniteScroll>
    </>
  );
}
