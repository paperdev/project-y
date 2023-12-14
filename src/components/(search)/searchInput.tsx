'use client';

import React, { Ref } from 'react';
import { Listbox, ListboxItem, Link, Input, Button } from "@nextui-org/react";

export default function ComponentSearchInput({
  className,
  inputRef,
}: {
  className: string;
  inputRef: Ref<HTMLInputElement>
}) {

  const onPressSend = () => {
    // if (!inputChatRef.current.value) {
    //   return;
    // }
    // sendText(inputChatRef.current.value);
  }

  const checkKeyDown = (event: React.KeyboardEvent) => {
    // if (event.key === 'Enter' || event.code === 'Enter') {
    //   if (!inputRef.current.value) {
    //     return;
    //   }

    //   sendText(inputRef.current.value);
    // }
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
              onPress={() => { onPressSend(); }}
            >
              Send
            </Button>
          }
          ref={inputRef}
          onKeyDown={(event: React.KeyboardEvent) => { checkKeyDown(event); }}
        />
      </div>
    </>
  )
}
