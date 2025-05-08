import { httpResource } from '@angular/common/http';
import { Component, computed, input, resource } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { injectForm, TanStackField } from '@tanstack/angular-form';
import { ObButtonDirective } from '../../components/ui/button.directive';
import { ObInputDirective } from '../../components/ui/input.directive';
import { trpcClient } from '../../trpcClient';

@Component({
  selector: 'ob-tanstack-form-test',
  standalone: true,
  imports: [TanStackField, MatInputModule, ObInputDirective, ObButtonDirective],
  template: `
    <form (submit)="handleSubmit($event)">
      <div>
        <ng-container [tanstackField]="form" name="fullName" #fullName="field">
          <label
            class="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-medium text-base"
            [for]="fullName.api.name"
            >First Name:</label
          >
          <input
            obInput
            variant="blue"
            [name]="fullName.api.name"
            [value]="fullName.api.state.value"
            (blur)="fullName.api.handleBlur()"
            (input)="fullName.api.handleChange($any($event).target.value)"
          />
        </ng-container>
      </div>
      <button type="submit" obButton variant="outline">Submit</button>
    </form>
    <div class="bg-blue-200 w-40 flex justify-center items-center flex-col">
      <button obButton variant="outline" (click)="tester($event)" type="button">
        Tester
      </button>
      @for (item of todos(); track $index) {
      <button
        obButton
        variant="destructive"
        class="w-20 h-20 "
        (click)="deleteTodo(item.id)"
      >
        {{ item.text }}
      </button>
      }
    </div>
  `,
})
export class TanstackForm {
  trpcClient = trpcClient;
  todoId = input('');

  test = httpResource('...');
  todosResource = resource({
    loader: () => trpcClient.todo.getTodos.query(),
  });

  todos = computed(() => this.todosResource.value());

  form = injectForm({
    defaultValues: {
      fullName: '',
    },
    onSubmit({ value }) {
      // Do something with form data
      console.log(value);
    },
  });

  handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.form.handleSubmit();
  }
  tester(event: Event) {
    console.log(event);
    console.log(this.todosResource.value());
  }

  async deleteTodo(id: string) {
    await this.trpcClient.todo.deleteTodo
      .mutate({
        id,
      })
      .then(() => {
        this.todosResource.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
