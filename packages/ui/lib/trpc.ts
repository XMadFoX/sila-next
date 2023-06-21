'use client';

import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@sila/api';
export const trpc = createTRPCReact<AppRouter>();
