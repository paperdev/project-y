'use client';

import React, { useState } from 'react';
import ComponentPlayer from '@/components/(youtube)/player';
import { ComponentTag, ComponentHiddenTag } from '@/components/(youtube)/tag';
import { iTrendVideoItem } from '@/shared/interface/trendVideo';
import ComponentChannelButton from '@/components/(youtube)/channelButton';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonLabel } from '@ionic/react';
import { bookmark, caretDown, caretUp, chatboxEllipses, chevronCollapse, chevronExpand, eye, heartCircle } from 'ionicons/icons';

export default function ComponentTrendVideoCard({
  video,
}: {
  video: iTrendVideoItem;
}) {
  const [tagExpanded, setTagExpanded] = useState<boolean>(false);
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

  const onClickTagExpand = (event: React.SyntheticEvent) => {
    if (!event || !event.currentTarget) {
      return;
    }

    const currentTagElement =
      event.currentTarget.parentElement?.parentElement?.getElementsByClassName(
        'hiddenTagClass'
      )[0];
    const isHidden = currentTagElement?.classList.contains('hidden');
    if (isHidden) {
      currentTagElement?.classList.remove('hidden');
    } else {
      currentTagElement?.classList.add('hidden');
    }

    if (!event.currentTarget.hasAttribute('data-videoid')) {
      return;
    }
    const videoId = event.currentTarget.getAttribute('data-videoid');
    if (null == videoId) {
      return;
    }

    setTagExpanded(!tagExpanded);
  };

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
          <div className=''>
            <div className='flex justify-between'>
              <ComponentTag
                className='flex flex-wrap gap-1'
                tags={video.snippet.tags}
              />

              <IonButton
                onClick={onClickTagExpand}
                data-videoid={video.id}
                slot='icon-only'
                size='small'
                fill='clear'
              >
                {tagExpanded ? (
                  <IonIcon icon={chevronCollapse} />
                ) : (
                  <IonIcon icon={chevronExpand} />
                )}
              </IonButton>
            </div>

            <div className='hiddenTagClass hidden pt-1'>
              <ComponentHiddenTag
                className='flex flex-wrap gap-1'
                tags={video.snippet.tags}
              />
            </div>
          </div>

          <div className='mt-2'>
            <ComponentPlayer videoId={video.id} />
          </div>

          <div className='flex flex-row justify-between'>
            <div className='flex flex-row gap-4'>
              {video.statistics && (
                <>
                  <div className='flex gap-1 items-center'>
                    <IonIcon icon={heartCircle} />
                    <div>{video.statistics.likeCount}</div>
                  </div>

                  <div className='flex gap-1 items-center'>
                    <IonIcon icon={eye} />
                    <div>{video.statistics.viewCount}</div>
                  </div>

                  <div className='flex gap-1 items-center'>
                    <IonIcon icon={chatboxEllipses} />
                    <div>{video.statistics.commentCount}</div>
                  </div>

                  <div className='flex gap-1 items-center'>
                    <IonIcon icon={bookmark} />
                    <div>{video.statistics.favoriteCount}</div>
                  </div>
                </>
              )}
            </div>

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
