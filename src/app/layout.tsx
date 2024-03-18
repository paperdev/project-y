'use client';

import '@/css/globals.css';
import 'animate.css';
import { Providers } from './providers';
import { IonApp, setupIonicReact } from '@ionic/react';

setupIonicReact({ mode: 'ios' });

// import type { Viewport } from 'next';
// export const viewport: Viewport = {
//   width: 'device-width',
//   initialScale: 1,
//   maximumScale: 1,
//   minimumScale: 1,
//   userScalable: false,
//   // Also supported by less commonly used
//   // interactiveWidget: 'resizes-visual',
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning={true}>
      <meta name='color-scheme' content='light dark' />
      <meta name='viewport' content='width=device-width initial-scale=1.0 maximum-scale=1.0 user-scalable=no viewport-fit=cover'></meta>
      <body>
        <Providers>
          <IonApp>
            {children}
          </IonApp>
        </Providers>
      </body>
    </html>
  );
}
