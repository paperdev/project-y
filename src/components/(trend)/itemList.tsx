'use client';

import React, { useState } from 'react';
import { iTrendItem } from '@/shared/interface/trendItem';
import ComponentItemCard from './itemCard';
import { IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonList } from '@ionic/react';

export default function ComponentItemList({
  dataItem: dataItem,
}: {
  dataItem: iTrendItem[];
}) {
  const [recentItem, setRecentItem] = useState<iTrendItem[]>(dataItem);

  const loadMoreItem = async () => {};

  return (
    <>
      <IonList>
        {recentItem.map((item: iTrendItem, index: number) => {
          if (0 === Object.keys(item.image).length) {
            return <></>;
          }

          return (
            <IonItem key={index}>
              <ComponentItemCard item={item} />
            </IonItem>
          );
        })}
      </IonList>

      <IonInfiniteScroll
        onIonInfinite={(event) => {
          loadMoreItem();
          setTimeout(() => event.target.complete(), 500);
        }}
      >
        <IonInfiniteScrollContent loadingSpinner='circular' />
      </IonInfiniteScroll>
    </>
  );
}
