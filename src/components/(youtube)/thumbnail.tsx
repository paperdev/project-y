'use client';

import React from 'react';
import {
  Link,
  ImageList,
  ImageListItem,
} from '@mui/material';

export default function ComponentThumbnail({
  dataThumbnail,
  videoId: videoId
}: {
  dataThumbnail: {
    url: string,
    width: string,
    height: string
  },
  videoId: string
}) {
  const onPress = () => { }
  const fallbackSrc = `https://via.placeholder.com/${dataThumbnail.width}x${dataThumbnail.height}`;

  return (
    <>
      <Link href={process.env.YOUTUBE_URL_WATCH + videoId}>
        <ImageList>

          <ImageListItem>
            <img src={dataThumbnail.url} />
          </ImageListItem>

        </ImageList>
      </Link>
    </>
  )
}
