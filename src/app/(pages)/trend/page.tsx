'use client';

import { useSearchParams } from 'next/navigation';
import Loading from '@/components/template/loading';
import { getGoogleTrendList } from '@/utils/request';
import ComponentItemList from '@/components/(trend)/itemList';
import { useEffect, useState } from 'react';
import { iTrendItem } from '@/shared/interface/trendItem';
import { useQuery } from '@tanstack/react-query'
import Error from '@/components/template/error';

export default function Page() {
  const [searchItem, setSearchItem] = useState<iTrendItem[]>([]);
  const searchParams = useSearchParams();
  const regionCode = searchParams.has('regionCode')
    ? searchParams.get('regionCode')
    : process.env.DEFAULT_REGION;

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['googleTrend', regionCode],
    queryFn: () => {
      return getGoogleTrendList(regionCode);
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
      <Error
        messages={[
          'The current region is not available.',
          'Try a different region.',
          'Message: ' + error.message,
        ]}
      />
    );
  }

  if (isPending || isFetching) {
    return <Loading />
  }

  return (
    <>
      {
        0 !== searchItem.length && <ComponentItemList dataItem={searchItem} />
      }
    </>
  );
}