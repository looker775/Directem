export type Language = 'en' | 'ar' | 'ru';

type TranslationMap = Record<string, string>;

const translations: Record<Language, TranslationMap> = {
  en: {},
  ar: {},
  ru: {},
};

const rtlLanguages = new Set<Language>(['ar']);

const countryLanguageMap: Record<string, Language> = {
  AE: 'ar',
  SA: 'ar',
  QA: 'ar',
  KW: 'ar',
  BH: 'ar',
  OM: 'ar',
  EG: 'ar',
  JO: 'ar',
  LB: 'ar',
  IQ: 'ar',
  SY: 'ar',
  YE: 'ar',
  MA: 'ar',
  DZ: 'ar',
  TN: 'ar',
  LY: 'ar',
  SD: 'ar',
  MR: 'ar',
  PS: 'ar',
  RU: 'ru',
  KZ: 'ru',
  BY: 'ru',
  KG: 'ru',
  TJ: 'ru',
};

export function resolveLanguage(countryCode?: string, browserLang?: string): Language {
  if (countryCode) {
    return countryLanguageMap[countryCode] ?? 'en';
  }
  if (browserLang) {
    const normalized = browserLang.toLowerCase();
    if (normalized.startsWith('ar')) return 'ar';
    if (normalized.startsWith('ru')) return 'ru';
  }
  return 'en';
}

export function getDirection(lang: Language): 'rtl' | 'ltr' {
  return rtlLanguages.has(lang) ? 'rtl' : 'ltr';
}

export function translate(
  lang: Language,
  key: string,
  params?: Record<string, string | number>
): string {
  const value = translations[lang]?.[key] ?? key;
  if (!params) return value;
  return value.replace(/\{(\w+)\}/g, (_, token) => {
    const replacement = params[token];
    return replacement === undefined ? `{${token}}` : String(replacement);
  });
}

export function registerTranslations(lang: Language, map: TranslationMap) {
  translations[lang] = { ...translations[lang], ...map };
}
