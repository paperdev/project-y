'use client';

import React, { useContext, useEffect, useState } from 'react';
import { getTrendVideoList } from '@/utils/request';
import { iTrendVideoItem } from '@/shared/interface/trendVideo';
import ComponentTrendVideoCard from './trendVideoCard';
import { QueryContext } from '@/app/providers';
import {
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonList,
} from '@ionic/react';

export default function ComponentTrendList({
  videoList,
  nextPageToken,
  totalResults,
}: {
  videoList: iTrendVideoItem[];
  nextPageToken: string;
  totalResults: number;
}) {
  const [recentVideo, setRecentVideo] = useState<iTrendVideoItem[]>(videoList);
  const [pageToken, setPageToken] = useState<string>(nextPageToken);
  const [videoCount, setVideoCount] = useState<number>(totalResults);
  const query = useContext(QueryContext);
  const regionCode = query.regionCode;
  const videoCategoryId = query.videoCategoryId;

  const loadMoreVideo = async () => {
    if (recentVideo.length >= videoCount) {
      return;
    }

    const resData = await getTrendVideoList(
      regionCode,
      videoCategoryId,
      pageToken
    );

    if (!resData) {
      return;
    }

    setRecentVideo((video) => [...video, ...resData.items]);
    setPageToken(resData.nextPageToken);
  };

  useEffect(() => {
    getTrendVideoList(regionCode, videoCategoryId)
      .then((resData) => {
        if (resData) {
          setRecentVideo(resData.items);
          setPageToken(resData.nextPageToken);
          setVideoCount(resData.pageInfo.totalResults);
        }
      });
  }, [query]);

  return (
    <>
      <IonList>
        {recentVideo.map((video, index) => (
          <IonItem key={video.id}>
            <ComponentTrendVideoCard video={video} />
          </IonItem>
        ))}
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
