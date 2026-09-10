import { loadEnvConfig } from '@next/env';
import { syncProjects } from '../src/modules/projects/sync.js';

loadEnvConfig(process.cwd());

const snapshot = await syncProjects();
console.log(`Synced ${snapshot.projects.length} project(s) from ${snapshot.source}.`);
