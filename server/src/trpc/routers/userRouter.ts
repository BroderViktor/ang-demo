import { type Message } from "@prisma/client";

import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
dotenv.config();

interface Events {
  add: (data: Message) => void;
}

type Event = keyof Events;
type ListenerFunction<T extends Event> = Events[T];

class EventEmitter {
  private subscribers: Record<Event, ListenerFunction<Event>[]> = { add: [] };

  subscribe(event: Event, listener: ListenerFunction<Event>) {
    this.subscribers[event].push(listener);
  }

  unsubscribe(event: Event, listener: ListenerFunction<Event>) {
    const listeners = this.subscribers[event];
    if (listeners) {
      const index = listeners.indexOf(listener);
      if (index !== -1) {
        listeners.splice(index, 1);
      }
    }
  }

  emitMessageUpdate(data: Message) {
    const listeners = this.subscribers.add;

    listeners.forEach((fn) => {
      fn(data);
    });
  }
}

const eventEmitter = new EventEmitter();

export const userRouter = createTRPCRouter({
  signUp: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(6).max(120),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await ctx.db.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

      return createUserToken(user.id);
    }),

  signIn: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(6).max(120),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;

      const user = await ctx.db.user.findFirst({
        where: { email },
      });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error("Invalid email or password");
      }

      return createUserToken(user.id);
    }),

  test: publicProcedure.query(async ({}) => {
    return "Hello";
  }),

  // onAdd: publicProcedure.subscription(() => {
  //   return observable<Message>((emit) => {
  //     const onAdd = (data: Message) => emit.next(data);

  //     eventEmitter.subscribe("add", onAdd);
  //     return () => {
  //       eventEmitter.unsubscribe("add", onAdd);
  //     };
  //   });
  // }),
});

function createUserToken(userId: string) {
  return jwt.sign({ userId }, process.env["JWT_SECRET"]!, {
    expiresIn: 1000 * 60 * 60, // 1 hour
  });
}
