'use client';

import React, { useEffect, useRef, useState } from 'react';
import { IonAccordion, IonAccordionGroup, IonAlert, IonButton, IonCol, IonFooter, IonGrid, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonNavLink, IonRow, IonText, IonToolbar } from '@ionic/react';
import { iBookmark } from '@/shared/interface/bookmark';
import { chevronDown, chevronUp, share, trash } from 'ionicons/icons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import SubTemplate from './template';
import { Capacitor } from '@capacitor/core';
import { Share } from '@capacitor/share';
import BookmarkPlayerPage from './bookmarkPlayer';
import { deleteAllBookmark, deleteBookmark, getBookmarkList } from '@/utils/preferences';
import { deleteVideo } from '@/utils/video';


export default function BookmarksPage() {
  const [bookmarkList, setBookmarkList] = useState<Record<string, iBookmark[]>>();
  const [expandList, setExpandList] = useState<Record<string, boolean>>();
  const [allHiddenFlag, setAllHiddenFlag] = useState<boolean>(false);
  const accordionGroupRef = useRef<HTMLIonAccordionGroupElement>(null);
  const queryClient = useQueryClient();

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

  const onClickDelete = async (event: React.SyntheticEvent, key: string, index: number, closeFlag: boolean) => {
    if (closeFlag) {
      const itemElement = event.currentTarget.parentElement?.parentElement?.parentElement as HTMLIonItemSlidingElement;
      if (itemElement) {
        itemElement.closeOpened();
      }
    }
    
    const temp = Object.assign({}, bookmarkList);
    const [item] = temp[key].splice(index, 1);
    if (0 === temp[key].length) {
      delete temp[key];
    }
    setBookmarkList(temp);

    await deleteBookmark(item.id);
    await deleteVideo(item.name);
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

    accordionGroupRef.current.value = accordionGroupRef.current.value || !expandList ? undefined : Object.keys(expandList);
    setAllHiddenFlag(!allHiddenFlag);
  }

  const onClickConfirmClear = async (event: React.SyntheticEvent) => {
    setBookmarkList({});
    await deleteAllBookmark();

    if(!queryClient) {
      return;
    }
    queryClient.invalidateQueries({ queryKey: ['bookmarks'] })
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
      <SubTemplate title='Bookmarks' padding='p-0'>
        <IonAccordionGroup ref={accordionGroupRef} multiple={true} onClick={onClickGroup}>
          {
            (!bookmarkList || 0 === Object.keys(bookmarkList).length)
              ? 
                <IonGrid className='font-bold'>
                  <IonLabel className='justify-center flex' color={'medium'}>No bookmarks have been added yet!</IonLabel>
                  <IonLabel className='justify-center flex mt-2' color={'medium'}>Please add some.</IonLabel>
                </IonGrid>
              : 
                Object.keys(bookmarkList).map((key: string) => {
                  return (
                      <IonAccordion key={key} value={key}>

                        <IonItem slot='header' color={'medium'} className='opacity-60'>
                          <IonLabel>{key}</IonLabel>
                        </IonItem>

                        <div slot='content'>
                          {
                            bookmarkList[key].map((item: iBookmark, index: number) => {
                              return (
                                <IonItemSliding key={index}>
                                  <IonNavLink routerDirection='forward' component={() => <BookmarkPlayerPage bookmark={item} onClickDelete={(event) => {onClickDelete(event, key, index, false)}} />}>
                                    <IonItem>
                                      <IonText className='truncate overflow-hidden'>
                                        {item.name}
                                      </IonText>
                                    </IonItem>
                                  </IonNavLink>

                                  <IonItemOptions>
                                    <IonItemOption color='primary'>
                                      <IonIcon slot='icon-only' icon={share} onClick={() => {onClickShare(key, index)}} />
                                    </IonItemOption>
                                    <IonItemOption color='danger'>
                                      <IonIcon slot='icon-only' icon={trash} onClick={(event) => {onClickDelete(event, key, index, true)}} />
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
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonButton
                  onClick={onClickExpandBookmark}
                  expand='full'
                  fill='clear'
                >
                  {
                    allHiddenFlag
                      ? <IonIcon slot='icon-only' icon={chevronDown} />
                      : <IonIcon slot='icon-only' icon={chevronUp} />
                  }
                </IonButton>
              </IonCol>

              <IonCol>
                <IonButton
                  id='clear-alert'
                  expand='full'
                  fill='clear'
                >
                  <IonIcon slot='icon-only' icon={trash} />
                </IonButton>

                <IonAlert
                  trigger='clear-alert'
                  header='Warning!'
                  message='It can not be recovered. Are you sure to clear all bookmarks?'
                  buttons={[
                    {
                      text: 'Cancel',
                      role: 'cancel',
                      handler: () => {},
                    },
                    {
                      text: 'OK',
                      role: 'confirm',
                      handler: onClickConfirmClear,
                    },
                  ]}
                ></IonAlert>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonFooter>
    </>
  );
}
