'use client';

import React from 'react';
import { iImage } from '@/shared/interface/trendItem';
import { IonLabel } from '@ionic/react';

export default function ComponentImage({
  className,
  dataImage,
  isShownLink,
  isShownSource,
}: {
  className: string;
  dataImage: iImage;
  isShownLink: boolean;
  isShownSource: boolean;
}) {
  if (!dataImage) {
    return <></>;
  }

  return (
    <div className={`${className} relative`}>
      {isShownLink ? (
        <IonLabel
          onClick={() => {
            window.open(dataImage.newsUrl, '_blank', 'noopener,noreferrer');
          }}
        >
          <img
            className='z-0 object-cover rounded-lg'
            src={dataImage.imageUrl}
          />
        </IonLabel>
      ) : (
        <img className='z-0 object-cover rounded-lg' src={dataImage.imageUrl} />
      )}

      {
        isShownSource && (
          <div className='absolute bottom-1 text-tiny text-white m-auto left-0 right-0 grid place-items-center'>
            {dataImage.source}
          </div>
        )
      }
    </div>
  );
}
