import { describe, expect, it } from 'vitest';
import Footer from '@/components/Footer';
import { render, screen } from '@tests/setup/test-utils.jsx';

describe('Footer', () => {
  it('exposes email, Instagram, and LinkedIn links', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: 'Monash x MOSAIC Logo' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Email MOSAIC' })).toHaveAttribute('href', 'mailto:mosaic@monash.edu');
    expect(screen.getByRole('link', { name: 'MOSAIC on Instagram' })).toHaveAttribute(
      'href',
      'https://www.instagram.com/mosaic.monash/',
    );
    expect(screen.getByRole('link', { name: 'MOSAIC on LinkedIn' })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/company/mosaic-monash-student-team/posts/?feedView=all',
    );
  });
});
