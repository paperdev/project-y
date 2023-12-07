'use client';

import React, { useEffect, useState } from 'react';
import ComponentThumbnail from '@/components/(youtube)/thumbnail';
import { ComponentTag, ComponentHiddenTag } from '@/components/(youtube)/tag';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Link,
  Divider,
  Spinner,
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
import InfiniteScroll from 'react-infinite-scroll-component';
import { getYoutubeList } from '@/app/(pages)/youtube/page';

export default function ComponentVideo({
  dataVideo,
  nextPageToken,
  totalResults,
}: {
  dataVideo: any[],
  nextPageToken: string
  totalResults: number
}) {
  const [recentVideo, setRecentVideo] = useState(dataVideo);
  const [pageToken, setPageToken] = useState(nextPageToken);
  const [loadMore, setLoadMore] = useState(true);

  const loadMoreVideo = async () => {
    if (recentVideo.length >= totalResults) {
      setLoadMore(false);
      return;
    }

    const resData = await getYoutubeList(pageToken);
    setRecentVideo((video) => [...video, ...resData.items]);
    setPageToken(resData.nextPageToken);
  };

  useEffect(() => {
    recentVideo.map((video) => {
      video.tagExpanded = false;
      video.descExpanded = false;
    });

    setRecentVideo(recentVideo);
  }, [dataVideo.length]);

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

    const temp = Array.from(recentVideo);
    temp.map((video) => {
      if (videoId === video.id) {
        video.descExpanded = !video.descExpanded;
      }
    });
    setRecentVideo(temp);
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

    const temp = Array.from(recentVideo);
    temp.map((video) => {
      if (videoId === video.id) {
        video.tagExpanded = !video.tagExpanded;
      }
    });
    setRecentVideo(temp);
  };

  return (
    <>
      <InfiniteScroll
        dataLength={recentVideo.length}
        next={loadMoreVideo}
        scrollThreshold={'200px'}
        hasMore={loadMore}
        loader={
          <div className='flex justify-center'>
            <Spinner label='Loading...' color='primary' />
          </div>
        }
        endMessage={
          <div className='flex justify-center font-bold'>No more videos!</div>
        }
        scrollableTarget='scrollableElementDiv'
      >

        {recentVideo.map((video, index) => {
          return (
            <div key={index}>
              <Card shadow='none'>
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
                      data-videoid={video.id}
                    >
                      {video.tagExpanded ? <MdUnfoldLess /> : <MdUnfoldMore />}
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
                    data-videoid={video.id}
                  >
                    {video.descExpanded ? <MdExpandLess /> : <MdExpandMore />}
                  </Button>
                </CardFooter>

                <CardBody className='hiddenDescClass hidden '>
                  {video.snippet.description}
                </CardBody>
              </Card>

              <Divider />
            </div>
          );
        })}

      </InfiniteScroll>
    </>
  );
}
