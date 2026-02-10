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

const ensureTranslations = () => {
  if (!translationsLoaded) {
    initTranslations();
    translationsLoaded = true;
  }
};

ensureTranslations();

const resolveInitialLang = (): Language => {
  if (typeof window === 'undefined') return 'en';
  const tzCountry = inferCountryCodeFromTimeZone();
  try {
    const storedCountry = window.localStorage.getItem('directem_country');
    if (storedCountry === 'KZ' || tzCountry === 'KZ') {
      window.localStorage.setItem('directem_lang', 'ru');
      window.localStorage.removeItem('directem_lang_manual');
      return 'ru';
    }
  } catch {
    if (tzCountry === 'KZ') return 'ru';
  }

  const params = new URLSearchParams(window.location.search);
  const urlLang = params.get('lang');
  if (urlLang === 'en' || urlLang === 'ar' || urlLang === 'ru') {
    try {
      window.localStorage.setItem('directem_lang', urlLang);
      window.localStorage.setItem('directem_lang_manual', '1');
    } catch {
      // ignore storage errors
    }
    return urlLang;
  }

  let stored: string | null = null;
  let manual: string | null = null;
  try {
    stored = window.localStorage.getItem('directem_lang');
    manual = window.localStorage.getItem('directem_lang_manual');
  } catch {
    // ignore storage errors
  }

  if (manual === '1' && (stored === 'en' || stored === 'ar' || stored === 'ru')) {
    return stored;
  }

  const storedCountry = (() => {
    try {
      return window.localStorage.getItem('directem_country');
    } catch {
      return null;
    }
  })();
  const browserLang = typeof navigator !== 'undefined' ? navigator.language : undefined;
  const fallbackCode = storedCountry ?? inferCountryCodeFromTimeZone();
  return resolveLanguage(fallbackCode ?? undefined, browserLang);
};

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>(resolveInitialLang);

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
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get('lang');
    if (urlLang === 'en' || urlLang === 'ar' || urlLang === 'ru') {
      setLangState(urlLang);
      try {
        window.localStorage.setItem('directem_lang', urlLang);
        window.localStorage.setItem('directem_lang_manual', '1');
      } catch {
        // ignore storage errors
      }
    }
  }, []);

  useEffect(() => {
    const browserLang = typeof navigator !== 'undefined' ? navigator.language : undefined;
    const tzCountry = inferCountryCodeFromTimeZone();
    try {
      const storedCountry = window.localStorage.getItem('directem_country');
      if (storedCountry === 'KZ' || tzCountry === 'KZ') {
        setLangState('ru');
        window.localStorage.setItem('directem_lang', 'ru');
        window.localStorage.removeItem('directem_lang_manual');
        return;
      }
    } catch {
      if (tzCountry === 'KZ') {
        setLangState('ru');
        return;
      }
    }

    detectCountryCode().then((code) => {
      if (code === 'KZ') {
        try {
          window.localStorage.setItem('directem_lang', 'ru');
          window.localStorage.removeItem('directem_lang_manual');
        } catch {
          // ignore storage errors
        }
        setLangState('ru');
        return;
      }
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
