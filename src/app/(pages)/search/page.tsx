'use client';

import { useSearchParams } from 'next/navigation';
import Loading from '@/components/template/loading';
import { getSearchList } from '@/utils/request';
import Error from '@/components/template/error';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import ComponentSearchInput from '@/components/(search)/searchInput';
import ComponentSearchVideo from '@/components/(search)/searchVideo';
import { iSearchVideo } from '@/shared/interface/searchVideo';

export default function Page() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchKey, setSearchKey] = useState<string>('');
  const [dataYoutube, setDataYoutube] = useState<iSearchVideo>();
  const searchParams = useSearchParams();
  const regionCode = searchParams.has('regionCode')
    ? searchParams.get('regionCode')
    : process.env.DEFAULT_REGION;

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
    setDataYoutube(data);
  }, [data, regionCode, searchKey]);

  return (
    <>
      <ComponentSearchInput
        className='sticky top-0 bg-background backdrop-blur-0 z-30'
        inputRef={inputRef}
        onSearch={onSearch}
      />
      <div className='h-screen'>
        {error ? (
          <Error
            messages={[
              'The current region is not available.',
              'Try a different region.',
              'Message: ' + {error},
            ]}
          />
        ) : (
          <>
            {isPending || isFetching ? (
              <Loading />
            ) : (
              <>
                {dataYoutube && (
                  <ComponentSearchVideo
                    dataVideo={dataYoutube.items}
                    nextPageToken={dataYoutube.nextPageToken}
                    totalResults={dataYoutube.pageInfo.totalResults}
                    searchKey={searchKey}
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
