'use client';

import React, { useState } from 'react';
import ComponentPlayer from '@/components/(youtube)/player';
import { ComponentTag, ComponentHiddenTag } from '@/components/(youtube)/tag';
import { iTrendVideoItem } from '@/shared/interface/trendVideo';
import ComponentChannelButton from '@/components/(youtube)/channelButton';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonLabel, IonToast, useIonToast } from '@ionic/react';
import { bookmark, bookmarkOutline, caretDownCircleOutline, caretUpCircleOutline, chatboxEllipses, chevronCollapse, chevronExpand, eye, heartCircle, shareOutline } from 'ionicons/icons';
import DecodedText from '@/components/template/decodedText';
import { formatDate, formatNumber } from '@/utils/helper';
import { Capacitor } from '@capacitor/core';
import { Share } from '@capacitor/share';
import { Preferences } from '@capacitor/preferences';

export default function ComponentTrendVideoCard({
  video,
}: {
  video: iTrendVideoItem;
}) {
  const [tagExpanded, setTagExpanded] = useState<boolean>(false);
  const [descExpanded, setDescExpanded] = useState<boolean>(false);
  const [buttonExpanded, setButtonExpanded] = useState<boolean>(false);

  const [present] = useIonToast();
  const presentToast = (position: 'top' | 'middle' | 'bottom') => {
    present({
      message: 'Bookmark successfully created.',
      duration: 3000,
      position: position,
      positionAnchor: 'footer'
    });
  };

  const onClickDescExpand = (event: React.SyntheticEvent) => {
    if (!event || !event.currentTarget) {
      return;
    }

    const currentDescElement =
      event.currentTarget.parentElement?.parentElement?.getElementsByClassName(
        'hiddenDescClass'
      )[0];
    currentDescElement?.classList.toggle('hidden');

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
    currentTagElement?.classList.toggle('hidden');

    if (!event.currentTarget.hasAttribute('data-videoid')) {
      return;
    }
    const videoId = event.currentTarget.getAttribute('data-videoid');
    if (null == videoId) {
      return;
    }

    setTagExpanded(!tagExpanded);
  };

  const onClickBookmark = async (event: React.SyntheticEvent) => {
    await Preferences.set({
      key: video.id,
      value: JSON.stringify(
        {
          id: video.id,
          group: video.snippet.channelTitle,
          name: video.snippet.title,
          url: process.env.YOUTUBE_URL_WATCH + video.id,
          timestamp: Date.now().toString()
        }
      ),
    });

    presentToast('bottom');
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

  const onClickButtonExpand = (event: React.SyntheticEvent) => {
    if (!event || !event.currentTarget) {
      return;
    }

    const currentDescElement =
      event.currentTarget.parentElement?.getElementsByClassName(
        'hiddenButtonClass'
      )[0];
    currentDescElement?.classList.toggle('hidden');

    setButtonExpanded(!buttonExpanded);
  }

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
          <div className='relative'>
            <IonButton
              onClick={onClickButtonExpand}
              data-videoid={video.id}
              slot='icon-only'
              fill='clear'
            >
              {buttonExpanded ? (
                <IonIcon icon={caretDownCircleOutline} size='large' />
              ) : (
                <IonIcon icon={caretUpCircleOutline} size='large' />
              )}
            </IonButton>

            <div className='hiddenButtonClass hidden absolute -top-24 -space-y-4'>
              <IonButton
                onClick={onClickBookmark}
                slot='icon-only'
                fill='clear'
              >
                <IonIcon size='large' icon={bookmarkOutline} className='rounded-full bg-white dark:bg-gray-800'/>
              </IonButton>
              <IonButton
                onClick={onClickShare}
                data-videoid={video.id}
                slot='icon-only'
                fill='clear'
              >
                <IonIcon size='large' icon={shareOutline} className='rounded-full bg-white dark:bg-gray-800'/>
              </IonButton>
            </div>

            {/* <div className='hiddenButtonClass hidden absolute -top-24 left-2 space-y-3'>
              <IonFabButton
                size='small'
                onClick={onClickShare}
                data-videoid={video.id}
              >
                <IonIcon icon={bookmarkOutline} className='text-white dark:text-gray-800'/>
              </IonFabButton>
              <IonFabButton size='small'>
                <IonIcon icon={shareSocialOutline} className='text-white dark:text-gray-800'/>
              </IonFabButton>
            </div> */}
          </div>
          

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
            data-videoid={video.id}
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
