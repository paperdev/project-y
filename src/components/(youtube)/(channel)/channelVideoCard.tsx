'use client';

import React, { useState } from 'react';
import ComponentPlayer from '@/components/(youtube)/player';
import { iChannelVideoItem } from '@/shared/interface/channelVideo';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonLabel } from '@ionic/react';
import { caretDown, caretUp } from 'ionicons/icons';

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
      event.currentTarget.parentElement?.parentElement?.parentElement?.getElementsByClassName(
        'hiddenDescClass'
      )[0];
    const isHidden = currentDescElement?.classList.contains('hidden');
    if (isHidden) {
      currentDescElement?.classList.remove('hidden');
    } else {
      currentDescElement?.classList.add('hidden');
    }

    if (!event.currentTarget.hasAttribute('data-videoid')) {
      return;
    }
    const videoId = event.currentTarget.getAttribute('data-videoid');
    if (null == videoId) {
      return;
    }

    setDescExpanded(!descExpanded);
  };

  return (
    <>
      <IonCard>
        
        <IonCardHeader>
            <IonLabel className='ml-2'>{video.snippet.publishedAt}</IonLabel>
            <IonCardTitle color={'primary'} className='text-xl'>
              {video.snippet.title}
            </IonCardTitle>
          </IonCardHeader>

        <IonCardContent>
          <ComponentPlayer videoId={video.snippet.resourceId.videoId} />

          <div className='flex justify-end'>
            <IonButton
              onClick={onClickDescExpand}
              data-videoid={video.id}
              slot='icon-only'
              size='small'
              fill='clear'
            >
              {descExpanded ? (
                <IonIcon icon={caretUp} size='large' />
              ) : (
                <IonIcon icon={caretDown} size='large' />
              )}
            </IonButton>
          </div>

          <div className='hiddenDescClass hidden whitespace-pre-wrap text-black dark:text-white'>
            {video.snippet.description}
          </div>
        </IonCardContent>
        
      </IonCard>
    </>
  );
}
