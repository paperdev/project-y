import '@/css/globals.css';
import TemplateHome from '@/components/template/home';
import { Providers } from './providers';
import { Suspense } from 'react';
import { NavigationEvent } from '@/components/NavigationEvent';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning={true}>
      <meta name='viewport' content='width=device-width, user-scalable=no' />
      <body>
        <Providers>
          <TemplateHome>
            {children}
            <Suspense fallback={null}>
              <NavigationEvent />
            </Suspense>
          </TemplateHome>
        </Providers>
      </body>
    </html>
  );
}
