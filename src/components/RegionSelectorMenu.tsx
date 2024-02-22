'use client';

import React, { useContext, useEffect, useState } from 'react';
import { getRegionList } from '@/utils/request';
import { useQuery } from '@tanstack/react-query';
import { iRegionElement, iRegionItem } from '@/shared/interface/region';
import { QueryContext, SetQueryContext } from '@/app/providers';
import { IonContent, IonFooter, IonHeader, IonItem, IonItemDivider, IonItemGroup, IonLabel, IonList, IonMenu, IonPage, IonRadio, IonRadioGroup, IonTitle, IonToolbar, RadioGroupChangeEventDetail } from '@ionic/react';

export function RegionSelectorMenu({
  rootPageId,
}: {
  rootPageId: string;
}) {
  const query = useContext(QueryContext);
  const setQuery = useContext(SetQueryContext);

  const [regionList, setRegionList] = useState<Record<string, iRegionElement[]>>();
  const [currentRegion, setCurrentRegion] = useState(query.regionCode);

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['regionList'],
    queryFn: () => {
      return getRegionList();
    },
  });

  useEffect(() => {
    if (data) {
      const sortedRegionList = data.items.sort(function (a: iRegionItem, b: iRegionItem) {
        const tempA = a.snippet.name;
        const tempB = b.snippet.name;
        if (tempA < tempB) {
          return -1;
        }
        if (tempB > tempA) {
          return 1;
        }
        return 0;
      });

      let groupedRegionList: Record<string, iRegionElement[]> = {};
      sortedRegionList.map((item: iRegionItem) => {
        if (groupedRegionList[item.snippet.name.charAt(0)]) {
          groupedRegionList[item.snippet.name.charAt(0)].push(
            {
              label: item.snippet.name,
              value: item.snippet.gl,
              // src: `https://flagcdn.com/${item.snippet.gl.toLocaleLowerCase()}.svg`,
            }
          )
        }
        else {
          groupedRegionList[item.snippet.name.charAt(0)] = [
            {
              label: item.snippet.name,
              value: item.snippet.gl,
              // src: `https://flagcdn.com/${item.snippet.gl.toLocaleLowerCase()}.svg`,
            }
          ]
        }
      });

      setRegionList(groupedRegionList);
    }
  }, [data]);

  const onIonDidClose = () => {
    if (!currentRegion) {
      return;
    }

    setQuery(
      {
        regionCode: currentRegion,
        videoCategoryId: query.videoCategoryId,
        channelId: query.channelId,
        searchKey: query.searchKey,
      }
    );
  }

  const onIonWillOpen = () => {
    const selectedRegionElement = document.getElementById('scrollRegion-' + currentRegion);
    if (!selectedRegionElement) {
      return;
    }

    selectedRegionElement.scrollIntoView({behavior: 'instant'});
  }

  const onIonChange = (event: CustomEvent<RadioGroupChangeEventDetail>) => {
    setCurrentRegion(event.detail.value);
  }

  return (
    <IonMenu menuId='region-selector' contentId={rootPageId} side='start' onIonDidClose={onIonDidClose} onIonWillOpen={onIonWillOpen}>
      <IonPage className='ion-padding-top ion-padding-bottom'>

        <IonHeader>
          <IonToolbar>
            <IonTitle>Region</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent >
          <IonList inset={true} lines='full'>
            <IonRadioGroup
              onIonChange={onIonChange}
              value={currentRegion}
            >
              {
                regionList && 
                Object.keys(regionList).map((key: string) => {
                  return (
                    <IonItemGroup key={key}>
                      <IonItemDivider>
                        <IonLabel>{key}</IonLabel>
                      </IonItemDivider>
                      {
                        regionList[key].map((item: iRegionElement, index: number) => {
                          return (
                            <IonItem key={index} id={`scrollRegion-${item.value}`}>
                              <IonRadio value={item.value} justify='space-between'>
                                {
                                  currentRegion === item.value 
                                    ? 
                                      <IonLabel color={'primary'} className='font-bold'>
                                        {item.label}
                                      </IonLabel>
                                    : 
                                      <IonLabel>
                                        {item.label}
                                      </IonLabel>
                                }
                              </IonRadio>
                            </IonItem>
                          )
                        })
                      }
                    </IonItemGroup>
                  )
                })
              }
            </IonRadioGroup>
          </IonList>
        </IonContent>
        <IonFooter translucent={false}></IonFooter>

      </IonPage>
    </IonMenu>
    
  );
}
