import { describe, expect, it, vi } from 'vitest';
import RecentProjects from '@/modules/home/components/RecentProjects';
import { normalizedProjects } from '@tests/fixtures/projects.js';
import { render, screen } from '@tests/setup/test-utils.jsx';

vi.mock('@/modules/projects/useProjects', () => ({
  default: vi.fn(),
}));

import useProjects from '@/modules/projects/useProjects';

describe('RecentProjects', () => {
  it('shows a loading skeleton', () => {
    useProjects.mockReturnValue({ projects: [], loading: true, error: null });
    const { container } = render(<RecentProjects />);
    expect(screen.getByRole('heading', { name: 'Recent projects' })).toBeInTheDocument();
    expect(container.querySelector('.animate-pulse')).toBeTruthy();
  });

  it('shows an empty state when there are no projects', () => {
    useProjects.mockReturnValue({ projects: [], loading: false, error: null });
    render(<RecentProjects />);
    expect(screen.getByText('Projects will appear here soon.')).toBeInTheDocument();
  });

  it('renders project titles and carousel controls', () => {
    useProjects.mockReturnValue({ projects: normalizedProjects, loading: false, error: null });
    render(<RecentProjects />);
    expect(screen.getByRole('heading', { name: 'Community Hub: Connect clubs' })).toBeInTheDocument();
    expect(screen.getByText('Scalable Tools')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next projects' })).toBeInTheDocument();
  });
});
