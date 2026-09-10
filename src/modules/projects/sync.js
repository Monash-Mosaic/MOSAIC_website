import { mkdir, readdir, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { fetchProjectsFromSource, loadLocalProjects } from './api.js';
import { extensionForContentType, extractBuiltProjectFileId } from './drive.js';
import { fetchWithGoogleAccessToken, getGoogleAccessToken, getGoogleOAuthConfig } from './googleAuth.js';
import { useLocalProjects } from './normalize.js';

const SNAPSHOT_FILENAME = 'projects.json';
const IMAGE_DIR_NAME = 'project-images';

export function projectsSnapshotPath() {
  return (
    process.env.PROJECTS_SNAPSHOT_PATH ||
    join(dirname(fileURLToPath(import.meta.url)), 'generated', SNAPSHOT_FILENAME)
  );
}

export function projectImagesDir() {
  return process.env.PROJECTS_IMAGE_DIR || join(process.cwd(), 'public', IMAGE_DIR_NAME);
}

function hasGoogleCredentials() {
  const { clientId, clientSecret, refreshToken } = getGoogleOAuthConfig();
  return Boolean(clientId && clientSecret && refreshToken && process.env.APPS_SCRIPT_URL);
}

async function emptyImageDir(directory) {
  await mkdir(directory, { recursive: true });
  const entries = await readdir(directory, { withFileTypes: true }).catch(() => []);
  await Promise.all(
    entries
      .filter((entry) => entry.name !== '.gitkeep')
      .map((entry) => rm(join(directory, entry.name), { recursive: true, force: true })),
  );
}

async function downloadDriveImage(fileId, accessToken) {
  const response = await fetchWithGoogleAccessToken(
    `https://drive.google.com/thumbnail?id=${encodeURIComponent(fileId)}&sz=w1600`,
    accessToken,
  );

  if (!response.ok) {
    throw new Error(`Drive thumbnail failed with HTTP ${response.status}`);
  }

  const contentType = response.headers.get('content-type') || 'image/jpeg';
  if (!contentType.startsWith('image/')) {
    throw new Error('Drive thumbnail did not return an image');
  }

  return {
    body: Buffer.from(await response.arrayBuffer()),
    extension: extensionForContentType(contentType),
  };
}

export async function materializeProjectImages(projects, { accessToken } = {}) {
  const imagesNeedingDownload = projects.filter((project) => extractBuiltProjectFileId(project.image));
  if (imagesNeedingDownload.length === 0) {
    return projects;
  }

  const token = accessToken || (await getGoogleAccessToken());
  const imageDir = projectImagesDir();
  await emptyImageDir(imageDir);

  return Promise.all(
    projects.map(async (project) => {
      const fileId = extractBuiltProjectFileId(project.image);
      if (!fileId) return project;

      try {
        const image = await downloadDriveImage(fileId, token);
        const filename = `${fileId}.${image.extension}`;
        await writeFile(join(imageDir, filename), image.body);
        return { ...project, image: `/project-images/${filename}` };
      } catch (error) {
        console.warn(`Skipping image for project ${project.id}: ${error.message}`);
        return { ...project, image: '' };
      }
    }),
  );
}

async function writeProjectsSnapshot(projects, source) {
  const payload = {
    success: true,
    source,
    builtAt: new Date().toISOString(),
    projects,
  };
  const filePath = projectsSnapshotPath();
  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(payload, null, 2)}\n`);
  return payload;
}

export async function syncProjects() {
  if (useLocalProjects()) {
    const projects = loadLocalProjects();
    return writeProjectsSnapshot(projects, 'local');
  }

  if (!hasGoogleCredentials()) {
    console.warn(
      'Google Apps Script credentials are missing; writing localProjects.json so the build can continue.',
    );
    return writeProjectsSnapshot(loadLocalProjects(), 'local');
  }

  const { projects } = await fetchProjectsFromSource();
  const withImages = await materializeProjectImages(projects);
  return writeProjectsSnapshot(withImages, 'apps-script');
}
