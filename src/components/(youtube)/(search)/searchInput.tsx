'use client';

import { Searchbar } from 'konsta/react';
import React, { useState } from 'react';

export default function ComponentSearchInput({
  className,
  onSearch,
}: {
  className: string;
  onSearch: Function
}) {
  const [searchQuery, setSearchQuery] = useState('');

  const checkKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.code === 'Enter') {
      if (!searchQuery) {
        return;
      }
      onSearch(searchQuery);
    }
  }
  
  const handleSearch = (event: React.BaseSyntheticEvent) => {
    setSearchQuery(event.target.value);
  };

  const handleClear = () => {
    setSearchQuery('');
  };

  const handleDisable = () => {
    if (!searchQuery) {
      return;
    }
    onSearch(searchQuery);
  };

  return (
    <>
      <div className={`${className}`}>
        <Searchbar
          placeholder='Search anything'
          onInput={(event) => {handleSearch(event)}}
          value={searchQuery}
          onClear={handleClear}
          disableButton
          disableButtonText='Search'
          onDisable={handleDisable}
          onKeyDown={(event: React.KeyboardEvent) => {
            checkKeyDown(event);
          }}
        />
      </div>
    </>
  );
}
