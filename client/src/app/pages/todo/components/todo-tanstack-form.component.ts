import { Component, EventEmitter, input, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { injectForm, TanStackField } from '@tanstack/angular-form';
import { ObButtonDirective } from '../../../components/ui/button.directive';
import { ObInputDirective } from '../../../components/ui/input.directive';

interface FormValues {
  text: string;
}

@Component({
  selector: 'ob-todo-tanstack-form',
  standalone: true,
  imports: [TanStackField, MatInputModule, ObInputDirective, ObButtonDirective],
  template: `
    <form
      (submit)="handleSubmit($event)"
      class="w-full flex p-4 gap-2 h-20 items-end"
    >
      <div class=" w-full">
        <ng-container [tanstackField]="form" name="text" #fullName="field">
          <label
            class="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-medium text-base"
            [for]="fullName.api.name"
            >Todo:</label
          >
          <input
            obInput
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
export class TodoTanstackForm {
  @Output() formSubmitted = new EventEmitter<FormValues>();
  defaultValues = input<FormValues>();

  form = injectForm({
    defaultValues: this.defaultValues() ?? {
      text: '',
    },
    onSubmit: (form) => {
      this.formSubmitted.emit(form.value);
    },
  });

  handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.form.handleSubmit();
  }
}
