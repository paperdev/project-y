'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'
import ComponentPlayer from '@/components/(youtube)/player';
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
  MdExpandMore,
  MdExpandLess,
} from 'react-icons/md';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getSearchList } from '@/utils/request';
import { iSearchItem } from '@/shared/interface/searchVideo';

export default function ComponentSearchVideo({
  dataVideo,
  nextPageToken,
  totalResults,
  searchKey,
}: {
  dataVideo: iSearchItem[],
  nextPageToken: string,
  totalResults: number,
  searchKey: string,
}) {
  const searchParams = useSearchParams();
  const [recentVideo, setRecentVideo] = useState<iSearchItem[]>(dataVideo);
  const [pageToken, setPageToken] = useState(nextPageToken);
  const [loadMore, setLoadMore] = useState(true);

  const loadMoreVideo = async () => {
    if (recentVideo.length >= totalResults) {
      setLoadMore(false);
      return;
    }

    const regionCode = searchParams.get('regionCode');
    const resData = await getSearchList(regionCode, searchKey, pageToken);

    setRecentVideo((video) => [...video, ...resData.items]);
    setPageToken(resData.nextPageToken);
  };

  useEffect(() => {
    recentVideo.map((video) => {
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
      if (videoId === video.id.videoId) {
        video.descExpanded = !video.descExpanded;
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
          if(video.id.channelId) {
            return (<div key={index}></div>)
          }

          return (
            <div key={index}>
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

                <CardFooter className='justify-between'>
                  <div className='flex flex-row gap-4'>
                    
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
