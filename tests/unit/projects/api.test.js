import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { appsScriptPayload, rawProjects } from '@tests/fixtures/projects.js';

const authMocks = vi.hoisted(() => ({
  clearGoogleAccessToken: vi.fn(),
  fetchWithGoogleAccessToken: vi.fn(),
  getGoogleAccessToken: vi.fn(),
}));

vi.mock('@/modules/projects/googleAuth', () => authMocks);

import { isExternalProjectLink, normalizeProject, parseProjectsPayload } from '@/modules/projects/normalize';

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

describe('parseProjectsPayload', () => {
  it('normalizes a successful Apps Script payload', () => {
    const projects = parseProjectsPayload(JSON.stringify(appsScriptPayload));
    expect(projects[0].id).toBe('hub');
    expect(projects[1].link).toBeNull();
  });

  it('rejects login pages and payloads without a projects array', () => {
    expect(() => parseProjectsPayload('<html>Sign in</html>')).toThrow(/login page/);
    expect(() => parseProjectsPayload(JSON.stringify({ success: true }))).toThrow(
      'Apps Script JSON did not include a projects array',
    );
  });
});

describe('normalizeProject', () => {
  it('applies titles, themes, and static Drive image paths', () => {
    const first = normalizeProject(rawProjects[0], 0);
    expect(first).toMatchObject({
      id: 'hub',
      title: 'Community Hub',
      previewTitle: 'Community Hub: Connect clubs',
      image: '/project-images/abcdefghij1234567890.jpg',
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

describe('fetchProjectsFromSource', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env = { ...ORIGINAL_ENV };
  });

  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
  });

  it('loads localProjects.json when APP_ENV=local', async () => {
    const { fetchProjectsFromSource } = await loadApi({ appEnv: 'local' });
    const result = await fetchProjectsFromSource();

    expect(result.error).toBeNull();
    expect(result.projects.length).toBeGreaterThan(0);
    expect(result.projects[0].title).toBe('Community Hub');
    expect(authMocks.getGoogleAccessToken).not.toHaveBeenCalled();
  });

  it('fetches Apps Script in production', async () => {
    authMocks.getGoogleAccessToken.mockResolvedValue('token');
    authMocks.fetchWithGoogleAccessToken.mockResolvedValue({
      ok: true,
      status: 200,
      text: async () => JSON.stringify(appsScriptPayload),
    });

    const { fetchProjectsFromSource } = await loadApi({ appEnv: 'production' });
    const result = await fetchProjectsFromSource();

    expect(result.projects[0].title).toBe('Community Hub');
    expect(result.projects[0].image).toBe('/project-images/abcdefghij1234567890.jpg');
  });

  it('retries once after a failed Apps Script request', async () => {
    authMocks.getGoogleAccessToken.mockResolvedValue('token');
    authMocks.fetchWithGoogleAccessToken
      .mockRejectedValueOnce(new Error('login'))
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        text: async () => JSON.stringify(appsScriptPayload),
      });

    const { fetchProjectsFromSource } = await loadApi({ appEnv: 'production' });
    const result = await fetchProjectsFromSource();

    expect(authMocks.clearGoogleAccessToken).toHaveBeenCalled();
    expect(authMocks.getGoogleAccessToken).toHaveBeenCalledTimes(2);
    expect(result.projects[0].id).toBe('hub');
  });

  it('throws when Apps Script is missing', async () => {
    authMocks.getGoogleAccessToken.mockResolvedValue('token');
    const { fetchProjectsFromSource } = await loadApi({
      appEnv: 'production',
      appsScriptUrl: '',
    });

    await expect(fetchProjectsFromSource()).rejects.toThrow('Missing APPS_SCRIPT_URL.');
  });
});
