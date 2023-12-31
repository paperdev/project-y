'use client';

import { useSearchParams } from 'next/navigation';
import ComponentTrendList from '@/components/(trend)/trendList';
import Loading from '@/components/template/loading';
import { getTrendList } from '@/utils/request';
import Error from '@/components/template/error';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { iTrendVideo } from '@/shared/interface/trendVideo';

export default function Page() {
  const [trendVideo, setTrendVideo] = useState<iTrendVideo>();
  const searchParams = useSearchParams();
  const regionCode = searchParams.has('regionCode')
    ? searchParams.get('regionCode')
    : process.env.DEFAULT_REGION;

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['regionCode', regionCode],
    queryFn: () => {
      return getTrendList(regionCode);
    },
  });

  useEffect(() => {
    setTrendVideo(data);
  }, [data, regionCode]);

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
    return <Loading />;
  }

  return (
    <>
      {trendVideo && (
        <ComponentTrendList
          videoList={trendVideo.items}
          nextPageToken={trendVideo.nextPageToken}
          totalResults={trendVideo.pageInfo.totalResults}
        />
      )}
    </>
  );
}
