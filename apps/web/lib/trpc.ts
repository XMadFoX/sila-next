import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@sila/api/trpc-server';
export const trpc = createTRPCReact<AppRouter>();
