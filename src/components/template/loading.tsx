import React from 'react';
import { Block, Preloader } from 'konsta/react';

export default function Loading() {
  return (
    <>
      <Block className="flex justify-center items-center">
        <Preloader />
      </Block>
    </>
  );
}
