import { describe, expect, it } from 'vitest';
import Hero from '@/modules/home/components/Hero';
import { render, screen } from '@tests/setup/test-utils.jsx';

describe('Hero', () => {
  it('shows the headline and a link to get in touch', () => {
    render(<Hero />);
    expect(
      screen.getByRole('heading', { name: 'Building Production-Ready Software & AI Solutions For Social Good' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Get in touch' })).toHaveAttribute('href', '/contact');
  });

  it('shows the team stats', () => {
    render(<Hero />);
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Partners')).toBeInTheDocument();
    expect(screen.getByText('Members')).toBeInTheDocument();
  });
});
