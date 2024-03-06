'use client';

import React from 'react';
import { iArticle } from '@/shared/interface/trendItem';
import ComponentImage from '@/components/(trend)/image';
import { Browser } from '@capacitor/browser';
import DecodedText from '@/components/template/decodedText';
import { IonCol, IonItem } from '@ionic/react';

export default function ComponentRelatedNews({
  className,
  relatedNews,
}: {
  className: string;
  relatedNews: iArticle[];
}) {
  if (0 === relatedNews.length) {
    return <>No related news!</>;
  }

  return (
    <>
      <div className={`${className} overflow-x-scroll`}>
        {relatedNews.map((article: iArticle, index: number) => {
          if (article.image) {
            return (
              <IonItem
                button={true}
                key={index}
                onClick={() => {
                  Browser.open({
                    url: article.url
                  })
                }}
                className='min-w-full rounded-lg border-with border'
              >
                <IonCol slot='start' size='auto'>
                  <ComponentImage
                    className='flex w-full h-full'
                    dataImage={article.image}
                    isShownLink={false}
                    isShownSource={false}
                  />
                </IonCol>
                <IonCol>
                  <div className='flex flex-col justify-center ml-2'>
                    <DecodedText text={article.title} className='whitespace-pre-wrap line-clamp-2' />
                    <div className='text-xs mt-2'>
                      {article.source} - {article.timeAgo}
                    </div>
                  </div>
                </IonCol>
              </IonItem>
            );
          }
        })}
      </div>
    </>
  );
}
