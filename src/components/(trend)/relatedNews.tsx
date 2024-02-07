'use client';

import React from 'react';
import { iArticle } from '@/shared/interface/trendItem';
import ComponentImage from '@/components/(trend)/image';
import { Browser } from '@capacitor/browser';
import DecodedText from '../template/decodedText';
import { ListItem } from 'konsta/react';

export default function ComponentRelatedNews({
  className,
  relatedNews,
}: {
  className: string;
  relatedNews: iArticle[];
}) {
  if (0 === relatedNews.length) {
    return <>No related news!</>;
  }

  return (
    <>
      <div className={`${className} flex overflow-x-scroll`}>
        {relatedNews.map((article: iArticle, index: number) => {
          if (!article.image) {
            return <></>
          }
          return (
            <ListItem
              key={index}
              className='min-w-full rounded-lg border-with border m-2 '
              chevron={false}
              dividers={false}
              link
              onClick={() => {
                Browser.open({
                  url: article.url
                })
              }}
              title={
                <DecodedText text={article.title} className='whitespace-pre-wrap line-clamp-2' />
              }
              text={
                <div className='ml-2'>
                  {article.source} - {article.timeAgo}
                </div>
              }
              media={
                <ComponentImage
                  className=''
                  dataImage={article.image}
                  isShownLink={false}
                />
              }
            />
          );
        })}
      </div>
      {/* <div className={`${className} `}>
        {relatedNews.map((article: iArticle, index: number) => {
          return (
            <Link
              key={index}
              onClick={() => {
                Browser.open({
                  url: article.url
                })
              }}
              className='min-w-full'
            >
              <div className='gap-4 w-full'>
                <ComponentImage
                  className=''
                  dataImage={article.image}
                  isShownLink={false}
                />

                <div>
                  <DecodedText text={article.title} className='whitespace-pre-wrap line-clamp-2' />
                  <div className='text-xs mt-2'>
                    {article.source} - {article.timeAgo}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div> */}
    </>
  );
}
