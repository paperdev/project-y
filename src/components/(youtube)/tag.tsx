'use client';

import { IonChip } from '@ionic/react';
import React from 'react';

const MAX_TAGS = 2;

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
              <IonChip key={index} className='cursor-pointer'>
                {`#${tag}`}
              </IonChip>
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
            <IonChip key={index} className='cursor-pointer'>{`#${tag}`}</IonChip>
          );
        })}
      </div>
    </>
  );
}

export { ComponentTag, ComponentHiddenTag };
