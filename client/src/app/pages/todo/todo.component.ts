import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslatePipe } from '../../language/translation/translate.pipe';
import { TodoFormComponent } from './components/todo-form.component';
import { TodoReturnTypes, TodoService } from './todo.service';

@Component({
  selector: 'ob-todos',
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    TodoFormComponent,
    MatIconModule,
    MatCheckboxModule,
    TranslatePipe,
    CommonModule,
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
        @for (item of todos(); track item.id) { @if (!item.isDone ||
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
      <ob-todo-form (formSubmitted)="addTodo($event)" class="w-full" />
    </div>
  `,
  styles: ``,
})
export class TodosComponent implements OnInit {
  hideDoneTodos = signal(false);
  todoService = inject(TodoService);
  todos = signal<TodoReturnTypes<'getTodos'>>([]);
  userId = '67a685ecefffacd65cf995c9';

  async ngOnInit() {
    await this.refreshTodos();
  }

  async addTodo({ text }: { text: string }) {
    await this.todoService.createTodo({ text, userId: this.userId });
    await this.refreshTodos();
  }

  async toggleTodo({ id, isDone }: { id: string; isDone: boolean }) {
    await this.todoService.toggleTodo({ id, isDone });
    await this.refreshTodos();
  }

  async refreshTodos() {
    const todos = await this.todoService.getTodos();
    this.todos.set(todos);
  }

  async deleteTodo({ id }: { id: string }) {
    await this.todoService.deleteTodo({ id });
    await this.refreshTodos();
  }

  toggleHideDone() {
    this.hideDoneTodos.update((v) => !v);
  }
}
