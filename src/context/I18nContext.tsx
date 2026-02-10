import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { detectCountryCode } from '../lib/geo';
import { getDirection, resolveLanguage, translate, type Language } from '../lib/i18n';
import { initTranslations } from '../lib/i18n-translations';

type I18nContextValue = {
  lang: Language;
  dir: 'ltr' | 'rtl';
  t: (key: string, params?: Record<string, string | number>) => string;
  setLang: (lang: Language) => void;
};

const I18nContext = createContext<I18nContextValue>({
  lang: 'en',
  dir: 'ltr',
  t: (key) => key,
  setLang: () => undefined,
});

let translationsLoaded = false;

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('en');

  useEffect(() => {
    if (!translationsLoaded) {
      initTranslations();
      translationsLoaded = true;
    }
  }, []);

  useEffect(() => {
    const stored = typeof window !== 'undefined'
      ? window.localStorage.getItem('directem_lang')
      : null;
    if (stored === 'en' || stored === 'ar' || stored === 'ru') {
      setLangState(stored);
      return;
    }

    const browserLang = typeof navigator !== 'undefined' ? navigator.language : undefined;
    detectCountryCode().then((code) => {
      const resolved = resolveLanguage(code, browserLang);
      setLangState(resolved);
    });
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.lang = lang;
    document.documentElement.dir = getDirection(lang);
    try {
      window.localStorage.setItem('directem_lang', lang);
    } catch {
      // ignore storage errors
    }
  }, [lang]);

  const value = useMemo<I18nContextValue>(() => {
    return {
      lang,
      dir: getDirection(lang),
      t: (key, params) => translate(lang, key, params),
      setLang: setLangState,
    };
  }, [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}
