const COUNTRY_CACHE_KEY = 'directem_country_currency_v1';
const RATE_CACHE_KEY = 'directem_fx_rate_v1';
const RATE_CACHE_TTL_MS = 6 * 60 * 60 * 1000;

type CurrencyCache = Record<string, { currency: string; updatedAt: number }>;
type RateCache = Record<string, { rates: Record<string, number>; updatedAt: number }>;

function readCache<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function writeCache<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore storage errors
  }
}

export function normalizeCurrency(code?: string, fallback: string = 'USD') {
  const normalized = typeof code === 'string' ? code.trim().toUpperCase() : '';
  if (normalized) return normalized;
  return fallback.trim().toUpperCase();
}

export function roundAmount(amount: number, currency: string) {
  if (!Number.isFinite(amount)) return amount;
  const zeroDecimal = ['JPY', 'HUF', 'TWD'].includes(currency.toUpperCase());
  return zeroDecimal ? Math.round(amount) : Math.round(amount * 100) / 100;
}

export function formatCurrency(amount: number, currency: string) {
  try {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency,
      maximumFractionDigits: ['JPY', 'HUF', 'TWD'].includes(currency.toUpperCase()) ? 0 : 2,
    }).format(amount);
  } catch {
    return `${amount} ${currency}`;
  }
}

async function fetchCountryCurrency(countryCode: string): Promise<string | undefined> {
  const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}?fields=currencies`);
  if (!response.ok) return undefined;
  const data = await response.json();
  const entry = Array.isArray(data) ? data[0] : data;
  const currencies = entry?.currencies;
  if (!currencies || typeof currencies !== 'object') return undefined;
  const codes = Object.keys(currencies);
  return codes[0];
}

export async function resolveCurrencyForCountry(countryCode?: string, fallback = 'USD') {
  if (!countryCode) {
    return { currency: normalizeCurrency(undefined, fallback), raw: undefined, isFallback: true };
  }

  const code = countryCode.toUpperCase();
  let rawCurrency: string | undefined;

  const cache = readCache<CurrencyCache>(COUNTRY_CACHE_KEY) || {};
  const cached = cache[code];
  if (cached?.currency) {
    rawCurrency = cached.currency;
  } else {
    try {
      rawCurrency = await fetchCountryCurrency(code);
      if (rawCurrency) {
        cache[code] = { currency: rawCurrency, updatedAt: Date.now() };
        writeCache(COUNTRY_CACHE_KEY, cache);
      }
    } catch {
      rawCurrency = undefined;
    }
  }

  const normalized = normalizeCurrency(rawCurrency, fallback);
  const isFallback = !rawCurrency || normalized !== rawCurrency.toUpperCase();
  return { currency: normalized, raw: rawCurrency, isFallback };
}

async function fetchRates(baseCurrency: string): Promise<Record<string, number> | null> {
  const response = await fetch(`https://open.er-api.com/v6/latest/${baseCurrency}`);
  if (!response.ok) return null;
  const data = await response.json();
  if (data?.result !== 'success' || !data?.rates) return null;
  return data.rates as Record<string, number>;
}

export async function getExchangeRate(baseCurrency: string, targetCurrency: string) {
  const base = baseCurrency.toUpperCase();
  const target = targetCurrency.toUpperCase();
  if (base === target) return 1;

  const cache = readCache<RateCache>(RATE_CACHE_KEY) || {};
  const cached = cache[base];
  if (cached && Date.now() - cached.updatedAt < RATE_CACHE_TTL_MS) {
    const rate = cached.rates?.[target];
    if (typeof rate === 'number') return rate;
  }

  try {
    const rates = await fetchRates(base);
    if (!rates) return undefined;
    cache[base] = { rates, updatedAt: Date.now() };
    writeCache(RATE_CACHE_KEY, cache);
    const rate = rates[target];
    return typeof rate === 'number' ? rate : undefined;
  } catch {
    return undefined;
  }
}
