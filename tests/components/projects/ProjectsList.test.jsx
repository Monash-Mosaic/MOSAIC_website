import { describe, expect, it, vi } from 'vitest';
import ProjectsList from '@/modules/projects/components/ProjectsList';
import { normalizedProjects } from '@tests/fixtures/projects.js';
import { render, screen } from '@tests/setup/test-utils.jsx';

vi.mock('@/modules/projects/useProjects', () => ({
  default: vi.fn(),
}));

import useProjects from '@/modules/projects/useProjects';

describe('ProjectsList', () => {
  it('shows loading placeholders', () => {
    useProjects.mockReturnValue({ projects: [], loading: true, error: null });
    const { container } = render(<ProjectsList />);
    expect(container.querySelectorAll('.animate-pulse')).toHaveLength(2);
  });

  it('shows an empty message when loading fails or there are no projects', () => {
    useProjects.mockReturnValue({ projects: [], loading: false, error: new Error('fail') });
    const { rerender } = render(<ProjectsList />);
    expect(screen.getByText('Projects will appear here soon.')).toBeInTheDocument();

    useProjects.mockReturnValue({ projects: [], loading: false, error: null });
    rerender(<ProjectsList />);
    expect(screen.getByText('Projects will appear here soon.')).toBeInTheDocument();
  });

  it('renders a card per project', () => {
    useProjects.mockReturnValue({ projects: normalizedProjects, loading: false, error: null });
    render(<ProjectsList />);
    expect(screen.getByRole('heading', { name: /Project 1: Community Hub/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Project 2: Scalable Tools/ })).toBeInTheDocument();
  });
});
