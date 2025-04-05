import { Component } from '@angular/core';
import { TanStackField, injectForm } from '@tanstack/angular-form';

@Component({
  selector: 'ob-tanstack-form',
  standalone: true,
  imports: [TanStackField],
  template: `
    <form (submit)="handleSubmit($event)">
      <div>
        <ng-container [tanstackField]="form" name="fullName" #fullName="field">
          <label [for]="fullName.api.name">First Name:</label>
          <input
            [name]="fullName.api.name"
            [value]="fullName.api.state.value"
            (blur)="fullName.api.handleBlur()"
            (input)="fullName.api.handleChange($any($event).target.value)"
          />
        </ng-container>
      </div>
      <button type="submit">Submit</button>
    </form>
  `,
})
export class TanstackForm {
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
}
