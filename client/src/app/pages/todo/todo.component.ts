import { CommonModule } from '@angular/common';
import { Component, computed, resource, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SearchFieldComponent } from '../../components/searchField.component';
import { TranslatePipe } from '../../service/language/translation/translate.pipe';
import { trpcClient } from '../../trpcClient';
import { TodoTanstackForm } from './components/todo-tanstack-form.component';

@Component({
  selector: 'ob-todos',
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatCheckboxModule,
    TranslatePipe,
    CommonModule,
    SearchFieldComponent,
    TodoTanstackForm,
  ],
  template: `
    <div
      class="flex flex-col justify-between items-center h-full w-full bg-amber-100"
    >
      <div class="w-full flex justify-center items-center gap-4">
        <h1 class="text-primary text-5xl p-4 ml-auto">
          {{ 'Todos.title' | translatePipe }}
        </h1>
        <div class="flex items-center gap-2 p-4 ml-auto">
          <mat-checkbox
            (change)="toggleHideDone()"
            [checked]="hideDoneTodos()"
            name="hideDone"
          >
            {{ 'Todos.hideDone.label' | translatePipe }}</mat-checkbox
          >
        </div>
      </div>
      <div
        class="w-full flex flex-col p-4 gap-4 bg-amber-200 h-full overflow-y-auto"
      >
        <ob-search-field
          [items]="todos()"
          [searchKey]="'text'"
          [doAdvancedSearch]="false"
          (outputItems)="handleOutputItems($event)"
        />
        @for (item of todosToDisplay(); track item.id) { @if (!item.isDone ||
        !hideDoneTodos()) {
        <div
          class="bg-on-primary rounded-sm p-2 flex gap-2 items-center justify-between"
        >
          <mat-checkbox
            type="checkbox"
            [checked]="item.isDone"
            (change)="toggleTodo({ id: item.id, isDone: item.isDone })"
            [name]="item.id"
            [ngClass]="{ 'opacity-70 line-through': item.isDone }"
            >{{ item.text }}</mat-checkbox
          >
          <button
            class="bg-red-400 hover:bg-red-300 active:bg-red-500 rounded-2xl w-10 h-10 flex justify-center items-center"
            (click)="deleteTodo({ id: item.id })"
          >
            <mat-icon fontIcon="delete" />
          </button>
        </div>
        } }
      </div>
      <ob-todo-tanstack-form (formSubmitted)="addTodo($event)" class="w-full" />
    </div>
  `,
})
export class TodosComponent {
  trpcClient = trpcClient;
  hideDoneTodos = signal(false);
  userId = '67bb293cbf7ee833b6090fcc';

  todosResource = resource({
    loader: () => trpcClient.todo.getTodos.query(),
  });

  todos = computed(() => this.todosResource.value() || []);
  todosToDisplay = signal(this.todos());

  handleOutputItems(filteredItems: ReturnType<typeof this.todos>) {
    this.todosToDisplay.set(filteredItems);
  }

  async addTodo({ text }: { text: string }) {
    await this.trpcClient.todo.createTodo
      .mutate({
        text,
        userId: this.userId,
      })
      .then(async () => {
        await this.refreshTodos();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async toggleTodo({ id, isDone }: { id: string; isDone: boolean }) {
    await this.trpcClient.todo.toggleTodo
      .mutate({ id, isDone })
      .then(async () => {
        await this.refreshTodos();
      });
  }

  async deleteTodo({ id }: { id: string }) {
    await this.trpcClient.todo.deleteTodo.mutate({ id }).then(async () => {
      await this.refreshTodos();
    });
  }

  toggleHideDone() {
    this.hideDoneTodos.update((v) => !v);
  }

  refreshTodos() {
    this.todosResource.reload();
  }
}
