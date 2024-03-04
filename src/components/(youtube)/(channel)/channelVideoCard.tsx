'use client';

import React, { useState } from 'react';
import ComponentPlayer from '@/components/(youtube)/player';
import { iChannelVideoItem } from '@/shared/interface/channelVideo';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonLabel } from '@ionic/react';
import { caretDown, caretUp, shareSocial } from 'ionicons/icons';
import DecodedText from '@/components/template/decodedText';
import { formatDate } from '@/utils/helper';
import { Capacitor } from '@capacitor/core';
import { Share } from '@capacitor/share';

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

  const onClickShare = async (event: React.SyntheticEvent) => {
    if ('web' === Capacitor.getPlatform()) {
      return;
    }

    if (!event || !event.currentTarget) {
      return;
    }

    if (!event.currentTarget.hasAttribute('data-videoid')) {
      return;
    }
    const videoId = event.currentTarget.getAttribute('data-videoid');
    if (null == videoId) {
      return;
    }

    await Share.share({
      url: process.env.YOUTUBE_URL_WATCH + videoId,
    });
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
          <IonButton
            onClick={onClickShare}
            data-videoid={video.id}
            slot='icon-only'
            fill='clear'
          >
            <IonIcon size='default' icon={shareSocial} />
          </IonButton>

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

        <div className='hiddenDescClass hidden whitespace-pre-wrap'>
          <IonCardContent>{video.snippet.description}</IonCardContent>
        </div>
        
      </IonCard>
    </>
  );
}
