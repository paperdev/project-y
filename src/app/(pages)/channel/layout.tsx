'use client';

import Swiper from '@/components/template/swiper';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Swiper>
        {children}
      </Swiper>
    </>
  );
}
