import { initTRPC } from "@trpc/server";
import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../../database/prismaDatabase";

const createContext = ({ req, res }: { req: Request; res: Response }) => ({
  req,
  res,
  db: prisma,
});
type TrpcContext = Awaited<ReturnType<typeof createContext>>;
export const t = initTRPC.context<TrpcContext>().create();

export const appRouter = t.router({
  getTodo: t.procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      const todo = await prisma.todo.findFirst({
        where: { id: input.id },
      });

      if (!todo) throw new Error("Todo not found");

      return todo;
    }),
  toggleTodo: t.procedure
    .input(
      z.object({
        id: z.string(),
        isDone: z.boolean(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, isDone } = input;
      const updatedTodo = await prisma.todo.update({
        where: { id },
        data: { isDone: !isDone },
      });
      console.log(updatedTodo);
      return updatedTodo;
    }),
  getTodos: t.procedure.query(async ({ ctx }) => {
    return await ctx.db.todo.findMany();
  }),
  createTodo: t.procedure
    .input(z.object({ text: z.string(), userId: z.string() }))
    .mutation(async ({ input }) => {
      const todo = await prisma.todo.create({
        data: {
          text: input.text,
          isDone: false,
          user: {
            connect: {
              id: input.userId,
            },
          },
        },
      });
      return todo;
    }),
  deleteTodo: t.procedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const todo = await prisma.todo.delete({
        where: {
          id: input.id,
        },
      });
      return todo;
    }),
});
// export type definition of API
export type AppRouterNew = typeof appRouter;
