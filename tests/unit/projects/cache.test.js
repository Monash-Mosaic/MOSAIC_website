import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  clearProjectsMemoryCache,
  isProjectsCacheFresh,
  PROJECTS_CACHE_TTL_MS,
  readProjectsCache,
  writeProjectsCache,
} from '@/modules/projects/cache';

describe('isProjectsCacheFresh', () => {
  it('requires projects and a recent timestamp', () => {
    expect(isProjectsCacheFresh(null)).toBe(false);
    expect(isProjectsCacheFresh({ projects: [], cachedAt: Date.now() })).toBe(true);
    expect(
      isProjectsCacheFresh({ projects: [{ id: 'a' }], cachedAt: Date.now() - PROJECTS_CACHE_TTL_MS - 1 }),
    ).toBe(false);
  });
});

describe('projects cache IO', () => {
  let tempDir;

  beforeEach(async () => {
    clearProjectsMemoryCache();
    tempDir = await mkdtemp(path.join(os.tmpdir(), 'mosaic-projects-cache-'));
    vi.spyOn(process, 'cwd').mockReturnValue(tempDir);
  });

  afterEach(async () => {
    vi.restoreAllMocks();
    clearProjectsMemoryCache();
    await rm(tempDir, { recursive: true, force: true });
  });

  it('returns memory cache without reading disk', async () => {
    const saved = await writeProjectsCache([{ id: 'hub' }]);
    await rm(path.join(tempDir, '.cache'), { recursive: true, force: true });

    const result = await readProjectsCache();
    expect(result).toEqual(saved);
  });

  it('reads a valid cache file into memory', async () => {
    const payload = { projects: [{ id: 'hub' }], cachedAt: 1_700_000_000_000 };
    const { mkdir } = await import('node:fs/promises');
    const filePath = path.join(tempDir, '.cache', 'projects.json');
    await mkdir(path.dirname(filePath), { recursive: true });
    await writeFile(filePath, JSON.stringify(payload));

    await expect(readProjectsCache()).resolves.toEqual(payload);
    await expect(readProjectsCache()).resolves.toEqual(payload);
  });

  it('returns null when the file is missing or malformed', async () => {
    await expect(readProjectsCache()).resolves.toBeNull();

    const { mkdir } = await import('node:fs/promises');
    const filePath = path.join(tempDir, '.cache', 'projects.json');
    await mkdir(path.dirname(filePath), { recursive: true });
    await writeFile(filePath, JSON.stringify({ projects: 'nope' }));

    await expect(readProjectsCache()).resolves.toBeNull();
  });

  it('writes cache JSON to disk', async () => {
    const payload = await writeProjectsCache([{ id: 'hub' }]);
    const saved = JSON.parse(await readFile(path.join(tempDir, '.cache', 'projects.json'), 'utf8'));
    expect(saved).toEqual(payload);
  });
});
