'use client';

import React, { useState } from 'react';
import ComponentPlayer from '@/components/(youtube)/player';
import { ComponentTag, ComponentHiddenTag } from '@/components/(youtube)/tag';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Link,
} from '@nextui-org/react';
import {
  MdThumbUp,
  MdVisibility,
  MdComment,
  MdFavorite,
  MdExpandMore,
  MdExpandLess,
  MdUnfoldMore,
  MdUnfoldLess,
  MdZoomOutMap,
} from 'react-icons/md';
import { iTrendVideoItem } from '@/shared/interface/trendVideo';

export default function ComponentTrendVideoCard({
  video
}: {
  video: iTrendVideoItem
}) {
  const [tagExpanded, setTagExpanded] = useState<boolean>(false);
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

  const onClickTagExpand = (event: React.SyntheticEvent) => {
    if (!event || !event.currentTarget) {
      return;
    }

    const currentTagElement =
      event.currentTarget.parentElement?.parentElement?.getElementsByClassName(
        'hiddenTagClass'
      )[0];
    const isHidden = currentTagElement?.classList.contains('hidden');
    if (isHidden) {
      currentTagElement?.classList.remove('hidden');
    } else {
      currentTagElement?.classList.add('hidden');
    }

    if (!event.currentTarget.hasAttribute('data-videoid')) {
      return;
    }
    const videoId = event.currentTarget.getAttribute('data-videoid');
    if (null == videoId) {
      return;
    }

    setTagExpanded(!tagExpanded);
  };

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
            <div className='flex mt-2 gap-2 items-center'>
              <div className='text-default-500'>Channel : </div>
              <Link
                showAnchorIcon
                anchorIcon={<MdZoomOutMap />}
                href={'/channel?channelId=' + video.snippet.channelId}
              >
                {video.snippet.channelTitle}
              </Link>
            </div>
          </div>
        </CardHeader>

        <CardBody className='flex '>
          <div className='flex justify-between'>
            <ComponentTag
              className='flex flex-wrap gap-1'
              tags={video.snippet.tags}
            />

            <Button
              isIconOnly
              variant='flat'
              className='w-7 h-7'
              onClick={onClickTagExpand}
              data-videoid={video.id}
            >
              {tagExpanded ? <MdUnfoldLess /> : <MdUnfoldMore />}
            </Button>
          </div>

          <div className='hiddenTagClass hidden pt-1'>
            <ComponentHiddenTag
              className='flex flex-wrap gap-1'
              tags={video.snippet.tags}
            />
          </div>
        </CardBody>

        <CardBody>
          <ComponentPlayer videoId={video.id} />
        </CardBody>

        <CardFooter className='justify-between'>
          <div className='flex flex-row gap-4'>
            {video.statistics && (
              <>
                <div className='flex gap-1 items-center text-gray-600'>
                  <MdThumbUp />
                  <div>{video.statistics.likeCount}</div>
                </div>

                <div className='flex gap-1 items-center text-gray-600'>
                  <MdVisibility />
                  <div>{video.statistics.viewCount}</div>
                </div>

                <div className='flex gap-1 items-center text-gray-600'>
                  <MdComment />
                  <div>{video.statistics.commentCount}</div>
                </div>

                <div className='flex gap-1 items-center text-gray-600'>
                  <MdFavorite />
                  <div>{video.statistics.favoriteCount}</div>
                </div>
              </>
            )}
          </div>

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
