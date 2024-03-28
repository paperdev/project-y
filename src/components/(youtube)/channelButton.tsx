'use client';

import { IonButton, IonButtons, IonChip, IonContent, IonHeader, IonIcon, IonLabel, IonPage, IonTitle, IonToolbar, useIonModal } from '@ionic/react';
import ChannelPage from '@/app/(pages)/channel/page';
import { useContext, useEffect, useState } from 'react';
import { ellipsisHorizontalCircle } from 'ionicons/icons';
import { QueryContext, SetQueryContext } from '@/app/providers';

const ChannelModal = (
  {
    channelTitle,
    onDismiss,
  }: {
    channelTitle: string;
    onDismiss: any;
  }
) => {
  const onClickClose = () => {
    onDismiss();
  }

  return (
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
  )
}

export default function ComponentChannelButton({
  channelId,
  channelTitle,
  etag,
}: {
  channelId: string;
  channelTitle: string;
  etag: string;
}) {
  const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);
  const query = useContext(QueryContext);
  const setQuery = useContext(SetQueryContext);
  const [present, dismiss] = useIonModal(
    ChannelModal,
    {
      channelTitle: channelTitle,
      onDismiss: () => { dismiss(); },
    }
  );

  const onClickChannel = () => {
    setQuery({
      regionCode: query.regionCode,
      videoCategoryId: query.videoCategoryId,
      channelId: channelId,
      searchKey: query.searchKey,
    });

    present(
      {
        initialBreakpoint: 0.95,
        // presentingElement: presentingElement!
      }
    );
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
        onClick={onClickChannel}
      >
        <IonLabel>{channelTitle}</IonLabel>
        <IonIcon icon={ellipsisHorizontalCircle} />
      </IonChip>
    </>
  );
}
