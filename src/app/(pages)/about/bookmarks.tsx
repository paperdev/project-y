'use client';

import React, { useRef, useState } from 'react';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonList, IonTitle, IonToolbar } from '@ionic/react';
import { iBookmark } from '@/shared/interface/bookmark';
import { trash } from 'ionicons/icons';

const tempData: iBookmark[] = [
  {
    group: 'default',
    name: 'google',
    href: 'https://www.google.com',
    timestamp: '123456689',
  },
  {
    group: 'default',
    name: 'youtube',
    href: 'https://www.youtube.com',
    timestamp: '123456689',
  },
  {
    group: 'x',
    name: 'x',
    href: 'https://x.com',
    timestamp: '123456689',
  },
];

export default function BookmarksPage() {
  const [bookmarkList, setBookmarkList] = useState(tempData);
  const listRef = useRef(null);

  const onClickDelete = (index: number) => {
    const temp = Array.from(bookmarkList);
    temp.splice(index, 1);
    setBookmarkList(temp);

    listRef?.current?.closeSlidingItems();
  }
  
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
            bookmarkList.map((item, index) => {
              return (
                <IonItemSliding key={index}>
                  <IonItem>
                    {item.name}
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
      </IonContent>
    </>
  );
}
