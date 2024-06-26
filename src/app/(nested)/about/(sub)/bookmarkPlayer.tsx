'use client';

import React, { MouseEventHandler, useEffect, useState } from 'react';
import SubTemplate from './template';
import ComponentPlayer from '@/components/(youtube)/player';
import { IonAlert, IonButton, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonIcon, IonRow, useIonAlert } from '@ionic/react';
import DecodedText from '@/components/template/decodedText';
import { share, trash } from 'ionicons/icons';
import { iBookmark } from '@/shared/interface/bookmark';
import { Capacitor } from '@capacitor/core';
import { Share } from '@capacitor/share';
import { checkVideoExist, downloadVideo, getVideoInfo } from '@/utils/video';
import { ProgressStatus } from '@capacitor/filesystem';
import { ComponentProgressBar } from '@/components/(youtube)/progress';

const THUMBNAIL_EXT_0 = '0.jpg';
const THUMBNAIL_EXT_ST_DEFAULT = 'sddefault.jpg';

export default function BookmarkPlayerPage({
  bookmark,
  onClickDelete
}: {
  bookmark: iBookmark;
  onClickDelete: MouseEventHandler<HTMLIonButtonElement>
}) {
  const [videoURL, setVideoURL] = useState('');
  const [videoThumbnail, setVideoThumbnail] = useState('');
  const [percent, setPercent] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [presentAlert] = useIonAlert();

  useEffect(() => {
    if (!videoThumbnail && process.env.YOUTUBE_URL_THUMBNAIL) {
      setVideoThumbnail(`${process.env.YOUTUBE_URL_THUMBNAIL}${bookmark.id}/${THUMBNAIL_EXT_ST_DEFAULT}`);
    }
    
    checkVideoExist(bookmark.name).then((videoExist) => {
      if (videoExist && videoExist.uri) {
        setIsDownloaded(true);
        setVideoURL(Capacitor.convertFileSrc(videoExist.uri));
      }
    });
  }, [])

  const onClickShare = async () => {
    if ('web' === Capacitor.getPlatform()) {
      return;
    }

    await Share.share({
      url: bookmark.url,
    });
  };

  const onClickDownload = async () => {
    if (isDownloaded && !showProgress) {
      presentAlert({
        header: 'Alert',
        message: 'Video already downloaded.',
        buttons: ['OK'],
      })
      return;
    }

    if (isDownloaded || showProgress) {
      return;
    }

    const video = await getVideoInfo({videoURL: bookmark.url});
    if (!video) {
      return;
    }

    setVideoURL(video.url);
    setShowProgress(true);

    await downloadVideo(bookmark.name, video.url, onDownloadProgress);
    const videoURI = await checkVideoExist(bookmark.name);

    if (videoURI && videoURI.uri) {
      setVideoURL(Capacitor.convertFileSrc(videoURI.uri));
    }

    setIsDownloaded(true);
    setShowProgress(false);
  };

  const onDownloadProgress = (status: ProgressStatus) => {
    setPercent(parseFloat(((status.bytes / status.contentLength) * 100).toFixed(2)));
  }

  const onClickDeleteCurrent = async (event: React.MouseEvent<HTMLIonButtonElement>) => {
    onClickDelete(event);
    const nav = document.getElementById('aboutNav') as HTMLIonNavElement;
    if (!nav) {
      return;
    }
    nav.pop();
  }

  return (
    <>
      <SubTemplate title='Bookmark Player'>
        <IonCardHeader>
          <IonCardTitle color={'primary'} className='text-base'>
            <DecodedText text={bookmark.name}/>
          </IonCardTitle>
        </IonCardHeader>

        <IonCardContent id='vid'>
          {
            (isDownloaded && videoURL)
              ? 
                <video controls className='w-full h-full object-cover rounded-xl aspect-video' poster={videoThumbnail} >
                  <source src={videoURL} type='video/mp4' />
                  Sorry, your browser doesn't support embedded video
                </video>
              : <ComponentPlayer videoId={bookmark.id} />
          }
        </IonCardContent>

        <IonGrid>
          <IonRow className='text-center'>
            <IonCol>
              <IonButton
                expand='block'
                color={'primary'}
                fill='outline'
                onClick={onClickShare}
              >
                <IonIcon slot='icon-only' icon={share} />
              </IonButton>
            </IonCol>

            <IonCol>
              <IonButton
                id='delete-bookmark-alert'
                expand='block'
                color={'danger'}
                fill='outline'
              >
                <IonIcon slot='icon-only' icon={trash}></IonIcon>
              </IonButton>

              <IonAlert
                  trigger='delete-bookmark-alert'
                  header='Warning!'
                  message='Are you sure to delete?'
                  buttons={[
                    {
                      text: 'Cancel',
                      role: 'cancel',
                      handler: () => {},
                    },
                    {
                      text: 'OK',
                      role: 'confirm',
                      handler: onClickDeleteCurrent,
                    },
                  ]}
                />
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <ComponentProgressBar
                percent={percent}
                showProgress={showProgress}
                isDownloaded={isDownloaded}
                onClick={onClickDownload}
              />
            </IonCol>
          </IonRow>

        </IonGrid>
      </SubTemplate>
    </>
  );
}
