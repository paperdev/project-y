'use client';

import React from 'react';
import ComponentThumbnail from '@/components/(youtube)/thumbnail';
import { ComponentTag, ComponentHiddenTag } from '@/components/(youtube)/tag';
import {
  Listbox,
  ListboxItem,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Link,
  Divider,
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
} from 'react-icons/md';

const iconWeight = 'w-7';
const iconHeight = 'h-7';

export default function ComponentVideo({ dataVideo }: { dataVideo: any[] }) {
  const [descExpanded, setDescExpanded] = React.useState(false);

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
  };

  return (
    <>
      <Listbox aria-label='videoList'>
        {dataVideo.map((video, index) => {
          return (
            <ListboxItem key={index} textValue={index.toString()}>
              <Card>
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
                    >
                      <MdUnfoldMore />
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
                  <ComponentThumbnail
                    dataThumbnail={video.snippet.thumbnails.standard}
                    videoId={video.id}
                  />
                </CardBody>

                <CardFooter className='justify-between'>
                  <div className='flex flex-row gap-4'>
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
                  </div>

                  <Button
                    isIconOnly
                    variant='flat'
                    className='w-7 h-7'
                    onClick={onClickDescExpand}
                  >
                    {descExpanded ? <MdExpandLess /> : <MdExpandMore />}
                  </Button>
                </CardFooter>

                <CardBody className='hiddenDescClass hidden '>
                  {video.snippet.description}
                </CardBody>
              </Card>
            </ListboxItem>
          );
        })}
      </Listbox>
    </>
  );
}
