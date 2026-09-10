/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
};

const PROJECTS_SYNC = Symbol.for('mosaic.projectsSync');

export default async function configure(phase) {
  if (phase === 'phase-production-build') {
    if (!globalThis[PROJECTS_SYNC]) {
      globalThis[PROJECTS_SYNC] = import('./src/modules/projects/sync.js').then(async ({ syncProjects }) => {
        const snapshot = await syncProjects();
        console.log(`Synced ${snapshot.projects.length} project(s) from ${snapshot.source}.`);
        return snapshot;
      });
    }
    await globalThis[PROJECTS_SYNC];
  }

  return nextConfig;
}
