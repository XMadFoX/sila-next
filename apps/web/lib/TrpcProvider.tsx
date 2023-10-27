'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TRPCClientError, httpBatchLink } from '@trpc/client';
import { useState } from 'react';
import { trpc } from './trpc';
import superjson from 'superjson';
import { env } from '@sila/api/env.mjs';

export const TrpcProvider: React.FC<{ children: React.ReactNode }> = (p) => {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						retry: (failureCount, error) => {
							if (error instanceof TRPCClientError) {
								if (error?.data?.httpStatus === 404) return false;
							}
							if (failureCount > 3) return false;
							return true;
						},
					},
				},
			})
	);
	const [trpcClient] = useState(() =>
		trpc.createClient({
			transformer: superjson,
			links: [
				httpBatchLink({
					url: `${env.VERCEL_URL}${env.NEXT_PUBLIC_TRPC_PREFIX}`,
				}),
			],
		})
	);
	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				{p.children}
			</QueryClientProvider>
		</trpc.Provider>
	);
};
