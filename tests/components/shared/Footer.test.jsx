import { describe, expect, it } from 'vitest';
import Footer from '@/components/Footer';
import { render, screen } from '@tests/setup/test-utils.jsx';

describe('Footer', () => {
  it('links to the main pages', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: 'MOSAIC logo' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Partners' })).toHaveAttribute('href', '/#partners');
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '/projects');
    expect(screen.getByRole('link', { name: 'Contact Us' })).toHaveAttribute('href', '/contact');
  });

  it('opens Instagram and LinkedIn in a new tab', () => {
    render(<Footer />);
    const instagram = screen.getByRole('link', { name: 'MOSAIC on Instagram' });
    const linkedin = screen.getByRole('link', { name: 'MOSAIC on LinkedIn' });
    expect(instagram).toHaveAttribute('href', 'https://www.instagram.com/mosaic.monash/');
    expect(linkedin).toHaveAttribute(
      'href',
      'https://www.linkedin.com/company/mosaic-monash-student-team/posts/?feedView=all',
    );
    expect(instagram).toHaveAttribute('target', '_blank');
    expect(linkedin).toHaveAttribute('target', '_blank');
  });

  it('shows the current year', () => {
    render(<Footer />);
    expect(screen.getByText(`©${new Date().getFullYear()}`)).toBeInTheDocument();
  });
});
