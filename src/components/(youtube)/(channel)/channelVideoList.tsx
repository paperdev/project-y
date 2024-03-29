'use client';

import React, { useEffect, useState } from 'react';
import { getPlayListItems } from '@/utils/request';
import { useQuery } from '@tanstack/react-query';
import ComponentChannelVideoCard from '@/components/(youtube)/(channel)/channelVideoCard';
import { iChannelVideoItem } from '@/shared/interface/channelVideo';
import { IonInfiniteScroll, IonInfiniteScrollContent, IonList } from '@ionic/react';

export default function ComponentChannelVideoList({
  playlistId,
}: {
  playlistId: string
}) {
  const [recentVideo, setRecentVideo] = useState<iChannelVideoItem[]>([]);
  const [pageToken, setPageToken] = useState<string>('');
  const [totalResults, setTotalResults] = useState<number>(0);

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
      return;
    }

    const resData = await getPlayListItems(playlistId, pageToken);
    setRecentVideo((video) => [...video, ...resData.items]);
    setPageToken(resData.nextPageToken);
  };

  return (
    <>
      <IonList lines='none'>
        {recentVideo.map((video, index) => {
          return (
            <ComponentChannelVideoCard key={index} video={video} />
          );
        })}
      </IonList>

      <IonInfiniteScroll
        onIonInfinite={(event) => {
          loadMoreVideo();
          setTimeout(() => event.target.complete(), 500);
        }}
      >
        <IonInfiniteScrollContent loadingSpinner='circular' />
      </IonInfiniteScroll>
    </>
  );
}
