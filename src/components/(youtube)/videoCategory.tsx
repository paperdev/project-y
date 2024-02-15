'use client';

import React, { useContext, useEffect, useState } from 'react';
import { getVideoCategoryList } from '@/utils/request';
import { useQuery } from '@tanstack/react-query';
import {
  iVideoCategoryElement,
  iVideoCategoryItem,
} from '@/shared/interface/videoCategory';
import { QueryContext, SetQueryContext } from '@/app/providers';
import {
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonToolbar,
} from '@ionic/react';

export default function ComponentVideoCategory() {
  const [videoCategoryList, setVideoCategoryList] = useState<
    iVideoCategoryElement[]
  >([]);
  const query = useContext(QueryContext);
  const setQuery = useContext(SetQueryContext);
  const regionCode = query.regionCode;
  const videoCategoryId = query.videoCategoryId ? query.videoCategoryId : 0;

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['videoCategoryList', regionCode],
    queryFn: () => {
      return getVideoCategoryList(regionCode);
    },
  });

  useEffect(() => {
    if (data) {
      const videoCategoryElement: iVideoCategoryElement[] = data.items.reduce(
        (accItem: iVideoCategoryElement[], item: iVideoCategoryItem) => {
          if (item.snippet.assignable) {
            const newItem = {
              id: parseInt(item.id),
              name: item.snippet.title,
            };
            accItem.push(newItem);
          }
          return accItem;
        },
        []
      );

      setVideoCategoryList([{ id: 0, name: 'All' }, ...videoCategoryElement]);
    }
  }, [data, regionCode]);

  const onIonChange = (event: CustomEvent) => {
    setQuery({
      regionCode: regionCode,
      videoCategoryId: event.detail.value,
    });
  };

  return (
    <>
      {!isPending && !isFetching && !error && (
        <IonToolbar slot='fixed'>
          <IonSegment
            onIonChange={onIonChange}
            scrollable={true}
            value={videoCategoryId}
          >
            {videoCategoryList.map((item) => {
              return (
                <IonSegmentButton value={item.id} key={item.id}>
                  <IonLabel>{item.name}</IonLabel>
                </IonSegmentButton>
              );
            })}
          </IonSegment>
        </IonToolbar>
      )}
    </>
  );
}
