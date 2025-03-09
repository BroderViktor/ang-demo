import { TranslationLanguage } from '../language.service';

type TextMappings = Record<string, Record<TranslationLanguage, string>>;

export const textMappings: TextMappings = {
  'LocaleSelector.norwegian.label': {
    en: 'Norwegian',
    nb: 'Norsk',
  },
  'LocaleSelector.english.label': {
    en: 'English',
    nb: 'Engelsk',
  },
  Home: {
    en: 'Orgbrain AS',
    nb: 'Orgbrain AS',
  },
  'Todos.title': {
    en: 'Todos',
    nb: 'Gjørmål',
  },
  'Todos.hideDone.label': {
    en: 'Hide done',
    nb: 'Skjul ferdig',
  },
  'TodoForm.text.label': {
    en: 'Todo',
    nb: 'Gjørmål',
  },
  'TodoForm.text.error': {
    en: 'This field is required',
    nb: 'Dette feltet er påkrevd',
  },
  'TodoForm.submitButton.text': {
    en: 'Add',
    nb: 'Legg til',
  },
} as const;

export type TranslationKey = keyof typeof textMappings;
