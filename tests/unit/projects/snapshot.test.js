import { afterEach, describe, expect, it } from 'vitest';
import { loadPageProjects } from '@/modules/projects/snapshot';

const ORIGINAL_ENV = { ...process.env };

describe('loadPageProjects', () => {
  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
  });

  it('returns the built snapshot in production', () => {
    process.env.APP_ENV = 'production';
    const projects = loadPageProjects();
    expect(projects.length).toBeGreaterThan(0);
    expect(projects[0]).toMatchObject({
      id: 'local-community-hub',
      title: 'Community Hub',
      image: '/CommunityDrivenProjects.svg',
    });
  });

  it('normalizes localProjects.json when APP_ENV=local', () => {
    process.env.APP_ENV = 'local';
    const projects = loadPageProjects();
    expect(projects[0].previewTitle).toBe('Community Hub: Connect students across clubs');
    expect(projects[1].link).toBeNull();
  });
});
