import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

export const PROJECTS_CACHE_TTL_MS = 24 * 60 * 60 * 1000;

let memoryCache = null;

function cacheFilePath() {
  const root = process.env.VERCEL ? '/tmp' : process.cwd();
  return path.join(root, '.cache', 'projects.json');
}

export function clearProjectsMemoryCache() {
  memoryCache = null;
}

export async function readProjectsCache() {
  if (memoryCache?.projects) {
    return memoryCache;
  }

  try {
    const payload = JSON.parse(await readFile(cacheFilePath(), 'utf8'));
    if (!Array.isArray(payload.projects) || typeof payload.cachedAt !== 'number') {
      return null;
    }
    memoryCache = payload;
    return payload;
  } catch {
    return null;
  }
}

export function isProjectsCacheFresh(cache, ttlMs = PROJECTS_CACHE_TTL_MS) {
  return Boolean(cache?.projects) && Date.now() - cache.cachedAt < ttlMs;
}

export async function writeProjectsCache(projects) {
  const payload = { projects, cachedAt: Date.now() };
  memoryCache = payload;

  try {
    const filePath = cacheFilePath();
    await mkdir(path.dirname(filePath), { recursive: true });
    await writeFile(filePath, JSON.stringify(payload));
  } catch (error) {
    console.error('Failed to persist projects cache', error);
  }

  return payload;
}
