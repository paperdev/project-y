'use client';

import React, { useEffect, useState } from 'react';
import {
  Divider,
  Spinner,
} from '@nextui-org/react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getPlayListItems } from '@/utils/request';
import { useQuery } from '@tanstack/react-query';
import ComponentChannelVideoCard from '@/components/(youtube)/(channel)/channelVideoCard';
import { iChannelVideoItem } from '@/shared/interface/channelVideo';

export default function ComponentChannelVideoList({
  playlistId,
}: {
  playlistId: string
}) {
  const [recentVideo, setRecentVideo] = useState<iChannelVideoItem[]>([]);
  const [pageToken, setPageToken] = useState<string>('');
  const [totalResults, setTotalResults] = useState<number>(0);
  const [loadMore, setLoadMore] = useState<boolean>(true);

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['channelVideoList', playlistId],
    queryFn: () => {
      return getPlayListItems(playlistId);
    },
  });

  useEffect(() => {
    if (data) {
      setRecentVideo(data.items);
      setPageToken(data.nextPageToken);
      setTotalResults(data.pageInfo.totalResults);
    }

  }, [data, playlistId]);

  const loadMoreVideo = async () => {
    if (recentVideo.length >= totalResults) {
      setLoadMore(false);
      return;
    }

    const resData = await getPlayListItems(playlistId, pageToken);
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
              <ComponentChannelVideoCard video={video} />
              <Divider />
            </div>
          );
        })}

      </InfiniteScroll>
    </>
  );
}
