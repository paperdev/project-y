'use client';

import React, { useContext, useEffect, useState } from 'react';
import { getVideoCategoryList } from '@/utils/request';
import { useQuery } from '@tanstack/react-query';
import { iVideoCategoryElement, iVideoCategoryItem } from '@/shared/interface/videoCategory';
import { QueryContext, SetQueryContext } from '@/app/providers';
import { Chip } from 'konsta/react';

export default function ComponentVideoCategory() {
  const [videoCategoryList, setVideoCategoryList] = useState<iVideoCategoryElement[]>([]);
  const query = useContext(QueryContext);
  const setQuery = useContext(SetQueryContext);
  const regionCode = query.regionCode;
  const videoCategoryId = query.videoCategoryId ? query.videoCategoryId : '0';

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

  const onClick = (currentId: number) => {
    setQuery(
      {
        regionCode: regionCode,
        videoCategoryId: currentId.toString()
      }
    )
  }

  return (
    <>
      {!isPending && !isFetching && !error && (
        <div
          data-id={videoCategoryId}
          className='ios:top-0-safe flex flex-nowrap sticky top-0 w-full p-1 gap-1 bg-ios-light-surface-2 dark:bg-ios-dark-surface-2 hairline-b translucent overflow-x-scroll z-30 cursor-pointer'
        >
          {
            videoCategoryList.map((item) => {
              const colors = {
                fillBg: videoCategoryId === item.id.toString() ? 'bg-primary' : '', 
                fillText: videoCategoryId === item.id.toString() ? 'text-white dark:text-black': '' 
              }
              return (
                <Chip 
                  key={item.id}
                  className={`flex-none`}
                  colors={colors}
                  onClick={() => {
                    onClick(item.id);
                  }}
                >
                  {item.name}
                </Chip>
              )
            })
          }
        </div>
      )}
    </>
  );
}
