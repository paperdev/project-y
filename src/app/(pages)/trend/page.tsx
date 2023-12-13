'use client';

import { useSearchParams } from 'next/navigation';
import Loading from '@/components/template/loading';
import { getTrendList } from '@/utils/request';
import ComponentItem from '@/components/(trend)/item';
import { useEffect, useState } from 'react';
import { iSearchItem } from '@/shared/interface/searchItem';
import { useQuery } from '@tanstack/react-query'

export default function Page() {
  const [searchItem, setSearchItem] = useState<iSearchItem[]>([]);
  const searchParams = useSearchParams();
  const regionCode = searchParams.has('regionCode')
    ? searchParams.get('regionCode')
    : process.env.DEFAULT_REGION;

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['regionCode', regionCode],
    queryFn: () => {
      return getTrendList(regionCode);
    },
  })

  useEffect(() => {
    if (data) {
      let temp: any[] = [];
      data.default.trendingSearchesDays.map((days: any) => {
        temp = temp.concat(days.trendingSearches);
      });
      setSearchItem(temp);
    }
    else {
      setSearchItem([]);
    }
  }, [data, regionCode])

  if (error) {
    return (
      <div className='flex flex-col text-danger-500'>
        <div className='mx-auto'>The current region is not available.</div>
        <div className='mx-auto'>Try a different region.</div>
      </div>
    );
  }

  if (isPending || isFetching) {
    return <Loading />
  }

  return (
    <>
      {
        0 !== searchItem.length && <ComponentItem dataItem={searchItem} />
      }
    </>
  );
}
