import builtProjectsPayload from './generated/projects.json';
import localProjectsPayload from './localProjects.json';
import { isLocalProjectsEnv, normalizeProject } from './normalize.js';

export function loadPageProjects() {
  if (isLocalProjectsEnv()) {
    if (!Array.isArray(localProjectsPayload?.projects)) {
      throw new Error('localProjects.json must include a projects array');
    }
    return localProjectsPayload.projects.map(normalizeProject);
  }

  if (!Array.isArray(builtProjectsPayload?.projects)) {
    throw new Error('generated/projects.json must include a projects array. Run npm run sync:projects.');
  }

  return builtProjectsPayload.projects;
}
