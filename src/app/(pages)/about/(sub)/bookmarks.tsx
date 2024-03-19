'use client';

import React, { useEffect, useRef, useState } from 'react';
import { IonAccordion, IonAccordionGroup, IonButton, IonFooter, IonIcon, IonItem, IonItemDivider, IonItemGroup, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonText, IonToolbar } from '@ionic/react';
import { iBookmark } from '@/shared/interface/bookmark';
import { add, chevronCollapse, chevronExpand, remove, share, trash } from 'ionicons/icons';
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
  const accordionGroupRef = useRef<HTMLIonAccordionGroupElement>(null);

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

  const onClickDelete = async (event: React.SyntheticEvent, key: string, index: number) => {
    const itemElement = event.currentTarget.parentElement?.parentElement?.parentElement as HTMLIonItemSlidingElement;
    if (itemElement) {
      itemElement.closeOpened();
    }
    
    const temp = Object.assign({}, bookmarkList);
    const [item] = temp[key].splice(index, 1);
    if (0 === temp[key].length) {
      delete temp[key];
    }
    setBookmarkList(temp);

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

    if (!accordionGroupRef.current) {
      return;
    }

    accordionGroupRef.current.value = Object.keys(groupedExpandList);
  }, [data]);

  const onClickExpandBookmark = (event: React.SyntheticEvent) => {
    if (!accordionGroupRef.current) {
      return;
    }
    accordionGroupRef.current.value = accordionGroupRef.current.value ? undefined : Object.keys(expandList!);
    setAllHiddenFlag(!allHiddenFlag);
  }

  const onClickItem = (item: iBookmark) => {
  }

  const onClickGroup = (event: React.SyntheticEvent) => {
    if (!accordionGroupRef.current) {
      return;
    }

    let isHiddenAll = true;
    if (!accordionGroupRef.current.value || 0 === accordionGroupRef.current.value.length) {
      isHiddenAll = false;
    }
    
    if (isHiddenAll === allHiddenFlag) {
      setAllHiddenFlag(!allHiddenFlag);
    }
  }
  
  return (
    <>
      <SubTemplate title='Bookmarks'>
        <IonAccordionGroup ref={accordionGroupRef} multiple={true} onClick={onClickGroup}>
          {
            bookmarkList && 
            Object.keys(bookmarkList).map((key: string) => {
              return (
                  <IonAccordion key={key} value={key}>

                    <IonItem slot='header' color={'light'}>
                      <IonLabel>{key}</IonLabel>
                    </IonItem>

                    <div slot='content'>
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
                                  <IonIcon slot='icon-only' icon={trash} onClick={(event) => {onClickDelete(event, key, index)}} />
                                </IonItemOption>
                              </IonItemOptions>
                            </IonItemSliding>
                          )
                        })
                      }
                    </div>

                  </IonAccordion>
              )
            })
          }
        </IonAccordionGroup>
      </SubTemplate>

      <IonFooter>
        <IonToolbar className='text-center'>
          <IonButton
            onClick={onClickExpandBookmark}
            fill='clear'
          >
            {
              allHiddenFlag
                ? <IonIcon slot='icon-only' icon={chevronExpand} />
                : <IonIcon slot='icon-only' icon={chevronCollapse} />
            }
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </>
  );
}
