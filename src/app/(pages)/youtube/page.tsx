'use client';

import useSWR from 'swr';
import { useSearchParams } from 'next/navigation';
import ComponentVideo from '@/components/(youtube)/video';
import { getYoutubeList } from '@/utils/request';

export default function Page() {
  const searchParams = useSearchParams();
  const regionCode = searchParams.has('regionCode') ? searchParams.get('regionCode') : 'KR';
  const resData = useSWR(regionCode, getYoutubeList);
  const isLoading = resData.isLoading;
  const isError = resData.error;
  const dataYoutube = resData.data;

  return (
    <>
      {
        isLoading || isError || !dataYoutube ? <div> loading ..... </div> :
          <ComponentVideo
            dataVideo={dataYoutube.items}
            nextPageToken={dataYoutube.nextPageToken}
            totalResults={dataYoutube.pageInfo.totalResults}
          />
      }
    </>
  );
}
