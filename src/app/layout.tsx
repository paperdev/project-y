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
