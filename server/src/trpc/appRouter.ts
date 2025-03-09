import { messageRouter } from "./routers/messageRouter";
import { todoRouter } from "./routers/todoRouter";
import { createCallerFactory, createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  todo: todoRouter,
  message: messageRouter,
});

export type AppRouterNew = typeof appRouter;
export const createCaller = createCallerFactory(appRouter);

export type AppRouter = typeof appRouter;
