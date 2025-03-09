import { postRouter } from "./routers/postRouter";
import { todoRouter } from "./routers/todoRouter";
import { createCallerFactory, createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  todo: todoRouter,
  post: postRouter,
});

export type AppRouterNew = typeof appRouter;
export const createCaller = createCallerFactory(appRouter);

export type AppRouter = typeof appRouter;
