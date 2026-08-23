import { describe, expect, it } from 'vitest';
import Hero from '@/modules/home/components/Hero';
import { render, screen } from '@tests/setup/test-utils.jsx';

describe('Hero', () => {
  it('shows the headline and a link to projects', () => {
    render(<Hero />);
    expect(screen.getByRole('heading', { name: 'AI for Social Impact' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Explore projects' })).toHaveAttribute('href', '/projects');
  });
});
