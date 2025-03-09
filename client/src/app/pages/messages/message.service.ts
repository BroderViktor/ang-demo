import { Injectable, signal } from '@angular/core';
import { trpcClient } from '../../trpcClient';

type FunctionKeys<T> = {
  [K in keyof T]: T[K] extends (...args: unknown[]) => unknown ? K : never;
}[keyof T];

export type MessageReturnTypes<T extends FunctionKeys<MessageService>> =
  Awaited<ReturnType<MessageService[T]>>;

export interface Message {
  id: string;
  userId: string;
  content: string;
}

type CreateMessage = Omit<Message, 'id'>;

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  // private wsClient = wsClient;
  private trpcClient = trpcClient;

  messages = signal<Message[]>([]);

  async addMessage({ userId, content }: CreateMessage) {
    return await this.trpcClient.message.add.mutate({
      userId,
      content,
    });
  }

  insertNewMessage(message: Message) {
    this.messages.update((prev) => {
      return [...prev, message];
    });
  }

  async testSubscription() {
    const addNewMessage = (msg: Message) => {
      this.insertNewMessage(msg);
    };
    await new Promise<void>(() => {
      this.trpcClient.message.onAdd.subscribe(undefined, {
        onData(data) {
          addNewMessage(data);
        },
        onError(err) {
          console.error('error', err);
        },
      });
    });
    // await this.wsClient.close();
  }
}
