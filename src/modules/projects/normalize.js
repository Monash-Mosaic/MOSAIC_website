import { toBuiltProjectImage } from './drive.js';

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

export function isLocalProjectsEnv() {
  return (process.env.APP_ENV || 'production').toLowerCase() === 'local';
}

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
    image: toBuiltProjectImage(project.image),
    link: isExternalProjectLink(project.link) ? project.link : null,
    imageAlign: index % 2 === 0 ? 'left' : 'right',
    delay: Math.min(index * 0.12, 0.6),
    ...theme,
  };
}

export function parseProjectsPayload(text) {
  const trimmed = text.trim();
  if (!trimmed.startsWith('{') && !trimmed.startsWith('[')) {
    throw new Error(
      'Apps Script still returned a login page. Use the public /macros/s/.../exec URL (not /a/macros/student.monash.edu), and a GOOGLE_REFRESH_TOKEN from npm run google:token.',
    );
  }

  const payload = JSON.parse(trimmed);
  if (!payload?.success || !Array.isArray(payload.projects)) {
    throw new Error('Apps Script JSON did not include a projects array');
  }

  return payload.projects.map(normalizeProject);
}
