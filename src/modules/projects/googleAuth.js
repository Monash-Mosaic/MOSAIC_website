const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const DEFAULT_SCOPES = [
  'https://www.googleapis.com/auth/drive.readonly',
  'https://www.googleapis.com/auth/userinfo.email',
];

let cachedAccessToken = null;
let tokenExpiresAt = 0;

export const GOOGLE_OAUTH_SCOPES = DEFAULT_SCOPES;

export function getGoogleOAuthConfig() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;
  const scopes = (process.env.GOOGLE_OAUTH_SCOPES || DEFAULT_SCOPES.join(' '))
    .split(/[,\s]+/)
    .filter(Boolean);

  return { clientId, clientSecret, refreshToken, scopes };
}

export function assertGoogleOAuthConfig() {
  const { clientId, clientSecret, refreshToken } = getGoogleOAuthConfig();
  const missing = [
    !clientId && 'GOOGLE_CLIENT_ID',
    !clientSecret && 'GOOGLE_CLIENT_SECRET',
    !refreshToken && 'GOOGLE_REFRESH_TOKEN',
  ].filter(Boolean);

  if (missing.length) {
    throw new Error(
      `Missing ${missing.join(', ')}. Client ID/secret from Google Cloud are not enough — run npm run google:token to create GOOGLE_REFRESH_TOKEN.`,
    );
  }

  return { clientId, clientSecret, refreshToken };
}

export function clearGoogleAccessToken() {
  cachedAccessToken = null;
  tokenExpiresAt = 0;
}

export async function getGoogleAccessToken() {
  const { clientId, clientSecret, refreshToken } = assertGoogleOAuthConfig();
  const now = Date.now();

  if (cachedAccessToken && now < tokenExpiresAt) {
    return cachedAccessToken;
  }

  const response = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
    cache: 'no-store',
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok || !payload.access_token) {
    clearGoogleAccessToken();
    const detail = payload.error_description || payload.error || `HTTP ${response.status}`;
    throw new Error(`Failed to refresh Google access token: ${detail}`);
  }

  cachedAccessToken = payload.access_token;
  const lifetimeMs = Math.max((payload.expires_in ?? 3600) - 60, 30) * 1000;
  tokenExpiresAt = now + lifetimeMs;
  return cachedAccessToken;
}

export async function fetchWithGoogleAccessToken(url, accessToken, { maxRedirects = 8 } = {}) {
  const headers = { Authorization: `Bearer ${accessToken}` };
  let currentUrl = url;

  for (let attempt = 0; attempt < maxRedirects; attempt += 1) {
    const response = await fetch(currentUrl, {
      method: 'GET',
      headers,
      redirect: 'manual',
      cache: 'no-store',
    });

    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get('location');
      if (!location) {
        throw new Error('Google redirected without a Location header');
      }

      currentUrl = new URL(location, currentUrl).toString();
      if (/accounts\.google\.com|okta\.com|ServiceLogin/i.test(currentUrl)) {
        throw new Error('Google login redirect');
      }
      continue;
    }

    return response;
  }

  throw new Error('Too many redirects from Google');
}
