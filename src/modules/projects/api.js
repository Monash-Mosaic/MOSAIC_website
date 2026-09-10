import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  clearGoogleAccessToken,
  fetchWithGoogleAccessToken,
  getGoogleAccessToken,
} from './googleAuth.js';
import { normalizeProject, parseProjectsPayload, useLocalProjects } from './normalize.js';

export { isExternalProjectLink, normalizeProject, useLocalProjects } from './normalize.js';

function localProjectsPath() {
  return join(dirname(fileURLToPath(import.meta.url)), 'localProjects.json');
}

export function loadLocalProjects() {
  const payload = JSON.parse(readFileSync(localProjectsPath(), 'utf8'));
  if (!Array.isArray(payload?.projects)) {
    throw new Error('localProjects.json must include a projects array');
  }

  return payload.projects.map(normalizeProject);
}

async function loadProjectsWithToken(accessToken) {
  const appsScriptUrl = process.env.APPS_SCRIPT_URL;
  if (!appsScriptUrl) {
    throw new Error('Missing APPS_SCRIPT_URL.');
  }

  const response = await fetchWithGoogleAccessToken(appsScriptUrl, accessToken);
  if (!response.ok) {
    throw new Error(`Apps Script request failed with HTTP ${response.status}`);
  }

  return parseProjectsPayload(await response.text());
}

export async function fetchProjectsFromSource() {
  if (useLocalProjects()) {
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
