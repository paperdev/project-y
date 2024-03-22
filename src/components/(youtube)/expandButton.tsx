import { addBookmark, deleteBookmark, getBookmark } from '@/utils/preferences';
import { Capacitor } from '@capacitor/core';
import { Share } from '@capacitor/share';
import { IonButton, IonIcon, useIonToast } from '@ionic/react';
import { bookmark, bookmarkOutline, caretBackCircleOutline, caretForwardCircleOutline, shareOutline } from 'ionicons/icons';
import { useState } from 'react';

export default function ComponentExpandButton({
  videoId,
  videoTitle,
  channelTitle,
}: {
  videoId: string;
  videoTitle: string;
  channelTitle: string;
}) {
  const [buttonExpanded, setButtonExpanded] = useState<boolean>(false);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [isBookmarkable, setIsBookmarkable] = useState<boolean>(true);

  const [present] = useIonToast();
  const presentToast = (position: 'top' | 'middle' | 'bottom', message: string, cssClass: string) => {
    present({
      color: 'medium',
      cssClass: `${cssClass} text-center font-bold`,
      message: message,
      duration: 2000,
      position: position,
      positionAnchor: 'footer',
      translucent: true,
      onWillPresent: () => {setIsBookmarkable(false);},
      onDidDismiss: () => {setIsBookmarkable(true);},
    });
  };

  const onClickBookmark = async (event: React.SyntheticEvent) => {
    if (!isBookmarkable) {
      return;
    }

    if (!isBookmarked) {
      presentToast('bottom', 'Bookmark successfully created.', '');
      await addBookmark(
        videoId,
        {
          id: videoId,
          group: channelTitle,
          name: videoTitle,
          url: process.env.YOUTUBE_URL_WATCH + videoId,
          timestamp: Date.now().toString()
        }
      )
    }
    else {
      presentToast('bottom', 'Bookmark successfully deleted.', '');
      await deleteBookmark(videoId);
    }
    
    setIsBookmarked(!isBookmarked);
  };

  const onClickShare = async (event: React.SyntheticEvent) => {
    if ('web' === Capacitor.getPlatform()) {
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

    if (buttonExpanded) {
      currentDescElement?.classList.remove('animate__fadeInLeft');
      currentDescElement?.classList.add('animate__fadeOutLeft');
      setTimeout(()=>{
        currentDescElement?.classList.add('invisible');
      }, 200);
    }
    else {
      currentDescElement?.classList.remove('invisible');
      currentDescElement?.classList.remove('animate__fadeOutLeft');
      currentDescElement?.classList.add('animate__fadeInLeft');
    }
    
    const value = await getBookmark(videoId);
    setIsBookmarked(value ? true : false);
    setButtonExpanded(!buttonExpanded);
  }

  return (
    <>
      <div className='relative'>
        <IonButton
          onClick={onClickButtonExpand}
          fill='clear'
        >
          {buttonExpanded ? (
            <IonIcon slot='icon-only' icon={caretBackCircleOutline} size='large' />
          ) : (
            <IonIcon slot='icon-only' icon={caretForwardCircleOutline} size='large' />
          )}
        </IonButton>

        <div className='animate__animated animate__faster hiddenButtonClass invisible flex flex-row absolute top-0 left-16 z-30 bg-white dark:bg-[#1C1C1D]'>
          <IonButton
            onClick={onClickBookmark}
            fill='clear'
          >
            {
              isBookmarked
                ? <IonIcon slot='icon-only' size='large' icon={bookmark}/>
                : <IonIcon slot='icon-only' size='large' icon={bookmarkOutline}/>
            }
          </IonButton>
          <IonButton
            onClick={onClickShare}
            fill='clear'
          >
            <IonIcon slot='icon-only' size='large' icon={shareOutline} />
          </IonButton>
        </div>

        {/* <div className='hiddenButtonClass hidden absolute -top-24 left-2 space-y-3'>
          <IonFabButton
            size='small'
            onClick={onClickShare}
          >
            <IonIcon icon={bookmarkOutline} className='text-white dark:text-gray-800'/>
          </IonFabButton>
          <IonFabButton size='small'>
            <IonIcon icon={shareSocialOutline} className='text-white dark:text-gray-800'/>
          </IonFabButton>
        </div> */}
      </div>
    </>
  );
}
