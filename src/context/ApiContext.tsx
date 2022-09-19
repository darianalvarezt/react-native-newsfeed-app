import React from 'react';
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import {IProps} from '../interfaces';

const queryCache = new QueryCache();
const mutationCache = new MutationCache();

const config = {
  queryCache,
  mutationCache,
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
};

const queryClient = new QueryClient(config);

const ApiProvider = ({children}: IProps) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ApiProvider;
