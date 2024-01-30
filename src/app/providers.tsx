'use client';

import {
  useState,
  SetStateAction,
  createContext,
  type Dispatch,
  useEffect,
} from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useRouter } from 'next/navigation';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { setBackForwardNavigationGestures } from 'capacitor-plugin-ios-webview-configurator';
import { Capacitor } from '@capacitor/core';
import { Query } from '@/shared/interface/query';
import { getCurrentLocation } from '@/utils/request';

const defaultQuery: Query = {
  regionCode: process.env.DEFAULT_REGION ? process.env.DEFAULT_REGION : 'US',
  videoCategoryId: '',
};

const QueryContext = createContext<Query>(defaultQuery);
const SetQueryContext = createContext<Dispatch<SetStateAction<Query>>>(
  () => {}
);

export function Providers({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState<Query>(defaultQuery);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
          },
        },
      })
  );

  if ('web' !== Capacitor.getPlatform()) {
    setBackForwardNavigationGestures(true);
  }

  useEffect(() => {
    queryClient
      .fetchQuery({ queryKey: ['regionCode'], queryFn: getCurrentLocation })
      .then((currentRegionCode) => {
        setQuery({
          regionCode: currentRegionCode,
          videoCategoryId: '',
        });
        setIsLoading(false);
      });
  }, [isLoading]);

  return (
    <>
      {!isLoading && (
        <QueryContext.Provider value={query}>
          <SetQueryContext.Provider value={setQuery}>
            <QueryClientProvider client={queryClient}>
              <NextThemesProvider attribute='class'>
                <NextUIProvider navigate={router.push}>
                  {children}
                </NextUIProvider>
              </NextThemesProvider>
            </QueryClientProvider>
          </SetQueryContext.Provider>
        </QueryContext.Provider>
      )}
    </>
  );
}

export { QueryContext, SetQueryContext };
