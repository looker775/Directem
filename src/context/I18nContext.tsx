import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { detectCountryCode, inferCountryCodeFromTimeZone } from '../lib/geo';
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

  const setLang = (next: Language) => {
    setLangState(next);
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem('directem_lang', next);
        window.localStorage.setItem('directem_lang_manual', '1');
      } catch {
        // ignore storage errors
      }
    }
  };

  useEffect(() => {
    if (!translationsLoaded) {
      initTranslations();
      translationsLoaded = true;
    }
  }, []);

  useEffect(() => {
    const urlLang = typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search).get('lang')
      : null;
    if (urlLang === 'en' || urlLang === 'ar' || urlLang === 'ru') {
      setLangState(urlLang);
      try {
        window.localStorage.setItem('directem_lang', urlLang);
        window.localStorage.setItem('directem_lang_manual', '1');
      } catch {
        // ignore storage errors
      }
      return;
    }

    const stored = typeof window !== 'undefined'
      ? window.localStorage.getItem('directem_lang')
      : null;
    const manual = typeof window !== 'undefined'
      ? window.localStorage.getItem('directem_lang_manual')
      : null;
    if (manual === '1' && (stored === 'en' || stored === 'ar' || stored === 'ru')) {
      setLangState(stored);
      return;
    }

    const browserLang = typeof navigator !== 'undefined' ? navigator.language : undefined;
    detectCountryCode().then((code) => {
      const manualNow = typeof window !== 'undefined'
        ? window.localStorage.getItem('directem_lang_manual')
        : null;
      if (manualNow === '1') return;

      const storedCountry = typeof window !== 'undefined'
        ? window.localStorage.getItem('directem_country')
        : null;
      const fallbackCode = code ?? storedCountry ?? inferCountryCodeFromTimeZone();
      const resolved = resolveLanguage(fallbackCode, browserLang);
      setLangState(resolved);
    });

    const retry = window.setTimeout(() => {
      const manualRetry = window.localStorage.getItem('directem_lang_manual');
      if (manualRetry === '1') return;
      const storedCountry = window.localStorage.getItem('directem_country');
      if (!storedCountry) return;
      const resolved = resolveLanguage(storedCountry, browserLang);
      setLangState(resolved);
    }, 2500);

    return () => window.clearTimeout(retry);
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
      setLang,
    };
  }, [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}
