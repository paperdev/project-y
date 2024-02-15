'use client';

import React from 'react';
import ComponentPlayer from '@/components/(youtube)/player';
import { iSearchVideoItem } from '@/shared/interface/searchVideo';
import ComponentChannelButton from '@/components/(youtube)/channelButton';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonLabel,
} from '@ionic/react';

export default function ComponentSearchVideoCard({
  video,
}: {
  video: iSearchVideoItem;
}) {
  return (
    <>
      <IonCard>
        <IonCardHeader>
          <IonCardSubtitle className='flex items-center'>
            <div className=''>Channel : </div>
            <ComponentChannelButton
              channelId={video.snippet.channelId}
              channelTitle={video.snippet.channelTitle}
            />
          </IonCardSubtitle>
          <IonLabel className='ml-2'>{video.snippet.publishedAt}</IonLabel>
          <IonCardTitle color={'primary'} className='text-xl'>
            {video.snippet.title}
          </IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
          <ComponentPlayer videoId={video.id.videoId} />

          <div className='whitespace-pre-wrap text-black dark:text-white mt-2'>
            {video.snippet.description}
          </div>
        </IonCardContent>
      </IonCard>
    </>
  );
}
