import React from 'react';
import ComponentSearchInput from '@/components/(search)/searchInput';

export default function Page() {
  return (
    <>
      <div>
        <ComponentSearchInput className='bg-background backdrop-blur-0 z-30' inputRef={null} />
      </div>
    </>
  )
}
