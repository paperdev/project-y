'use client';

import React, { useEffect, useState } from 'react';
import { Avatar, Image, Autocomplete, AutocompleteItem } from '@nextui-org/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function RegionSelecter({
  regionCode,
}: {
  regionCode: Record<string, string>;
}) {
  const defaultRegion = process.env.DEFAULT_REGION ? process.env.DEFAULT_REGION : '';
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedValue, setSelectedValue] = useState<string>(defaultRegion);

  const onSelectionChange = (key: any) => {
    const params = new URLSearchParams(searchParams);
    params.set('regionCode', key);
    router.push(pathname + '?' + params.toString());
  };

  useEffect(() => {
    const recentCurrentCode = searchParams.get('regionCode');
    setSelectedValue(recentCurrentCode ? recentCurrentCode : defaultRegion);
  }, [searchParams])

  return (
    <>
      <Autocomplete
        size='sm'
        radius='sm'
        label='Region'
        placeholder='Select an region'
        color='primary'
        onSelectionChange={onSelectionChange}
        selectedKey={selectedValue}
        isClearable={false}
        startContent={
          <Image
            radius='none'
            className='w-6 h-4'
            src={`https://flagcdn.com/${selectedValue.toLocaleLowerCase()}.svg`}
          />
        }
      >
          {Object.keys(regionCode).map((code, index) => {
            return (
              <AutocompleteItem
                key={code}
                startContent={
                  <Avatar
                    className='w-6 h-6'
                    src={`https://flagcdn.com/${code.toLocaleLowerCase()}.svg`}
                  />
                }
              >
                {regionCode[code]}
              </AutocompleteItem>
            );
          })}
      </Autocomplete>
    </>
  );
}
