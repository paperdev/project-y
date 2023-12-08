'use client';

import { useSearchParams } from 'next/navigation';
import ComponentVideo from '@/components/(youtube)/video';
import { getYoutubeList } from '@/utils/request';
import { useEffect, useState, Suspense } from 'react';

export default function Page() {
  const searchParams = useSearchParams();
  const [regionCode, setRegionCode] = useState('');
  const [dataYoutube, setDataYoutube] = useState<any>(null);

  useEffect(() => {
    const paramCode = searchParams.get('regionCode');
    setRegionCode(paramCode ? paramCode : 'KR');

    (async () => {
      const resData = await getYoutubeList(regionCode);
      setDataYoutube(resData);
    })();
  }, []);

  return (
    <>
      <Suspense fallback={'Loading...'}>
        {dataYoutube && (
          <ComponentVideo
            dataVideo={dataYoutube.items}
            nextPageToken={dataYoutube.nextPageToken}
            totalResults={dataYoutube.pageInfo.totalResults}
          />
        )}
      </Suspense>
    </>
  );
}
