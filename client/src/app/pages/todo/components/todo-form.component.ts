import { Component, effect, EventEmitter, input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { TranslatePipe } from '../../../language/translation/translate.pipe';

interface FormProps {
  text: string;
}

@Component({
  selector: 'ob-todo-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    TranslatePipe,
  ],
  styles: ``,
  template: `
    <form
      autocomplete="off"
      [formGroup]="todoForm"
      (submit)="submitForm()"
      class="w-full flex p-4 gap-2 h-20"
    >
      <mat-form-field [class]="'w-full flex'">
        <mat-label>{{ 'TodoForm.text.label' | translatePipe }}</mat-label>
        <input matInput formControlName="text" required />
        @if (text.invalid) {
        <mat-error>{{ 'TodoForm.text.error' | translatePipe }}</mat-error>
        }
      </mat-form-field>
      <br />

      <button mat-raised-button type="submit" [class]="'w-40'">
        {{ 'TodoForm.submitButton.text' | translatePipe }}
      </button>
    </form>
  `,
})
export class TodoFormComponent {
  initialState = input<FormProps>();

  @Output()
  formValuesChanged = new EventEmitter<FormProps>();

  @Output()
  formSubmitted = new EventEmitter<FormProps>();

  todoForm = this.formBuilder.group({
    text: ['', [Validators.required, Validators.minLength(1)]],
  });

  constructor(private formBuilder: FormBuilder) {
    effect(() => {
      this.todoForm.setValue({
        text: this.initialState()?.text || '',
      });
    });
  }

  get text() {
    return this.todoForm.get('text')!;
  }

  submitForm() {
    const { text } = this.todoForm.value;
    if (!text) return;

    this.formSubmitted.emit({ text });
  }
}
