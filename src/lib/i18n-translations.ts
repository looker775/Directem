import { registerTranslations } from './i18n';

export const TRANSLATIONS: Record<'en' | 'ar' | 'ru', Record<string, string>> = {
  en: {},
  ar: {},
  ru: {},
};

const mergeTranslations = (lang: 'en' | 'ar' | 'ru', map: Record<string, string>) => {
  TRANSLATIONS[lang] = { ...TRANSLATIONS[lang], ...map };
  registerTranslations(lang, map);
};

export function initTranslations() {
  mergeTranslations('ar', {
    'Pricing': 'Ш§Щ„ШЈШіШ№Ш§Ш±',
    'Sign in': 'ШЄШіШ¬ЩЉЩ„ Ш§Щ„ШЇШ®Щ€Щ„',
    'Register': 'ШҐЩ†ШґШ§ШЎ Ш­ШіШ§ШЁ',
    'Owner': 'Ш§Щ„Щ…Ш§Щ„Щѓ',
    'Admin workspace': 'Щ…ШіШ§Ш­Ш© Ш§Щ„Щ…ШЇЩЉШ±',
    'Marketplace': 'Ш§Щ„ШіЩ€Щ‚',
    'Sign out': 'ШЄШіШ¬ЩЉЩ„ Ш§Щ„Ш®Ш±Щ€Ш¬',
    'Account': 'Ш§Щ„Ш­ШіШ§ШЁ',
    'Country': 'Ш§Щ„ШЇЩ€Щ„Ш©',
    'Use GPS': 'Ш§ШіШЄШ®ШЇШ§Щ… GPS',
    'Locating...': 'Ш¬Ш§Ш±ЩЌ Ш§Щ„ШЄШ­ШЇЩЉШЇ...',
    'Protected': 'Щ…Ш­Щ…ЩЉ',
    'WhatsApp': 'Щ€Ш§ШЄШіШ§ШЁ',
    'Verified': 'Щ…Щ€Ш«Щ‘Щ‚',
    'Request': 'Ш·Щ„ШЁ',
    'Request access': 'Ш·Щ„ШЁ Ш§Щ„Щ€ШµЩ€Щ„',
    'Submit request': 'ШҐШ±ШіШ§Щ„ Ш§Щ„Ш·Щ„ШЁ',
    'Pending approval': 'ШЁШ§Щ†ШЄШёШ§Ш± Ш§Щ„Щ…Щ€Ш§ЩЃЩ‚Ш©',
    'Payment received. Reference: {ref}': 'ШЄЩ… Ш§ШіШЄЩ„Ш§Щ… Ш§Щ„ШЇЩЃШ№. Ш§Щ„Щ…Ш±Ш¬Ш№: {ref}',
    'Payment reference (required)': 'Щ…Ш±Ш¬Ш№ Ш§Щ„ШЇЩЃШ№ (Щ…Ш·Щ„Щ€ШЁ)',
    'Bank transfer ID or receipt': 'Ш±Щ‚Щ… Ш§Щ„ШЄШ­Щ€ЩЉЩ„ ШЈЩ€ Ш§Щ„ШҐЩЉШµШ§Щ„',
    'Preferred job': 'Ш§Щ„Щ€ШёЩЉЩЃШ© Ш§Щ„Щ…ЩЃШ¶Щ„Ш©',
    'e.g. Sales manager': 'Щ…Ш«Ш§Щ„: Щ…ШЇЩЉШ± Щ…ШЁЩЉШ№Ш§ШЄ',
    'Salary expectation': 'Ш§Щ„Ш±Ш§ШЄШЁ Ш§Щ„Щ…ШЄЩ€Щ‚Ш№',
    'e.g. 5000 AED / month': 'Щ…Ш«Ш§Щ„: 5000 ШЇШ±Щ‡Щ… / ШґЩ‡Ш±',
    'Notes for admin': 'Щ…Щ„Ш§Ш­ШёШ§ШЄ Щ„Щ„Щ…ШЇЩЉШ±',
    'Preferred cities, industries, or extra notes': 'Ш§Щ„Щ…ШЇЩ† ШЈЩ€ Ш§Щ„Щ‚Ш·Ш§Ш№Ш§ШЄ Ш§Щ„Щ…ЩЃШ¶Щ„Ш© ШЈЩ€ ШЈЩЉ Щ…Щ„Ш§Ш­ШёШ§ШЄ ШҐШ¶Ш§ЩЃЩЉШ©',
    'Refresh': 'ШЄШ­ШЇЩЉШ«',
    'Pending': 'Щ‚ЩЉШЇ Ш§Щ„Ш§Щ†ШЄШёШ§Ш±',
    'Active': 'Щ†ШґШ·',
    'Rejected': 'Щ…Ш±ЩЃЩ€Ш¶',
    'Expired': 'Щ…Щ†ШЄЩ‡ЩЉ',
    'Approved': 'Щ…Щ€Ш§ЩЃЩ‚ Ш№Щ„ЩЉЩ‡',
    'Blocked': 'Щ…Ш­ШёЩ€Ш±',
    'Showing USD because exchange rates are unavailable.': 'Ш№Ш±Ш¶ ШЁШ§Щ„ШЇЩ€Щ„Ш§Ш± Щ„ШЈЩ† ШЈШіШ№Ш§Ш± Ш§Щ„ШµШ±ЩЃ ШєЩЉШ± Щ…ШЄШ§Ш­Ш©.',
    'Local currency unsupported. Showing {currency}.': 'Ш§Щ„Ш№Щ…Щ„Ш© Ш§Щ„Щ…Ш­Щ„ЩЉШ© ШєЩЉШ± Щ…ШЇШ№Щ€Щ…Ш©. ЩЉШЄЩ… Ш§Щ„Ш№Ш±Ш¶ ШЁЩЂ {currency}.',
    'Owner & Admin portal': 'ШЁЩ€Ш§ШЁШ© Ш§Щ„Щ…Ш§Щ„Щѓ Щ€Ш§Щ„Щ…ШЇЩЉШ±',
    'Owner & Admin access': 'Щ€ШµЩ€Щ„ Ш§Щ„Щ…Ш§Щ„Щѓ Щ€Ш§Щ„Щ…ШЇЩЉШ±',
    'Welcome back': 'Щ…Ш±Ш­ШЁЩ‹Ш§ ШЁШ№Щ€ШЇШЄЩѓ',
    'Forgot password?': 'Щ†ШіЩЉШЄ ЩѓЩ„Щ…Ш© Ш§Щ„Щ…Ш±Щ€Ш±Шџ',
    'Forgot admin password?': 'Щ†ШіЩЉШЄ ЩѓЩ„Щ…Ш© Щ…Ш±Щ€Ш± Ш§Щ„Щ…ШЇЩЉШ±Шџ',
    'Signing in...': 'Ш¬Ш§Ш±ЩЌ ШЄШіШ¬ЩЉЩ„ Ш§Щ„ШЇШ®Щ€Щ„...',
    'Full name': 'Ш§Щ„Ш§ШіЩ… Ш§Щ„ЩѓШ§Щ…Щ„',
    'Create account': 'ШҐЩ†ШґШ§ШЎ Ш­ШіШ§ШЁ',
    'Creating account...': 'Ш¬Ш§Ш±ЩЌ ШҐЩ†ШґШ§ШЎ Ш§Щ„Ш­ШіШ§ШЁ...',
    'Email': 'Ш§Щ„ШЁШ±ЩЉШЇ Ш§Щ„ШҐЩ„ЩѓШЄШ±Щ€Щ†ЩЉ',
    'Password': 'ЩѓЩ„Щ…Ш© Ш§Щ„Щ…Ш±Щ€Ш±',
    'Create a strong password': 'ШЈЩ†ШґШ¦ ЩѓЩ„Щ…Ш© Щ…Ш±Щ€Ш± Щ‚Щ€ЩЉШ©',
    'Already have an account?': 'Щ„ШЇЩЉЩѓ Ш­ШіШ§ШЁШџ',
    'Sign in as admin': 'ШіШ¬Щ‘Щ„ Ш§Щ„ШЇШ®Щ€Щ„ ЩѓЩ…ШЇЩЉШ±',
    'Buyer': 'Щ…ШґШЄШ±ЩЉ',
    'Admin': 'Щ…ШЇЩЉШ±',
    'Package': 'Ш§Щ„ШЁШ§Щ‚Ш©',
    'Save': 'Ш­ЩЃШё',
    'Submitting...': 'Ш¬Ш§Ш±ЩЌ Ш§Щ„ШҐШ±ШіШ§Щ„...',
    'Failed to request access.': 'ЩЃШґЩ„ Ш·Щ„ШЁ Ш§Щ„Щ€ШµЩ€Щ„.',
    'Unable to load your profile.': 'ШЄШ№Ш°Ш± ШЄШ­Щ…ЩЉЩ„ Щ…Щ„ЩЃЩѓ Ш§Щ„ШґШ®ШµЩЉ.',
    'Something went wrong while loading your dashboard.':
      'Ш­ШЇШ« Ш®Ш·ШЈ ШЈШ«Щ†Ш§ШЎ ШЄШ­Щ…ЩЉЩ„ Щ„Щ€Ш­Ш© Ш§Щ„ШЄШ­ЩѓЩ….',
    'Unable to send reset email.': 'ШЄШ№Ш°Ш± ШҐШ±ШіШ§Щ„ ШЁШ±ЩЉШЇ ШҐШ№Ш§ШЇШ© Ш§Щ„ШЄШ№ЩЉЩЉЩ†.',
    'Unable to reset password.': 'ШЄШ№Ш°Ш± ШҐШ№Ш§ШЇШ© ШЄШ№ЩЉЩЉЩ† ЩѓЩ„Щ…Ш© Ш§Щ„Щ…Ш±Щ€Ш±.',
    'Failed to update package.': 'ЩЃШґЩ„ ШЄШ­ШЇЩЉШ« Ш§Щ„ШЁШ§Щ‚Ш©.',
    'Failed to add package.': 'ЩЃШґЩ„ ШҐШ¶Ш§ЩЃШ© Ш§Щ„ШЁШ§Щ‚Ш©.',
    'Failed to add employer.': 'ЩЃШґЩ„ ШҐШ¶Ш§ЩЃШ© ШµШ§Ш­ШЁ Ш§Щ„Ш№Щ…Щ„.',
    'Failed to approve purchase.': 'ЩЃШґЩ„ Ш§Ш№ШЄЩ…Ш§ШЇ Ш§Щ„ШґШ±Ш§ШЎ.',
    'Failed to reject purchase.': 'ЩЃШґЩ„ Ш±ЩЃШ¶ Ш§Щ„ШґШ±Ш§ШЎ.',
    'PayPal payment failed.': 'ЩЃШґЩ„ Ш§Щ„ШЇЩЃШ№ Ш№ШЁШ± PayPal.',
    'Card payment failed.': 'ЩЃШґЩ„ ШЇЩЃШ№ Ш§Щ„ШЁШ·Ш§Щ‚Ш©.',
    'PayPal failed to initialize.': 'ЩЃШґЩ„ ШЄЩ‡ЩЉШ¦Ш© PayPal.',
    'Employer': 'ШµШ§Ш­ШЁ Ш№Щ…Щ„',
    'Contact': 'Ш¬Щ‡Ш© Ш§Щ„Ш§ШЄШµШ§Щ„',
    'Unable to sign in.': 'ШЄШ№Ш°Ш± ШЄШіШ¬ЩЉЩ„ Ш§Щ„ШЇШ®Щ€Щ„.',
    'Unable to register.': 'ШЄШ№Ш°Ш± Ш§Щ„ШЄШіШ¬ЩЉЩ„.',
    'Unknown': 'ШєЩЉШ± Щ…Ш№Ш±Щ€ЩЃ',
    'USD': 'ШЇЩ€Щ„Ш§Ш±',
    'Local': 'Щ…Ш­Щ„ЩЉ',
  });

  mergeTranslations('ru', {
    'Pricing': 'Р¦РµРЅС‹',
    'Sign in': 'Р’РѕР№С‚Рё',
    'Register': 'Р РµРіРёСЃС‚СЂР°С†РёСЏ',
    'Owner': 'Р’Р»Р°РґРµР»РµС†',
    'Admin workspace': 'Р Р°Р±РѕС‡РµРµ РјРµСЃС‚Рѕ Р°РґРјРёРЅР°',
    'Marketplace': 'РњР°СЂРєРµС‚РїР»РµР№СЃ',
    'Sign out': 'Р’С‹Р№С‚Рё',
    'Account': 'РђРєРєР°СѓРЅС‚',
    'Country': 'РЎС‚СЂР°РЅР°',
    'Use GPS': 'РСЃРїРѕР»СЊР·РѕРІР°С‚СЊ GPS',
    'Locating...': 'РћРїСЂРµРґРµР»СЏРµРј...',
    'Protected': 'Р—Р°С‰РёС‰РµРЅРѕ',
    'WhatsApp': 'WhatsApp',
    'Verified': 'РџСЂРѕРІРµСЂРµРЅРѕ',
    'Request': 'Р—Р°РїСЂРѕСЃРёС‚СЊ',
    'Request access': 'Р—Р°РїСЂРѕСЃРёС‚СЊ РґРѕСЃС‚СѓРї',
    'Submit request': 'РћС‚РїСЂР°РІРёС‚СЊ Р·Р°РїСЂРѕСЃ',
    'Pending approval': 'РћР¶РёРґР°РµС‚ РїРѕРґС‚РІРµСЂР¶РґРµРЅРёСЏ',
    'Payment received. Reference: {ref}': 'РџР»Р°С‚РµР¶ РїРѕР»СѓС‡РµРЅ. Р РµС„РµСЂРµРЅСЃ: {ref}',
    'Payment reference (required)': 'Р РµС„РµСЂРµРЅСЃ РїР»Р°С‚РµР¶Р° (РѕР±СЏР·Р°С‚РµР»СЊРЅРѕ)',
    'Bank transfer ID or receipt': 'ID РїРµСЂРµРІРѕРґР° РёР»Рё С‡РµРє',
    'Preferred job': 'Р–РµР»Р°РµРјР°СЏ РґРѕР»Р¶РЅРѕСЃС‚СЊ',
    'e.g. Sales manager': 'РЅР°РїСЂРёРјРµСЂ: РјРµРЅРµРґР¶РµСЂ РїРѕ РїСЂРѕРґР°Р¶Р°Рј',
    'Salary expectation': 'РћР¶РёРґР°РµРјР°СЏ Р·Р°СЂРїР»Р°С‚Р°',
    'e.g. 5000 AED / month': 'РЅР°РїСЂРёРјРµСЂ: 5000 AED / РјРµСЃСЏС†',
    'Notes for admin': 'РџСЂРёРјРµС‡Р°РЅРёСЏ РґР»СЏ Р°РґРјРёРЅР°',
    'Preferred cities, industries, or extra notes': 'РџСЂРµРґРїРѕС‡С‚РёС‚РµР»СЊРЅС‹Рµ РіРѕСЂРѕРґР°, РѕС‚СЂР°СЃР»Рё Рё С‚.Рґ.',
    'Refresh': 'РћР±РЅРѕРІРёС‚СЊ',
    'Pending': 'РћР¶РёРґР°РµС‚',
    'Active': 'РђРєС‚РёРІРЅРѕ',
    'Rejected': 'РћС‚РєР»РѕРЅРµРЅРѕ',
    'Expired': 'РСЃС‚РµРєР»Рѕ',
    'Approved': 'РћРґРѕР±СЂРµРЅРѕ',
    'Blocked': 'Р—Р°Р±Р»РѕРєРёСЂРѕРІР°РЅРѕ',
    'Showing USD because exchange rates are unavailable.': 'РџРѕРєР°Р·Р°РЅС‹ С†РµРЅС‹ РІ USD вЂ” РЅРµС‚ РґР°РЅРЅС‹С… РїРѕ РєСѓСЂСЃР°Рј.',
    'Local currency unsupported. Showing {currency}.': 'РњРµСЃС‚РЅР°СЏ РІР°Р»СЋС‚Р° РЅРµ РїРѕРґРґРµСЂР¶РёРІР°РµС‚СЃСЏ. РџРѕРєР°Р·Р°РЅРѕ: {currency}.',
    'Owner & Admin portal': 'РџРѕСЂС‚Р°Р» РІР»Р°РґРµР»СЊС†Р° Рё Р°РґРјРёРЅР°',
    'Owner & Admin access': 'Р”РѕСЃС‚СѓРї РІР»Р°РґРµР»СЊС†Р° Рё Р°РґРјРёРЅР°',
    'Welcome back': 'РЎ РІРѕР·РІСЂР°С‰РµРЅРёРµРј',
    'Forgot password?': 'Р—Р°Р±С‹Р»Рё РїР°СЂРѕР»СЊ?',
    'Forgot admin password?': 'Р—Р°Р±С‹Р»Рё РїР°СЂРѕР»СЊ Р°РґРјРёРЅР°?',
    'Signing in...': 'Р’С…РѕРґРёРј...',
    'Full name': 'РџРѕР»РЅРѕРµ РёРјСЏ',
    'Create account': 'РЎРѕР·РґР°С‚СЊ Р°РєРєР°СѓРЅС‚',
    'Creating account...': 'РЎРѕР·РґР°РµРј...',
    'Email': 'Email',
    'Password': 'РџР°СЂРѕР»СЊ',
    'Create a strong password': 'РџСЂРёРґСѓРјР°Р№С‚Рµ РЅР°РґРµР¶РЅС‹Р№ РїР°СЂРѕР»СЊ',
    'Already have an account?': 'РЈР¶Рµ РµСЃС‚СЊ Р°РєРєР°СѓРЅС‚?',
    'Sign in as admin': 'Р’РѕР№С‚Рё РєР°Рє Р°РґРјРёРЅ',
    'Buyer': 'РџРѕРєСѓРїР°С‚РµР»СЊ',
    'Admin': 'РђРґРјРёРЅ',
    'Package': 'РџР°РєРµС‚',
    'Save': 'РЎРѕС…СЂР°РЅРёС‚СЊ',
    'Submitting...': 'РћС‚РїСЂР°РІР»СЏРµРј...',
    'Failed to request access.': 'РќРµ СѓРґР°Р»РѕСЃСЊ РѕС‚РїСЂР°РІРёС‚СЊ Р·Р°РїСЂРѕСЃ.',
    'Unable to load your profile.': 'РќРµ СѓРґР°Р»РѕСЃСЊ Р·Р°РіСЂСѓР·РёС‚СЊ РїСЂРѕС„РёР»СЊ.',
    'Something went wrong while loading your dashboard.':
      'РћС€РёР±РєР° РїСЂРё Р·Р°РіСЂСѓР·РєРµ РїР°РЅРµР»Рё.',
    'Unable to send reset email.': 'РќРµ СѓРґР°Р»РѕСЃСЊ РѕС‚РїСЂР°РІРёС‚СЊ РїРёСЃСЊРјРѕ СЃР±СЂРѕСЃР°.',
    'Unable to reset password.': 'РќРµ СѓРґР°Р»РѕСЃСЊ СЃР±СЂРѕСЃРёС‚СЊ РїР°СЂРѕР»СЊ.',
    'Failed to update package.': 'РќРµ СѓРґР°Р»РѕСЃСЊ РѕР±РЅРѕРІРёС‚СЊ РїР°РєРµС‚.',
    'Failed to add package.': 'РќРµ СѓРґР°Р»РѕСЃСЊ РґРѕР±Р°РІРёС‚СЊ РїР°РєРµС‚.',
    'Failed to add employer.': 'РќРµ СѓРґР°Р»РѕСЃСЊ РґРѕР±Р°РІРёС‚СЊ СЂР°Р±РѕС‚РѕРґР°С‚РµР»СЏ.',
    'Failed to approve purchase.': 'РќРµ СѓРґР°Р»РѕСЃСЊ РѕРґРѕР±СЂРёС‚СЊ РїРѕРєСѓРїРєСѓ.',
    'Failed to reject purchase.': 'РќРµ СѓРґР°Р»РѕСЃСЊ РѕС‚РєР»РѕРЅРёС‚СЊ РїРѕРєСѓРїРєСѓ.',
    'PayPal payment failed.': 'РћС€РёР±РєР° РѕРїР»Р°С‚С‹ PayPal.',
    'Card payment failed.': 'РћС€РёР±РєР° РѕРїР»Р°С‚С‹ РєР°СЂС‚РѕР№.',
    'PayPal failed to initialize.': 'РќРµ СѓРґР°Р»РѕСЃСЊ РёРЅРёС†РёР°Р»РёР·РёСЂРѕРІР°С‚СЊ PayPal.',
    'Employer': 'Р Р°Р±РѕС‚РѕРґР°С‚РµР»СЊ',
    'Contact': 'РљРѕРЅС‚Р°РєС‚',
    'Unable to sign in.': 'РќРµ СѓРґР°Р»РѕСЃСЊ РІРѕР№С‚Рё.',
    'Unable to register.': 'РќРµ СѓРґР°Р»РѕСЃСЊ Р·Р°СЂРµРіРёСЃС‚СЂРёСЂРѕРІР°С‚СЊСЃСЏ.',
    'Unknown': 'РќРµРёР·РІРµСЃС‚РЅРѕ',
    'USD': 'USD',
    'Local': 'РњРµСЃС‚РЅ.',
  });

  mergeTranslations('ar', {
    'UAE-only employers': 'ШЈШµШ­Ш§ШЁ Ш№Щ…Щ„ ЩЃЩЉ Ш§Щ„ШҐЩ…Ш§Ш±Ш§ШЄ ЩЃЩ‚Ш·',
    'Owner-approved admin access': 'Щ€ШµЩ€Щ„ Ш§Щ„Щ…ШЇЩЉШ± ШЁШ№ШЇ Щ…Щ€Ш§ЩЃЩ‚Ш© Ш§Щ„Щ…Ш§Щ„Щѓ',
    'WhatsApp-ready contacts': 'Ш¬Щ‡Ш§ШЄ Ш§ШЄШµШ§Щ„ Щ€Ш§ШЄШіШ§ШЁ Ш¬Ш§Щ‡ШІШ©',
    'Local currency estimates': 'ШЄЩ‚ШЇЩЉШ±Ш§ШЄ ШЁШ§Щ„Ш№Щ…Щ„Ш© Ш§Щ„Щ…Ш­Щ„ЩЉШ©',
    'Manual approval required': 'ЩЉШЄШ·Щ„ШЁ Щ…Щ€Ш§ЩЃЩ‚Ш© ЩЉШЇЩ€ЩЉШ©',
    'Directem Verified Ledger': 'ШіШ¬Щ„ Directem Ш§Щ„Щ…Щ€Ш«Щ‘Щ‚',
    'Turn UAE employer data into an approval-gated hiring advantage.':
      'Ш­Щ€Щ‘Щ„ ШЁЩЉШ§Щ†Ш§ШЄ ШЈШµШ­Ш§ШЁ Ш§Щ„Ш№Щ…Щ„ ЩЃЩЉ Ш§Щ„ШҐЩ…Ш§Ш±Ш§ШЄ ШҐЩ„Щ‰ Щ…ЩЉШІШ© ШЄЩ€ШёЩЉЩЃ Щ…Ш­Щ…ЩЉШ© ШЁШ§Щ„Щ…Щ€Ш§ЩЃЩ‚Ш©.',
    'Directem is a curated, owner-controlled employer ledger. Buyers request access packages, admins verify payment, and contacts unlock only after approval.':
      'Directem ШіШ¬Щ„ Щ…ЩЏШ®ШЄШ§Ш± ШЁШҐШЇШ§Ш±Ш© Ш§Щ„Щ…Ш§Щ„Щѓ. ЩЉШ·Щ„ШЁ Ш§Щ„Щ…ШґШЄШ±Щ€Щ† ШЁШ§Щ‚Ш§ШЄ Ш§Щ„Щ€ШµЩ€Щ„ШЊ Щ€ЩЉШЄШ­Щ‚Щ‚ Ш§Щ„Щ…ШЇШ±Ш§ШЎ Щ…Щ† Ш§Щ„ШЇЩЃШ№ШЊ Щ€Щ„Ш§ ШЄЩЏЩЃШЄШ­ Ш¬Щ‡Ш§ШЄ Ш§Щ„Ш§ШЄШµШ§Щ„ ШҐЩ„Ш§ ШЁШ№ШЇ Ш§Щ„Щ…Щ€Ш§ЩЃЩ‚Ш©.',
    'Bundles': 'Ш§Щ„ШЁШ§Щ‚Ш§ШЄ',
    'Verification': 'Ш§Щ„ШЄШ­Щ‚Щ‚',
    'Owner-approved admins': 'Щ…ШЇШ±Ш§ШЎ ШЁЩ…Щ€Ш§ЩЃЩ‚Ш© Ш§Щ„Щ…Ш§Щ„Щѓ',
    'Coverage': 'Ш§Щ„ШЄШєШ·ЩЉШ©',
    'UAE employers only': 'ШЈШµШ­Ш§ШЁ Ш№Щ…Щ„ ЩЃЩЉ Ш§Щ„ШҐЩ…Ш§Ш±Ш§ШЄ ЩЃЩ‚Ш·',
    'Updates': 'Ш§Щ„ШЄШ­ШЇЩЉШ«Ш§ШЄ',
    'Fresh entries daily': 'ШҐШЇШ®Ш§Щ„Ш§ШЄ Ш¬ШЇЩЉШЇШ© ЩЉЩ€Щ…ЩЉЩ‹Ш§',
    'Directem ledger': 'ШіШ¬Щ„ Directem',
    'Verified employer entries': 'ШіШ¬Щ„Ш§ШЄ ШЈШµШ­Ш§ШЁ Ш№Щ…Щ„ Щ…Щ€Ш«Щ‘Щ‚Ш©',
    'Approval gate': 'ШЁЩ€Ш§ШЁШ© Ш§Щ„Щ…Щ€Ш§ЩЃЩ‚Ш©',
    'Admins only access the database after the owner approves them. Buyers unlock contacts after payment verification and approval.':
      'Щ„Ш§ ЩЉШµЩ„ Ш§Щ„Щ…ШЇЩЉШ±Щ€Щ† ШҐЩ„Щ‰ Щ‚Ш§Ш№ШЇШ© Ш§Щ„ШЁЩЉШ§Щ†Ш§ШЄ ШҐЩ„Ш§ ШЁШ№ШЇ Щ…Щ€Ш§ЩЃЩ‚Ш© Ш§Щ„Щ…Ш§Щ„Щѓ. ШЄЩЏЩЃШЄШ­ Ш¬Щ‡Ш§ШЄ Ш§Щ„Ш§ШЄШµШ§Щ„ Щ„Щ„Щ…ШґШЄШ±ЩЉЩ† ШЁШ№ШЇ Ш§Щ„ШЄШ­Щ‚Щ‚ Щ…Щ† Ш§Щ„ШЇЩЃШ№ Щ€Ш§Щ„Щ…Щ€Ш§ЩЃЩ‚Ш©.',
    'Access control': 'Ш§Щ„ШЄШ­ЩѓЩ… ШЁШ§Щ„Щ€ШµЩ€Щ„',
    'Owner & Admin': 'Ш§Щ„Щ…Ш§Щ„Щѓ Щ€Ш§Щ„Щ…ШЇЩЉШ±',
    'Buyer unlock': 'ЩЃШЄШ­ Щ„Щ„Щ…ШґШЄШ±ЩЉ',
    'After approval': 'ШЁШ№ШЇ Ш§Щ„Щ…Щ€Ш§ЩЃЩ‚Ш©',
    'Directem packages': 'ШЁШ§Щ‚Ш§ШЄ Directem',
    'Pick the employer bundle that fits your hiring target.':
      'Ш§Ш®ШЄШ± ШЁШ§Щ‚Ш© ШЈШµШ­Ш§ШЁ Ш§Щ„Ш№Щ…Щ„ Ш§Щ„ШЄЩЉ ШЄЩ†Ш§ШіШЁ Щ‡ШЇЩЃ Ш§Щ„ШЄЩ€ШёЩЉЩЃ Щ„ШЇЩЉЩѓ.',
    'Package': 'Ш§Щ„ШЁШ§Щ‚Ш©',
    'Employers': 'ШЈШµШ­Ш§ШЁ Ш§Щ„Ш№Щ…Щ„',
    'USD': 'ШЇЩ€Щ„Ш§Ш±',
    'Local': 'Щ…Ш­Щ„ЩЉ',
    'What you receive': 'Щ…Ш§Ш°Ш§ ШіШЄШ­ШµЩ„ Ш№Щ„ЩЉЩ‡',
    'Every package unlocks curated UAE employer contacts with WhatsApp numbers, phone lines, and verified company names.':
      'ЩѓЩ„ ШЁШ§Щ‚Ш© ШЄЩЃШЄШ­ Ш¬Щ‡Ш§ШЄ Ш§ШЄШµШ§Щ„ ШЈШµШ­Ш§ШЁ Ш№Щ…Щ„ Щ…Щ€Ш«Щ‘Щ‚Ш© ЩЃЩЉ Ш§Щ„ШҐЩ…Ш§Ш±Ш§ШЄ Щ…Ш№ ШЈШ±Щ‚Ш§Щ… Щ€Ш§ШЄШіШ§ШЁ Щ€Щ‡Щ€Ш§ШЄЩЃ Щ€ШЈШіЩ…Ш§ШЎ ШґШ±ЩѓШ§ШЄ Щ…Ш¤ЩѓШЇШ©.',
    'Approval workflow': 'ШіЩЉШ± Ш§Щ„Щ…Щ€Ш§ЩЃЩ‚Ш©',
    'Submit your package request, include a payment reference, and wait for admin approval. Contacts unlock instantly after approval.':
      'ШЈШ±ШіЩ„ Ш·Щ„ШЁ Ш§Щ„ШЁШ§Щ‚Ш© Щ€ШЈШ¶ЩЃ Щ…Ш±Ш¬Ш№ Ш§Щ„ШЇЩЃШ№ Ш«Щ… Ш§Щ†ШЄШёШ± Щ…Щ€Ш§ЩЃЩ‚Ш© Ш§Щ„Щ…ШЇЩЉШ±. ШЄЩЃШЄШ­ Ш¬Щ‡Ш§ШЄ Ш§Щ„Ш§ШЄШµШ§Щ„ ЩЃЩ€Ш± Ш§Щ„Щ…Щ€Ш§ЩЃЩ‚Ш©.',
    'How access works': 'ЩѓЩЉЩЃ ЩЉШ№Щ…Щ„ Ш§Щ„Щ€ШµЩ€Щ„',
    'Directem keeps employer data protected while giving you fast access.':
      'ЩЉШ­Щ…ЩЉ Directem ШЁЩЉШ§Щ†Ш§ШЄ ШЈШµШ­Ш§ШЁ Ш§Щ„Ш№Щ…Щ„ Щ€ЩЉЩ…Щ†Ш­Щѓ Щ€ШµЩ€Щ„Щ‹Ш§ ШіШ±ЩЉШ№Щ‹Ш§.',
    'Request your bundle': 'Ш§Ш·Щ„ШЁ ШЁШ§Щ‚ШЄЩѓ',
    'Choose 10, 20, or 30 employer contacts and submit your request.':
      'Ш§Ш®ШЄШ± 10 ШЈЩ€ 20 ШЈЩ€ 30 Ш¬Щ‡Ш© Ш§ШЄШµШ§Щ„ Щ€ШЈШ±ШіЩ„ Ш·Щ„ШЁЩѓ.',
    'Owner-approved review': 'Щ…Ш±Ш§Ш¬Ш№Ш© ШЁЩ…Щ€Ш§ЩЃЩ‚Ш© Ш§Щ„Щ…Ш§Щ„Щѓ',
    'Admins verify payments and unlock access after approval.':
      'ЩЉШЄШ­Щ‚Щ‚ Ш§Щ„Щ…ШЇШ±Ш§ШЎ Щ…Щ† Ш§Щ„ШЇЩЃШ№ Щ€ЩЉЩЃШЄШ­Щ€Щ† Ш§Щ„Щ€ШµЩ€Щ„ ШЁШ№ШЇ Ш§Щ„Щ…Щ€Ш§ЩЃЩ‚Ш©.',
    'Start outreach': 'Ш§ШЁШЇШЈ Ш§Щ„ШЄЩ€Ш§ШµЩ„',
    'Use the WhatsApp-ready contacts inside your Directem dashboard.':
      'Ш§ШіШЄШ®ШЇЩ… Ш¬Щ‡Ш§ШЄ Ш§Щ„Ш§ШЄШµШ§Щ„ Ш§Щ„Ш¬Ш§Щ‡ШІШ© Щ„Щ€Ш§ШЄШіШ§ШЁ ШЇШ§Ш®Щ„ Щ„Щ€Ш­Ш© Directem.',
    'Launch your Directem access today': 'Ш§ШЁШЇШЈ Щ€ШµЩ€Щ„Щѓ ШҐЩ„Щ‰ Directem Ш§Щ„ЩЉЩ€Щ…',
    'Secure employer data, clear pricing, and fast approvals in one place.':
      'ШЁЩЉШ§Щ†Ш§ШЄ ШўЩ…Щ†Ш© Щ€ШЈШіШ№Ш§Ш± Щ€Ш§Ш¶Ш­Ш© Щ€Щ…Щ€Ш§ЩЃЩ‚Ш§ШЄ ШіШ±ЩЉШ№Ш© ЩЃЩЉ Щ…ЩѓШ§Щ† Щ€Ш§Ш­ШЇ.',
    'Create your Directem account': 'ШҐЩ†ШґШ§ШЎ Ш­ШіШ§ШЁ Directem',
  });

  mergeTranslations('ru', {
    'UAE-only employers': 'Р Р°Р±РѕС‚РѕРґР°С‚РµР»Рё С‚РѕР»СЊРєРѕ РІ РћРђР­',
    'Owner-approved admin access': 'Р”РѕСЃС‚СѓРї Р°РґРјРёРЅР° РїРѕСЃР»Рµ РѕРґРѕР±СЂРµРЅРёСЏ РІР»Р°РґРµР»СЊС†Р°',
    'WhatsApp-ready contacts': 'РљРѕРЅС‚Р°РєС‚С‹ СЃ WhatsApp',
    'Local currency estimates': 'РћС†РµРЅРєР° РІ РјРµСЃС‚РЅРѕР№ РІР°Р»СЋС‚Рµ',
    'Manual approval required': 'РўСЂРµР±СѓРµС‚СЃСЏ СЂСѓС‡РЅРѕРµ РѕРґРѕР±СЂРµРЅРёРµ',
    'Directem Verified Ledger': 'РџСЂРѕРІРµСЂРµРЅРЅС‹Р№ СЂРµРµСЃС‚СЂ Directem',
    'Turn UAE employer data into an approval-gated hiring advantage.':
      'РџСЂРµРІСЂР°С‚РёС‚Рµ РґР°РЅРЅС‹Рµ СЂР°Р±РѕС‚РѕРґР°С‚РµР»РµР№ РћРђР­ РІ РєРѕРЅРєСѓСЂРµРЅС‚РЅРѕРµ РїСЂРµРёРјСѓС‰РµСЃС‚РІРѕ.',
    'Directem is a curated, owner-controlled employer ledger. Buyers request access packages, admins verify payment, and contacts unlock only after approval.':
      'Directem вЂ” СЌС‚Рѕ РєСѓСЂРёСЂСѓРµРјС‹Р№ СЂРµРµСЃС‚СЂ СЂР°Р±РѕС‚РѕРґР°С‚РµР»РµР№ РїРѕРґ РєРѕРЅС‚СЂРѕР»РµРј РІР»Р°РґРµР»СЊС†Р°. РџРѕРєСѓРїР°С‚РµР»Рё Р·Р°РїСЂР°С€РёРІР°СЋС‚ РїР°РєРµС‚С‹, Р°РґРјРёРЅС‹ РїРѕРґС‚РІРµСЂР¶РґР°СЋС‚ РѕРїР»Р°С‚Сѓ, РґРѕСЃС‚СѓРї РѕС‚РєСЂС‹РІР°РµС‚СЃСЏ РїРѕСЃР»Рµ РѕРґРѕР±СЂРµРЅРёСЏ.',
    'Bundles': 'РџР°РєРµС‚С‹',
    'Verification': 'РџСЂРѕРІРµСЂРєР°',
    'Owner-approved admins': 'РђРґРјРёРЅС‹ СЃ РѕРґРѕР±СЂРµРЅРёРµРј РІР»Р°РґРµР»СЊС†Р°',
    'Coverage': 'РџРѕРєСЂС‹С‚РёРµ',
    'UAE employers only': 'Р Р°Р±РѕС‚РѕРґР°С‚РµР»Рё РћРђР­',
    'Updates': 'РћР±РЅРѕРІР»РµРЅРёСЏ',
    'Fresh entries daily': 'РќРѕРІС‹Рµ Р·Р°РїРёСЃРё РµР¶РµРґРЅРµРІРЅРѕ',
    'Directem ledger': 'Р РµРµСЃС‚СЂ Directem',
    'Verified employer entries': 'РџСЂРѕРІРµСЂРµРЅРЅС‹Рµ Р·Р°РїРёСЃРё СЂР°Р±РѕС‚РѕРґР°С‚РµР»РµР№',
    'Approval gate': 'РЁР»СЋР· РѕРґРѕР±СЂРµРЅРёСЏ',
    'Admins only access the database after the owner approves them. Buyers unlock contacts after payment verification and approval.':
      'РђРґРјРёРЅС‹ РїРѕР»СѓС‡Р°СЋС‚ РґРѕСЃС‚СѓРї Рє Р±Р°Р·Рµ С‚РѕР»СЊРєРѕ РїРѕСЃР»Рµ РѕРґРѕР±СЂРµРЅРёСЏ РІР»Р°РґРµР»СЊС†Р°. РљРѕРЅС‚Р°РєС‚С‹ РѕС‚РєСЂС‹РІР°СЋС‚СЃСЏ РїРѕСЃР»Рµ РїСЂРѕРІРµСЂРєРё РѕРїР»Р°С‚С‹ Рё РѕРґРѕР±СЂРµРЅРёСЏ.',
    'Access control': 'РљРѕРЅС‚СЂРѕР»СЊ РґРѕСЃС‚СѓРїР°',
    'Owner & Admin': 'Р’Р»Р°РґРµР»РµС† Рё Р°РґРјРёРЅ',
    'Buyer unlock': 'Р”РѕСЃС‚СѓРї РїРѕРєСѓРїР°С‚РµР»СЋ',
    'After approval': 'РџРѕСЃР»Рµ РѕРґРѕР±СЂРµРЅРёСЏ',
    'Directem packages': 'РџР°РєРµС‚С‹ Directem',
    'Pick the employer bundle that fits your hiring target.':
      'Р’С‹Р±РµСЂРёС‚Рµ РїР°РєРµС‚ СЂР°Р±РѕС‚РѕРґР°С‚РµР»РµР№ РїРѕРґ РІР°С€Сѓ С†РµР»СЊ РЅР°Р№РјР°.',
    'Package': 'РџР°РєРµС‚',
    'Employers': 'Р Р°Р±РѕС‚РѕРґР°С‚РµР»РµР№',
    'USD': 'USD',
    'Local': 'РњРµСЃС‚РЅ.',
    'What you receive': 'Р§С‚Рѕ РІС‹ РїРѕР»СѓС‡Р°РµС‚Рµ',
    'Every package unlocks curated UAE employer contacts with WhatsApp numbers, phone lines, and verified company names.':
      'РљР°Р¶РґС‹Р№ РїР°РєРµС‚ РѕС‚РєСЂС‹РІР°РµС‚ РїСЂРѕРІРµСЂРµРЅРЅС‹Рµ РєРѕРЅС‚Р°РєС‚С‹ СЂР°Р±РѕС‚РѕРґР°С‚РµР»РµР№ РћРђР­ СЃ WhatsApp, С‚РµР»РµС„РѕРЅР°РјРё Рё РїРѕРґС‚РІРµСЂР¶РґРµРЅРЅС‹РјРё РЅР°Р·РІР°РЅРёСЏРјРё РєРѕРјРїР°РЅРёР№.',
    'Approval workflow': 'РџСЂРѕС†РµСЃСЃ РѕРґРѕР±СЂРµРЅРёСЏ',
    'Submit your package request, include a payment reference, and wait for admin approval. Contacts unlock instantly after approval.':
      'РћС‚РїСЂР°РІСЊС‚Рµ Р·Р°РїСЂРѕСЃ, СѓРєР°Р¶РёС‚Рµ СЂРµС„РµСЂРµРЅСЃ РѕРїР»Р°С‚С‹ Рё РґРѕР¶РґРёС‚РµСЃСЊ РѕРґРѕР±СЂРµРЅРёСЏ Р°РґРјРёРЅР°. РљРѕРЅС‚Р°РєС‚С‹ РѕС‚РєСЂРѕСЋС‚СЃСЏ СЃСЂР°Р·Сѓ РїРѕСЃР»Рµ РѕРґРѕР±СЂРµРЅРёСЏ.',
    'How access works': 'РљР°Рє СЂР°Р±РѕС‚Р°РµС‚ РґРѕСЃС‚СѓРї',
    'Directem keeps employer data protected while giving you fast access.':
      'Directem Р·Р°С‰РёС‰Р°РµС‚ РґР°РЅРЅС‹Рµ Рё РґР°РµС‚ Р±С‹СЃС‚СЂС‹Р№ РґРѕСЃС‚СѓРї.',
    'Request your bundle': 'Р—Р°РїСЂРѕСЃРёС‚Рµ РїР°РєРµС‚',
    'Choose 10, 20, or 30 employer contacts and submit your request.':
      'Р’С‹Р±РµСЂРёС‚Рµ 10, 20 РёР»Рё 30 РєРѕРЅС‚Р°РєС‚РѕРІ Рё РѕС‚РїСЂР°РІСЊС‚Рµ Р·Р°РїСЂРѕСЃ.',
    'Owner-approved review': 'РџСЂРѕРІРµСЂРєР° СЃ РѕРґРѕР±СЂРµРЅРёРµРј РІР»Р°РґРµР»СЊС†Р°',
    'Admins verify payments and unlock access after approval.':
      'РђРґРјРёРЅС‹ РїСЂРѕРІРµСЂСЏСЋС‚ РѕРїР»Р°С‚Сѓ Рё РѕС‚РєСЂС‹РІР°СЋС‚ РґРѕСЃС‚СѓРї РїРѕСЃР»Рµ РѕРґРѕР±СЂРµРЅРёСЏ.',
    'Start outreach': 'РќР°С‡РЅРёС‚Рµ СЂР°Р±РѕС‚Сѓ',
    'Use the WhatsApp-ready contacts inside your Directem dashboard.':
      'РСЃРїРѕР»СЊР·СѓР№С‚Рµ РєРѕРЅС‚Р°РєС‚С‹ WhatsApp РІ РїР°РЅРµР»Рё Directem.',
    'Launch your Directem access today': 'РќР°С‡РЅРёС‚Рµ РґРѕСЃС‚СѓРї Рє Directem СЃРµРіРѕРґРЅСЏ',
    'Secure employer data, clear pricing, and fast approvals in one place.':
      'Р‘РµР·РѕРїР°СЃРЅС‹Рµ РґР°РЅРЅС‹Рµ, РїСЂРѕР·СЂР°С‡РЅС‹Рµ С†РµРЅС‹ Рё Р±С‹СЃС‚СЂС‹Рµ РѕРґРѕР±СЂРµРЅРёСЏ.',
    'Create your Directem account': 'РЎРѕР·РґР°С‚СЊ Р°РєРєР°СѓРЅС‚ Directem',
  });

  mergeTranslations('ar', {
    'Private access for the Directem owner and owner-approved admins.':
      'Щ€ШµЩ€Щ„ Ш®Ш§Шµ Щ„Щ…Ш§Щ„Щѓ Directem Щ€Ш§Щ„Щ…ШЇШ±Ш§ШЎ Ш§Щ„Щ…Ш№ШЄЩ…ШЇЩЉЩ†.',
    'Sign in to access employer contacts.': 'ШіШ¬Щ‘Щ„ Ш§Щ„ШЇШ®Щ€Щ„ Щ„Щ„Щ€ШµЩ€Щ„ ШҐЩ„Щ‰ Ш¬Щ‡Ш§ШЄ Ш§Щ„Ш§ШЄШµШ§Щ„.',
    'you@company.com': 'you@company.com',
    'Need admin access? Request admin access': 'ШЄШ­ШЄШ§Ш¬ Щ€ШµЩ€Щ„ Щ…ШЇЩЉШ±Шџ Ш§Ш·Щ„ШЁ Щ€ШµЩ€Щ„ Ш§Щ„Щ…ШЇЩЉШ±',
    'Buyer access? Use the buyer sign in page': 'Щ€ШµЩ€Щ„ Ш§Щ„Щ…ШґШЄШ±ЩЉШџ Ш§ШіШЄШ®ШЇЩ… ШµЩЃШ­Ш© ШЄШіШ¬ЩЉЩ„ ШЇШ®Щ€Щ„ Ш§Щ„Щ…ШґШЄШ±ЩЉ',
    'New to Directem? Create an account': 'Ш¬ШЇЩЉШЇ Ш№Щ„Щ‰ DirectemШџ ШЈЩ†ШґШ¦ Ш­ШіШ§ШЁЩ‹Ш§',
    'Need admin access?': 'ШЄШ­ШЄШ§Ш¬ Щ€ШµЩ€Щ„ Щ…ШЇЩЉШ±Шџ',
    'Admin request': 'Ш·Щ„ШЁ Щ…ШЇЩЉШ±',
    'Already approved?': 'ШЄЩ…ШЄ Ш§Щ„Щ…Щ€Ш§ЩЃЩ‚Ш©Шџ',
    'Already approved? Sign in as admin': 'ШЄЩ…ШЄ Ш§Щ„Щ…Щ€Ш§ЩЃЩ‚Ш©Шџ ШіШ¬Щ‘Щ„ Ш§Щ„ШЇШ®Щ€Щ„ ЩѓЩ…ШЇЩЉШ±',
    'Request admin access': 'Ш·Щ„ШЁ Щ€ШµЩ€Щ„ Ш§Щ„Щ…ШЇЩЉШ±',
    'Admin access is granted only after owner approval.':
      'ЩЉШЄЩ… Щ…Щ†Ш­ Щ€ШµЩ€Щ„ Ш§Щ„Щ…ШЇЩЉШ± ШЁШ№ШЇ Щ…Щ€Ш§ЩЃЩ‚Ш© Ш§Щ„Щ…Ш§Щ„Щѓ ЩЃЩ‚Ш·.',
    'Create your Directem account': 'ШЈЩ†ШґШ¦ Ш­ШіШ§ШЁ Directem',
    'Access verified UAE employer contacts in minutes.':
      'Ш§Ш­ШµЩ„ Ш№Щ„Щ‰ Ш¬Щ‡Ш§ШЄ Ш§ШЄШµШ§Щ„ ШЈШµШ­Ш§ШЁ Ш№Щ…Щ„ Щ…Щ€Ш«Щ‘Щ‚Ш© Ш®Щ„Ш§Щ„ ШЇЩ‚Ш§Ш¦Щ‚.',
    'Account created. Check your email to confirm, then sign in.':
      'ШЄЩ… ШҐЩ†ШґШ§ШЎ Ш§Щ„Ш­ШіШ§ШЁ. ШЄШ­Щ‚Щ‚ Щ…Щ† ШЁШ±ЩЉШЇЩѓ Ш«Щ… ШіШ¬Щ‘Щ„ Ш§Щ„ШЇШ®Щ€Щ„.',
    'Admin request created. Check your email to confirm, then wait for owner approval.':
      'ШЄЩ… ШҐЩ†ШґШ§ШЎ Ш·Щ„ШЁ Ш§Щ„Щ…ШЇЩЉШ±. ШЄШ­Щ‚Щ‚ Щ…Щ† ШЁШ±ЩЉШЇЩѓ Ш«Щ… Ш§Щ†ШЄШёШ± Щ…Щ€Ш§ЩЃЩ‚Ш© Ш§Щ„Щ…Ш§Щ„Щѓ.',
    'Already have an account?': 'Щ„ШЇЩЉЩѓ Ш­ШіШ§ШЁШџ',
    'Sign in': 'ШіШ¬Щ‘Щ„ Ш§Щ„ШЇШ®Щ€Щ„',
    'Reset your password': 'ШҐШ№Ш§ШЇШ© ШЄШ№ЩЉЩЉЩ† ЩѓЩ„Щ…Ш© Ш§Щ„Щ…Ш±Щ€Ш±',
    'We will email you a secure link to reset your password.':
      'ШіЩ†Ш±ШіЩ„ Щ„Щѓ Ш±Ш§ШЁШ·Щ‹Ш§ ШўЩ…Щ†Щ‹Ш§ Щ„ШҐШ№Ш§ШЇШ© ШЄШ№ЩЉЩЉЩ† ЩѓЩ„Щ…Ш© Ш§Щ„Щ…Ш±Щ€Ш±.',
    'Send reset link': 'ШҐШ±ШіШ§Щ„ Ш±Ш§ШЁШ· Ш§Щ„Ш§ШіШЄШ№Ш§ШЇШ©',
    'Sending...': 'Ш¬Ш§Ш±ЩЌ Ш§Щ„ШҐШ±ШіШ§Щ„...',
    'Check your email for a password reset link.':
      'ШЄШ­Щ‚Щ‚ Щ…Щ† ШЁШ±ЩЉШЇЩѓ Щ„Ш±Ш§ШЁШ· ШҐШ№Ш§ШЇШ© Ш§Щ„ШЄШ№ЩЉЩЉЩ†.',
    'Remembered your password?': 'ШЄШ°ЩѓШ±ШЄ ЩѓЩ„Щ…Ш© Ш§Щ„Щ…Ш±Щ€Ш±Шџ',
    'Set a new password': 'ШЄШ№ЩЉЩЉЩ† ЩѓЩ„Щ…Ш© Щ…Ш±Щ€Ш± Ш¬ШЇЩЉШЇШ©',
    'Choose a strong password to secure your account.':
      'Ш§Ш®ШЄШ± ЩѓЩ„Щ…Ш© Щ…Ш±Щ€Ш± Щ‚Щ€ЩЉШ© Щ„ШЄШЈЩ…ЩЉЩ† Ш­ШіШ§ШЁЩѓ.',
    'Use the password reset link from your email to open this page.':
      'Ш§ШіШЄШ®ШЇЩ… Ш±Ш§ШЁШ· ШҐШ№Ш§ШЇШ© Ш§Щ„ШЄШ№ЩЉЩЉЩ† Щ…Щ† ШЁШ±ЩЉШЇЩѓ Щ„ЩЃШЄШ­ Щ‡Ш°Щ‡ Ш§Щ„ШµЩЃШ­Ш©.',
    'New password': 'ЩѓЩ„Щ…Ш© Щ…Ш±Щ€Ш± Ш¬ШЇЩЉШЇШ©',
    'Confirm password': 'ШЄШЈЩѓЩЉШЇ ЩѓЩ„Щ…Ш© Ш§Щ„Щ…Ш±Щ€Ш±',
    'Repeat new password': 'ШЈШ№ШЇ ЩѓШЄШ§ШЁШ© ЩѓЩ„Щ…Ш© Ш§Щ„Щ…Ш±Щ€Ш±',
    'Update password': 'ШЄШ­ШЇЩЉШ« ЩѓЩ„Щ…Ш© Ш§Щ„Щ…Ш±Щ€Ш±',
    'Updating...': 'Ш¬Ш§Ш±ЩЌ Ш§Щ„ШЄШ­ШЇЩЉШ«...',
    'Password updated. You can now sign in.':
      'ШЄЩ… ШЄШ­ШЇЩЉШ« ЩѓЩ„Щ…Ш© Ш§Щ„Щ…Ш±Щ€Ш±. ЩЉЩ…ЩѓЩ†Щѓ Ш§Щ„ШўЩ† ШЄШіШ¬ЩЉЩ„ Ш§Щ„ШЇШ®Щ€Щ„.',
    'Password must be at least 8 characters.':
      'ЩЉШ¬ШЁ ШЈЩ† ШЄЩѓЩ€Щ† ЩѓЩ„Щ…Ш© Ш§Щ„Щ…Ш±Щ€Ш± 8 ШЈШ­Ш±ЩЃ Ш№Щ„Щ‰ Ш§Щ„ШЈЩ‚Щ„.',
    'Passwords do not match.': 'ЩѓЩ„Щ…ШЄШ§ Ш§Щ„Щ…Ш±Щ€Ш± ШєЩЉШ± Щ…ШЄШ·Ш§ШЁЩ‚ШЄЩЉЩ†.',
  });

  mergeTranslations('ru', {
    'Private access for the Directem owner and owner-approved admins.':
      'Р—Р°РєСЂС‹С‚С‹Р№ РґРѕСЃС‚СѓРї РґР»СЏ РІР»Р°РґРµР»СЊС†Р° Directem Рё РѕРґРѕР±СЂРµРЅРЅС‹С… Р°РґРјРёРЅРѕРІ.',
    'Sign in to access employer contacts.':
      'Р’РѕР№РґРёС‚Рµ, С‡С‚РѕР±С‹ РїРѕР»СѓС‡РёС‚СЊ РґРѕСЃС‚СѓРї Рє РєРѕРЅС‚Р°РєС‚Р°Рј.',
    'Need admin access? Request admin access':
      'РќСѓР¶РµРЅ РґРѕСЃС‚СѓРї Р°РґРјРёРЅР°? Р—Р°РїСЂРѕСЃРёС‚СЊ РґРѕСЃС‚СѓРї',
    'Buyer access? Use the buyer sign in page':
      'РџРѕРєСѓРїР°С‚РµР»СЊ? РСЃРїРѕР»СЊР·СѓР№С‚Рµ СЃС‚СЂР°РЅРёС†Сѓ РІС…РѕРґР°',
    'New to Directem? Create an account':
      'РќРѕРІС‹Р№ РїРѕР»СЊР·РѕРІР°С‚РµР»СЊ? РЎРѕР·РґР°С‚СЊ Р°РєРєР°СѓРЅС‚',
    'Need admin access?': 'РќСѓР¶РµРЅ РґРѕСЃС‚СѓРї Р°РґРјРёРЅР°?',
    'Admin request': 'Р—Р°РїСЂРѕСЃ Р°РґРјРёРЅР°',
    'Already approved?': 'РЈР¶Рµ РѕРґРѕР±СЂРµРЅС‹?',
    'Already approved? Sign in as admin':
      'РЈР¶Рµ РѕРґРѕР±СЂРµРЅС‹? Р’РѕР№С‚Рё РєР°Рє Р°РґРјРёРЅ',
    'Request admin access': 'Р—Р°РїСЂРѕСЃРёС‚СЊ РґРѕСЃС‚СѓРї Р°РґРјРёРЅР°',
    'Admin access is granted only after owner approval.':
      'Р”РѕСЃС‚СѓРї Р°РґРјРёРЅР° РІС‹РґР°РµС‚СЃСЏ С‚РѕР»СЊРєРѕ РїРѕСЃР»Рµ РѕРґРѕР±СЂРµРЅРёСЏ РІР»Р°РґРµР»СЊС†Р°.',
    'Access verified UAE employer contacts in minutes.':
      'РџРѕР»СѓС‡РёС‚Рµ РґРѕСЃС‚СѓРї Рє РїСЂРѕРІРµСЂРµРЅРЅС‹Рј РєРѕРЅС‚Р°РєС‚Р°Рј РћРђР­ Р·Р° РјРёРЅСѓС‚С‹.',
    'Account created. Check your email to confirm, then sign in.':
      'РђРєРєР°СѓРЅС‚ СЃРѕР·РґР°РЅ. РџСЂРѕРІРµСЂСЊС‚Рµ РїРѕС‡С‚Сѓ Рё РІРѕР№РґРёС‚Рµ.',
    'Admin request created. Check your email to confirm, then wait for owner approval.':
      'Р—Р°РїСЂРѕСЃ Р°РґРјРёРЅР° СЃРѕР·РґР°РЅ. РџСЂРѕРІРµСЂСЊС‚Рµ РїРѕС‡С‚Сѓ Рё Р¶РґРёС‚Рµ РѕРґРѕР±СЂРµРЅРёСЏ РІР»Р°РґРµР»СЊС†Р°.',
    'Already have an account?': 'РЈР¶Рµ РµСЃС‚СЊ Р°РєРєР°СѓРЅС‚?',
    'Reset your password': 'РЎР±СЂРѕСЃ РїР°СЂРѕР»СЏ',
    'We will email you a secure link to reset your password.':
      'РњС‹ РѕС‚РїСЂР°РІРёРј Р±РµР·РѕРїР°СЃРЅСѓСЋ СЃСЃС‹Р»РєСѓ РґР»СЏ СЃР±СЂРѕСЃР° РїР°СЂРѕР»СЏ.',
    'Send reset link': 'РћС‚РїСЂР°РІРёС‚СЊ СЃСЃС‹Р»РєСѓ',
    'Sending...': 'РћС‚РїСЂР°РІР»СЏРµРј...',
    'Check your email for a password reset link.':
      'РџСЂРѕРІРµСЂСЊС‚Рµ РїРѕС‡С‚Сѓ РґР»СЏ СЃСЃС‹Р»РєРё СЃР±СЂРѕСЃР°.',
    'Remembered your password?': 'Р’СЃРїРѕРјРЅРёР»Рё РїР°СЂРѕР»СЊ?',
    'Set a new password': 'РЈСЃС‚Р°РЅРѕРІРёС‚СЊ РЅРѕРІС‹Р№ РїР°СЂРѕР»СЊ',
    'Choose a strong password to secure your account.':
      'Р’С‹Р±РµСЂРёС‚Рµ РЅР°РґРµР¶РЅС‹Р№ РїР°СЂРѕР»СЊ РґР»СЏ Р·Р°С‰РёС‚С‹ Р°РєРєР°СѓРЅС‚Р°.',
    'Use the password reset link from your email to open this page.':
      'РћС‚РєСЂРѕР№С‚Рµ СЌС‚Сѓ СЃС‚СЂР°РЅРёС†Сѓ РїРѕ СЃСЃС‹Р»РєРµ РёР· РїРёСЃСЊРјР°.',
    'New password': 'РќРѕРІС‹Р№ РїР°СЂРѕР»СЊ',
    'Confirm password': 'РџРѕРІС‚РѕСЂРёС‚Рµ РїР°СЂРѕР»СЊ',
    'Repeat new password': 'РџРѕРІС‚РѕСЂРёС‚Рµ РЅРѕРІС‹Р№ РїР°СЂРѕР»СЊ',
    'Update password': 'РћР±РЅРѕРІРёС‚СЊ РїР°СЂРѕР»СЊ',
    'Updating...': 'РћР±РЅРѕРІР»СЏРµРј...',
    'Password updated. You can now sign in.':
      'РџР°СЂРѕР»СЊ РѕР±РЅРѕРІР»РµРЅ. РўРµРїРµСЂСЊ РІС‹ РјРѕР¶РµС‚Рµ РІРѕР№С‚Рё.',
    'Password must be at least 8 characters.':
      'РџР°СЂРѕР»СЊ РґРѕР»Р¶РµРЅ Р±С‹С‚СЊ РЅРµ РјРµРЅРµРµ 8 СЃРёРјРІРѕР»РѕРІ.',
    'Passwords do not match.': 'РџР°СЂРѕР»Рё РЅРµ СЃРѕРІРїР°РґР°СЋС‚.',
  });

  mergeTranslations('ar', {
    'Directem Marketplace': 'ШіЩ€Щ‚ Directem',
    'Welcome, {name}. Unlock verified UAE employer contacts.':
      'Щ…Ш±Ш­ШЁЩ‹Ш§ШЊ {name}. Ш§ЩЃШЄШ­ Ш¬Щ‡Ш§ШЄ Ш§ШЄШµШ§Щ„ ШЈШµШ­Ш§ШЁ Ш№Щ…Щ„ Щ…Щ€Ш«Щ‘Щ‚Ш© ЩЃЩЉ Ш§Щ„ШҐЩ…Ш§Ш±Ш§ШЄ.',
    'Choose your package': 'Ш§Ш®ШЄШ± ШЁШ§Щ‚ШЄЩѓ',
    'Purchase history': 'ШіШ¬Щ„ Ш§Щ„Щ…ШґШЄШ±ЩЉШ§ШЄ',
    'No purchases yet. Select a package to get started.':
      'Щ„Ш§ ШЄЩ€Ш¬ШЇ Щ…ШґШЄШ±ЩЉШ§ШЄ ШЁШ№ШЇ. Ш§Ш®ШЄШ± ШЁШ§Щ‚Ш© Щ„Щ„ШЁШЇШЎ.',
    'Your unlocked contacts': 'Ш¬Щ‡Ш§ШЄ Ш§Щ„Ш§ШЄШµШ§Щ„ Ш§Щ„Щ…ЩЃШЄЩ€Ш­Ш©',
    'No unlocked contacts yet. Once an admin approves your purchase, contacts will appear here.':
      'Щ„Ш§ ШЄЩ€Ш¬ШЇ Ш¬Щ‡Ш§ШЄ Ш§ШЄШµШ§Щ„ Щ…ЩЃШЄЩ€Ш­Ш© ШЁШ№ШЇ. ШіШЄШёЩ‡Ш± ШЁШ№ШЇ Щ…Щ€Ш§ЩЃЩ‚Ш© Ш§Щ„Щ…ШЇЩЉШ± Ш№Щ„Щ‰ Ш·Щ„ШЁЩѓ.',
    'Access request submitted. Admin approval is required before contacts unlock.':
      'ШЄЩ… ШҐШ±ШіШ§Щ„ Ш·Щ„ШЁ Ш§Щ„Щ€ШµЩ€Щ„. ЩЉЩ„ШІЩ… Щ…Щ€Ш§ЩЃЩ‚Ш© Ш§Щ„Щ…ШЇЩЉШ± Щ‚ШЁЩ„ ЩЃШЄШ­ Ш¬Щ‡Ш§ШЄ Ш§Щ„Ш§ШЄШµШ§Щ„.',
    'Pending approval. You can submit a new request once this is resolved.':
      'ШЁШ§Щ†ШЄШёШ§Ш± Ш§Щ„Щ…Щ€Ш§ЩЃЩ‚Ш©. ЩЉЩ…ЩѓЩ†Щѓ ШҐШ±ШіШ§Щ„ Ш·Щ„ШЁ Ш¬ШЇЩЉШЇ ШЁШ№ШЇ Ш­Щ„ Щ‡Ш°Ш§ Ш§Щ„Ш·Щ„ШЁ.',
    'Requested {date}': 'ШЄЩ… Ш§Щ„Ш·Щ„ШЁ ШЁШЄШ§Ш±ЩЉШ® {date}',
    'Submit request': 'ШҐШ±ШіШ§Щ„ Ш§Щ„Ш·Щ„ШЁ',
    'Submitting...': 'Ш¬Ш§Ш±ЩЌ Ш§Щ„ШҐШ±ШіШ§Щ„...',
    'Payment received. Reference: {ref}': 'ШЄЩ… Ш§ШіШЄЩ„Ш§Щ… Ш§Щ„ШЇЩЃШ№. Ш§Щ„Щ…Ш±Ш¬Ш№: {ref}',
    'Pay with card or PayPal': 'Ш§ШЇЩЃШ№ ШЁШ§Щ„ШЁШ·Ш§Щ‚Ш© ШЈЩ€ PayPal',
    'PayPal is not configured yet. Add your PayPal client ID to enable card payments.':
      'Щ„Щ… ЩЉШЄЩ… ШҐШ№ШЇШ§ШЇ PayPal ШЁШ№ШЇ. ШЈШ¶ЩЃ Щ…Ш№Ш±Щ‘ЩЃ Ш§Щ„Ш№Щ…ЩЉЩ„ Щ„ШЄЩЃШ№ЩЉЩ„ Ш§Щ„ШЇЩЃШ№.',
  });

  mergeTranslations('ru', {
    'Directem Marketplace': 'РњР°СЂРєРµС‚РїР»РµР№СЃ Directem',
    'Welcome, {name}. Unlock verified UAE employer contacts.':
      'Р”РѕР±СЂРѕ РїРѕР¶Р°Р»РѕРІР°С‚СЊ, {name}. РћС‚РєСЂРѕР№С‚Рµ РїСЂРѕРІРµСЂРµРЅРЅС‹Рµ РєРѕРЅС‚Р°РєС‚С‹ СЂР°Р±РѕС‚РѕРґР°С‚РµР»РµР№ РћРђР­.',
    'Choose your package': 'Р’С‹Р±РµСЂРёС‚Рµ РїР°РєРµС‚',
    'Purchase history': 'РСЃС‚РѕСЂРёСЏ РїРѕРєСѓРїРѕРє',
    'No purchases yet. Select a package to get started.':
      'РџРѕРєСѓРїРѕРє РЅРµС‚. Р’С‹Р±РµСЂРёС‚Рµ РїР°РєРµС‚, С‡С‚РѕР±С‹ РЅР°С‡Р°С‚СЊ.',
    'Your unlocked contacts': 'РћС‚РєСЂС‹С‚С‹Рµ РєРѕРЅС‚Р°РєС‚С‹',
    'No unlocked contacts yet. Once an admin approves your purchase, contacts will appear here.':
      'РљРѕРЅС‚Р°РєС‚РѕРІ РЅРµС‚. РџРѕСЃР»Рµ РѕРґРѕР±СЂРµРЅРёСЏ Р°РґРјРёРЅРѕРј РѕРЅРё РїРѕСЏРІСЏС‚СЃСЏ Р·РґРµСЃСЊ.',
    'Access request submitted. Admin approval is required before contacts unlock.':
      'Р—Р°РїСЂРѕСЃ РѕС‚РїСЂР°РІР»РµРЅ. РўСЂРµР±СѓРµС‚СЃСЏ РѕРґРѕР±СЂРµРЅРёРµ Р°РґРјРёРЅР°.',
    'Pending approval. You can submit a new request once this is resolved.':
      'РћР¶РёРґР°РµС‚ РѕРґРѕР±СЂРµРЅРёСЏ. РќРѕРІС‹Р№ Р·Р°РїСЂРѕСЃ РјРѕР¶РЅРѕ РѕС‚РїСЂР°РІРёС‚СЊ РїРѕР·Р¶Рµ.',
    'Requested {date}': 'Р—Р°РїСЂРѕСЃ РѕС‚ {date}',
    'Submit request': 'РћС‚РїСЂР°РІРёС‚СЊ Р·Р°РїСЂРѕСЃ',
    'Submitting...': 'РћС‚РїСЂР°РІР»СЏРµРј...',
    'Payment received. Reference: {ref}': 'РџР»Р°С‚РµР¶ РїРѕР»СѓС‡РµРЅ. Р РµС„РµСЂРµРЅСЃ: {ref}',
    'Pay with card or PayPal': 'РћРїР»Р°С‚РёС‚СЊ РєР°СЂС‚РѕР№ РёР»Рё PayPal',
    'PayPal is not configured yet. Add your PayPal client ID to enable card payments.':
      'PayPal РЅРµ РЅР°СЃС‚СЂРѕРµРЅ. Р”РѕР±Р°РІСЊС‚Рµ client ID, С‡С‚РѕР±С‹ РІРєР»СЋС‡РёС‚СЊ РѕРїР»Р°С‚Сѓ.',
  });

  mergeTranslations('ar', {
    'Directem Admin Workspace': 'Щ…ШіШ§Ш­Ш© Щ…ШЇЩЉШ± Directem',
    'Manage packages, employer contacts, and purchase approvals.':
      'ШҐШЇШ§Ш±Ш© Ш§Щ„ШЁШ§Щ‚Ш§ШЄ Щ€Ш¬Щ‡Ш§ШЄ Ш§Щ„Ш§ШЄШµШ§Щ„ Щ€Щ…Щ€Ш§ЩЃЩ‚Ш§ШЄ Ш§Щ„ШґШ±Ш§ШЎ.',
    'Packages': 'Ш§Щ„ШЁШ§Щ‚Ш§ШЄ',
    'Employers': 'ШЈШµШ­Ш§ШЁ Ш§Щ„Ш№Щ…Щ„',
    'Pending approvals': 'Ш·Щ„ШЁШ§ШЄ Щ…Ш№Щ„Щ‘Щ‚Ш©',
    'Purchase requests': 'Ш·Щ„ШЁШ§ШЄ Ш§Щ„ШґШ±Ш§ШЎ',
    'Purchase approvals': 'Щ…Щ€Ш§ЩЃЩ‚Ш§ШЄ Ш§Щ„ШґШ±Ш§ШЎ',
    'No purchases yet.': 'Щ„Ш§ ШЄЩ€Ш¬ШЇ Ш·Щ„ШЁШ§ШЄ ШЁШ№ШЇ.',
    'Payment ref:': 'Щ…Ш±Ш¬Ш№ Ш§Щ„ШЇЩЃШ№:',
    'Preferred job:': 'Ш§Щ„Щ€ШёЩЉЩЃШ© Ш§Щ„Щ…ЩЃШ¶Щ„Ш©:',
    'Salary:': 'Ш§Щ„Ш±Ш§ШЄШЁ:',
    'Notes:': 'Щ…Щ„Ш§Ш­ШёШ§ШЄ:',
    'Approve & assign': 'Щ…Щ€Ш§ЩЃЩ‚Ш© Щ€ШЄШ®ШµЩЉШµ',
    'Reject': 'Ш±ЩЃШ¶',
    'Add new package': 'ШҐШ¶Ш§ЩЃШ© ШЁШ§Щ‚Ш© Ш¬ШЇЩЉШЇШ©',
    'Package name': 'Ш§ШіЩ… Ш§Щ„ШЁШ§Щ‚Ш©',
    'USD price': 'Ш§Щ„ШіШ№Ш± ШЁШ§Щ„ШЇЩ€Щ„Ш§Ш±',
    'Active': 'Щ†ШґШ·',
    'Add': 'ШҐШ¶Ш§ЩЃШ©',
    'Employer contacts': 'Ш¬Щ‡Ш§ШЄ Ш§ШЄШµШ§Щ„ ШЈШµШ­Ш§ШЁ Ш§Щ„Ш№Щ…Щ„',
    'Company name': 'Ш§ШіЩ… Ш§Щ„ШґШ±ЩѓШ©',
    'Contact name': 'Ш§ШіЩ… Ш¬Щ‡Ш© Ш§Щ„Ш§ШЄШµШ§Щ„',
    'Job title': 'Ш§Щ„Щ…ШіЩ…Щ‰ Ш§Щ„Щ€ШёЩЉЩЃЩЉ',
    'Phone': 'Щ‡Ш§ШЄЩЃ',
    'Email': 'Ш§Щ„ШЁШ±ЩЉШЇ Ш§Щ„ШҐЩ„ЩѓШЄШ±Щ€Щ†ЩЉ',
    'City': 'Ш§Щ„Щ…ШЇЩЉЩ†Ш©',
    'Country': 'Ш§Щ„ШЇЩ€Щ„Ш©',
    'Add employer': 'ШҐШ¶Ш§ЩЃШ© ШµШ§Ш­ШЁ Ш№Щ…Щ„',
    'Package updated.': 'ШЄЩ… ШЄШ­ШЇЩЉШ« Ш§Щ„ШЁШ§Щ‚Ш©.',
    'New package added.': 'ШЄЩ…ШЄ ШҐШ¶Ш§ЩЃШ© ШЁШ§Щ‚Ш© Ш¬ШЇЩЉШЇШ©.',
    'Employer contact added.': 'ШЄЩ…ШЄ ШҐШ¶Ш§ЩЃШ© Ш¬Щ‡Ш© Ш§Щ„Ш§ШЄШµШ§Щ„.',
    'Purchase approved. {count} contacts assigned.':
      'ШЄЩ…ШЄ Ш§Щ„Щ…Щ€Ш§ЩЃЩ‚Ш© Ш№Щ„Щ‰ Ш§Щ„Ш·Щ„ШЁ. ШЄЩ… ШЄШ®ШµЩЉШµ {count} Ш¬Щ‡Ш© Ш§ШЄШµШ§Щ„.',
    'Purchase rejected.': 'ШЄЩ… Ш±ЩЃШ¶ Ш§Щ„Ш·Щ„ШЁ.',
    'Company name is required.': 'Ш§ШіЩ… Ш§Щ„ШґШ±ЩѓШ© Щ…Ш·Щ„Щ€ШЁ.',
    'Unable to load Directem admin data.': 'ШЄШ№Ш°Ш± ШЄШ­Щ…ЩЉЩ„ ШЁЩЉШ§Щ†Ш§ШЄ Ш§Щ„Щ…ШЇЩЉШ±.',
    'Directem Owner Console': 'Щ„Щ€Ш­Ш© Щ…Ш§Щ„Щѓ Directem',
    'Approve admins and oversee marketplace activity.':
      'Ш§Ш№ШЄЩ…Ш§ШЇ Ш§Щ„Щ…ШЇШ±Ш§ШЎ Щ€Щ…ШЄШ§ШЁШ№Ш© Щ†ШґШ§Ш· Ш§Щ„ШіЩ€Щ‚.',
    'Purchases': 'Ш№Щ…Щ„ЩЉШ§ШЄ Ш§Щ„ШґШ±Ш§ШЎ',
    'Admin approvals': 'Щ…Щ€Ш§ЩЃЩ‚Ш§ШЄ Ш§Щ„Щ…ШЇШ±Ш§ШЎ',
    'No admin accounts found.': 'Щ„Ш§ ШЄЩ€Ш¬ШЇ Ш­ШіШ§ШЁШ§ШЄ Щ…ШЇШ±Ш§ШЎ.',
    'Approve': 'Щ…Щ€Ш§ЩЃЩ‚Ш©',
    'Block': 'Ш­ШёШ±',
    'Unblock': 'ШҐЩ„ШєШ§ШЎ Ш§Щ„Ш­ШёШ±',
    'Admin settings updated.': 'ШЄЩ… ШЄШ­ШЇЩЉШ« ШҐШ№ШЇШ§ШЇШ§ШЄ Ш§Щ„Щ…ШЇЩЉШ±.',
    'Unable to load owner dashboard.': 'ШЄШ№Ш°Ш± ШЄШ­Щ…ЩЉЩ„ Щ„Щ€Ш­Ш© Ш§Щ„Щ…Ш§Щ„Щѓ.',
    'Admin account blocked': 'Ш­ШіШ§ШЁ Ш§Щ„Щ…ШЇЩЉШ± Щ…Ш­ШёЩ€Ш±',
    'Your admin account has been blocked by the owner. Contact support if this is unexpected.':
      'ШЄЩ… Ш­ШёШ± Ш­ШіШ§ШЁЩѓ Щ…Щ† Щ‚ШЁЩ„ Ш§Щ„Щ…Ш§Щ„Щѓ. ШЄЩ€Ш§ШµЩ„ Щ…Ш№ Ш§Щ„ШЇШ№Щ… ШҐШ°Ш§ ЩѓШ§Щ† Ш°Щ„Щѓ ШєЩЉШ± Щ…ШЄЩ€Щ‚Ш№.',
    'Admin approval required': 'Щ…Щ€Ш§ЩЃЩ‚Ш© Ш§Щ„Щ…ШЇЩЉШ± Щ…Ш·Щ„Щ€ШЁШ©',
    'Your admin account is pending owner approval.':
      'Ш­ШіШ§ШЁ Ш§Щ„Щ…ШЇЩЉШ± Ш§Щ„Ш®Ш§Шµ ШЁЩѓ ШЁШ§Щ†ШЄШёШ§Ш± Щ…Щ€Ш§ЩЃЩ‚Ш© Ш§Щ„Щ…Ш§Щ„Щѓ.',
  });

  mergeTranslations('ru', {
    'Directem Admin Workspace': 'РџР°РЅРµР»СЊ Р°РґРјРёРЅР° Directem',
    'Manage packages, employer contacts, and purchase approvals.':
      'РЈРїСЂР°РІР»РµРЅРёРµ РїР°РєРµС‚Р°РјРё, РєРѕРЅС‚Р°РєС‚Р°РјРё Рё РѕРґРѕР±СЂРµРЅРёСЏРјРё.',
    'Packages': 'РџР°РєРµС‚С‹',
    'Employers': 'Р Р°Р±РѕС‚РѕРґР°С‚РµР»Рё',
    'Pending approvals': 'РћР¶РёРґР°СЋС‚ РѕРґРѕР±СЂРµРЅРёСЏ',
    'Purchase requests': 'Р—Р°РїСЂРѕСЃС‹ РЅР° РїРѕРєСѓРїРєСѓ',
    'Purchase approvals': 'РћРґРѕР±СЂРµРЅРёСЏ РїРѕРєСѓРїРѕРє',
    'No purchases yet.': 'РџРѕРєСѓРїРѕРє РїРѕРєР° РЅРµС‚.',
    'Payment ref:': 'Р РµС„РµСЂРµРЅСЃ РѕРїР»Р°С‚С‹:',
    'Preferred job:': 'Р–РµР»Р°РµРјР°СЏ РґРѕР»Р¶РЅРѕСЃС‚СЊ:',
    'Salary:': 'Р—Р°СЂРїР»Р°С‚Р°:',
    'Notes:': 'РџСЂРёРјРµС‡Р°РЅРёСЏ:',
    'Approve & assign': 'РћРґРѕР±СЂРёС‚СЊ Рё РЅР°Р·РЅР°С‡РёС‚СЊ',
    'Reject': 'РћС‚РєР»РѕРЅРёС‚СЊ',
    'Add new package': 'Р”РѕР±Р°РІРёС‚СЊ РЅРѕРІС‹Р№ РїР°РєРµС‚',
    'Package name': 'РќР°Р·РІР°РЅРёРµ РїР°РєРµС‚Р°',
    'USD price': 'Р¦РµРЅР° USD',
    'Active': 'РђРєС‚РёРІРЅРѕ',
    'Add': 'Р”РѕР±Р°РІРёС‚СЊ',
    'Employer contacts': 'РљРѕРЅС‚Р°РєС‚С‹ СЂР°Р±РѕС‚РѕРґР°С‚РµР»РµР№',
    'Company name': 'РќР°Р·РІР°РЅРёРµ РєРѕРјРїР°РЅРёРё',
    'Contact name': 'РРјСЏ РєРѕРЅС‚Р°РєС‚Р°',
    'Job title': 'Р”РѕР»Р¶РЅРѕСЃС‚СЊ',
    'Phone': 'РўРµР»РµС„РѕРЅ',
    'Email': 'Email',
    'City': 'Р“РѕСЂРѕРґ',
    'Country': 'РЎС‚СЂР°РЅР°',
    'Add employer': 'Р”РѕР±Р°РІРёС‚СЊ СЂР°Р±РѕС‚РѕРґР°С‚РµР»СЏ',
    'Package updated.': 'РџР°РєРµС‚ РѕР±РЅРѕРІР»РµРЅ.',
    'New package added.': 'РќРѕРІС‹Р№ РїР°РєРµС‚ РґРѕР±Р°РІР»РµРЅ.',
    'Employer contact added.': 'РљРѕРЅС‚Р°РєС‚ РґРѕР±Р°РІР»РµРЅ.',
    'Purchase approved. {count} contacts assigned.':
      'РџРѕРєСѓРїРєР° РѕРґРѕР±СЂРµРЅР°. РќР°Р·РЅР°С‡РµРЅРѕ {count} РєРѕРЅС‚Р°РєС‚РѕРІ.',
    'Purchase rejected.': 'РџРѕРєСѓРїРєР° РѕС‚РєР»РѕРЅРµРЅР°.',
    'Company name is required.': 'РќР°Р·РІР°РЅРёРµ РєРѕРјРїР°РЅРёРё РѕР±СЏР·Р°С‚РµР»СЊРЅРѕ.',
    'Unable to load Directem admin data.': 'РќРµ СѓРґР°Р»РѕСЃСЊ Р·Р°РіСЂСѓР·РёС‚СЊ РґР°РЅРЅС‹Рµ Р°РґРјРёРЅР°.',
    'Directem Owner Console': 'РљРѕРЅСЃРѕР»СЊ РІР»Р°РґРµР»СЊС†Р° Directem',
    'Approve admins and oversee marketplace activity.':
      'РћРґРѕР±СЂСЏР№С‚Рµ Р°РґРјРёРЅРѕРІ Рё РєРѕРЅС‚СЂРѕР»РёСЂСѓР№С‚Рµ Р°РєС‚РёРІРЅРѕСЃС‚СЊ.',
    'Purchases': 'РџРѕРєСѓРїРєРё',
    'Admin approvals': 'РћРґРѕР±СЂРµРЅРёСЏ Р°РґРјРёРЅРѕРІ',
    'No admin accounts found.': 'РђРґРјРёРЅРѕРІ РЅРµС‚.',
    'Approve': 'РћРґРѕР±СЂРёС‚СЊ',
    'Block': 'Р—Р°Р±Р»РѕРєРёСЂРѕРІР°С‚СЊ',
    'Unblock': 'Р Р°Р·Р±Р»РѕРєРёСЂРѕРІР°С‚СЊ',
    'Admin settings updated.': 'РќР°СЃС‚СЂРѕР№РєРё Р°РґРјРёРЅР° РѕР±РЅРѕРІР»РµРЅС‹.',
    'Unable to load owner dashboard.': 'РќРµ СѓРґР°Р»РѕСЃСЊ Р·Р°РіСЂСѓР·РёС‚СЊ РїР°РЅРµР»СЊ РІР»Р°РґРµР»СЊС†Р°.',
    'Admin account blocked': 'РђРєРєР°СѓРЅС‚ Р°РґРјРёРЅР° Р·Р°Р±Р»РѕРєРёСЂРѕРІР°РЅ',
    'Your admin account has been blocked by the owner. Contact support if this is unexpected.':
      'Р’Р°С€ Р°РєРєР°СѓРЅС‚ Р°РґРјРёРЅР° Р·Р°Р±Р»РѕРєРёСЂРѕРІР°РЅ РІР»Р°РґРµР»СЊС†РµРј. РЎРІСЏР¶РёС‚РµСЃСЊ СЃ РїРѕРґРґРµСЂР¶РєРѕР№, РµСЃР»Рё СЌС‚Рѕ РѕС€РёР±РєР°.',
    'Admin approval required': 'РўСЂРµР±СѓРµС‚СЃСЏ РѕРґРѕР±СЂРµРЅРёРµ Р°РґРјРёРЅР°',
    'Your admin account is pending owner approval.':
      'Р’Р°С€ Р°РєРєР°СѓРЅС‚ Р°РґРјРёРЅР° РѕР¶РёРґР°РµС‚ РѕРґРѕР±СЂРµРЅРёСЏ РІР»Р°РґРµР»СЊС†Р°.',
  });

  mergeTranslations('ar', {
    'Hiring Desk': 'Щ‚ШіЩ… Ш§Щ„ШЄЩ€ШёЩЉЩЃ',
    'HR Operations': 'Ш№Щ…Щ„ЩЉШ§ШЄ Ш§Щ„Щ…Щ€Ш§Ш±ШЇ Ш§Щ„ШЁШґШ±ЩЉШ©',
    'Talent Desk': 'Щ‚ШіЩ… Ш§Щ„Щ…Щ€Ш§Щ‡ШЁ',
    'you@company.com': 'you@company.com',
    'Language': 'Ш§Щ„Щ„ШєШ©',
  });

  mergeTranslations('ru', {
    'Hiring Desk': 'РћС‚РґРµР» РЅР°Р№РјР°',
    'HR Operations': 'HR РѕРїРµСЂР°С†РёРё',
    'Talent Desk': 'РћС‚РґРµР» С‚Р°Р»Р°РЅС‚РѕРІ',
    'you@company.com': 'you@company.com',
    'Language': 'РЇР·С‹Рє',
  });

  mergeTranslations('ar', {
    'Preferred position': 'Ш§Щ„Щ…Щ†ШµШЁ Ш§Щ„Щ…ЩЃШ¶Щ„',
    'Preferred city (UAE)': 'Ш§Щ„Щ…ШЇЩЉЩ†Ш© Ш§Щ„Щ…ЩЃШ¶Щ„Ш© (Ш§Щ„ШҐЩ…Ш§Ш±Ш§ШЄ)',
    'e.g. Dubai': 'Щ…Ш«Ш§Щ„: ШЇШЁЩЉ',
    'Preferred position:': 'Ш§Щ„Щ…Щ†ШµШЁ Ш§Щ„Щ…ЩЃШ¶Щ„:',
    'Preferred city:': 'Ш§Щ„Щ…ШЇЩЉЩ†Ш© Ш§Щ„Щ…ЩЃШ¶Щ„Ш©:',
  });

  mergeTranslations('ru', {
    'Preferred position': 'РџСЂРµРґРїРѕС‡С‚РёС‚РµР»СЊРЅР°СЏ РґРѕР»Р¶РЅРѕСЃС‚СЊ',
    'Preferred city (UAE)': 'РџСЂРµРґРїРѕС‡С‚РёС‚РµР»СЊРЅС‹Р№ РіРѕСЂРѕРґ (РћРђР­)',
    'e.g. Dubai': 'РЅР°РїСЂРёРјРµСЂ: Р”СѓР±Р°Р№',
    'Preferred position:': 'РџСЂРµРґРїРѕС‡С‚РёС‚РµР»СЊРЅР°СЏ РґРѕР»Р¶РЅРѕСЃС‚СЊ:',
    'Preferred city:': 'РџСЂРµРґРїРѕС‡С‚РёС‚РµР»СЊРЅС‹Р№ РіРѕСЂРѕРґ:',
  });
  mergeTranslations('ru', {
    'Owner access': 'Доступ владельца',
    'Owner registration': 'Регистрация владельца',
    'Owner access is limited to one account.': 'Доступ владельца доступен только для одного аккаунта.',
    'Owner registration is no longer available.': 'Регистрация владельца уже использована.',
    'Owner account created. Check your email to confirm, then sign in.': 'Аккаунт владельца создан. Подтвердите email и войдите.',
    'Owner registration link (one-time)': 'Ссылка регистрации владельца (один раз)',
  });

  mergeTranslations('ar', {
    'Owner access': 'وصول المالك',
    'Owner registration': 'تسجيل المالك',
    'Owner access is limited to one account.': 'وصول المالك محدود بحساب واحد.',
    'Owner registration is no longer available.': 'تسجيل المالك لم يعد متاحًا.',
    'Owner account created. Check your email to confirm, then sign in.': 'تم إنشاء حساب المالك. يرجى تأكيد البريد الإلكتروني ثم تسجيل الدخول.',
    'Owner registration link (one-time)': 'رابط تسجيل المالك (مرة واحدة)',
  });
  mergeTranslations('ru', {
    'Account settings': 'Настройки аккаунта',
    'Update your email or password securely.': 'Безопасно обновите email или пароль.',
    'Current email': 'Текущий email',
    'New email': 'Новый email',
    'Update email': 'Обновить email',
    'Email update sent. Check your inbox to confirm.': 'Письмо для смены email отправлено. Проверьте почту.',
    'Unable to update email.': 'Не удалось обновить email.',
    'Email is unchanged.': 'Email не изменился.',
    'Email is required.': 'Email обязателен.',
    'Password updated.': 'Пароль обновлен.',
    'Unable to update password.': 'Не удалось обновить пароль.',
  });

  mergeTranslations('ar', {
    'Account settings': 'إعدادات الحساب',
    'Update your email or password securely.': 'حدّث البريد الإلكتروني أو كلمة المرور بأمان.',
    'Current email': 'البريد الحالي',
    'New email': 'البريد الجديد',
    'Update email': 'تحديث البريد',
    'Email update sent. Check your inbox to confirm.': 'تم إرسال رسالة تحديث البريد. تحقق من صندوق البريد للتأكيد.',
    'Unable to update email.': 'تعذر تحديث البريد الإلكتروني.',
    'Email is unchanged.': 'البريد لم يتغير.',
    'Email is required.': 'البريد الإلكتروني مطلوب.',
    'Password updated.': 'تم تحديث كلمة المرور.',
    'Unable to update password.': 'تعذر تحديث كلمة المرور.',
  });
}
