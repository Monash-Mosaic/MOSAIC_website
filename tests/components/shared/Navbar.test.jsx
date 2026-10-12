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
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/#about');
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '/#projects');
    expect(screen.getByRole('link', { name: 'Partners' })).toHaveAttribute('href', '/#partners');
    expect(screen.getByRole('link', { name: 'Contact Us' })).toHaveAttribute('href', '/contact');
  });

  it('opens the mobile menu and closes it from a link', async () => {
    mockUsePathname.mockReturnValue('/#about');
    const { user } = render(<Navbar />);
    expect(screen.getByRole('link', { name: 'About' })).toHaveClass('underline');

    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    expect(screen.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true');

    await user.click(screen.getAllByRole('link', { name: 'Projects' })[1]);
    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false');

    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    await user.click(screen.getAllByRole('link', { name: 'Contact Us' })[1]);
    expect(screen.getByRole('button', { name: 'Open menu' })).toBeInTheDocument();
  });
});
