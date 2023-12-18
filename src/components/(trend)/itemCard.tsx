'use client';

import React, { useState } from 'react';
import { iTrendItem } from '@/shared/interface/trendItem';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Link,
} from '@nextui-org/react';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import ComponentImage from '@/components/(trend)/image';
import ComponentRelatedSearch from '@/components/(trend)/relatedSearch';
import ComponentRelatedNews from '@/components/(trend)/relatedNews';

export default function ComponentItemCard({
  item,
}: {
  item: iTrendItem;
}) {
  const [searchExpanded, setSearchExpanded] = useState<boolean>(false);
  const [newsExpanded, setNewsExpanded] = useState<boolean>(false);

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

    setSearchExpanded(!searchExpanded);
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

    setNewsExpanded(!newsExpanded);
  };

  return (
    <>
      <Card shadow='none' className='rounded-none'>
        <CardHeader className='flex justify-between'>
          <div>
            <div className='text-2xl font-bold text-primary-500 whitespace-pre-wrap'>
              {item.title.query}
            </div>
            <span className='text-xs ml-2 text-default-500'>
              Searches : {item.formattedTraffic}
            </span>
            <div className='flex mt-2 gap-1'>
              <Link
                isExternal
                showAnchorIcon
                href={process.env.GOOGLE_TREND_URL + item.title.exploreLink}
              >
                Statistics
              </Link>
            </div>
          </div>
          <ComponentImage dataImage={item.image} isShownLink={true} />
        </CardHeader>

        <CardFooter className='justify-between'>
          <div className='flex gap-2'>
            <div>Related Searches</div>

            <Button
              isIconOnly
              variant='flat'
              className='w-7 h-7'
              onClick={onClickSearchExpand}
            >
              {searchExpanded ? <MdExpandLess /> : <MdExpandMore />}
            </Button>
          </div>

          <div className='flex gap-2'>
            <div>Related News</div>

            <Button
              isIconOnly
              variant='flat'
              className='w-7 h-7'
              onClick={onClickNewsExpand}
            >
              {newsExpanded ? <MdExpandLess /> : <MdExpandMore />}
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
    </>
  );
}
