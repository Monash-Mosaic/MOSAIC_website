import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { appsScriptPayload } from '@tests/fixtures/projects.js';

const authMocks = vi.hoisted(() => ({
  clearGoogleAccessToken: vi.fn(),
  fetchWithGoogleAccessToken: vi.fn(),
  getGoogleAccessToken: vi.fn(),
  getGoogleOAuthConfig: vi.fn(),
}));

vi.mock('@/modules/projects/googleAuth', () => authMocks);

const ORIGINAL_ENV = { ...process.env };

async function loadSync(env = {}) {
  vi.resetModules();
  process.env = { ...ORIGINAL_ENV, ...env };
  return import('@/modules/projects/sync');
}

describe('syncProjects', () => {
  let tempDir;

  beforeEach(async () => {
    vi.clearAllMocks();
    tempDir = await mkdtemp(path.join(os.tmpdir(), 'mosaic-projects-sync-'));
    authMocks.getGoogleOAuthConfig.mockReturnValue({
      clientId: 'id',
      clientSecret: 'secret',
      refreshToken: 'refresh',
    });
  });

  afterEach(async () => {
    process.env = { ...ORIGINAL_ENV };
    await rm(tempDir, { recursive: true, force: true });
  });

  it('writes local fixtures when APP_ENV=local', async () => {
    const snapshotPath = path.join(tempDir, 'projects.json');
    const { syncProjects } = await loadSync({
      APP_ENV: 'local',
      PROJECTS_SNAPSHOT_PATH: snapshotPath,
    });

    const result = await syncProjects();
    expect(result.source).toBe('local');
    expect(result.projects[0].title).toBe('Community Hub');
    const saved = JSON.parse(await readFile(snapshotPath, 'utf8'));
    expect(saved.projects).toEqual(result.projects);
    expect(authMocks.getGoogleAccessToken).not.toHaveBeenCalled();
  });

  it('falls back to local fixtures when Google credentials are missing', async () => {
    authMocks.getGoogleOAuthConfig.mockReturnValue({
      clientId: '',
      clientSecret: '',
      refreshToken: '',
    });
    vi.spyOn(console, 'warn').mockImplementation(() => {});

    const snapshotPath = path.join(tempDir, 'projects.json');
    const { syncProjects } = await loadSync({
      APP_ENV: 'production',
      PROJECTS_SNAPSHOT_PATH: snapshotPath,
    });

    const result = await syncProjects();
    expect(result.source).toBe('local');
    expect(result.projects[0].id).toBe('local-community-hub');
  });

  it('fetches Apps Script and downloads Drive images', async () => {
    const snapshotPath = path.join(tempDir, 'projects.json');
    const imageDir = path.join(tempDir, 'project-images');
    authMocks.getGoogleAccessToken.mockResolvedValue('token');
    authMocks.fetchWithGoogleAccessToken
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        text: async () => JSON.stringify(appsScriptPayload),
      })
      .mockResolvedValueOnce({
        ok: true,
        headers: new Headers({ 'content-type': 'image/png' }),
        arrayBuffer: async () => new Uint8Array([1, 2, 3]).buffer,
      });

    const { syncProjects } = await loadSync({
      APP_ENV: 'production',
      APPS_SCRIPT_URL: 'https://script.example/exec',
      PROJECTS_SNAPSHOT_PATH: snapshotPath,
      PROJECTS_IMAGE_DIR: imageDir,
    });

    const result = await syncProjects();
    expect(result.source).toBe('apps-script');
    expect(result.projects[0].image).toBe('/project-images/abcdefghij1234567890.png');
    expect(result.projects[1].image).toBe('/ScalableSolutions.svg');
    const savedImage = await readFile(path.join(imageDir, 'abcdefghij1234567890.png'));
    expect(savedImage.equals(Buffer.from([1, 2, 3]))).toBe(true);
  });

  it('keeps the project when a Drive thumbnail cannot be downloaded', async () => {
    const snapshotPath = path.join(tempDir, 'projects.json');
    const imageDir = path.join(tempDir, 'project-images');
    authMocks.getGoogleAccessToken.mockResolvedValue('token');
    authMocks.fetchWithGoogleAccessToken
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        text: async () => JSON.stringify(appsScriptPayload),
      })
      .mockResolvedValueOnce({
        ok: true,
        headers: new Headers({ 'content-type': 'text/html' }),
        arrayBuffer: async () => new ArrayBuffer(0),
      });
    vi.spyOn(console, 'warn').mockImplementation(() => {});

    const { syncProjects } = await loadSync({
      APP_ENV: 'production',
      APPS_SCRIPT_URL: 'https://script.example/exec',
      PROJECTS_SNAPSHOT_PATH: snapshotPath,
      PROJECTS_IMAGE_DIR: imageDir,
    });

    const result = await syncProjects();
    expect(result.projects[0].image).toBe('');
    expect(result.projects[1].image).toBe('/ScalableSolutions.svg');
  });
});
