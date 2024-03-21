'use client';

import React, { MouseEventHandler } from 'react';
import SubTemplate from './templage';
import ComponentPlayer from '@/components/(youtube)/player';
import { IonButton, IonCardContent, IonCardHeader, IonCardTitle, IonIcon } from '@ionic/react';
import DecodedText from '@/components/template/decodedText';
import { trash } from 'ionicons/icons';
import { iBookmark } from '@/shared/interface/bookmark';

export default function BookmarkPlayerPage({
  bookmark,
  onClickDelete
}: {
  bookmark: iBookmark;
  onClickDelete: MouseEventHandler<HTMLIonButtonElement>
}) {
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

          <IonButton
            expand='block'
            className='mt-5'
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
        </IonCardContent>
      </SubTemplate>
    </>
  );
}
