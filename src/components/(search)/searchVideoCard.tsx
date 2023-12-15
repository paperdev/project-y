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
import { iSearchItem } from '@/shared/interface/searchVideo';

export default function ComponentSearchVideoCard({
  video,
}: {
  video: iSearchItem,
}) {

  return (
    <>
      <Card shadow='none' className='rounded-none'>
        <CardHeader>
          <div>
            <div className='text-2xl font-bold text-primary-500'>
              {video.snippet.title}
            </div>
            <span className='text-xs ml-2 text-default-500'>
              {video.snippet.publishedAt}
            </span>
            <div className='flex mt-2 gap-1'>
              <div className='text-primary-500'>Channel : </div>
              <Link
                isExternal
                showAnchorIcon
                href={
                  process.env.YOUTUBE_URL_CHANNEL +
                  video.snippet.channelId
                }
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
          {video.snippet.description}
        </CardFooter>
      </Card>
    </>
  );
}
