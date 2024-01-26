'use client';

import React, { Key, useContext, useEffect, useState } from 'react';
import { Avatar, Image, Autocomplete, AutocompleteItem } from '@nextui-org/react';
import { getRegionList } from '@/utils/request';
import { useQuery } from '@tanstack/react-query';
import { iRegionElement, iRegionItem } from '@/shared/interface/region';
import { QueryContext, SetQueryContext } from '@/app/providers';

export function RegionSelecter() {
  const [selectedValue, setSelectedValue] = useState<string>('');
  const query = useContext(QueryContext);
  const setQuery = useContext(SetQueryContext);
  const regionCode = query.regionCode;
  const videoCategoryId = query.videoCategoryId;

  useEffect(() => {
    setSelectedValue(regionCode);
  }, [regionCode])

  const [regionList, setRegionList] = useState<iRegionElement[]>([]);

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
          label: item.snippet.name,
          value: item.snippet.gl,
          src: `https://flagcdn.com/${item.snippet.gl.toLocaleLowerCase()}.svg`,
        }
      });
      setRegionList(regionListElement);
    }
  }, [data]);
  
  const onSelectionChange = (key: Key) => {
    if (!key) {
      return;
    }

    setQuery(
      {
        regionCode: key.toString(),
        videoCategoryId: videoCategoryId
      }
    )
  };

  return (
    <>
      {
        (!isPending && !isFetching && !error ) &&
          <Autocomplete
            defaultItems={regionList}
            label='Region'
            placeholder='Select an region'
            size='sm'
            color='primary'
            scrollShadowProps={{
              isEnabled: false
            }}
            startContent={
              <Image
                radius='none'
                className='w-6 h-4'
                src={selectedValue ? `https://flagcdn.com/${selectedValue.toLocaleLowerCase()}.svg` : ''}
              />
            }
            selectedKey={selectedValue}
            onSelectionChange={onSelectionChange}
          >
            {regionList.map((region: iRegionElement) => {
              return (
                <AutocompleteItem
                  key={region.value}
                  startContent={
                    <Avatar
                      className='w-6 h-6'
                      src={region.src}
                    />
                  }
                >
                  {region.label}
                </AutocompleteItem>
              );
            })}
          </Autocomplete>
      }
    </>
  );
}
