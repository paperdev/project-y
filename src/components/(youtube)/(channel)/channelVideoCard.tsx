'use client';

import React, { useState } from 'react';
import ComponentPlayer from '@/components/(youtube)/player';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import { iChannelVideoItem } from '@/shared/interface/channelVideo';
import DecodedText from '@/components/template/decodedText';
import { Card, Chip } from 'konsta/react';

export default function ComponentChannelVideoCard({
  video,
}: {
  video: iChannelVideoItem;
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
      <Card
        footer={
          <>
            <div className='flex justify-end'>
              <Chip
                className='cursor-pointer'
                onClick={onClickDescExpand}
                data-videoid={video.id}
                colors={{
                  fillBg: 'bg-primary',
                }}
              >
                {descExpanded ? (
                  <MdExpandLess className='w-5 h-5' />
                ) : (
                  <MdExpandMore className='w-5 h-5' />
                )}
              </Chip>
            </div>

            <div className='hiddenDescClass hidden whitespace-pre-wrap text-black dark:text-white'>
              {video.snippet.description}
            </div>
          </>
        }
      >
        <div>
          <DecodedText
            text={video.snippet.title}
            className='text-2xl font-bold text-primary'
          />
          <span className='text-xs ml-2'>{video.snippet.publishedAt}</span>
        </div>

        <div className='mt-2'>
          <ComponentPlayer videoId={video.snippet.resourceId.videoId} />
        </div>
      </Card>
    </>
  );
}
