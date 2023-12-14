import React from 'react';

export default function Error({
  messages,
}: {
  messages: string[],
}) {
  return (
    <>
      <div className='flex flex-col text-danger-500'>
        {
          messages.map((message: string, index: number) => {
            return <div key={index} className='mx-auto'>{message}</div>
          })
        }
        
      </div>
    </>
  );
}
