import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslatePipe } from '../../service/language/translation/translate.pipe';
import { TodoFormComponent } from './components/message-form.component';
import { Message, MessageService } from './message.service';

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
          {{ 'Messages.title' | translatePipe }}
        </h1>
      </div>
      <div
        #messageList
        class="w-full flex flex-col p-4 gap-4 bg-amber-200 h-full overflow-y-auto"
      >
        @for (item of this.messages(); track $index) {
        <div
          class="bg-on-primary rounded-sm p-2 flex gap-2 items-center justify-between"
        >
          {{ item.content }}
        </div>
        }
      </div>
      <ob-message-form (formSubmitted)="createMessage($event)" class="w-full" />
    </div>
  `,
})
export class MessagesComponent implements OnInit {
  @ViewChild('messageList') messageList?: ElementRef<HTMLDivElement>;

  hideDoneMessages = signal(false);
  messageservice = inject(MessageService);
  messages = computed<Message[]>(() => {
    return this.messageservice.messages();
  });

  //? Random user string from the mongoDB
  userId = '67bb293cbf7ee833b6090fcc';

  constructor() {
    effect(() => {
      this.messages();
      queueMicrotask(() => {
        if (this.messageList?.nativeElement) {
          this.messageList.nativeElement.scrollTop =
            this.messageList.nativeElement.scrollHeight;
        }
      });
    });
  }

  async ngOnInit() {
    this.messageservice.testSubscription();
  }

  async createMessage({ text }: { text: string }) {
    await this.messageservice
      .addMessage({
        content: text,
        userId: this.userId,
      })
      .then(() => {
        console.log('Message added');
      });
  }
}
