'use client';

import Loading from '@/components/template/loading';
import { getSearchVideoList } from '@/utils/request';
import Error from '@/components/template/error';
import { useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ComponentSearchInput from '@/components/(youtube)/(search)/searchInput';
import ComponentSearchList from '@/components/(youtube)/(search)/searchList';
import { iSearchVideo } from '@/shared/interface/searchVideo';
import { QueryContext } from '@/app/providers';

export default function Page() {
  const [searchKey, setSearchKey] = useState<string>('');
  const [searchVideo, setSearchVideo] = useState<iSearchVideo>();
  const query = useContext(QueryContext);
  const regionCode = query.regionCode;

  const onSearch = (key: string) => {
    setSearchKey(key);
  };

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['search', { regionCode, searchKey }],
    queryFn: () => {
      return getSearchVideoList(regionCode, searchKey);
    },
  });

  useEffect(() => {
    setSearchVideo(data);
  }, [data, regionCode, searchKey]);

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
      <ComponentSearchInput
        onSearch={onSearch}
      />
      {searchVideo && (
        <ComponentSearchList
          videoList={searchVideo.items}
          nextPageToken={searchVideo.nextPageToken}
          totalResults={searchVideo.pageInfo.totalResults}
          searchKey={searchKey}
        />
      )}
    </>
  );
}
