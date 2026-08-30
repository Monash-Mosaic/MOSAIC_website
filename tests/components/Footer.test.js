import { render, screen } from '@testing-library/react';
import Footer from '@/components/Footer';

describe('Footer', () => {
  it('links the logo back to the home page', () => {
    const { container } = render(<Footer />);

    const logo = container.querySelector('img[src="/monashxMosaic.png"]');
    expect(logo).toBeInTheDocument();
    expect(logo.closest('a')).toHaveAttribute('href', '/');
  });

  it('renders the contact and social links', () => {
    render(<Footer />);

    const hrefs = screen.getAllByRole('link').map((link) => link.getAttribute('href'));
    expect(hrefs).toEqual(
      expect.arrayContaining([
        '/',
        'mailto:mosaic@monash.edu',
        'https://www.instagram.com/mosaic.monash/',
        'https://www.linkedin.com/company/mosaic-monash-student-team/posts/?feedView=all',
      ])
    );
  });
});
