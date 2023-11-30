'use client';

import React from 'react';

import {
  Chip,
  Collapse,
} from '@mui/material';

const MAX_TAGS = 5;

function ComponentTag({
  tags
}: {
  tags: string[]
}) {
  if (!tags) {
    return <></>
  }

  return (
    <>
      {
        tags.map((tag, index) => {
          return (
            index < MAX_TAGS && <Chip key={index} label={`#${tag}`} />
          )
        })
      }
    </>
  )
}

function ComponentHiddenTag({
  className,
  tags,
}: {
  className: string,
  tags: string[],
}) {
  if (!tags || tags.length < MAX_TAGS) {
    return <></>
  }

  return (
    <>
      <div className={`${className}`}>
        {
          tags.map((tag, index) => {
            if (index < MAX_TAGS) {
              return;
            }
            return (
              <Chip key={index} label={`#${tag}`} />
            )
          })
        }
      </div>
    </>
  )
}

export {
  ComponentTag,
  ComponentHiddenTag
}