import { describe, expect, it } from 'vitest';
import ProjectCard from '@/modules/projects/components/ProjectCard';
import { normalizedProjects } from '@tests/fixtures/projects.js';
import { render, screen } from '@tests/setup/test-utils.jsx';

describe('ProjectCard', () => {
  it('renders a linked learn-more control for published projects', () => {
    render(<ProjectCard project={normalizedProjects[0]} index={0} />);

    expect(screen.getByRole('heading', { name: /Project 1: Community Hub/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Connect clubs' })).toBeInTheDocument();
    const link = screen.getByRole('link', { name: 'Learn more' });
    expect(link).toHaveAttribute('href', 'https://example.com/hub');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('renders a button instead of a link when the project is pending', () => {
    render(<ProjectCard project={normalizedProjects[1]} index={1} />);

    expect(screen.getByRole('heading', { name: /Project 2: Scalable Tools/ })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Learn more' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Learn more' })).toHaveAttribute('type', 'button');
  });
});
