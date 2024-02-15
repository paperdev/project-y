'use client';

import React from 'react';
import ComponentPlayer from '@/components/(youtube)/player';
import { iSearchVideoItem } from '@/shared/interface/searchVideo';
import DecodedText from '@/components/template/decodedText';
import { Card } from 'konsta/react';
import ComponentChannelButton from '@/components/(youtube)/channelButton';

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
            <ComponentChannelButton channelId={video.snippet.channelId} channelTitle={video.snippet.channelTitle} />
          </div>
        </div>

        <div className='mt-2'>
          <ComponentPlayer videoId={video.id.videoId} />
        </div>
      </Card>
    </>
  );
}
