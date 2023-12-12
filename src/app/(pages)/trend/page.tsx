'use client';

import useSWR from 'swr';
import { useSearchParams } from 'next/navigation';
import Loading from '@/components/template/loading';
import { fetcher } from '@/utils/request';
import ComponentItem from '@/components/(trend)/item';
import { useEffect, useState } from 'react';

export default function Page() {
  const [searchesDays, setSearchesDays] = useState();
  const [searches, setSearches] = useState();
  const searchParams = useSearchParams();
  const regionCode = searchParams.has('regionCode')
    ? searchParams.get('regionCode')
    : process.env.DEFAULT_REGION;

  const resData = useSWR(`/api/trend/${regionCode}`, fetcher);
  const isLoading = resData.isLoading;
  const isError = resData.error;
  const dataTrend = resData.data;

  useEffect(() => {
    if (!isLoading) {
      const trendingSearchesDays = dataTrend.trendingSearchesDays;
      const trendingSearches = trendingSearchesDays[0].trendingSearches;
      setSearchesDays(trendingSearchesDays);
      setSearches(trendingSearches);
    }
  }, [dataTrend])

  if (isError) {
    return (
      <div className='flex flex-col text-danger-500'>
        <div className='mx-auto'>The current region is not available.</div>
        <div className='mx-auto'>Try a different region.</div>
      </div>
    );
  }

  return (
    <>
      {isLoading || !searches ? (
        <Loading />
      ) : (
        <ComponentItem dataItem={searches} />
      )}
    </>
  );
}
