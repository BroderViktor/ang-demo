import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const todoRouter = createTRPCRouter({
  getTodo: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const todo = await ctx.db.todo.findFirst({
        where: { id: input.id },
      });

      if (!todo) throw new Error("Todo not found");

      return todo;
    }),
  toggleTodo: publicProcedure
    .input(
      z.object({
        id: z.string(),
        isDone: z.boolean(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id, isDone } = input;
      const updatedTodo = await ctx.db.todo.update({
        where: { id },
        data: { isDone: !isDone },
      });
      console.log(updatedTodo);
      return updatedTodo;
    }),
  getTodos: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.todo.findMany();
  }),
  createTodo: publicProcedure
    .input(z.object({ text: z.string(), userId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const todo = await ctx.db.todo.create({
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
  deleteTodo: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const todo = await ctx.db.todo.delete({
        where: {
          id: input.id,
        },
      });
      return todo;
    }),
});
