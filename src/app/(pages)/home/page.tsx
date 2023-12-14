'use client';

import { useSearchParams } from 'next/navigation';
import ComponentVideo from '@/components/(youtube)/video';
import Loading from '@/components/template/loading';
import { getYoutubeList } from '@/utils/request';
import Error from '@/components/template/error';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { iVideo } from '@/shared/interface/video';

export default function Page() {
  const [dataYoutube, setDataYoutube] = useState<iVideo>();
  const searchParams = useSearchParams();
  const regionCode = searchParams.has('regionCode')
    ? searchParams.get('regionCode')
    : process.env.DEFAULT_REGION;

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['regionCode', regionCode],
    queryFn: () => {
      return getYoutubeList(regionCode);
    },
  });

  useEffect(() => {
    setDataYoutube(data);
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
      {dataYoutube && (
        <ComponentVideo
          dataVideo={dataYoutube.items}
          nextPageToken={dataYoutube.nextPageToken}
          totalResults={dataYoutube.pageInfo.totalResults}
        />
      )}
    </>
  );
}
