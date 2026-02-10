export interface IpLocation {
  city?: string;
  countryCode?: string;
  lat?: number;
  lng?: number;
}

const IP_GEO_SOURCES = [
  'https://ipwho.is/',
  'https://ipapi.co/json/',
  'https://geolocation-db.com/json/',
];

const IP_GEO_TIMEOUT_MS = 3500;

function parseIpLocation(data: any): IpLocation | undefined {
  if (!data || data?.success === false) return undefined;

  const city = data.city || data.region || data.region_name || data.state || data.province;
  const countryCode = data.country_code || data.countryCode || data.country_code_iso2 || data.country;

  let latRaw = data.latitude ?? data.lat ?? data.location?.lat;
  let lngRaw = data.longitude ?? data.lon ?? data.lng ?? data.location?.lng;

  const locRaw = data.loc || data.location?.loc;
  if ((latRaw === undefined || lngRaw === undefined) && typeof locRaw === 'string' && locRaw.includes(',')) {
    const [latPart, lngPart] = locRaw.split(',');
    if (latRaw === undefined) latRaw = latPart;
    if (lngRaw === undefined) lngRaw = lngPart;
  }

  const lat = typeof latRaw === 'number' ? latRaw : Number(latRaw);
  const lng = typeof lngRaw === 'number' ? lngRaw : Number(lngRaw);

  const location: IpLocation = {};
  if (typeof city === 'string' && city.trim()) location.city = city.trim();
  if (typeof countryCode === 'string' && countryCode.trim()) {
    location.countryCode = countryCode.trim().toUpperCase();
  }
  if (!Number.isNaN(lat)) location.lat = lat;
  if (!Number.isNaN(lng)) location.lng = lng;

  if (!location.city && !location.countryCode && location.lat === undefined && location.lng === undefined) {
    return undefined;
  }

  return location;
}

async function fetchIpLocationFrom(url: string, timeoutMs = IP_GEO_TIMEOUT_MS): Promise<IpLocation | undefined> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    const response = await fetch(url, {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!response.ok) return undefined;
    const data = await response.json();
    return parseIpLocation(data);
  } catch {
    return undefined;
  }
}

export async function detectLocationFromIp(): Promise<IpLocation | undefined> {
  const locations: IpLocation[] = [];

  const serverLocation = await fetchIpLocationFrom('/.netlify/functions/ip-geo', 2500);
  if (serverLocation) locations.push(serverLocation);

  const results = await Promise.all(IP_GEO_SOURCES.map((url) => fetchIpLocationFrom(url)));
  results.forEach((result) => {
    if (result) locations.push(result);
  });

  if (locations.length === 0) return undefined;

  const countryCounts = new Map<string, number>();
  for (const loc of locations) {
    if (!loc.countryCode) continue;
    countryCounts.set(loc.countryCode, (countryCounts.get(loc.countryCode) || 0) + 1);
  }

  const topCountry = [...countryCounts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];
  const bestMatch = locations.find((loc) => loc.countryCode === topCountry) || locations[0];
  return bestMatch;
}

export async function detectCountryCode(): Promise<string | undefined> {
  const location = await detectLocationFromIp();
  return location?.countryCode;
}

export function inferCountryCodeFromTimeZone(): string | undefined {
  if (typeof Intl === 'undefined') return undefined;
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (!tz) return undefined;
  const timezoneMap: Record<string, string> = {
    'Asia/Almaty': 'KZ',
    'Asia/Qyzylorda': 'KZ',
    'Asia/Aqtau': 'KZ',
    'Asia/Aqtobe': 'KZ',
    'Asia/Atyrau': 'KZ',
    'Asia/Oral': 'KZ',
    'Asia/Dubai': 'AE',
    'Asia/Riyadh': 'SA',
    'Asia/Qatar': 'QA',
    'Asia/Kuwait': 'KW',
    'Asia/Bahrain': 'BH',
    'Asia/Muscat': 'OM',
    'Asia/Beirut': 'LB',
    'Asia/Amman': 'JO',
    'Africa/Cairo': 'EG',
    'Europe/Moscow': 'RU',
    'Asia/Bishkek': 'KG',
    'Asia/Dushanbe': 'TJ',
    'Europe/Minsk': 'BY',
  };
  return timezoneMap[tz];
}

export async function detectCountryCodeFromGps(): Promise<string | undefined> {
  if (typeof navigator === 'undefined' || !navigator.geolocation) return undefined;

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&zoom=3&addressdetails=1&lat=${lat}&lon=${lng}`,
            { headers: { Accept: 'application/json' }, cache: 'no-store' }
          );
          if (!response.ok) {
            resolve(undefined);
            return;
          }
          const data = await response.json();
          const code = data?.address?.country_code;
          resolve(typeof code === 'string' ? code.toUpperCase() : undefined);
        } catch {
          resolve(undefined);
        }
      },
      () => resolve(undefined),
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 300000 }
    );
  });
}
