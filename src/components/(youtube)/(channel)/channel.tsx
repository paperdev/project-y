import React from 'react';
import { iChannelItem } from '@/shared/interface/channel';
import { IonCardContent, IonIcon, IonImg } from '@ionic/react';
import { albums, bookmarks, calendar, eye } from 'ionicons/icons';

export default function ComponentChannel({
  dataChannel,
}: {
  dataChannel: iChannelItem;
}) {
  const date = new Date(dataChannel.snippet.publishedAt);
  const formatDate =
    date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

  return (
    <>
      <IonCardContent className='flex flex-row gap-x-10 justify-center items-center'>
        <div className='flex flex-col items-center'>
          <IonImg src={dataChannel.snippet.thumbnails.default.url} />
        </div>

        <div className='flex flex-col'>
          <div className='flex gap-2 items-center'>
            <IonIcon icon={bookmarks} />
            <div>{dataChannel.statistics.subscriberCount}</div>
          </div>
          <div className='flex gap-2 items-center'>
            <IonIcon icon={eye} />
            <div>{dataChannel.statistics.viewCount}</div>
          </div>
          <div className='flex gap-2 items-center'>
            <IonIcon icon={albums} />
            <div>{dataChannel.statistics.videoCount}</div>
          </div>
          <div className='flex gap-2 items-center'>
            <IonIcon icon={calendar} />
            <div>{formatDate}</div>
          </div>
        </div>
      </IonCardContent>
    </>
  );
}
