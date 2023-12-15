'use client';

import React from 'react';
import { Listbox, ListboxItem, Link } from "@nextui-org/react";

interface iThumbnail {
  url: string;
  width: string;
  height: string;
}

export default function ComponentThumbnail({
  dataThumbnail,
  videoId: videoId
}: {
  dataThumbnail: iThumbnail,
  videoId: string
}) {
  const onPress = () => { }
  const fallbackSrc = `https://via.placeholder.com/${dataThumbnail.width}x${dataThumbnail.height}`;

  return (
    <>
      <Link isExternal href={process.env.YOUTUBE_URL_WATCH + videoId}>
        <Listbox aria-label='thumbnail'>

          <ListboxItem key={videoId} textValue={videoId}>
            <img src={dataThumbnail.url} />
          </ListboxItem>

        </Listbox>
      </Link>
    </>
  )
}
