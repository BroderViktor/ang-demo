import { initTRPC } from "@trpc/server";
import { Request, Response } from "express";
import { prisma } from "../../database/prismaDatabase";

// ...existing context creation code...
const createContext = async ({
  req,
  res,
}: {
  req: Request;
  res: Response;
}) => ({
  req,
  res,
  db: prisma,
});
type TrpcContext = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<TrpcContext>().create();
export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
export const createCallerFactory = t.createCallerFactory;
