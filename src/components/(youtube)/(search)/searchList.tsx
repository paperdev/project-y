'use client';

import React, { useContext, useEffect, useState } from 'react';
import { getSearchVideoList } from '@/utils/request';
import { iSearchVideoItem } from '@/shared/interface/searchVideo';
import ComponentSearchVideoCard from './searchVideoCard';
import { QueryContext } from '@/app/providers';
import {
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonList,
} from '@ionic/react';

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
    <IonList>
      {recentVideo.map((video: iSearchVideoItem, index) => {
          if (video.id.channelId) {
            return <></>;
          }

          return (
            <IonItem key={index}>
              <ComponentSearchVideoCard video={video} />
            </IonItem>
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
