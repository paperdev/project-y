'use client';

import React, { useContext, useEffect, useState } from 'react';
import { Tabs, Tab } from '@nextui-org/react';
import { getVideoCategoryList } from '@/utils/request';
import { useQuery } from '@tanstack/react-query';
import { iVideoCategoryElement, iVideoCategoryItem } from '@/shared/interface/videoCategory';
import { QueryContext, SetQueryContext } from '@/app/providers';

export default function ComponentVideoCategory() {
  const [videoCategoryList, setVideoCategoryList] = useState<iVideoCategoryElement[]>([]);
  const query = useContext(QueryContext);
  const setQuery = useContext(SetQueryContext);
  const regionCode = query.regionCode;
  const videoCategoryId = query.videoCategoryId;

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
    if (!key) {
      return;
    }

    setQuery(
      {
        regionCode: regionCode,
        videoCategoryId: key.toString()
      }
    )
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
