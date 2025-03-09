import { initTRPC } from "@trpc/server";
import { CreateHTTPContextOptions } from "@trpc/server/adapters/standalone";
import { CreateWSSContextFnOptions } from "@trpc/server/adapters/ws";
import { prisma } from "../database/prismaDatabase";

//? This is how you initialize a context for the server
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

//? Add middleware here
export const publicProcedure = t.procedure;

//? No need to touch this
export const createCallerFactory = t.createCallerFactory;
