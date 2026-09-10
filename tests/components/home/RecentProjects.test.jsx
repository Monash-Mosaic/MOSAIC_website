import { describe, expect, it } from 'vitest';
import RecentProjects from '@/modules/home/components/RecentProjects';
import { normalizedProjects } from '@tests/fixtures/projects.js';
import { render, screen } from '@tests/setup/test-utils.jsx';

describe('RecentProjects', () => {
  it('shows an empty state when there are no projects', () => {
    render(<RecentProjects projects={[]} />);
    expect(screen.getByRole('heading', { name: 'Recent Projects' })).toBeInTheDocument();
    expect(screen.getByText('Projects will appear here soon.')).toBeInTheDocument();
  });

  it('renders project titles and carousel controls', () => {
    render(<RecentProjects projects={normalizedProjects} />);
    expect(screen.getByRole('heading', { name: 'Community Hub: Connect clubs' })).toBeInTheDocument();
    expect(screen.getByText('Scalable Tools')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next projects' })).toBeInTheDocument();
  });
});
