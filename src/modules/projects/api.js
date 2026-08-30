import {
  clearGoogleAccessToken,
  fetchWithGoogleAccessToken,
  getGoogleAccessToken,
} from './googleAuth';
import { toProxiedProjectImage } from './drive';
import {
  clearProjectsMemoryCache,
  isProjectsCacheFresh,
  readProjectsCache,
  writeProjectsCache,
} from './cache';
import localProjectsPayload from './localProjects.json';

const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL;
const APP_ENV = (process.env.APP_ENV || 'production').toLowerCase();
const USE_LOCAL_PROJECTS = APP_ENV === 'local';

const CARD_THEMES = [
  {
    bgColor: '#ffffffff',
    textColor: 'black',
    buttonColor: '#213359',
    buttonTextColor: 'white',
  },
  {
    bgColor: '#C8D1F0',
    textColor: '#213359',
    buttonColor: '#213359',
    buttonTextColor: 'white',
  },
];

const LOGIN_PAGE_ERROR =
  'Apps Script still returned a login page. Use the public /macros/s/.../exec URL (not /a/macros/student.monash.edu), and a GOOGLE_REFRESH_TOKEN from npm run google:token.';

export function isExternalProjectLink(link) {
  return Boolean(link) && link !== 'PENDING_APPROVAL';
}

export function normalizeProject(project, index) {
  const theme = CARD_THEMES[index % CARD_THEMES.length];
  const title = project.name?.trim() || 'Untitled project';
  const subtitle = project.subtitle?.trim() || '';

  return {
    id: project.id || `project-${index}`,
    title,
    subtitle,
    previewTitle: subtitle ? `${title}: ${subtitle}` : title,
    description: project.description?.trim() || '',
    image: toProxiedProjectImage(project.image),
    link: isExternalProjectLink(project.link) ? project.link : null,
    imageAlign: index % 2 === 0 ? 'left' : 'right',
    delay: Math.min(index * 0.12, 0.6),
    ...theme,
  };
}

function parseProjectsPayload(text) {
  const trimmed = text.trim();
  if (!trimmed.startsWith('{') && !trimmed.startsWith('[')) {
    throw new Error(LOGIN_PAGE_ERROR);
  }

  const payload = JSON.parse(trimmed);
  if (!payload?.success || !Array.isArray(payload.projects)) {
    throw new Error('Apps Script JSON did not include a projects array');
  }

  return payload.projects.map(normalizeProject);
}

function loadLocalProjects() {
  if (!Array.isArray(localProjectsPayload?.projects)) {
    throw new Error('localProjects.json must include a projects array');
  }

  return localProjectsPayload.projects.map(normalizeProject);
}

async function loadProjectsWithToken(accessToken) {
  if (!APPS_SCRIPT_URL) {
    throw new Error('Missing APPS_SCRIPT_URL.');
  }

  const response = await fetchWithGoogleAccessToken(APPS_SCRIPT_URL, accessToken);
  if (!response.ok) {
    throw new Error(`Apps Script request failed with HTTP ${response.status}`);
  }

  return parseProjectsPayload(await response.text());
}

export async function fetchProjectsFromSource() {
  if (USE_LOCAL_PROJECTS) {
    return { projects: loadLocalProjects(), error: null };
  }

  const accessToken = await getGoogleAccessToken();

  try {
    return { projects: await loadProjectsWithToken(accessToken), error: null };
  } catch {
    clearGoogleAccessToken();
    const retryToken = await getGoogleAccessToken();
    return { projects: await loadProjectsWithToken(retryToken), error: null };
  }
}

export async function getProjects({ force = false } = {}) {
  try {
    // Local fixtures skip Apps Script + disk cache so JSON edits show up on refresh.
    if (USE_LOCAL_PROJECTS) {
      return { projects: loadLocalProjects(), error: null, cached: false, cachedAt: null };
    }

    if (!force) {
      const cached = await readProjectsCache();
      if (isProjectsCacheFresh(cached)) {
        return { projects: cached.projects, error: null, cached: true, cachedAt: cached.cachedAt };
      }
    }

    const result = await fetchProjectsFromSource();
    const saved = await writeProjectsCache(result.projects);
    return { ...result, cached: false, cachedAt: saved.cachedAt };
  } catch (error) {
    console.error('Failed to load projects', error);
    const stale = await readProjectsCache();
    if (stale?.projects?.length) {
      return { projects: stale.projects, error: null, cached: true, cachedAt: stale.cachedAt };
    }
    return { projects: [], error: error.message || LOGIN_PAGE_ERROR, cached: false };
  }
}

export async function refreshProjectsCache() {
  clearProjectsMemoryCache();
  return getProjects({ force: true });
}
