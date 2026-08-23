import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { appsScriptPayload, rawProjects } from '@tests/fixtures/projects.js';

const cacheMocks = vi.hoisted(() => ({
  clearProjectsMemoryCache: vi.fn(),
  isProjectsCacheFresh: vi.fn(),
  readProjectsCache: vi.fn(),
  writeProjectsCache: vi.fn(),
}));

const authMocks = vi.hoisted(() => ({
  clearGoogleAccessToken: vi.fn(),
  fetchWithGoogleAccessToken: vi.fn(),
  getGoogleAccessToken: vi.fn(),
}));

vi.mock('@/modules/projects/cache', () => ({
  PROJECTS_CACHE_TTL_MS: 86_400_000,
  ...cacheMocks,
}));

vi.mock('@/modules/projects/googleAuth', () => authMocks);

import { isExternalProjectLink, normalizeProject } from '@/modules/projects/api';

const ORIGINAL_ENV = { ...process.env };

async function loadApi({ appEnv = 'production', appsScriptUrl = 'https://script.example/exec' } = {}) {
  vi.resetModules();
  process.env.APP_ENV = appEnv;
  process.env.APPS_SCRIPT_URL = appsScriptUrl;
  return import('@/modules/projects/api');
}

describe('isExternalProjectLink', () => {
  it('treats pending and empty links as internal', () => {
    expect(isExternalProjectLink('https://example.com')).toBe(true);
    expect(isExternalProjectLink('PENDING_APPROVAL')).toBe(false);
    expect(isExternalProjectLink('')).toBe(false);
  });
});

describe('normalizeProject', () => {
  it('applies titles, themes, and Drive image proxying', () => {
    const first = normalizeProject(rawProjects[0], 0);
    expect(first).toMatchObject({
      id: 'hub',
      title: 'Community Hub',
      previewTitle: 'Community Hub: Connect clubs',
      image: '/api/projects/images/abcdefghij1234567890',
      link: 'https://example.com/hub',
      imageAlign: 'left',
      bgColor: '#ffffffff',
    });

    const untitled = normalizeProject({ link: 'PENDING_APPROVAL' }, 1);
    expect(untitled.title).toBe('Untitled project');
    expect(untitled.id).toBe('project-1');
    expect(untitled.link).toBeNull();
    expect(untitled.imageAlign).toBe('right');
    expect(untitled.bgColor).toBe('#C8D1F0');
  });
});

describe('getProjects', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env = { ...ORIGINAL_ENV };
    cacheMocks.writeProjectsCache.mockImplementation(async (projects) => ({
      projects,
      cachedAt: 1_700_000_000_000,
    }));
  });

  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
  });

  it('loads localProjects.json without cache when APP_ENV=local', async () => {
    const { getProjects } = await loadApi({ appEnv: 'local' });
    const result = await getProjects();

    expect(result.error).toBeNull();
    expect(result.cached).toBe(false);
    expect(result.projects.length).toBeGreaterThan(0);
    expect(result.projects[0].title).toBe('Community Hub');
    expect(cacheMocks.readProjectsCache).not.toHaveBeenCalled();
    expect(authMocks.getGoogleAccessToken).not.toHaveBeenCalled();
  });

  it('returns a fresh disk cache in production', async () => {
    cacheMocks.readProjectsCache.mockResolvedValue({
      projects: [{ id: 'cached' }],
      cachedAt: 1_700_000_000_000,
    });
    cacheMocks.isProjectsCacheFresh.mockReturnValue(true);

    const { getProjects } = await loadApi({ appEnv: 'production' });
    const result = await getProjects();

    expect(result).toMatchObject({
      projects: [{ id: 'cached' }],
      cached: true,
      cachedAt: 1_700_000_000_000,
    });
    expect(authMocks.getGoogleAccessToken).not.toHaveBeenCalled();
  });

  it('fetches Apps Script and writes cache when stale', async () => {
    cacheMocks.readProjectsCache.mockResolvedValue(null);
    cacheMocks.isProjectsCacheFresh.mockReturnValue(false);
    authMocks.getGoogleAccessToken.mockResolvedValue('token');
    authMocks.fetchWithGoogleAccessToken.mockResolvedValue({
      ok: true,
      status: 200,
      text: async () => JSON.stringify(appsScriptPayload),
    });

    const { getProjects } = await loadApi({ appEnv: 'production' });
    const result = await getProjects();

    expect(result.cached).toBe(false);
    expect(result.projects[0].title).toBe('Community Hub');
    expect(cacheMocks.writeProjectsCache).toHaveBeenCalled();
  });

  it('retries once after a failed Apps Script request', async () => {
    cacheMocks.readProjectsCache.mockResolvedValue(null);
    cacheMocks.isProjectsCacheFresh.mockReturnValue(false);
    authMocks.getGoogleAccessToken.mockResolvedValue('token');
    authMocks.fetchWithGoogleAccessToken
      .mockRejectedValueOnce(new Error('login'))
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        text: async () => JSON.stringify(appsScriptPayload),
      });

    const { getProjects } = await loadApi({ appEnv: 'production' });
    const result = await getProjects();

    expect(authMocks.clearGoogleAccessToken).toHaveBeenCalled();
    expect(authMocks.getGoogleAccessToken).toHaveBeenCalledTimes(2);
    expect(result.projects[0].id).toBe('hub');
  });

  it('falls back to stale cache when the source fails', async () => {
    cacheMocks.isProjectsCacheFresh.mockReturnValue(false);
    cacheMocks.readProjectsCache
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce({ projects: [{ id: 'stale' }], cachedAt: 1 });
    authMocks.getGoogleAccessToken.mockRejectedValue(new Error('no token'));
    vi.spyOn(console, 'error').mockImplementation(() => {});

    const { getProjects } = await loadApi({ appEnv: 'production' });
    const result = await getProjects();

    expect(result).toEqual({
      projects: [{ id: 'stale' }],
      error: null,
      cached: true,
      cachedAt: 1,
    });
  });

  it('refreshProjectsCache forces a reload', async () => {
    cacheMocks.readProjectsCache.mockResolvedValue(null);
    cacheMocks.isProjectsCacheFresh.mockReturnValue(false);
    authMocks.getGoogleAccessToken.mockResolvedValue('token');
    authMocks.fetchWithGoogleAccessToken.mockResolvedValue({
      ok: true,
      status: 200,
      text: async () => JSON.stringify(appsScriptPayload),
    });

    const { refreshProjectsCache } = await loadApi({ appEnv: 'production' });
    await refreshProjectsCache();
    expect(cacheMocks.clearProjectsMemoryCache).toHaveBeenCalled();
  });
});
