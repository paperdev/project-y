'use client';

import { IonButton, IonButtons, IonChip, IonContent, IonHeader, IonIcon, IonLabel, IonModal, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ChannelPage from '@/app/(pages)/channel/page';
import { useContext, useEffect, useRef, useState } from 'react';
import { ellipsisHorizontalCircle } from 'ionicons/icons';
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
      <IonChip 
        color={'primary'}
        id={`open-channel-${channelId}-${etag}`}
        onClick={onClickChannel}
      >
        <IonLabel>{channelTitle}</IonLabel>
        <IonIcon icon={ellipsisHorizontalCircle} />
      </IonChip>

      <IonModal
        showBackdrop={true}
        ref={modal}
        trigger={`open-channel-${channelId}-${etag}`}
        // presentingElement={presentingElement!}
        initialBreakpoint={0.94}
      >
        <IonPage className='ion-padding-top ion-padding-bottom'>

          <IonHeader collapse='condense'>
            <IonToolbar>
              <IonTitle color={'primary'}>{channelTitle}</IonTitle>
              <IonButtons slot='end'>
                <IonButton onClick={onClickClose}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>

          <IonContent>
            <ChannelPage/>
          </IonContent>

        </IonPage>
      </IonModal>
    </>
  );
}
