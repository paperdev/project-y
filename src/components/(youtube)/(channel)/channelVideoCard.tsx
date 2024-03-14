'use client';

import React, { useState } from 'react';
import ComponentPlayer from '@/components/(youtube)/player';
import { iChannelVideoItem } from '@/shared/interface/channelVideo';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonLabel, useIonToast } from '@ionic/react';
import { bookmark, bookmarkOutline, caretBackCircleOutline, caretDownCircleOutline, caretForwardCircleOutline, caretUpCircleOutline, shareOutline } from 'ionicons/icons';
import DecodedText from '@/components/template/decodedText';
import { formatDate } from '@/utils/helper';
import { Capacitor } from '@capacitor/core';
import { Share } from '@capacitor/share';
import { Preferences } from '@capacitor/preferences';

export default function ComponentChannelVideoCard({
  video,
}: {
  video: iChannelVideoItem;
}) {
  const [descExpanded, setDescExpanded] = useState<boolean>(false);
  const [buttonExpanded, setButtonExpanded] = useState<boolean>(false);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [isBookmarkable, setIsBookmarkable] = useState<boolean>(true);

  const [present] = useIonToast();
  const presentToast = (position: 'top' | 'middle' | 'bottom', message: string, color: string, cssClass: string) => {
    setIsBookmarkable(false);

    present({
      color: color,
      cssClass: cssClass,
      message: message,
      duration: 2000,
      position: position,
      positionAnchor: 'footer'
    });

    setTimeout(() => {
      setIsBookmarkable(true);
    }, 2500);
  };

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

  const onClickBookmark = async (event: React.SyntheticEvent) => {
    if (!isBookmarkable) {
      return;
    }

    if (!isBookmarked) {
      presentToast('bottom', 'Bookmark successfully created.', 'success', 'text-blue-500 font-bold');
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
    }
    else {
      presentToast('bottom', 'Bookmark successfully deleted.', 'warning', 'text-red-500 font-bold');
      await Preferences.remove({key: video.id});
    }
    
    setIsBookmarked(!isBookmarked);
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

  const onClickButtonExpand = async (event: React.SyntheticEvent) => {
    if (!event || !event.currentTarget) {
      return;
    }

    const currentDescElement =
      event.currentTarget.parentElement?.getElementsByClassName(
        'hiddenButtonClass'
      )[0];
    currentDescElement?.classList.toggle('invisible');

    const { value } = await Preferences.get({ key: video.id });
    setIsBookmarked(value ? true : false);
    setButtonExpanded(!buttonExpanded);
  }

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
          {/* <IonButton
            onClick={onClickShare}
            data-videoid={video.id}
            slot='icon-only'
            fill='clear'
          >
            <IonIcon size='default' icon={shareSocial} />
          </IonButton> */}

          <div className='relative'>
            <IonButton
              onClick={onClickButtonExpand}
              data-videoid={video.id}
              slot='icon-only'
              fill='clear'
            >
              {buttonExpanded ? (
                <IonIcon icon={caretBackCircleOutline} size='large' />
              ) : (
                <IonIcon icon={caretForwardCircleOutline} size='large' />
              )}
            </IonButton>

            <div className='hiddenButtonClass invisible flex flex-row absolute top-0 left-16 z-30 bg-white dark:bg-[#1C1C1D]'>
              <IonButton
                onClick={onClickBookmark}
                slot='icon-only'
                fill='clear'
              >
                {
                  isBookmarked
                    ? <IonIcon size='large' icon={bookmark}/>
                    : <IonIcon size='large' icon={bookmarkOutline}/>
                }
              </IonButton>
              <IonButton
                onClick={onClickShare}
                data-videoid={video.id}
                slot='icon-only'
                fill='clear'
              >
                <IonIcon size='large' icon={shareOutline} />
              </IonButton>
            </div>
          </div>

          <IonButton
            onClick={onClickDescExpand}
            data-videoid={video.id}
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
