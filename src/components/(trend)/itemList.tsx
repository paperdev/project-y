'use client';

import React, { useState } from 'react';
import { iTrendItem } from '@/shared/interface/trendItem';
import ComponentItemCard from './itemCard';
import { IonInfiniteScroll, IonInfiniteScrollContent, IonList } from '@ionic/react';

export default function ComponentItemList({
  dataItem: dataItem,
}: {
  dataItem: iTrendItem[];
}) {
  const [recentItem, setRecentItem] = useState<iTrendItem[]>(dataItem);
 
  const loadMoreItem = async () => {};

  return (
    <>
      <IonList lines='none'>
        {recentItem.map((item: iTrendItem, index: number) => {
          if (0 !== Object.keys(item.image).length) {
            return (
              <ComponentItemCard key={index} item={item} />
            );
          }
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
