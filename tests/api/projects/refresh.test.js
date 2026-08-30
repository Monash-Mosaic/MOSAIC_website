import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/modules/projects/api', () => ({
  refreshProjectsCache: vi.fn(),
}));

import { POST } from '@/app/api/projects/refresh/route';
import { refreshProjectsCache } from '@/modules/projects/api';

const ORIGINAL_ENV = { ...process.env };

function requestWithAuth(token) {
  return new Request('http://localhost/api/projects/refresh', {
    method: 'POST',
    headers: token ? { authorization: `Bearer ${token}` } : undefined,
  });
}

describe('POST /api/projects/refresh', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env = { ...ORIGINAL_ENV, CACHE_REFRESH_SECRET: 'secret-token' };
  });

  it('rejects missing or invalid bearer tokens', async () => {
    const unauthorized = await POST(requestWithAuth());
    expect(unauthorized.status).toBe(401);

    const wrong = await POST(requestWithAuth('nope'));
    expect(wrong.status).toBe(401);
    expect(refreshProjectsCache).not.toHaveBeenCalled();
  });

  it('refreshes the cache when authorized', async () => {
    refreshProjectsCache.mockResolvedValue({
      projects: [{ id: 'hub' }],
      error: null,
      cachedAt: 99,
    });

    const response = await POST(requestWithAuth('secret-token'));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({
      success: true,
      refreshed: true,
      count: 1,
      cachedAt: 99,
    });
  });

  it('returns 502 when refresh still cannot load projects', async () => {
    refreshProjectsCache.mockResolvedValue({
      projects: [],
      error: 'Apps Script JSON did not include a projects array',
    });

    const response = await POST(requestWithAuth('secret-token'));
    expect(response.status).toBe(502);
  });
});
