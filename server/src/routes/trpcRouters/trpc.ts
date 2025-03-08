import { initTRPC } from "@trpc/server";
import { CreateHTTPContextOptions } from "@trpc/server/adapters/standalone";
import { CreateWSSContextFnOptions } from "@trpc/server/adapters/ws";
import { prisma } from "../../database/prismaDatabase";

// ...existing context creation code...
const createContext = async (
  opts: CreateHTTPContextOptions | CreateWSSContextFnOptions
) => ({
  req: opts.req,
  res: opts.res,
  db: prisma,
});
type TrpcContext = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<TrpcContext>().create();
export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
export const createCallerFactory = t.createCallerFactory;
