import { describe, expect, it } from 'vitest';
import {
  heroStats,
  partners,
  projectLayout,
  projects,
  projectsIntro,
  topics,
} from '@/modules/home/data';

describe('home page data', () => {
  it('publishes the hero counters shown on the landing page', () => {
    expect(heroStats).toEqual([
      { value: 5, label: 'Projects' },
      { value: 3, label: 'Partners' },
      { value: 48, label: 'Members' },
    ]);
  });

  it('lists the partnership cards with logos and descriptions', () => {
    expect(partners.map((partner) => partner.id)).toEqual(['ifrc', 'monash-actionlab', 'mccsa']);
    for (const partner of partners) {
      expect(partner.description).toBeTruthy();
      expect(partner.logos.length).toBeGreaterThan(0);
      for (const logo of partner.logos) {
        expect(logo.name).toBeTruthy();
        expect(logo.src).toMatch(/^\//);
      }
    }
    expect(partners[1].logos.map((logo) => logo.name)).toEqual(['Monash University', 'ActionLab']);
  });

  it('places every featured project on the home grid', () => {
    expect(projectsIntro).toEqual({
      title: 'Projects',
      subtitle: 'Technology for social good. Real projects. Real impact.',
    });
    expect(projectLayout).toHaveLength(5);
    for (const slot of projectLayout) {
      const project = projects[slot.id];
      expect(project.title).toBeTruthy();
      expect(project.href).toBe('/projects');
      expect(project.lines.length).toBeGreaterThan(0);
      expect(['dark', 'light']).toContain(project.theme);
      expect(slot.cell).toMatch(/md:col-start-/);
      expect(slot.riseFrom).toBeGreaterThan(0);
    }
    expect(projects.worldDisastersReport.lines.some((line) => line.highlight)).toBe(true);
    expect(projects.demystifyingLlms.lines.some((line) => line.emphasis)).toBe(true);
  });

  it('defines the who-we-are topics in menu order', () => {
    expect(topics.map((topic) => topic.id)).toEqual([
      'team-overview',
      'capabilities',
      'talent-pipeline',
      'sponsor-advantage',
      'track-record',
    ]);
    for (const topic of topics) {
      expect(topic.label).toBeTruthy();
      expect(topic.heading).toBeTruthy();
      expect(topic.description).toBeTruthy();
    }
  });
});
