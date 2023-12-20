'use client';

import React from 'react';
import ComponentPlayer from '@/components/(youtube)/player';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Link,
} from '@nextui-org/react';
import { iSearchVideoItem } from '@/shared/interface/searchVideo';
import { Browser } from '@capacitor/browser';
import DecodedText from '@/components/template/decodedText';

export default function ComponentSearchVideoCard({
  video,
}: {
  video: iSearchVideoItem,
}) {
  return (
    <>
      <Card shadow='none' className='rounded-none'>
        <CardHeader>
          <div>
            <DecodedText text={video.snippet.title} className='text-2xl font-bold text-primary-500' />
            <span className='text-xs ml-2 text-default-500'>
              {video.snippet.publishedAt}
            </span>
            <div className='flex mt-2 gap-1'>
              <div className='text-primary-500'>Channel : </div>
              <Link
                showAnchorIcon
                onPress={() => {
                  Browser.open({
                    url: process.env.YOUTUBE_URL_CHANNEL + video.snippet.channelId
                  })
                }}
              >
                {video.snippet.channelTitle}
              </Link>
            </div>
          </div>
        </CardHeader>

        <CardBody>
          <ComponentPlayer videoId={video.id.videoId} />
        </CardBody>

        <CardFooter>
          <div className='whitespace-pre-wrap'>
            {video.snippet.description}
          </div>
          
        </CardFooter>
      </Card>
    </>
  );
}
