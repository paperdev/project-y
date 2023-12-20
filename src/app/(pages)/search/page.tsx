'use client';

import { useSearchParams } from 'next/navigation';
import Loading from '@/components/template/loading';
import { getSearchList } from '@/utils/request';
import Error from '@/components/template/error';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import ComponentSearchInput from '@/components/(youtube)/(search)/searchInput';
import ComponentSearchList from '@/components/(youtube)/(search)/searchList';
import { iSearchVideo } from '@/shared/interface/searchVideo';

export default function Page() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchKey, setSearchKey] = useState<string>('');
  const [searchVideo, setSearchVideo] = useState<iSearchVideo>();
  const searchParams = useSearchParams();
  const regionCode = searchParams.get('regionCode');

  const onSearch = (key: string) => {
    setSearchKey(key);
  };

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['search', { regionCode, searchKey }],
    queryFn: () => {
      return getSearchList(regionCode, searchKey);
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
        className='sticky top-0 bg-background backdrop-blur-0 z-30'
        inputRef={inputRef}
        onSearch={onSearch}
      />
      <div className='h-screen mx-auto'>
        {searchVideo && (
          <ComponentSearchList
            videoList={searchVideo.items}
            nextPageToken={searchVideo.nextPageToken}
            totalResults={searchVideo.pageInfo.totalResults}
            searchKey={searchKey}
          />
        )}
      </div>
    </>
  );
}
