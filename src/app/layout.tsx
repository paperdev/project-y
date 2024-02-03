'use client';

import '@/css/globals.css';
import TemplateHome from '@/components/template/home';
import { Providers } from './providers';
import type { Viewport } from 'next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning={true}>
      <body>
        <Providers>
          <TemplateHome>
            {children}
          </TemplateHome>
        </Providers>
      </body>
    </html>
  );
}
