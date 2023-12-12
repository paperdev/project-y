'use client';

import React from 'react';
import { Link, Card, CardFooter, Image } from '@nextui-org/react';
import { iImage } from '@/shared/interface/searchItem';

export default function ComponentImage({
  dataImage,
}: {
  dataImage: iImage,
}) {
  if (!dataImage) {
    return <></>
  }
  
  return (
    <>
      <Card>
        <Link isExternal href={dataImage.newsUrl}>
          <Image
            removeWrapper
            className='z-0 object-cover'
            src={dataImage.imageUrl}
          />
        </Link>

        <CardFooter className='absolute bottom-0 rounded-lg'>
          <div className='flex mx-auto text-tiny text-default'>
            {dataImage.source}
          </div>
        </CardFooter>
      </Card>
    </>
  )
}
