'use client';

import React, { useEffect, useRef, useState } from 'react';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonList, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { iBookmark } from '@/shared/interface/bookmark';
import { trash } from 'ionicons/icons';
import { Preferences } from '@capacitor/preferences';
import { useQuery } from '@tanstack/react-query';

const getBookmarkList = async () => {
  const { keys } = await Preferences.keys();
  if (0 === keys.length) {
    return [];
  }
  
  return Promise.all(
    keys.map(async (key: string) => {
      const { value } = await Preferences.get({ key: key });
      if (!value) {
        return;
      }

      return JSON.parse(value);
    })
  );
}

export default function BookmarksPage() {
  const [bookmarkList, setBookmarkList] = useState<iBookmark[]>([]);
  const listRef = useRef<HTMLIonListElement>(null);

  const onClickDelete = async (index: number) => {
    const temp: iBookmark[] = Array.from(bookmarkList);
    const [item] = temp.splice(index, 1);
    setBookmarkList(temp);

    listRef?.current?.closeSlidingItems();
    await Preferences.remove({key: item.id});
  }

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['bookmarks'],
    queryFn: () => {
      return getBookmarkList();
    },
  });

  useEffect(() => {
    if (!data || 0 === data.length) {
      return
    }

    setBookmarkList(data);
  }, [data]);
  
  return (
    <>
      <IonHeader className='ion-padding-top ion-padding-bottom'>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Bookmarks</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className='ion-padding-top ion-padding-bottom'>
        {
          0 !== bookmarkList.length && 
            <IonList ref={listRef}>
              {
                bookmarkList.map((item: iBookmark, index: number) => {
                  return (
                    <IonItemSliding key={index}>
                      <IonItem>
                        <IonText className='truncate overflow-hidden'>
                          {item.name}
                        </IonText>
                      </IonItem>

                      <IonItemOptions>
                        <IonItemOption
                          color='danger'
                          onClick={() => {onClickDelete(index)}}
                        >
                          <IonIcon slot='icon-only' icon={trash} />
                        </IonItemOption>
                      </IonItemOptions>
                    </IonItemSliding>
                  )
                })
              }
            </IonList>
        }
      </IonContent>
    </>
  );
}
