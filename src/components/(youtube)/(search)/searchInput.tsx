'use client';

import { IonSearchbar, SearchbarInputEventDetail } from '@ionic/react';
import React, { useRef } from 'react';

export default function ComponentSearchInput({
  onSearch
}: {
  onSearch: Function
}) {
  const inputRef = useRef<HTMLIonSearchbarElement>(null);

  const onIonCancel = () => {
  };

  const onIonInput = (event: CustomEvent<SearchbarInputEventDetail>) => {
  };

  const onIonChange = (event: CustomEvent<SearchbarInputEventDetail>) => {
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.code === 'Enter') {
      if (!inputRef?.current?.value) {
        return;
      }

      onSearch(inputRef.current.value);
    }
  }

  return (
    <>
      <IonSearchbar
        ref={inputRef}
        placeholder='Search anything'
        animated={true}
        slot='fixed'
        inputmode={'search'}
        showCancelButton="focus"
        // cancelButtonText='Search'
        // onIonCancel={onIonCancel}
        onIonInput={onIonInput}
        onIonChange={onIonChange}
        enterkeyhint={'search'}
        onKeyDown={onKeyDown}
      />
    </>
  );
}
