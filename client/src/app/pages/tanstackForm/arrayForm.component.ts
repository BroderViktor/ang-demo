import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TanStackField, injectForm } from '@tanstack/angular-form';
import { ObButtonDirective } from '../../components/ui/button.directive';
import { ObInputDirective } from '../../components/ui/input.directive';

@Component({
  selector: 'ob-tanstack-array-form',
  standalone: true,
  imports: [TanStackField, ObInputDirective, ObButtonDirective, MatIconModule],
  template: `
    <ng-container [tanstackField]="form" name="hobbies" #hobbies="field">
      <div>
        Hobbies
        <div>
          @if (!hobbies.api.state.value.length) { No hobbies found } @for (_ of
          hobbies.api.state.value; track $index) {
          <div class="relative p-4 border-2">
            <ng-container
              [tanstackField]="form"
              [name]="getHobbyName($index)"
              #hobbyName="field"
            >
              <div>
                <label [for]="hobbyName.api.name">Name:</label>
                <input
                  obInput
                  [id]="hobbyName.api.name"
                  [name]="hobbyName.api.name"
                  [value]="hobbyName.api.state.value"
                  (blur)="hobbyName.api.handleBlur()"
                  (input)="
                    hobbyName.api.handleChange($any($event).target.value)
                  "
                />
                <button
                  obButton
                  variant="destructive"
                  size="icon"
                  class="absolute top-0 right-0 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  type="button"
                  (click)="hobbies.api.removeValue($index)"
                >
                  <mat-icon>trash</mat-icon>
                </button>
              </div>
            </ng-container>
            <ng-container
              [tanstackField]="form"
              [name]="getHobbyDesc($index)"
              #hobbyDesc="field"
            >
              <div>
                <label [for]="hobbyDesc.api.name">Description:</label>
                <input
                  obInput
                  [id]="hobbyDesc.api.name"
                  [name]="hobbyDesc.api.name"
                  [value]="hobbyDesc.api.state.value"
                  (blur)="hobbyDesc.api.handleBlur()"
                  (input)="
                    hobbyDesc.api.handleChange($any($event).target.value)
                  "
                />
              </div>
            </ng-container>
          </div>
          }
        </div>
        <button type="button" (click)="hobbies.api.pushValue(defaultHobby)">
          Add hobby
        </button>
      </div>
    </ng-container>
  `,
})
export class TanstackArrayForm {
  defaultHobby = {
    name: '',
    description: '',
    yearsOfExperience: 0,
  };

  getHobbyName = (idx: number) => `hobbies[${idx}].name` as const;
  getHobbyDesc = (idx: number) => `hobbies[${idx}].description` as const;

  form = injectForm({
    defaultValues: {
      hobbies: [] as {
        name: string;
        description: string;
        yearsOfExperience: number;
      }[],
    },
    onSubmit({ value }) {
      alert(JSON.stringify(value));
    },
  });
}
