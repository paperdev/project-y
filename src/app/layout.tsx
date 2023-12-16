import '@/css/globals.css';
import TemplateHome from '@/components/template/home';
import { Providers } from './providers';

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
          </TemplateHome>
        </Providers>
      </body>
    </html>
  );
}
