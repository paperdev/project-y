'use client';
 
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
 
export function NavigationEvent() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
 
  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
    // console.log(url);
  }, [pathname, searchParams])
 
  return null;
}