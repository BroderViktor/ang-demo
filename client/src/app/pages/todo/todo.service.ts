import { Injectable } from '@angular/core';
import { trpcClient } from '../../trpcClient';

type FunctionKeys<T> = {
  [K in keyof T]: T[K] extends (...args: unknown[]) => unknown ? K : never;
}[keyof T];

export type TodoReturnTypes<T extends FunctionKeys<TodoService>> = Awaited<
  ReturnType<TodoService[T]>
>;

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  trpcClient = trpcClient;

  async getTodo(input: { id: string }) {
    const { id } = input;

    return this.trpcClient.getTodo.query({
      id,
    });
  }

  async toggleTodo(input: { id: string; isDone: boolean }) {
    const { id, isDone } = input;

    return this.trpcClient.toggleTodo.mutate({
      id,
      isDone,
    });
  }

  async getTodos() {
    return this.trpcClient.getTodos.query();
  }

  async createTodo(input: { text: string; userId: string }) {
    const { text, userId } = input;

    return this.trpcClient.createTodo.mutate({
      text,
      userId,
    });
  }

  async deleteTodo(input: { id: string }) {
    const { id } = input;

    return this.trpcClient.deleteTodo.mutate({
      id,
    });
  }
}
