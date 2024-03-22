'use client';

import React, { MouseEventHandler } from 'react';
import SubTemplate from './template';
import ComponentPlayer from '@/components/(youtube)/player';
import { IonButton, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonIcon, IonRow } from '@ionic/react';
import DecodedText from '@/components/template/decodedText';
import { share, trash } from 'ionicons/icons';
import { iBookmark } from '@/shared/interface/bookmark';
import { Capacitor } from '@capacitor/core';
import { Share } from '@capacitor/share';

export default function BookmarkPlayerPage({
  bookmark,
  onClickDelete
}: {
  bookmark: iBookmark;
  onClickDelete: MouseEventHandler<HTMLIonButtonElement>
}) {
  const onClickShare = async () => {
    if ('web' === Capacitor.getPlatform()) {
      return;
    }

    await Share.share({
      url: bookmark.url,
    });
  };

  const onClickDeleteCurrent = async (event: React.SyntheticEvent) => {
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

        <IonCardContent>
          <ComponentPlayer videoId={bookmark.id} />
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
                expand='block'
                color={'danger'}
                fill='outline'
                onClick={
                  (event) => {
                    onClickDelete(event);
                    onClickDeleteCurrent(event);
                  } 
                }
              >
                <IonIcon slot='icon-only' icon={trash}></IonIcon>
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </SubTemplate>
    </>
  );
}
