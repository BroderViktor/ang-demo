import { inject, Injectable, LOCALE_ID, signal } from '@angular/core';

export const TranslationLanguages = {
  en: 'en',
  nb: 'nb',
} as const;

export type TranslationLanguage = keyof typeof TranslationLanguages;

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private localStorageKey = 'selectedLanguage';
  private locale = inject(LOCALE_ID);

  selectedLanguage = signal<TranslationLanguage>(this.defaultLanguage());

  updateLanguage(language: TranslationLanguage) {
    this.selectedLanguage.update(() => language);
    window.localStorage.setItem(this.localStorageKey, language);
  }

  initDefaultLanguage(): TranslationLanguage {
    const localeLang = this.locale.split('-')[0] as TranslationLanguage;
    if (this.isLanguageSupported(localeLang)) return localeLang;

    return 'en';
  }

  defaultLanguage() {
    if (window) {
      const localStorageLang = window.localStorage.getItem(
        this.localStorageKey
      );
      if (this.isLanguageSupported(localStorageLang as TranslationLanguage))
        return localStorageLang as TranslationLanguage;
    }

    return this.initDefaultLanguage();
  }

  isLanguageSupported(language: TranslationLanguage) {
    return Object.values(TranslationLanguages).includes(language);
  }
}
