'use client';

import React, { useEffect, useState } from 'react';
import {
  Card,
  CardBody,
  Image,
} from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import Loading from '@/components/template/loading';
import { getChannel } from '@/utils/request';
import Error from '@/components/template/error';
import { iChannelItem } from '@/shared/interface/channel';

export default function ComponentChannel({
  channelId,
}: {
  channelId: string | null;
}) {
  const [dataChannel, setDataChannel] = useState<iChannelItem>();

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['channel', channelId],
    queryFn: () => {
      return getChannel(channelId);
    },
  });

  useEffect(() => {
    if (data && 0 !== data.items) {
      setDataChannel(data.items[0]);
    }
  }, [data, channelId]);

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
      {dataChannel && (
        <Card
          isBlurred
          shadow='sm'
        >
          <CardBody>
            <div className='flex flex-row gap-10 justify-center'>
              <div className='flex flex-col items-center'>
                <Image src={dataChannel.snippet.thumbnails.default.url} />
                <div className='text-primary-500'>
                  {dataChannel.snippet.customUrl}
                </div>
              </div>
            
              <div className='flex flex-row gap-2 items-center'>
                <div className='flex flex-col'>
                  <div>
                    subscriber Count:
                  </div>
                  <div>
                    view Count:
                  </div>
                  <div>
                    video Count:
                  </div>
                  <div>
                    register Date:
                  </div>
                </div>

                <div>
                  <div>
                    {dataChannel.statistics.subscriberCount}
                  </div>
                  <div>
                    {dataChannel.statistics.viewCount}
                  </div>
                  <div>
                    {dataChannel.statistics.videoCount}
                  </div>
                  <div>
                    {dataChannel.snippet.publishedAt}
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      )}
    </>
  );
}
