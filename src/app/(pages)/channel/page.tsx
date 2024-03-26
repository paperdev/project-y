'use client';

import ComponentChannel from '@/components/(youtube)/(channel)/channel';
import Loading from '@/components/template/loading';
import Error from '@/components/template/error';
import { useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getChannel } from '@/utils/request';
import { iChannelItem } from '@/shared/interface/channel';
import ComponentChannelVideoList from '@/components/(youtube)/(channel)/channelVideoList';
import { QueryContext } from '@/app/providers';

export default function Page() {
  const [dataChannel, setDataChannel] = useState<iChannelItem>();
  const query = useContext(QueryContext);
  const channelId = query.channelId;

  if (!channelId) {
    return (
      <Error
        messages={[
          'The channel is invalid.',
        ]}
      />
    );
  }

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
      {
        dataChannel &&
        <>
          <ComponentChannel dataChannel={dataChannel} />
          <ComponentChannelVideoList playlistId={dataChannel.contentDetails.relatedPlaylists.uploads} />
        </>
      }
    </>
  );
}
