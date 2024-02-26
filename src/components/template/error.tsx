import React from 'react';

export default function Error({
  messages,
}: {
  messages: string[],
}) {
  return (
    <>
      <div className='flex flex-col justify-center inset-x-0 inset-y-0 fixed text-red-500'>
        {
          messages.map((message: string, index: number) => {
            return <div key={index} className='mx-auto'>{message}</div>
          })
        }
      </div>
    </>
  );
}
