import React from 'react';
import { iChannelItem } from '@/shared/interface/channel';
import { MdCalendarMonth, MdLibraryAdd, MdSubscriptions, MdVisibility } from 'react-icons/md';
import { Card } from 'konsta/react';

export default function ComponentChannel({
  dataChannel,
}: {
  dataChannel: iChannelItem;
}) {
  const date = new Date(dataChannel.snippet.publishedAt);
  const formatDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

  return (
    <>
      <Card>
        <div className='flex flex-row gap-10 justify-center items-center'>
          <div className='flex flex-col items-center'>
            <img src={dataChannel.snippet.thumbnails.default.url} />
            <div className='text-primary'>
              {dataChannel.snippet.customUrl}
            </div>
          </div>

          <div className='flex flex-col'>
            <div className='flex gap-2 items-center'>
              <MdLibraryAdd />
              <div>{dataChannel.statistics.subscriberCount}</div>
            </div>
            <div className='flex gap-2 items-center'>
              <MdVisibility />
              <div>{dataChannel.statistics.viewCount}</div>
            </div>
            <div className='flex gap-2 items-center'>
              <MdSubscriptions />
              <div>{dataChannel.statistics.videoCount}</div>
            </div>
            <div className='flex gap-2 items-center'>
              <MdCalendarMonth />
              <div>{formatDate}</div>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
