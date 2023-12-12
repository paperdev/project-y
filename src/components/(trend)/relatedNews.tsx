'use client';

import React from 'react';
import { Link, Card, CardHeader } from '@nextui-org/react';
import { iArticle } from '@/shared/interface/searchItem';
import ComponentImage from '@/components/(trend)/image';

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
      <div className={`${className}`}>
        {relatedNews.map((article: iArticle, index: number) => {
          return (
            <Link
              key={index}
              isExternal
              href={article.url}
            >
              <Card className='w-full'>
                <CardHeader className='gap-4'>
                  <ComponentImage
                    dataImage={article.image}
                    isShownLink={false}
                  />

                  <div>
                    <div>
                      {article.title}
                    </div>
                    <div className='text-xs mt-2 text-default-500'>
                      {article.source} - {article.timeAgo}
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>
    </>
  );
}
