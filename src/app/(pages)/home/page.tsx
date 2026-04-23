'use client';

import ComponentTrendList from '@/components/(youtube)/(trend)/trendList';
import Loading from '@/components/template/loading';
import { getTrendVideoList } from '@/utils/request';
import Error from '@/components/template/error';
import { useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { iTrendVideo } from '@/shared/interface/trendVideo';
import { QueryContext } from '@/app/providers';

export default function Page() {
  const [trendVideo, setTrendVideo] = useState<iTrendVideo>();
  const query = useContext(QueryContext);
  const regionCode = query.regionCode;
  const videoCategoryId = query.videoCategoryId;

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['trend', regionCode, videoCategoryId],
    queryFn: () => {
      return getTrendVideoList(regionCode, videoCategoryId);
    },
  });

  useEffect(() => {
    if (!data) {
      return
    }
    setTrendVideo(data);
  }, [data, regionCode]);

  if (error) {
    return (
      <Error
        messages={[
          'The current region is not available.',
          'Try a different region.',
          // 'Message: ' + error.message,
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
