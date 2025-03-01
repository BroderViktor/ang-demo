import { todoRouter } from "./routers/todoRouter";
import { createCallerFactory, createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  todo: todoRouter,
});

export type AppRouterNew = typeof appRouter;
export const createCaller = createCallerFactory(appRouter);
