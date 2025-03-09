import { Injectable } from '@angular/core';
import { trpcClient, wsClient } from '../../trpcClient';

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
  wsClient = wsClient;
  trpcClient = trpcClient;

  async getTodo(input: { id: string }) {
    const { id } = input;

    return this.trpcClient.todo.getTodo.query({
      id,
    });
  }

  async toggleTodo(input: { id: string; isDone: boolean }) {
    const { id, isDone } = input;

    return this.trpcClient.todo.toggleTodo.mutate({
      id,
      isDone,
    });
  }

  async getTodos() {
    return this.trpcClient.todo.getTodos.query();
  }

  async createTodo(input: { text: string; userId: string }) {
    const { text, userId } = input;

    return this.trpcClient.todo.createTodo.mutate({
      text,
      userId,
    });
  }

  async deleteTodo(input: { id: string }) {
    const { id } = input;

    return this.trpcClient.todo.deleteTodo.mutate({
      id,
    });
  }

  async testSubscription() {
    const createPostRes = await this.trpcClient.chat.createPost.mutate({
      title: 'hello world',
      text: 'check out https://this.trpcClient.post.randomNumber.io',
    });
    console.log('createPostResponse', createPostRes);

    let count = 0;
    await new Promise<void>((resolve) => {
      const subscription = this.trpcClient.chat.randomNumber.subscribe(
        undefined,
        {
          onData(data) {
            // ^ note that `data` here is inferred
            console.log('received', data);
            count++;
            if (count > 3) {
              // stop after 3 pulls
              subscription.unsubscribe();
              resolve();
            }
          },
          onError(err) {
            console.error('error', err);
          },
        }
      );
    });
    await this.wsClient.close();
  }
}
