import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/modules/home/data', async () => {
  const actual = await vi.importActual('@/modules/home/data');
  return {
    ...actual,
    projects: {
      ...actual.projects,
      ctrlAltPrebunk: {
        ...actual.projects.ctrlAltPrebunk,
        image: '/ifrc.png',
      },
    },
  };
});

import RecentProjects from '@/modules/home/components/RecentProjects';
import { projectLayout, projects, projectsIntro } from '@/modules/home/data';
import { render, screen } from '@tests/setup/test-utils.jsx';

describe('RecentProjects', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the featured project grid and scroll cue', () => {
    render(<RecentProjects />);

    expect(screen.getByRole('heading', { name: projectsIntro.title })).toBeInTheDocument();
    expect(screen.getByText(projectsIntro.subtitle)).toBeInTheDocument();

    for (const slot of projectLayout) {
      const project = projects[slot.id];
      expect(screen.getByRole('heading', { name: project.title })).toBeInTheDocument();
      for (const line of project.lines) {
        expect(screen.getAllByText(line.text).length).toBeGreaterThan(0);
      }
    }

    const liveProjects = projectLayout.map((slot) => projects[slot.id]).filter((project) => project.href);
    const visitLinks = screen.getAllByRole('link', { name: 'Visit Project' });
    expect(visitLinks).toHaveLength(liveProjects.length);
    for (const project of liveProjects) {
      const card = screen.getByRole('heading', { name: project.title }).closest('article');
      expect(card.querySelector('a')).toHaveAttribute('href', project.href);
    }
    expect(screen.getAllByText('Coming Soon')).toHaveLength(
      projectLayout.filter((slot) => !projects[slot.id].href).length,
    );

    expect(screen.getByRole('link', { name: /scroll to about/i })).toHaveAttribute('href', '#about');
    expect(
      screen.getByRole('heading', { name: projects.ctrlAltPrebunk.title }).closest('article').querySelector('img'),
    ).toHaveAttribute('src', '/ifrc.png');
    expect(screen.getByText('6 languages, 20k launch day visits')).toHaveClass('text-lime');
    expect(screen.getByText('Internal AI Engineering Project')).toHaveClass('font-bold');
  });
});
