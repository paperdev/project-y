'use client';

import { useState } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useRouter } from 'next/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { setBackForwardNavigationGestures } from "capacitor-plugin-ios-webview-configurator";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 6 * 1000,
            retry: 1,
            refetchOnWindowFocus: false,
          }
        }
      })
  )

  setBackForwardNavigationGestures(true);

  return (
    <QueryClientProvider client={queryClient}>
      <NextThemesProvider attribute='class'>
        <NextUIProvider navigate={router.push}>{children}</NextUIProvider>
      </NextThemesProvider>
    </QueryClientProvider>
  );
}
