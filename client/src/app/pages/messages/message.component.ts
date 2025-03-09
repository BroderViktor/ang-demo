import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslatePipe } from '../../service/language/translation/translate.pipe';
import { TodoFormComponent } from './components/todo-form.component';
import { MessageReturnTypes, MessageService } from './message.service';

@Component({
  selector: 'ob-messages',
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
      </div>
      <div
        class="w-full flex flex-col p-4 gap-4 bg-amber-200 h-full overflow-y-auto"
      >
        <div
          class="bg-on-primary rounded-sm p-2 flex gap-2 items-center justify-between"
        >
          <div class="">
            <!-- {{ item.text }} -->
          </div>
        </div>
      </div>
      <ob-todo-form (formSubmitted)="addTodo($event)" class="w-full" />
    </div>
  `,
})
export class MessagesComponent implements OnInit {
  hideDoneMessages = signal(false);
  messageservice = inject(MessageService);
  messages = signal<MessageReturnTypes<'getNewMessage'>[]>([]);
  userId = '67a685ecefffacd65cf995c9';

  async ngOnInit() {
    // this.messageservice.testSubscription();
    console.log('userId', this.userId);
  }

  async addTodo({ text }: { text: string }) {
    console.log('addTodo', text);
  }
}
