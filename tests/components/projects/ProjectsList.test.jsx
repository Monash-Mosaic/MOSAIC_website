import { describe, expect, it } from 'vitest';
import ProjectsList from '@/modules/projects/components/ProjectsList';
import { normalizedProjects } from '@tests/fixtures/projects.js';
import { render, screen } from '@tests/setup/test-utils.jsx';

describe('ProjectsList', () => {
  it('shows an empty message when there are no projects', () => {
    render(<ProjectsList projects={[]} />);
    expect(screen.getByText('Projects will appear here soon.')).toBeInTheDocument();
  });

  it('renders a card per project', () => {
    render(<ProjectsList projects={normalizedProjects} />);
    expect(screen.getByRole('heading', { name: /Project 1: Community Hub/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Project 2: Scalable Tools/ })).toBeInTheDocument();
  });
});
