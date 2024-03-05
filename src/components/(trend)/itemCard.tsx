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

          <IonCardContent slot='start'>
            <IonLabel color={'primary'}>
              <DecodedText text={item.title.query} className='text-xl font-bold' />
            </IonLabel>

            <IonLabel className='text-xs'>
              Searches: {item.formattedTraffic}
            </IonLabel>
            
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
          </IonCardContent>

          <IonCardContent slot='end'>
            <ComponentImage
              className=''
              dataImage={item.image}
              isShownLink={true}
              isShownSource={true}
            />
          </IonCardContent>

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
