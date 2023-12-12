'use client';

import useSWR from 'swr';
import { useSearchParams } from 'next/navigation';
import ComponentVideo from '@/components/(youtube)/video';
import Loading from '@/components/template/loading';
import { getYoutubeList } from '@/utils/request';

export default function Page() {
  const searchParams = useSearchParams();
  const regionCode = searchParams.has('regionCode')
    ? searchParams.get('regionCode')
    : process.env.DEFAULT_REGION;
  const resData = useSWR(regionCode, getYoutubeList);
  const isLoading = resData.isLoading;
  const isError = resData.error;
  const dataYoutube = resData.data;

  return (
    <>
      {isLoading || isError || !dataYoutube ? (
        <Loading />
      ) : (
        <ComponentVideo
          dataVideo={dataYoutube.items}
          nextPageToken={dataYoutube.nextPageToken}
          totalResults={dataYoutube.pageInfo.totalResults}
        />
      )}
    </>
  );
}
