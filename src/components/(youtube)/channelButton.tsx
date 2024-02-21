'use client';

import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonModal, IonTitle, IonToolbar } from '@ionic/react';
import ChannelPage from '@/app/(pages)/channel/page';
import { useContext, useEffect, useRef, useState } from 'react';
import { expand } from 'ionicons/icons';
import { QueryContext, SetQueryContext } from '@/app/providers';

export default function ComponentChannelButton({
  channelId,
  channelTitle,
  etag,
}: {
  channelId: string;
  channelTitle: string;
  etag: string;
}) {
  const modal = useRef<HTMLIonModalElement>(null);
  const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);
  const query = useContext(QueryContext);
  const setQuery = useContext(SetQueryContext);

  const onClickChannel = () => {
    setQuery({
      regionCode: query.regionCode,
      videoCategoryId: query.videoCategoryId,
      channelId: channelId,
      searchKey: query.searchKey,
    });
  }

  const onClickClose = () => {
    modal.current?.dismiss();
  }

  useEffect(() => {
    const rootPage = document.getElementById('rootPage');
    if (!rootPage) {
      return;
    }

    setPresentingElement(rootPage);
  });
  
  return (
    <>
      <IonButton
        id={`open-channel-${channelId}-${etag}`}
        fill='clear'
        onClick={onClickChannel}
      >
        {channelTitle}
        <IonIcon slot="end" icon={expand}></IonIcon>
      </IonButton>

      <IonModal
        ref={modal}
        trigger={`open-channel-${channelId}-${etag}`}
        presentingElement={presentingElement!}
      >
        <IonHeader>
          <IonToolbar>
            <IonTitle color={'primary'}>{channelTitle}</IonTitle>
            <IonButtons slot='end'>
              <IonButton onClick={onClickClose}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className='ion-padding'>
          <ChannelPage/>
        </IonContent>
      </IonModal>
    </>
  );
}
