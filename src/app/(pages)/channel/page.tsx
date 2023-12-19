'use client';

import { useSearchParams } from 'next/navigation';
import ComponentChannel from '@/components/(youtube)/(channel)/channel';

export default function Page() {
  const searchParams = useSearchParams();
  const channelId = searchParams.get('channelId');

  return (
    <>
      <ComponentChannel channelId={channelId} />
    </>
  );
}
