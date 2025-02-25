import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { UserInsightService } from '../service/UserInsight.service';
import { LanguageService, TranslationLanguage } from './language.service';
import { TranslatePipe } from './translation/translate.pipe';

interface LanguageOption {
  label: string;
  value: TranslationLanguage;
}

@Component({
  selector: 'ob-locale-selector',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    FormsModule,
    TranslatePipe,
    MatIconModule,
  ],
  template: `
    <button
      class="w-fit border-1 flex items-center gap-2 p-2 hover:cursor group relative bg-on-primary rounded-sm"
    >
      {{ selectedLanguage() === 'en' ? 'English' : 'Norsk' }}
      <mat-icon>arrow_drop_down</mat-icon>
      <div
        class="bg-on-primary group-hover:flex hidden absolute top-11 right-0 shadow-2xl flex-col p-2 rounded-sm border-1 border-gray-300"
      >
        @for (item of languageOptions; track $index) {
        <button
          class="w-full p-2 text-2xl text-primary hover:bg-primary hover:text-on-primary rounded-sm"
          (click)="changeLocale(item.value)"
        >
          {{ item.label | translatePipe }}
        </button>
        }
      </div>
    </button>
  `,
})
export class LocaleSelectorComponent {
  userInsightService = inject(UserInsightService);
  languageService = inject(LanguageService);
  selectedLanguage = signal<TranslationLanguage>(
    this.languageService.selectedLanguage()
  );

  languageOptions: LanguageOption[] = [
    { label: 'LocaleSelector.english.label', value: 'en' },
    { label: 'LocaleSelector.norwegian.label', value: 'nb' },
  ];

  changeLocale(locale: TranslationLanguage) {
    this.userInsightService.trackEvent('change-locale', { locale });
    this.languageService.updateLanguage(locale);
    window.location.reload();
  }
}
