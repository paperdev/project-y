'use client';

import React, { useEffect, useState } from 'react';
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
  const [selectedValue, setSelectedValue] = useState<string>('');

  const onChangeRegion = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);
    params.set('regionCode', regionCode[event.target.value]);
    router.push(pathname + '?' + params.toString());
  };

  useEffect(() => {
    const currentCode = searchParams.get('regionCode');
    const currentSelected = Object.keys(regionCode).filter((codeName) => {
      return regionCode[codeName] === currentCode;
    });
    setSelectedValue(currentSelected[0]);
  }, [searchParams])

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
        selectedKeys={[selectedValue]}
      >
        {Object.keys(regionCode).map((codeName, index) => {
          return (
            <SelectItem
              key={codeName}
              startContent={
                <Avatar
                  className='w-6 h-6'
                  src={`https://flagcdn.com/${regionCode[
                    codeName
                  ].toLocaleLowerCase()}.svg`}
                />
              }
            >
              {codeName}
            </SelectItem>
          );
        })}
      </Select>
    </>
  );
}
