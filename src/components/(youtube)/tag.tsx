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
          if (index >= MAX_TAGS) {
            return;
          }
          return (
            <Collapse key={index} in={true} timeout='auto' unmountOnExit>
              <Chip key={index} label={`#${tag}`} />
            </Collapse>
          )
        })
      }
    </>
  )
}

function ComponentHiddenTag({
  tags,
  tagExpanded
}: {
  tags: string[],
  tagExpanded: boolean
}) {
  if (!tags || tags.length < MAX_TAGS) {
    return <></>
  }

  return (
    <>
      {
        tags.map((tag, index) => {
          if (index < MAX_TAGS) {
            return;
          }
          return (
            <Collapse key={index} in={tagExpanded} timeout='auto' unmountOnExit>
              <Chip key={index} label={`#${tag}`} />
            </Collapse>
          )
        })
      }
    </>
  )
}

export {
  ComponentTag,
  ComponentHiddenTag
}