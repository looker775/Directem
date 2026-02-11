import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

export type Language = 'en' | 'ru' | 'ar';

type I18nContextValue = {
  lang: Language;
  dir: 'ltr' | 'rtl';
  t: (key: string, params?: Record<string, string | number>) => string;
  setLang: (lang: Language) => void;
};

export function I18nProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function useI18n(): I18nContextValue {
  const { t, i18n: i18next } = useTranslation();

  const resolved = (i18next.resolvedLanguage || i18next.language || 'en').split('-')[0] as Language;

  return {
    lang: resolved,
    dir: resolved === 'ar' ? 'rtl' : 'ltr',
    t,
    setLang: (next: Language) => {
      try {
        window.localStorage.setItem('directem_lang', next);
        window.localStorage.setItem('directem_lang_manual', '1');
      } catch {
        // ignore storage errors
      }
      i18n.changeLanguage(next);
    },
  };
}
