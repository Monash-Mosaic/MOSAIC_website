import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navbar from '@/components/Navbar';

const mockPathname = jest.fn();

jest.mock('next/navigation', () => ({
  usePathname: () => mockPathname(),
}));

describe('Navbar', () => {
  beforeEach(() => {
    mockPathname.mockReturnValue('/');
  });

  it('renders the primary navigation links', () => {
    render(<Navbar />);

    const hrefs = screen.getAllByRole('link').map((link) => link.getAttribute('href'));
    expect(hrefs).toEqual(expect.arrayContaining(['/', '#team', '/projects', '/contact', '/join']));
  });

  it('uses the blue logo on pages other than home', () => {
    mockPathname.mockReturnValue('/projects');
    render(<Navbar />);

    expect(screen.getByAltText('MOSAIC logo')).toHaveAttribute(
      'src',
      '/Primary_Blue_Transparent.png'
    );
  });

  it('keeps the light logo on a dark background', () => {
    mockPathname.mockReturnValue('/projects');
    render(<Navbar color="dark" />);

    expect(screen.getByAltText('MOSAIC logo')).toHaveAttribute('src', '/Primary_logo.png');
  });

  it('toggles the mobile menu', async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    expect(screen.getAllByRole('link', { name: 'Projects' })).toHaveLength(1);

    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    expect(screen.getAllByRole('link', { name: 'Projects' })).toHaveLength(2);

    await user.click(screen.getByRole('button', { name: 'Close menu' }));
    expect(screen.getAllByRole('link', { name: 'Projects' })).toHaveLength(1);
  });

  it('hides the header when scrolling down and reveals it when scrolling up', () => {
    const { container } = render(<Navbar />);
    const header = container.querySelector('header');

    act(() => {
      window.scrollY = 200;
      window.dispatchEvent(new Event('scroll'));
    });
    expect(header).toHaveClass('-translate-y-full');

    act(() => {
      window.scrollY = 100;
      window.dispatchEvent(new Event('scroll'));
    });
    expect(header).toHaveClass('translate-y-0');
  });
});
