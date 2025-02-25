import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouterNew } from '../../../server/src/routes/trpcRouters/appRouter';

export const trpcClient = createTRPCProxyClient<AppRouterNew>({
  links: [
    httpBatchLink({
      url: 'http://localhost:5200/trpc',
    }),
  ],
});
