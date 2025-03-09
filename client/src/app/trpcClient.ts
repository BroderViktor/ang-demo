import {
  createTRPCProxyClient,
  createWSClient,
  httpBatchLink,
  splitLink,
  wsLink,
} from '@trpc/client';
import type { AppRouterNew } from '../../../server/src/trpc/appRouter';

globalThis.WebSocket = WebSocket;

export const wsClient = createWSClient({
  url: `ws://localhost:2022`,
});

export const trpcClient = createTRPCProxyClient<AppRouterNew>({
  links: [
    splitLink({
      condition(op) {
        return op.type === 'subscription';
      },
      true: wsLink({
        client: wsClient,
      }),
      false: httpBatchLink({
        url: 'http://localhost:5200/trpc',
      }),
    }),
  ],
});
