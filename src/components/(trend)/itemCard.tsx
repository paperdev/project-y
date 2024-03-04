'use client';

import React, { useRef } from 'react';
import { iTrendItem } from '@/shared/interface/trendItem';
import ComponentImage from '@/components/(trend)/image';
import ComponentRelatedSearch from '@/components/(trend)/relatedSearch';
import ComponentRelatedNews from '@/components/(trend)/relatedNews';
import { Browser } from '@capacitor/browser';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonChip,
  IonIcon,
  IonItem,
  IonLabel,
} from '@ionic/react';
import { openOutline } from 'ionicons/icons';
import DecodedText from '../template/decodedText';

export default function ComponentItemCard({ item }: { item: iTrendItem }) {
  const hiddenRef = useRef<HTMLDivElement>(null);

  const onClickExpand = () => {
    if (!hiddenRef || !hiddenRef.current) {
      return;
    }

    const isHidden = hiddenRef.current.classList.contains('hidden');
    if (isHidden) {
      hiddenRef.current.classList.remove('hidden');
    } else {
      hiddenRef.current.classList.add('hidden');
    }
  };

  return (
    <>
      <IonCard>
        <IonItem button={true} onClick={onClickExpand} detail={false}>
          <IonCardContent slot='end'>
            <ComponentImage
              className=''
              dataImage={item.image}
              isShownLink={true}
              isShownSource={true}
            />
          </IonCardContent>

          <IonCardHeader className='gap-1'>
            <IonChip 
              color={'primary'}
              onClick={() => {
                Browser.open({
                  url: process.env.GOOGLE_TREND_URL + item.title.exploreLink,
                });
              }}
            >
              <IonLabel>Statistics</IonLabel>
              <IonIcon icon={openOutline} />
            </IonChip>

            <IonLabel className='text-xs ml-1'>
              Searches : {item.formattedTraffic}
            </IonLabel>
            <IonCardTitle color={'primary'}>
              <DecodedText text={item.title.query} className='' />
            </IonCardTitle>
          </IonCardHeader>
        </IonItem>

        <div ref={hiddenRef} className='hidden'>
          <ComponentRelatedSearch
            className='flex flex-row gap-1'
            relatedSearches={item.relatedQueries}
          />

          <ComponentRelatedNews
            className='flex flex-row gap-1'
            relatedNews={item.articles}
          />
        </div>
      </IonCard>
    </>
  );
}
