import { mockUsePathname } from '@tests/setup/next-mocks.js';
import { render, screen } from '@tests/setup/test-utils.jsx';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Navbar from '@/components/Navbar';

describe('Navbar', () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue('/');
  });

  it('links to the main site sections', () => {
    render(<Navbar />);
    expect(screen.getByRole('link', { name: 'MOSAIC logo' })).toHaveAttribute('href', '/#top');
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
    expect(screen.getByRole('button', { name: 'Close menu' })).toHaveAttribute(
      'aria-expanded',
      'true'
    );

    await user.click(screen.getAllByRole('link', { name: 'Projects' })[1]);
    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute(
      'aria-expanded',
      'false'
    );

    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    await user.click(screen.getByRole('link', { name: 'MOSAIC logo' }));
    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute(
      'aria-expanded',
      'false'
    );

    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    await user.click(screen.getAllByRole('link', { name: 'Contact Us' })[1]);
    expect(screen.getByRole('button', { name: 'Open menu' })).toBeInTheDocument();
  });

  it('keeps mobile menu items ink-colored even when the page text is white', async () => {
    const { user } = render(
      <div className="text-white">
        <Navbar />
      </div>
    );

    expect(screen.getByRole('banner').parentElement.parentElement).toHaveClass('text-ink');

    await user.click(screen.getByRole('button', { name: 'Open menu' }));

    const mobileAbout = screen.getAllByRole('link', { name: 'About' })[1];
    expect(mobileAbout.closest('nav')).toHaveClass('text-ink');
  });

  it('still measures the header when ResizeObserver is unavailable', () => {
    const OriginalResizeObserver = globalThis.ResizeObserver;
    vi.stubGlobal('ResizeObserver', undefined);

    render(<Navbar />);
    expect(document.documentElement.style.getPropertyValue('--site-header')).toMatch(/px$/);

    if (OriginalResizeObserver) {
      vi.stubGlobal('ResizeObserver', OriginalResizeObserver);
    } else {
      vi.unstubAllGlobals();
    }
  });
});
