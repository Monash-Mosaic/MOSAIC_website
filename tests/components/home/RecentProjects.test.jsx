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

    const visitLinks = screen.getAllByRole('link', { name: 'Visit Project' });
    expect(visitLinks).toHaveLength(projectLayout.length);
    for (const link of visitLinks) {
      expect(link).toHaveAttribute('href', '/projects');
    }

    expect(screen.getByRole('link', { name: /scroll to about/i })).toHaveAttribute('href', '#about');
    expect(document.querySelector('img')).toHaveAttribute('src', '/ifrc.png');
    expect(screen.getByText('6 languages, 20k launch day visits')).toHaveClass('text-lime');
    expect(screen.getByText('Internal AI Engineering Project')).toHaveClass('font-bold');
  });
});
