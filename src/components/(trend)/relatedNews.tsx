'use client';

import React from 'react';
import { iArticle } from '@/shared/interface/trendItem';
import ComponentImage from '@/components/(trend)/image';
import { Browser } from '@capacitor/browser';
import DecodedText from '../template/decodedText';
import { Link } from 'konsta/react';

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
      <div className={`${className} overflow-x-scroll`}>
        {relatedNews.map((article: iArticle, index: number) => {
          return (
            <Link
              key={index}
              onClick={() => {
                Browser.open({
                  url: article.url
                })
              }}
              className='min-w-full rounded-lg border-with border'
            >
              <div className='flex justify-between m-1'>
                <ComponentImage
                  className='flex'
                  dataImage={article.image}
                  isShownLink={false}
                />

                <div className='flex flex-col justify-center ml-6'>
                  <DecodedText text={article.title} className='whitespace-pre-wrap line-clamp-2' />
                  <div className='text-xs mt-2'>
                    {article.source} - {article.timeAgo}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
