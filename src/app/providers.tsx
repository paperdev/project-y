'use client';

import {
  useState,
  SetStateAction,
  createContext,
  type Dispatch,
  useEffect,
} from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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
              {children}
            </QueryClientProvider>
          </SetQueryContext.Provider>
        </QueryContext.Provider>
      )}
    </>
  );
}

export { QueryContext, SetQueryContext };
