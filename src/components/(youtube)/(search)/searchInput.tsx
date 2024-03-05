'use client';

import { IonSearchbar, SearchbarInputEventDetail } from '@ionic/react';
import React, { useContext, useRef, useState } from 'react';
import { QueryContext, SetQueryContext } from '@/app/providers';
import { Capacitor } from '@capacitor/core';
import { Keyboard } from '@capacitor/keyboard';

export default function ComponentSearchInput() {
  const inputRef = useRef<HTMLIonSearchbarElement>(null);
  const [ inputValue , setInputValue ] = useState<string>('');
  const query = useContext(QueryContext);
  const setQuery = useContext(SetQueryContext);

  const onIonInput = (event: CustomEvent<SearchbarInputEventDetail>) => {
  };

  const onIonChange = (event: CustomEvent<SearchbarInputEventDetail>) => {
  };

  const onKeyDown = async (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.code === 'Enter') {
      if (!inputRef?.current?.value) {
        return;
      }

      setQuery({
        regionCode: query.regionCode,
        videoCategoryId: query.videoCategoryId,
        channelId: query.channelId,
        searchKey: inputRef.current.value,
      });

      setInputValue(inputRef.current.value);

      if ('web' !== Capacitor.getPlatform()) {
        await Keyboard.hide();
      }
    }
  }

  return (
    <>
      <IonSearchbar
        ref={inputRef}
        placeholder='Search anything'
        animated={true}
        inputmode={'search'}
        type={'search'}
        showCancelButton="focus"
        onIonInput={onIonInput}
        onIonChange={onIonChange}
        enterkeyhint={'search'}
        onKeyDown={onKeyDown}
        value={inputValue}
      />
    </>
  );
}
