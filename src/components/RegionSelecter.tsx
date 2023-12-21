'use client';

import React, { Key, useEffect, useState } from 'react';
import { Avatar, Image, Autocomplete, AutocompleteItem } from '@nextui-org/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getRegionList } from '@/utils/request';
import { useQuery } from '@tanstack/react-query';
import { iRegionElement, iRegionItem } from '@/shared/interface/region';

export function RegionSelecter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedValue, setSelectedValue] = useState<string>(process.env.DEFAULT_REGION!);

  useEffect(() => {
    const recentCurrentCode = searchParams.get('regionCode');
    setSelectedValue(recentCurrentCode ? recentCurrentCode : process.env.DEFAULT_REGION!);
  }, [searchParams])

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
    const params = new URLSearchParams(searchParams);
    params.set('regionCode', key.toString());
    router.replace(pathname + '?' + params.toString());
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
                src={`https://flagcdn.com/${selectedValue.toLocaleLowerCase()}.svg`}
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
