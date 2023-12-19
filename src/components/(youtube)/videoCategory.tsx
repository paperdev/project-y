'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Tabs, Tab } from '@nextui-org/react';
import { getVideoCategoryList } from '@/utils/request';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { iVideoCategoryElement, iVideoCategoryItem } from '@/shared/interface/videoCategory';

export default function ComponentVideoCategory() {
  const [videoCategoryList, setVideoCategoryList] = useState<iVideoCategoryElement[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const regionCode = searchParams.get('regionCode');

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['videoCategoryList', regionCode],
    queryFn: () => {
      return getVideoCategoryList(regionCode);
    },
  });

  useEffect(() => {
    if (data) {
      const videoCategoryElement: iVideoCategoryElement[] = data.items.reduce((accItem: iVideoCategoryElement[], item: iVideoCategoryItem) => {
        if (item.snippet.assignable) {
          const newItem = {
            id: parseInt(item.id),
            name: item.snippet.title,
          }
          accItem.push(newItem)
        }
        return accItem;
      }, []);

      setVideoCategoryList([{id: 0, name:'All'}, ...videoCategoryElement]);
    }
  }, [data, regionCode]);

  const onSelectionChange = (key: React.Key) => {
    const params = new URLSearchParams(searchParams);
    params.set('videoCategoryId', key.toString());
    router.push(pathname + '?' + params.toString());
  };

  return (
    <>
      {
        (!isPending && !isFetching && !error) &&
        <div className='flex flex-col sticky top-0 bg-background backdrop-blur-0 z-30'>
          <Tabs 
              items={videoCategoryList}
              onSelectionChange={onSelectionChange}
              color={'primary'}
            >
            {(item) => (
              <Tab key={item.id} title={item.name}>
              </Tab>
            )}
          </Tabs>
        </div>
      }
    </>
  );
}
