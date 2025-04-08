import { httpResource } from '@angular/common/http';
import { Component, computed, input, OnInit, resource } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { injectForm, TanStackField } from '@tanstack/angular-form';
import { ObButtonDirective } from '../../components/ui/button.directive';
import { ObInputDirective } from '../../components/ui/input.directive';
import { trpcClient } from '../../trpcClient';

@Component({
  selector: 'ob-tanstack-form',
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
  `,
})
export class TanstackForm implements OnInit {
  trpcClient = trpcClient;
  todoId = input('');

  test = httpResource('...');
  userResource = resource({
    request: () => ({ id: this.todoId() }),
    loader: ({ request }) => trpcClient.todo.getTodo.query(request),
  });

  todo = computed(() => this.userResource.value());

  form = injectForm({
    defaultValues: {
      fullName: '',
    },
    onSubmit({ value }) {
      // Do something with form data
      console.log(value);
    },
  });

  ngOnInit(): void {
    console.log(this.userResource.status());
  }

  handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.form.handleSubmit();
  }
}
