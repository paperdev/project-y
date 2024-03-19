'use client';

import React, { useEffect, useRef, useState } from 'react';
import { IonButton, IonFooter, IonIcon, IonItem, IonItemDivider, IonItemGroup, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonText, IonToolbar } from '@ionic/react';
import { iBookmark } from '@/shared/interface/bookmark';
import { add, remove, share, trash } from 'ionicons/icons';
import { Preferences } from '@capacitor/preferences';
import { useQuery } from '@tanstack/react-query';
import SubTemplate from './templage';
import { Capacitor } from '@capacitor/core';
import { Share } from '@capacitor/share';

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
  const [expandList, setExpandList] = useState<Record<string, boolean>>();
  const [allHiddenFlag, setAllHiddenFlag] = useState<boolean>(false);
  const listRef = useRef<HTMLIonListElement>(null);

  const onClickShare = async (key: string, index: number) => {
    if ('web' === Capacitor.getPlatform()) {
      return;
    }

    if (!bookmarkList || !bookmarkList[key] || !bookmarkList[key][index].url) {
      return;
    }

    await Share.share({
      url: bookmarkList[key][index].url,
    });
  }

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
    let groupedExpandList: Record<string, boolean> = {};
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

        groupedExpandList[item.group] = false;
      }
    });

    setBookmarkList(groupedList);
    setExpandList(groupedExpandList);
  }, [data]);

  const onClickExpandBookmark = (event: React.SyntheticEvent, key: string) => {
    const expandableItems = event.currentTarget.parentElement?.parentElement?.getElementsByClassName(
      'expandableItems'
    )[0];
    expandableItems?.classList.toggle('hidden');

    const temp = Object.assign({}, expandList);
    temp[key] = !expandList![key];
    setExpandList(temp);
  }

  const onClickEdit = (event: React.SyntheticEvent) => {
    setAllHiddenFlag(!allHiddenFlag);
    
    const temp = Object.assign({}, expandList);
    Object.keys(temp).map((key) => {
      temp[key]=!allHiddenFlag;
    })
    
    setExpandList(temp);
  }

  const onClickItem = (item: iBookmark) => {
  }
  
  return (
    <>
      <SubTemplate title='Bookmarks'>
        <IonList ref={listRef}>
          {
            bookmarkList && 
            Object.keys(bookmarkList).map((key: string) => {
              return (
                <IonItemGroup key={key}>
                  <IonItemDivider color={'medium'} className='opacity-70'>
                    <IonLabel>{key}</IonLabel>
                    <IonButton
                      slot='end'
                      onClick={
                        (event) => {
                          onClickExpandBookmark(event, key)
                        }
                      }
                      fill='clear'
                      color={'light'}
                    >
                      {
                        (expandList![key])
                          ? <IonIcon slot='icon-only' icon={add} size='large' />
                          : <IonIcon slot='icon-only' icon={remove} size='large' />
                      }
                    </IonButton>
                  </IonItemDivider>
                  <div className={`expandableItems ${allHiddenFlag ? 'hidden' : ''}`}>
                    {
                      bookmarkList[key].map((item: iBookmark, index: number) => {
                        return (
                          <IonItemSliding key={index}>
                            <IonItem onClick={() => {onClickItem(item)}}>
                              <IonText className='truncate overflow-hidden'>
                                {item.name}
                              </IonText>
                            </IonItem>

                            <IonItemOptions>
                              <IonItemOption color='primary'>
                                <IonIcon slot='icon-only' icon={share} onClick={() => {onClickShare(key, index)}} />
                              </IonItemOption>
                              <IonItemOption color='danger'>
                                <IonIcon slot='icon-only' icon={trash} onClick={() => {onClickDelete(key, index)}} />
                              </IonItemOption>
                            </IonItemOptions>
                          </IonItemSliding>
                        )
                      })
                    }
                  </div>
                </IonItemGroup>
              )
            })
          }
        </IonList>
      </SubTemplate>

      <IonFooter>
        <IonToolbar className='text-center'>
          <IonButton
            onClick={onClickEdit}
            fill='clear'
          >
            {
              allHiddenFlag
                ? <IonIcon slot='icon-only' icon={add} />
                : <IonIcon slot='icon-only' icon={remove} />
            }
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </>
  );
}
