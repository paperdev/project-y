'use client';

import React from 'react';
import ComponentPlayer from '@/components/(youtube)/player';
import { iSearchVideoItem } from '@/shared/interface/searchVideo';
import DecodedText from '@/components/template/decodedText';
import { MdZoomOutMap } from 'react-icons/md';
import { Button, Card } from 'konsta/react';

export default function ComponentSearchVideoCard({
  video,
}: {
  video: iSearchVideoItem;
}) {
  return (
    <>
      <Card
        footer={
          <div className='whitespace-pre-wrap text-black dark:text-white'>
            {video.snippet.description}
          </div>
        }
      >
        <div>
          <DecodedText
            text={video.snippet.title}
            className='text-2xl font-bold text-primary'
          />
          <span className='text-xs ml-2'>{video.snippet.publishedAt}</span>
          <div className='flex mt-2 gap-2 items-center'>
            <div className=''>Channel : </div>
            <Button
              inline={true}
              raised={true}
              href={'/channel?channelId=' + video.snippet.channelId}
            >
              {video.snippet.channelTitle}
              <MdZoomOutMap className='pl-2 w-7 h-7' />
            </Button>
          </div>
        </div>

        <div className='mt-2'>
          <ComponentPlayer videoId={video.id.videoId} />
        </div>
      </Card>
    </>
  );
}
