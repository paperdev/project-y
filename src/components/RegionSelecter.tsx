'use client';

import React, { useEffect, useState } from 'react';
import { Select, SelectItem, Avatar } from '@nextui-org/react';
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

  const onChangeRegion = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);
    params.set('regionCode', event.target.value);
    router.push(pathname + '?' + params.toString());
  };

  useEffect(() => {
    const recentCurrentCode = searchParams.get('regionCode');
    setSelectedValue(recentCurrentCode ? recentCurrentCode : defaultRegion);
  }, [searchParams])

  return (
    <>
      <Select
        size='sm'
        radius='full'
        label='Region'
        placeholder='Select an region'
        color='primary'
        onChange={onChangeRegion}
        selectedKeys={[selectedValue]}
      >
        {Object.keys(regionCode).map((code, index) => {
          return (
            <SelectItem
              key={code}
              startContent={
                <Avatar
                  className='w-6 h-6'
                  src={`https://flagcdn.com/${code.toLocaleLowerCase()}.svg`}
                />
              }
            >
              {regionCode[code]}
            </SelectItem>
          );
        })}
      </Select>
    </>
  );
}
