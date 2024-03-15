'use client';

import React, { useEffect, useRef, useState } from 'react';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonItemDivider, IonItemGroup, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonText, IonTitle, IonToolbar } from '@ionic/react';
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
  const [bookmarkList, setBookmarkList] = useState<Record<string, iBookmark[]>>();
  const listRef = useRef<HTMLIonListElement>(null);

  const onClickDelete = async (key: string, index: number) => {
    
    const temp = Object.assign({}, bookmarkList);
    const [item] = temp[key].splice(index, 1);
    if (0 === temp[key].length) {
      delete temp[key];
    }
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
      return;
    }

    const sortedList = data.sort(function (a: iBookmark, b: iBookmark) {
      const tempA = a.group;
      const tempB = b.group;
      if (tempA < tempB) {
        return -1;
      }
      if (tempB > tempA) {
        return 1;
      }
      return 0;
    });

    let groupedList: Record<string, iBookmark[]> = {};
    sortedList.map((item: iBookmark) => {
      if (groupedList[item.group]) {
        groupedList[item.group].push(
          {
            id: item.id,
            group: item.group,
            name: item.name,
            url: item.url,
            timestamp: item.timestamp,
          }
        )
      }
      else {
        groupedList[item.group] = [
          {
            id: item.id,
            group: item.group,
            name: item.name,
            url: item.url,
            timestamp: item.timestamp,
          }
        ]
      }
    });

    setBookmarkList(groupedList);
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
        <IonList ref={listRef}>
          {
            bookmarkList && 
            Object.keys(bookmarkList).map((key: string) => {
              return (
                <IonItemGroup key={key}>
                  <IonItemDivider color={'medium'} className='opacity-70'>
                    <IonLabel>{key}</IonLabel>
                  </IonItemDivider>
                  {
                    bookmarkList[key].map((item: iBookmark, index: number) => {
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
                              onClick={() => {onClickDelete(key, index)}}
                            >
                              <IonIcon slot='icon-only' icon={trash} />
                            </IonItemOption>
                          </IonItemOptions>
                        </IonItemSliding>
                      )
                    })
                  }
                </IonItemGroup>
              )
            })
          }
        </IonList>
      </IonContent>
    </>
  );
}
