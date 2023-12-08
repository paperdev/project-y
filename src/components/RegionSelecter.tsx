'use client';

import React from 'react';
import { Select, SelectItem, Avatar } from '@nextui-org/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function RegionSelecter({
  regionCode,
}: {
  regionCode: Record<string, string>;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onChangeRegion = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);
    params.set('regionCode', regionCode[event.target.value]);
    router.push(pathname + '?' + params.toString());
  };

  return (
    <>
      <Select
        size='sm'
        radius='full'
        label='Region'
        placeholder='Select an region'
        className='max-w-xs'
        color='primary'
        onChange={onChangeRegion}
      >
        {Object.keys(regionCode).map((codeKey, index) => {
          return (
            <SelectItem
              key={codeKey}
              startContent={
                <Avatar
                  className='w-6 h-6'
                  src={`https://flagcdn.com/${regionCode[
                    codeKey
                  ].toLocaleLowerCase()}.svg`}
                />
              }
            >
              {codeKey}
            </SelectItem>
          );
        })}
      </Select>
    </>
  );
}
