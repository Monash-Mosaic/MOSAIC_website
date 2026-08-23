import { beforeEach, describe, expect, it } from 'vitest';
import Navbar from '@/components/Navbar';
import { mockUsePathname } from '@tests/setup/next-mocks.js';
import { render, screen } from '@tests/setup/test-utils.jsx';

describe('Navbar', () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue('/');
  });

  it('links to the main site sections', () => {
    render(<Navbar />);
    expect(screen.getByRole('link', { name: 'MOSAIC logo' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '/projects');
    expect(screen.getByRole('link', { name: 'Contact us' })).toHaveAttribute('href', '/contact');
    expect(screen.getAllByRole('link', { name: 'Join us' })[0]).toHaveAttribute('href', '/join');
  });

  it('opens the mobile menu', async () => {
    const { user } = render(<Navbar color="light" />);
    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    expect(screen.getByRole('button', { name: 'Close menu' })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: 'Projects' })).toHaveLength(2);
  });
});
