'use client';

import React, { MutableRefObject } from 'react';
import { Input, Button } from "@nextui-org/react";

export default function ComponentSearchInput({
  className,
  inputRef,
  onSearch,
}: {
  className: string;
  inputRef: MutableRefObject<HTMLInputElement | null>
  onSearch: Function
}) {
  const onPressSearch = () => {
    if (!inputRef?.current?.value) {
      return;
    }
    onSearch(inputRef.current.value);
  }

  const checkKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.code === 'Enter') {
      if (!inputRef?.current?.value) {
        return;
      }
      onSearch(inputRef.current.value);
      inputRef.current.value = '';
    }
  }

  return (
    <>
      <div className={`${className}`}>
        <Input
          autoFocus
          type='text'
          variant='bordered'
          placeholder='Search anything'
          endContent={
            <Button
              onPress={() => { onPressSearch(); }}
            >
              Search
            </Button>
          }
          ref={inputRef}
          onKeyDown={(event: React.KeyboardEvent) => { checkKeyDown(event); }}
        />
      </div>
    </>
  )
}
