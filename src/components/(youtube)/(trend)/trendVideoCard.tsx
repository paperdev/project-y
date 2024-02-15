'use client';

import React, { useState } from 'react';
import ComponentPlayer from '@/components/(youtube)/player';
import { ComponentTag, ComponentHiddenTag } from '@/components/(youtube)/tag';
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
import DecodedText from '@/components/template/decodedText';
import { Button, Card, Chip } from 'konsta/react';

export default function ComponentTrendVideoCard({
  video,
}: {
  video: iTrendVideoItem;
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
      <Card
        header={
          <div>
            <DecodedText
              text={video.snippet.title}
              className='text-2xl font-bold text-primary'
            />
            <span className='text-xs ml-2'>
              {video.snippet.publishedAt}
            </span>
            <div className='flex mt-2 gap-2 items-center'>
              <div className=''>Channel : </div>
              <Button
                inline={true}
                raised={true}
                href={'/channel?channelId=' + video.snippet.channelId}
              >
                {video.snippet.channelTitle}
                <MdZoomOutMap className='pl-2 w-7 h-7'/>
              </Button>
            </div>
          </div>
        }
        footer={
          <>
            <div className='flex flex-row justify-between'>
              <div className='flex flex-row gap-4'>
                {video.statistics && (
                  <>
                    <div className='flex gap-1 items-center'>
                      <MdThumbUp />
                      <div>{video.statistics.likeCount}</div>
                    </div>

                    <div className='flex gap-1 items-center'>
                      <MdVisibility />
                      <div>{video.statistics.viewCount}</div>
                    </div>

                    <div className='flex gap-1 items-center'>
                      <MdComment />
                      <div>{video.statistics.commentCount}</div>
                    </div>

                    <div className='flex gap-1 items-center'>
                      <MdFavorite />
                      <div>{video.statistics.favoriteCount}</div>
                    </div>
                  </>
                )}
              </div>

              <Chip
                className='cursor-pointer'
                onClick={onClickDescExpand}
                data-videoid={video.id}
                // colors={
                //   {
                //     fillBg: 'bg-primary'
                //   }
                // }
              >
                {descExpanded ? <MdExpandLess className='w-5 h-5' /> : <MdExpandMore className='w-5 h-5' />}
              </Chip>
            </div>

            <div className='hiddenDescClass hidden whitespace-pre-wrap text-black dark:text-white'>
              {video.snippet.description}
            </div>
          </>
        }
      >
        <div className=''>
          <div className='flex justify-between'>
            <ComponentTag
              className='flex flex-wrap gap-1'
              tags={video.snippet.tags}
            />

            <Chip
              className='cursor-pointer'
              onClick={onClickTagExpand}
              data-videoid={video.id}
              // colors={
              //   {
              //     fillBg: 'bg-primary'
              //   }
              // }
            >
              {tagExpanded ? <MdUnfoldLess className='w-5 h-5' /> : <MdUnfoldMore className='w-5 h-5' />}
            </Chip>
          </div>

          <div className='hiddenTagClass hidden pt-1'>
            <ComponentHiddenTag
              className='flex flex-wrap gap-1'
              tags={video.snippet.tags}
            />
          </div>
        </div>

        <div className='mt-2'>
          <ComponentPlayer videoId={video.id} />
        </div>
      </Card>
    </>
  );
}
