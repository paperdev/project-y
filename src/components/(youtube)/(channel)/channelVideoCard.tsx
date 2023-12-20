'use client';

import React, { useState } from 'react';
import ComponentPlayer from '@/components/(youtube)/player';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from '@nextui-org/react';
import {
  MdExpandMore,
  MdExpandLess,
} from 'react-icons/md';
import { iChannelVideoItem } from '@/shared/interface/channelVideo';
import DecodedText from '@/components/template/decodedText';

export default function ComponentChannelVideoCard({
  video
}: {
  video: iChannelVideoItem
}) {
  const [descExpanded, setDescExpanded] = useState<boolean>(false);

  const onClickDescExpand = (event: React.SyntheticEvent) => {
    if (!event || !event.currentTarget) {
      return;
    }

    const currentDescElement =
      event.currentTarget.parentElement?.parentElement?.parentElement?.getElementsByClassName(
        'hiddenDescClass'
      )[0];
    const isHidden = currentDescElement?.classList.contains('hidden');
    if (isHidden) {
      currentDescElement?.classList.remove('hidden');
    } else {
      currentDescElement?.classList.add('hidden');
    }

    if (!event.currentTarget.hasAttribute('data-videoid')) {
      return;
    }
    const videoId = event.currentTarget.getAttribute('data-videoid');
    if (null == videoId) {
      return;
    }

    setDescExpanded(!descExpanded);
  };

  return (
    <>
      <Card shadow='none' className='rounded-none'>
        <CardHeader>
          <div>
            <DecodedText text={video.snippet.title} className='text-2xl font-bold text-primary-500' />
            <span className='text-xs ml-2 text-default-500'>
              {video.snippet.publishedAt}
            </span>
          </div>
        </CardHeader>

        <CardBody>
          <ComponentPlayer videoId={video.snippet.resourceId.videoId} />
        </CardBody>

        <CardFooter className='justify-end'>
          <Button
            isIconOnly
            variant='flat'
            className='w-7 h-7'
            onClick={onClickDescExpand}
            data-videoid={video.id}
          >
            {descExpanded ? <MdExpandLess /> : <MdExpandMore />}
          </Button>
        </CardFooter>

        <CardBody className='hiddenDescClass hidden whitespace-pre-wrap'>
          {video.snippet.description}
        </CardBody>
      </Card>
    </>
  );
}
