'use client';

import React, { useEffect, useState } from 'react';
import { iSearchItem, iTitle } from '@/shared/interface/searchItem';
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
import ComponentImage from '@/components/(trend)/image';
import ComponentRelatedSearch from '@/components/(trend)/relatedSearch';
import ComponentRelatedNews from '@/components/(trend)/relatedNews';

interface iNewSearchItem extends iSearchItem {
  id?: number;
  searchExpanded?: boolean;
  newsExpanded?: boolean;
}

export default function ComponentItem({
  dataItem: dataItem,
}: {
  dataItem: iSearchItem[],
}) {
  const [recentItem, setRecentItem] = useState<iNewSearchItem[]>(dataItem);

  const loadMoreItem = async () => {
    
  };

  useEffect(() => {
    recentItem.map((item, index) => {
      item.id = index + 1;
      item.searchExpanded = false;
      item.newsExpanded = false;
    });

    setRecentItem(recentItem);
  }, [dataItem.length]);

  const onClickSearchExpand = (event: React.SyntheticEvent) => {
    if (!event || !event.currentTarget) {
      return;
    }

    const currentSearchElement =
      event.currentTarget.parentElement?.parentElement?.parentElement?.getElementsByClassName(
        'hiddenSearchClass'
      )[0];
    const isHidden = currentSearchElement?.classList.contains('hidden');
    if (isHidden) {
      currentSearchElement?.classList.remove('hidden');
    } else {
      currentSearchElement?.classList.add('hidden');
    }

    if (!event.currentTarget.hasAttribute('data-itemid')) {
      return;
    }
    const itemId = event.currentTarget.getAttribute('data-itemid');
    if (null == itemId) {
      return;
    }

    const temp = Array.from(recentItem);
    temp.map((item) => {
      if (parseInt(itemId) === item.id) {
        item.searchExpanded = !item.searchExpanded;
      }
    });
    setRecentItem(temp);
  };

  const onClickNewsExpand = (event: React.SyntheticEvent) => {
    if (!event || !event.currentTarget) {
      return;
    }

    const currentNewsElement =
      event.currentTarget.parentElement?.parentElement?.parentElement?.getElementsByClassName(
        'hiddenNewsClass'
      )[0];
    const isHidden = currentNewsElement?.classList.contains('hidden');
    if (isHidden) {
      currentNewsElement?.classList.remove('hidden');
    } else {
      currentNewsElement?.classList.add('hidden');
    }

    if (!event.currentTarget.hasAttribute('data-itemid')) {
      return;
    }
    const itemId = event.currentTarget.getAttribute('data-itemid');
    if (null == itemId) {
      return;
    }

    const temp = Array.from(recentItem);
    temp.map((item) => {
      if (parseInt(itemId) === item.id) {
        item.newsExpanded = !item.newsExpanded;
      }
    });
    setRecentItem(temp);
  };
  
  return (
    <>
      <InfiniteScroll
        dataLength={recentItem.length}
        next={loadMoreItem}
        scrollThreshold={'200px'}
        hasMore={false}
        loader={
          <div className='flex justify-center'>
            <Spinner label='Loading...' color='primary' />
          </div>
        }
        endMessage={
          <div className='flex justify-center font-bold'>No more items!</div>
        }
        scrollableTarget='scrollableElementDiv'
      >

        {recentItem.map((item: iNewSearchItem, index: number) => {
          return (
            <div key={index}>
              <Card shadow='none' className='rounded-none'>
                <CardHeader className='flex justify-between'>
                  <div>
                    <div className='text-2xl font-bold text-primary-500'>
                      {item.title.query}
                    </div>
                    <span className='text-xs ml-2 text-default-500'>
                      Searches : {item.formattedTraffic}
                    </span>
                    <div className='flex mt-2 gap-1'>
                      <Link
                        isExternal
                        showAnchorIcon
                        href={
                          process.env.GOOGLE_TREND_URL + item.title.exploreLink
                        }
                      >
                        Statistics
                      </Link>
                    </div>
                  </div>
                  <ComponentImage
                    dataImage={item.image}
                    isShownLink={true}
                  />
                </CardHeader>

                <CardFooter className='justify-between'>
                  <div className='flex gap-2'>
                    <div>
                      Related Searches
                    </div>

                    <Button
                      isIconOnly
                      variant='flat'
                      className='w-7 h-7'
                      onClick={onClickSearchExpand}
                      data-itemid={item.id}
                    >
                      {item.searchExpanded ? <MdExpandLess /> : <MdExpandMore />}
                    </Button>
                  </div>

                  <div className='flex gap-2'>
                    <div>
                      Related News
                    </div>

                    <Button
                      isIconOnly
                      variant='flat'
                      className='w-7 h-7'
                      onClick={onClickNewsExpand}
                      data-itemid={item.id}
                    >
                      {item.newsExpanded ? <MdExpandLess /> : <MdExpandMore />}
                    </Button>
                  </div>
                </CardFooter>

                <CardBody className='hiddenSearchClass hidden'>
                  <ComponentRelatedSearch
                    className='flex flex-wrap gap-1'
                    relatedSearches={item.relatedQueries}
                  />
                </CardBody>

                <CardBody className='hiddenNewsClass hidden'>
                  <ComponentRelatedNews
                    className='flex flex-col gap-1'
                    relatedNews={item.articles}
                  />
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
