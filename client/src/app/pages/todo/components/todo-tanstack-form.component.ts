import { Component, EventEmitter, input, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { injectForm, injectStore, TanStackField } from '@tanstack/angular-form';
import { z } from 'zod';
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
        <ng-container
          [tanstackField]="form"
          name="text"
          #fullName="field"
          [validators]="{
            onChange: z
              .string()
              .min(3, 'First name must be at least 3 characters'),
            onChangeAsyncDebounceMs: 200,
          }"
        >
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
      <button
        type="submit"
        obButton
        variant="outline"
        [disabled]="!this.canSubmit() || this.isSubmitting()"
      >
        {{ this.form.state.isSubmitting ? 'Submitting...' : 'Submit' }}
      </button>
    </form>
  `,
})
export class TodoTanstackForm {
  z = z;

  @Output() formSubmitted = new EventEmitter<{
    value: FormValues;
    callback: () => void;
  }>();
  defaultValues = input<FormValues>();

  form = injectForm({
    defaultValues: this.defaultValues() ?? {
      text: '',
    },
    onSubmit: (form) => {
      this.formSubmitted.emit({
        ...form,
        callback: () => form.formApi.reset(),
      });
    },
  });
  canSubmit = injectStore(this.form, (state) => state.canSubmit);
  isSubmitting = injectStore(this.form, (state) => state.isSubmitting);

  handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.form.handleSubmit();
  }
}
