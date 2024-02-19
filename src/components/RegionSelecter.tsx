'use client';

import React, { useContext, useEffect, useState } from 'react';
import { getRegionList } from '@/utils/request';
import { useQuery } from '@tanstack/react-query';
import { iRegionElement, iRegionItem } from '@/shared/interface/region';
import { QueryContext, SetQueryContext } from '@/app/providers';
import { IonButton, IonIcon, IonPicker, PickerColumnOption } from '@ionic/react';
import { globeOutline } from 'ionicons/icons';

export function RegionSelecter() {
  const [selectedValue, setSelectedValue] = useState<string>('');
  const query = useContext(QueryContext);
  const setQuery = useContext(SetQueryContext);
  const regionCode = query.regionCode;
  const videoCategoryId = query.videoCategoryId;

  useEffect(() => {
    setSelectedValue(regionCode);
  }, [regionCode])

  const [regionList, setRegionList] = useState<PickerColumnOption[]>([]);

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

      const regionListElement: iRegionElement[] = sortedRegionList.map((item: iRegionItem) => {
        return {
          text: item.snippet.name,
          value: item.snippet.gl,
          // src: `https://flagcdn.com/${item.snippet.gl.toLocaleLowerCase()}.svg`,
        }
      });
      setRegionList(regionListElement);
    }
  }, [data]);

  const onPick = (item: any) => {
    if (!item.region.value) {
      return;
    }

    setQuery(
      {
        regionCode: item.region.value.toString(),
        videoCategoryId: videoCategoryId
      }
    );
  }

  return (
    <>
      <IonButton slot='start' fill='clear' id='region-picker'>
        <IonIcon color='primary' size='large' icon={globeOutline} />
      </IonButton>
      {
        (!isPending && !isFetching && !error ) &&
          <IonPicker
            trigger='region-picker'
            backdropDismiss={true}
            showBackdrop={true}
            columns={[
              {
                name: 'region',
                options: regionList
              }
            ]}
            buttons={[
              {
                text: 'Close',
              },
              {
                text: 'Select',
                handler: onPick,
              },
            ]}
          />
      }
    </>
  );
}
