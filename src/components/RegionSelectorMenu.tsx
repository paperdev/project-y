'use client';

import React, { useContext, useEffect, useState } from 'react';
import { getRegionList } from '@/utils/request';
import { useQuery } from '@tanstack/react-query';
import { iRegionElement, iRegionItem } from '@/shared/interface/region';
import { QueryContext, SetQueryContext } from '@/app/providers';
import { IonButton, IonContent, IonFooter, IonHeader, IonIcon, IonItem, IonItemDivider, IonItemGroup, IonLabel, IonList, IonListHeader, IonMenu, IonMenuButton, IonMenuToggle, IonPage, IonPicker, IonRadio, IonRadioGroup, IonSelect, IonSelectOption, IonTitle, IonToolbar, PickerColumnOption, RadioGroupChangeEventDetail } from '@ionic/react';

export function RegionSelectorMenu({
  rootPageId,
}: {
  rootPageId: string;
}) {
  const query = useContext(QueryContext);
  const setQuery = useContext(SetQueryContext);

  const [regionList, setRegionList] = useState<Record<string, iRegionElement[]>>();
  const [currentRegion, setCurrentRegion] = useState();

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
              src: `https://flagcdn.com/${item.snippet.gl.toLocaleLowerCase()}.svg`,
            }
          )
        }
        else {
          groupedRegionList[item.snippet.name.charAt(0)] = [
            {
              label: item.snippet.name,
              value: item.snippet.gl,
              src: `https://flagcdn.com/${item.snippet.gl.toLocaleLowerCase()}.svg`,
            }
          ]
        }
      });

      setRegionList(groupedRegionList);
    }
  }, [data]);

  const onIonWillClose = () => {
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

  const onIonChange = (event: CustomEvent<RadioGroupChangeEventDetail>) => {
    setCurrentRegion(event.detail.value);
  }

  return (
    <IonMenu menuId='region-selector' contentId={rootPageId} side='start' onIonDidClose={onIonWillClose}>
      <IonPage className='ion-padding-top ion-padding-bottom'>

        <IonHeader>
          <IonToolbar>
            <IonTitle>Region</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent >
          <IonList inset={true}>
            <IonRadioGroup
              onIonChange={onIonChange}
            >
              {
                regionList && 
                Object.keys(regionList).map((key: string) => {
                  return (
                    <IonItemGroup>
                      <IonItemDivider>
                        <IonLabel>{key}</IonLabel>
                      </IonItemDivider>
                      {
                        regionList[key].map((item: iRegionElement, index: number) => {
                          return (
                            <IonItem key={index}>
                              <IonRadio value={item.value}>
                                {item.label}
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
