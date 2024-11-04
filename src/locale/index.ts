import en from "./langs/en.json";
import zh from "./langs/zh.json";
import { createI18n } from "vue-i18n";

export type Language = "en" | "zh";
export type LanguageInfo = {
  code: Language;
  name_local: string;
};
export const LANG_INFO: Record<Language, LanguageInfo> = {
  en: {
    code: "en",
    name_local: "English",
  },
  "zh": {
    code: "zh",
    name_local: "简体中文",
  },
};
export const LANG_INFO_FALLBACK: Record<string, Language> = {
  "zh-cn": "zh",
  "zh-tw": "zh",
  "zh-hk": "zh",
  "zh-my": "zh",
  "zh-sg": "zh",
  "en-us": "en",
  "en-au": "en",
  "en-gb": "en",
};
export type FallbackLanguage = keyof typeof LANG_INFO_FALLBACK;

export function isLanguage(language: string): language is Language {
  return language in LANG_INFO;
}
export function isFallbackLanguage(
  language: string
): language is FallbackLanguage {
  return language in LANG_INFO_FALLBACK;
}

export function toLanguage(locale: string) {
  const p = locale.indexOf("_");
  if (p >= 0) {
    return (
      locale.substring(0, p).toLowerCase() +
      "-" +
      locale.substring(p + 1).toLowerCase()
    );
  } else {
    return locale.toLowerCase();
  }
}

export function getBrowserLanguage() {
  const language = getSavedLanguage();
  if (language) {
    return language;
  }
  const languages = navigator.languages || [navigator.language];
  for (const language of languages.map(toLanguage)) {
    if (isLanguage(language)) {
      return language;
    }
    if (isFallbackLanguage(language)) {
      return LANG_INFO_FALLBACK[language];
    }
  }
}
export const LOCALSTORAGE_LANGUAGE_KEY = "language";
export function saveLanguage(language: string) {
  localStorage.setItem(LOCALSTORAGE_LANGUAGE_KEY, language);
}
export function getSavedLanguage() {
  const language = localStorage.getItem(LOCALSTORAGE_LANGUAGE_KEY);
  if (language && isLanguage(language)) {
    return language;
  }
}

const fallbackLocale: Language = "en";
const messages: Record<Language, typeof en> = { en, zh };

export const i18n = createI18n({
  locale: getBrowserLanguage(),
  fallbackLocale,
  messages,
});
