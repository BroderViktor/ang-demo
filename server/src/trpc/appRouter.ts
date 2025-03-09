import { messageRouter } from "./routers/messageRouter";
import { testSubscriptionRouter } from "./routers/testSubscriptionRouter";
import { todoRouter } from "./routers/todoRouter";
import { createCallerFactory, createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  todo: todoRouter,
  message: messageRouter,
  chat: testSubscriptionRouter,
});

export type AppRouterNew = typeof appRouter;
export const createCaller = createCallerFactory(appRouter);

export type AppRouter = typeof appRouter;
