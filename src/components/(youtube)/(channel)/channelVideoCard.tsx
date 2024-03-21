'use client';

import React, { useState } from 'react';
import ComponentPlayer from '@/components/(youtube)/player';
import { iChannelVideoItem } from '@/shared/interface/channelVideo';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonLabel } from '@ionic/react';
import { caretDownCircleOutline, caretUpCircleOutline } from 'ionicons/icons';
import DecodedText from '@/components/template/decodedText';
import { formatDate } from '@/utils/helper';
import ComponentExpandButton from '@/components/(youtube)/expandButton';

export default function ComponentChannelVideoCard({
  video,
}: {
  video: iChannelVideoItem;
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
          <IonLabel className='ml-2'>{formatDate(video.snippet.publishedAt)}</IonLabel>
          <IonCardTitle color={'primary'} className='text-xl'>
            <DecodedText text={video.snippet.title} />
          </IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
          <ComponentPlayer videoId={video.snippet.resourceId.videoId} />
        </IonCardContent>

        <div className='flex flex-row justify-between'>
          <ComponentExpandButton videoId={video.snippet.resourceId.videoId} videoTitle={video.snippet.title} channelTitle={video.snippet.channelTitle} />

          <IonButton
            onClick={onClickDescExpand}
            size='small'
            fill='clear'
          >
            {descExpanded ? (
              <IonIcon slot='icon-only' icon={caretUpCircleOutline} size='large' />
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
