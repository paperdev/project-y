'use client';

import { getCurrentLocation } from '@/utils/request';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    getCurrentLocation().then((currentRegion) => {
      const params = new URLSearchParams(searchParams);
      params.set('regionCode', currentRegion);
      params.set('videoCategoryId', '0');
      router.replace('/home?' + params.toString());
    });
  }, [])
}
