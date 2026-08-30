import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/modules/projects/api', () => ({
  getProjects: vi.fn(),
}));

import { GET } from '@/app/api/projects/route';
import { getProjects } from '@/modules/projects/api';
import { normalizedProjects } from '@tests/fixtures/projects.js';

describe('GET /api/projects', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns projects from getProjects', async () => {
    getProjects.mockResolvedValue({
      projects: normalizedProjects,
      error: null,
      cached: true,
      cachedAt: 1_700_000_000_000,
    });

    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({
      success: true,
      projects: normalizedProjects,
      cached: true,
      cachedAt: 1_700_000_000_000,
    });
  });

  it('returns 502 when loading fails', async () => {
    getProjects.mockResolvedValue({
      projects: [],
      error: 'Missing APPS_SCRIPT_URL.',
      cached: false,
    });

    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(502);
    expect(body).toEqual({
      success: false,
      error: 'Missing APPS_SCRIPT_URL.',
      projects: [],
    });
  });
});
