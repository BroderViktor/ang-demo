import { TranslationLanguage } from '../language.service';

type TextMappings = Record<string, Record<TranslationLanguage, string>>;

const textMappingsInternal = {
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
  'Messages.title': {
    en: 'Messages',
    nb: 'Meldinger',
  },
  'MessageForm.content.label': {
    en: 'Message',
    nb: 'Melding',
  },
  'MessageForm.content.error': {
    en: 'This field is required',
    nb: 'Dette feltet er påkrevd',
  },
  'MessageForm.content.submitButton.text': {
    en: 'Send',
    nb: 'Send',
  },
} as const;

//? if textMappingsInteral is set to type "TextMappings" TranslationKey type will be "string"
//? instead of the string union of the keys of "textMappingsInternal"
export const textMappings = textMappingsInternal as TextMappings;
export type TranslationKey = keyof typeof textMappingsInternal;
