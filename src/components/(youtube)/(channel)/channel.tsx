import React from 'react';
import { iChannelItem } from '@/shared/interface/channel';
import { IonCardContent, IonIcon, IonImg } from '@ionic/react';
import { albums, bookmarks, calendar, eye } from 'ionicons/icons';
import { formatDate, formatNumber } from '@/utils/helper';

export default function ComponentChannel({
  dataChannel,
}: {
  dataChannel: iChannelItem;
}) {
  return (
    <>
      <IonCardContent className='flex flex-row gap-x-10 justify-center items-center'>
        <div className='flex flex-col items-center'>
          <IonImg src={dataChannel.snippet.thumbnails.default.url} />
        </div>

        <div className='flex flex-col'>
          <div className='flex gap-2 items-center'>
            <IonIcon icon={bookmarks} />
            <div>{formatNumber(dataChannel.statistics.subscriberCount)}</div>
          </div>
          <div className='flex gap-2 items-center'>
            <IonIcon icon={eye} />
            <div>{formatNumber(dataChannel.statistics.viewCount)}</div>
          </div>
          <div className='flex gap-2 items-center'>
            <IonIcon icon={albums} />
            <div>{formatNumber(dataChannel.statistics.videoCount)}</div>
          </div>
          <div className='flex gap-2 items-center'>
            <IonIcon icon={calendar} />
            <div>{formatDate(dataChannel.snippet.publishedAt)}</div>
          </div>
        </div>
      </IonCardContent>
    </>
  );
}
