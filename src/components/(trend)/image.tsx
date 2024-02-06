'use client';

import React from 'react';
import { iImage } from '@/shared/interface/trendItem';
import { Browser } from '@capacitor/browser';
import { Card, Link } from 'konsta/react';

export default function ComponentImage({
  dataImage,
  isShownLink,
}: {
  dataImage: iImage;
  isShownLink: boolean;
}) {
  if (!dataImage) {
    return <></>;
  }

  return (
    <>
      <Card
        footer={
          // <div className='absolute bottom-0 rounded-lg'>
          <div className='flex mx-auto text-tiny text-default'>
            {dataImage.source}
          </div>
          // </div>
        }
      >
        {isShownLink ? (
          <Link
            onClick={() => {
              Browser.open({
                url: dataImage.newsUrl,
              });
            }}
          >
            <img className='z-0 object-cover' src={dataImage.imageUrl} />
          </Link>
        ) : (
          <img className='z-0 object-cover' src={dataImage.imageUrl} />
        )}
      </Card>
    </>
  );
}
