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
    if (!inputRef.current || !inputRef.current.value) {
      return;
    }

    onSearch(inputRef.current.value);
  };

  const onIonInput = (event: CustomEvent<SearchbarInputEventDetail>) => {
  };

  const onIonChange = (event: CustomEvent<SearchbarInputEventDetail>) => {
  };

  return (
    <>
      <IonSearchbar
        ref={inputRef}
        placeholder='Search anything'
        animated={true}
        slot='fixed'
        inputmode={'search'}
        showCancelButton="focus"
        cancelButtonText='Search'
        onIonCancel={onIonCancel}
        onIonInput={onIonInput}
        onIonChange={onIonChange}
        enterkeyhint={'search'}
      />
    </>
  );
}
