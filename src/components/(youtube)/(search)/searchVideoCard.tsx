'use client';

import React, { useState } from 'react';
import ComponentPlayer from '@/components/(youtube)/player';
import { iSearchVideoItem } from '@/shared/interface/searchVideo';
import ComponentChannelButton from '@/components/(youtube)/channelButton';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonLabel,
} from '@ionic/react';
import DecodedText from '@/components/template/decodedText';
import { formatDate } from '@/utils/helper';
import ComponentExpandButton from '@/components/(youtube)/expandButton';
import { caretDownCircleOutline, caretUpCircleOutline } from 'ionicons/icons';

export default function ComponentSearchVideoCard({
  video,
}: {
  video: iSearchVideoItem;
}) {
  const [descExpanded, setDescExpanded] = useState<boolean>(false);

  const onClickDescExpand = (event: React.SyntheticEvent) => {
    if (!event || !event.currentTarget) {
      return;
    }

    const currentDescElement =
      event.currentTarget.parentElement?.parentElement?.getElementsByClassName(
        'hiddenDescClass'
      )[0];

    currentDescElement?.classList.toggle('hidden');

    setDescExpanded(!descExpanded);
  };

  return (
    <>
      <IonCard>
        <IonCardHeader>
          <IonCardSubtitle className='flex items-center'>
            <ComponentChannelButton
              channelId={video.snippet.channelId}
              channelTitle={video.snippet.channelTitle}
              etag={video.etag}
            />
          </IonCardSubtitle>
          <IonLabel className='ml-2'>{formatDate(video.snippet.publishedAt)}</IonLabel>
          <IonCardTitle color={'primary'} className='text-xl'>
            <DecodedText text={video.snippet.title} className='' />
          </IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
          <ComponentPlayer videoId={video.id.videoId} />
        </IonCardContent>

        <div className='flex flex-row justify-between'>
          <ComponentExpandButton videoId={video.id.videoId!} videoTitle={video.snippet.title} channelTitle={video.snippet.channelTitle} />

          <IonButton
            onClick={onClickDescExpand}
            slot='icon-only'
            size='small'
            fill='clear'
          >
            {descExpanded ? (
              <IonIcon icon={caretUpCircleOutline} size='large' />
            ) : (
              <IonIcon icon={caretDownCircleOutline} size='large' />
            )}
          </IonButton>
        </div>

        <div className='hiddenDescClass hidden whitespace-pre-wrap'>
          <IonCardContent>{video.snippet.description}</IonCardContent>
        </div>
        
      </IonCard>
    </>
  );
}
