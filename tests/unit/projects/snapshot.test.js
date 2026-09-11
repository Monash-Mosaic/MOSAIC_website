import { afterEach, describe, expect, it } from 'vitest';
import builtProjectsPayload from '@/modules/projects/generated/projects.json';
import localProjectsPayload from '@/modules/projects/localProjects.json';
import { normalizeProject } from '@/modules/projects/normalize';
import { loadPageProjects } from '@/modules/projects/snapshot';

const ORIGINAL_ENV = { ...process.env };

const PROJECT_SHAPE = {
  id: expect.any(String),
  title: expect.any(String),
  subtitle: expect.any(String),
  previewTitle: expect.any(String),
  description: expect.any(String),
  image: expect.any(String),
  imageAlign: expect.stringMatching(/^(left|right)$/),
  delay: expect.any(Number),
  bgColor: expect.any(String),
  textColor: expect.any(String),
  buttonColor: expect.any(String),
  buttonTextColor: expect.any(String),
};

function expectProjectShape(project) {
  expect(project).toEqual(expect.objectContaining(PROJECT_SHAPE));
  expect(project.link === null || typeof project.link === 'string').toBe(true);
}

describe('loadPageProjects', () => {
  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
  });

  it('returns the built snapshot in production', () => {
    process.env.APP_ENV = 'production';
    const projects = loadPageProjects();

    expect(projects.length).toBeGreaterThan(0);
    expect(projects).toEqual(builtProjectsPayload.projects);
    projects.forEach(expectProjectShape);
  });

  it('normalizes localProjects.json when APP_ENV=local', () => {
    process.env.APP_ENV = 'local';
    const projects = loadPageProjects();

    expect(projects).toEqual(localProjectsPayload.projects.map(normalizeProject));
    projects.forEach(expectProjectShape);
  });
});
