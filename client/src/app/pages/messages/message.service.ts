import { Injectable } from '@angular/core';
import { trpcClient, wsClient } from '../../trpcClient';

type FunctionKeys<T> = {
  [K in keyof T]: T[K] extends (...args: unknown[]) => unknown ? K : never;
}[keyof T];

export type MessageReturnTypes<T extends FunctionKeys<MessageService>> =
  Awaited<ReturnType<MessageService[T]>>;

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  wsClient = wsClient;
  trpcClient = trpcClient;

  addMessage() {
    return '....';
  }

  getNewMessage() {
    return '....';
  }
}
