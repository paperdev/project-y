'use client';

import React from 'react';
import { iArticle } from '@/shared/interface/trendItem';
import ComponentImage from '@/components/(trend)/image';
import { Browser } from '@capacitor/browser';
import DecodedText from '../template/decodedText';
import { Card, Link } from 'konsta/react';

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
      <div className={`${className} `}>
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
              <Card className='w-full'>
                <div className='gap-4'>
                  <ComponentImage
                    dataImage={article.image}
                    isShownLink={false}
                  />

                  <div>
                    <DecodedText text={article.title} className='whitespace-pre-wrap line-clamp-2' />
                    <div className='text-xs mt-2 text-default-500'>
                      {article.source} - {article.timeAgo}
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </>
  );
}