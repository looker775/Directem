import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { TRANSLATIONS, initTranslations } from './lib/i18n-translations';

const COUNTRY_LANGUAGE_MAP: Record<string, string | string[]> = {
  KZ: 'ru',
  RU: 'ru',
  BY: 'ru',
  AE: ['ar', 'en'],
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
  MA: ['ar', 'fr', 'en'],
  DZ: 'ar',
  TN: 'ar',
  LY: 'ar',
};

const LANGUAGE_OVERRIDE_KEY = 'directem_lang_manual';
const COUNTRY_STORAGE_KEY = 'directem_country';

function resolveCountryLanguage(code: string) {
  const entry = COUNTRY_LANGUAGE_MAP[code];
  if (!entry) return undefined;
  if (Array.isArray(entry)) {
    const browserLang = (navigator.language || '').split('-')[0];
    if (browserLang && entry.includes(browserLang)) {
      return browserLang;
    }
    const current = (i18n.resolvedLanguage || i18n.language || '').split('-')[0];
    if (current && entry.includes(current)) {
      return current;
    }
    return entry[0];
  }
  return entry;
}

export function setLanguageByCountry(countryCode?: string, options?: { force?: boolean }) {
  if (!countryCode) return;
  const code = countryCode.toUpperCase();
  const lang = resolveCountryLanguage(code);
  if (!lang) return;
  try {
    localStorage.setItem(COUNTRY_STORAGE_KEY, code);
  } catch {
    // ignore storage errors
  }
  try {
    if (!options?.force && localStorage.getItem(LANGUAGE_OVERRIDE_KEY) === '1') {
      return;
    }
  } catch {
    // ignore storage errors
  }
  const current = (i18n.resolvedLanguage || i18n.language || '').split('-')[0];
  if (current !== lang) {
    i18n.changeLanguage(lang);
  }
}

initTranslations();

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    detection: {
      order: ['querystring', 'localStorage', 'navigator'],
      lookupQuerystring: 'lang',
      lookupLocalStorage: 'directem_lang',
      caches: ['localStorage'],
    },
    supportedLngs: ['en', 'ru', 'ar'],
    load: 'languageOnly',
    keySeparator: false,
    nsSeparator: false,
    interpolation: {
      escapeValue: false,
      prefix: '{',
      suffix: '}',
    },
    resources: {
      en: { translation: {} },
      ru: { translation: TRANSLATIONS.ru },
      ar: { translation: TRANSLATIONS.ar },
    },
  });

i18n.on('languageChanged', (lng) => {
  if (typeof document === 'undefined') return;
  const lang = lng.split('-')[0];
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  try {
    localStorage.setItem('directem_lang', lang);
  } catch {
    // ignore storage errors
  }
});

export default i18n;
