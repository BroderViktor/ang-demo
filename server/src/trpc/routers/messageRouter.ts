import { type Message } from "@prisma/client";

import { observable } from "@trpc/server/observable";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

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

export const messageRouter = createTRPCRouter({
  add: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        content: z.string().min(1),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { userId, content } = input;

      const message = await ctx.db.message.create({
        data: {
          content,
          userId,
        },
      });

      eventEmitter.emitMessageUpdate(message);

      return message;
    }),
  onAdd: publicProcedure.subscription(() => {
    return observable<Message>((emit) => {
      const onAdd = (data: Message) => emit.next(data);

      eventEmitter.subscribe("add", onAdd);
      return () => {
        eventEmitter.unsubscribe("add", onAdd);
      };
    });
  }),
});
