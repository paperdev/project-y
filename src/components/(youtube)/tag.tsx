'use client';

import { Chip } from 'konsta/react';
import React from 'react';

const MAX_TAGS = 5;

function ComponentTag({
  className,
  tags,
}: {
  className: string;
  tags: string[];
}) {
  if (!tags) {
    return <></>;
  }

  return (
    <>
      <div className={`${className}`}>
        {tags.map((tag, index) => {
          return (
            index < MAX_TAGS && (
              <Chip key={index} className='cursor-pointer'>
                {`#${tag}`}
              </Chip>
            )
          );
        })}
      </div>
    </>
  );
}

function ComponentHiddenTag({
  className,
  tags,
}: {
  className: string;
  tags: string[];
}) {
  if (!tags || tags.length < MAX_TAGS) {
    return <></>;
  }

  return (
    <>
      <div className={`${className}`}>
        {tags.map((tag, index) => {
          if (index < MAX_TAGS) {
            return;
          }
          return (
            <Chip key={index} className='cursor-pointer'>{`#${tag}`}</Chip>
          );
        })}
      </div>
    </>
  );
}

export { ComponentTag, ComponentHiddenTag };
