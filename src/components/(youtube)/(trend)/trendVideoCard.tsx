'use client';

import React, { useState } from 'react';
import ComponentPlayer from '@/components/(youtube)/player';
import { ComponentTag, ComponentHiddenTag } from '@/components/(youtube)/tag';
import { iTrendVideoItem } from '@/shared/interface/trendVideo';
import ComponentChannelButton from '@/components/(youtube)/channelButton';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonLabel } from '@ionic/react';
import { bookmark, caretDownCircleOutline, caretUpCircleOutline, chatboxEllipses, chevronCollapse, chevronExpand, eye, heartCircle } from 'ionicons/icons';
import DecodedText from '@/components/template/decodedText';
import { formatDate, formatNumber } from '@/utils/helper';
import ComponentExpandButton from '@/components/(youtube)/expandButton';

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
      event.currentTarget.parentElement?.parentElement?.getElementsByClassName(
        'hiddenDescClass'
      )[0];
    currentDescElement?.classList.toggle('hidden');

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
    currentTagElement?.classList.toggle('hidden');

    setTagExpanded(!tagExpanded);
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
          <IonLabel className='ml-2'>
            {formatDate(video.snippet.publishedAt)}
          </IonLabel>
          <IonCardTitle color={'primary'} className='text-xl'>
            <DecodedText text={video.snippet.title} className='' />
          </IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
          {
            (!video.snippet.tags) 
              ? 
                <IonLabel>No tags!</IonLabel>
              : 
              <div className='flex justify-between'>
                <ComponentTag
                  className='flex flex-wrap gap-1'
                  tags={video.snippet.tags}
                />
    
                <IonButton
                  onClick={onClickTagExpand}
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
          }

          <div className='hiddenTagClass hidden pt-1'>
            <ComponentHiddenTag
              className='flex flex-wrap gap-1'
              tags={video.snippet.tags}
            />
          </div>

          <div className='mt-2'>
            <ComponentPlayer videoId={video.id} />
          </div>
        </IonCardContent>

        <div className='flex flex-row justify-between'>
          <ComponentExpandButton videoId={video.id} videoTitle={video.snippet.title} channelTitle={video.snippet.channelTitle} />

          <div className='flex flex-row gap-4'>
            {video.statistics && (
              <>
                <div className='flex gap-1 items-center'>
                  <IonIcon icon={heartCircle} />
                  <div>{formatNumber(video.statistics.likeCount)}</div>
                </div>

                <div className='flex gap-1 items-center'>
                  <IonIcon icon={eye} />
                  <div>{formatNumber(video.statistics.viewCount)}</div>
                </div>

                <div className='flex gap-1 items-center'>
                  <IonIcon icon={chatboxEllipses} />
                  <div>{formatNumber(video.statistics.commentCount)}</div>
                </div>

                <div className='flex gap-1 items-center'>
                  <IonIcon icon={bookmark} />
                  <div>{formatNumber(video.statistics.favoriteCount)}</div>
                </div>
              </>
            )}
          </div>

          <IonButton
            onClick={onClickDescExpand}
            slot='icon-only'
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
