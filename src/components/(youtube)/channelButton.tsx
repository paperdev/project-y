'use client';

import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonModal, IonTitle, IonToolbar } from '@ionic/react';
import ChannelPage from '@/app/(pages)/channel/page';
import { useEffect, useRef, useState } from 'react';
import { expand } from 'ionicons/icons';

export default function ComponentChannelButton({
  channelId,
  channelTitle,
}: {
  channelId: string;
  channelTitle: string;
}) {
  const modal = useRef<HTMLIonModalElement>(null);
  const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);

  function onClickClose() {
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
        id={`open-channel-${channelId}`}
        fill='clear'
      >
        {channelTitle}
        <IonIcon slot="end" icon={expand}></IonIcon>
      </IonButton>
      <IonModal
        ref={modal}
        trigger={`open-channel-${channelId}`}
        presentingElement={presentingElement!}
      >
        <IonHeader>
          <IonToolbar>
            <IonTitle>{channelTitle}</IonTitle>
            <IonButtons slot='end'>
              <IonButton onClick={onClickClose}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className='ion-padding'>
          <ChannelPage channelId={channelId} />
        </IonContent>
      </IonModal>
    </>
  );
}
