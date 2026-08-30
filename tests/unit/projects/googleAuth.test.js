import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  assertGoogleOAuthConfig,
  clearGoogleAccessToken,
  fetchWithGoogleAccessToken,
  getGoogleAccessToken,
  getGoogleOAuthConfig,
  GOOGLE_OAUTH_SCOPES,
} from '@/modules/projects/googleAuth';

const ORIGINAL_ENV = { ...process.env };

function setOAuthEnv() {
  process.env.GOOGLE_CLIENT_ID = 'client-id';
  process.env.GOOGLE_CLIENT_SECRET = 'client-secret';
  process.env.GOOGLE_REFRESH_TOKEN = 'refresh-token';
}

describe('google OAuth config', () => {
  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
    clearGoogleAccessToken();
  });

  it('exposes default Drive and userinfo scopes', () => {
    expect(GOOGLE_OAUTH_SCOPES).toContain('https://www.googleapis.com/auth/drive.readonly');
  });

  it('parses comma or space separated extra scopes', () => {
    setOAuthEnv();
    process.env.GOOGLE_OAUTH_SCOPES = 'scope-a, scope-b  scope-c';
    expect(getGoogleOAuthConfig().scopes).toEqual(['scope-a', 'scope-b', 'scope-c']);
  });

  it('lists every missing OAuth variable', () => {
    delete process.env.GOOGLE_CLIENT_ID;
    delete process.env.GOOGLE_CLIENT_SECRET;
    delete process.env.GOOGLE_REFRESH_TOKEN;

    expect(() => assertGoogleOAuthConfig()).toThrow(/GOOGLE_CLIENT_ID/);
    expect(() => assertGoogleOAuthConfig()).toThrow(/GOOGLE_REFRESH_TOKEN/);
  });
});

describe('getGoogleAccessToken', () => {
  beforeEach(() => {
    setOAuthEnv();
    clearGoogleAccessToken();
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
    clearGoogleAccessToken();
    vi.unstubAllGlobals();
  });

  it('caches a successful token until just before expiry', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ access_token: 'ya29.token', expires_in: 3600 }),
    });

    await expect(getGoogleAccessToken()).resolves.toBe('ya29.token');
    await expect(getGoogleAccessToken()).resolves.toBe('ya29.token');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('surfaces Google error details when refresh fails', async () => {
    fetch.mockResolvedValue({
      ok: false,
      status: 400,
      json: async () => ({ error: 'invalid_grant', error_description: 'Token expired' }),
    });

    await expect(getGoogleAccessToken()).rejects.toThrow(/Token expired/);
  });
});

describe('fetchWithGoogleAccessToken', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('follows a non-login redirect and returns the final response', async () => {
    fetch
      .mockResolvedValueOnce({
        status: 302,
        headers: new Headers({ location: '/next' }),
      })
      .mockResolvedValueOnce({
        status: 200,
        ok: true,
        headers: new Headers(),
      });

    const response = await fetchWithGoogleAccessToken('https://script.google.com/exec', 'token');
    expect(response.status).toBe(200);
    expect(fetch).toHaveBeenNthCalledWith(
      2,
      'https://script.google.com/next',
      expect.objectContaining({
        headers: { Authorization: 'Bearer token' },
        redirect: 'manual',
      }),
    );
  });

  it('rejects Google login redirects', async () => {
    fetch.mockResolvedValue({
      status: 302,
      headers: new Headers({ location: 'https://accounts.google.com/ServiceLogin' }),
    });

    await expect(fetchWithGoogleAccessToken('https://script.google.com/exec', 'token')).rejects.toThrow(
      /Google login redirect/,
    );
  });

  it('stops after too many redirects', async () => {
    fetch.mockResolvedValue({
      status: 302,
      headers: new Headers({ location: '/loop' }),
    });

    await expect(
      fetchWithGoogleAccessToken('https://script.google.com/exec', 'token', { maxRedirects: 2 }),
    ).rejects.toThrow(/Too many redirects/);
  });
});
