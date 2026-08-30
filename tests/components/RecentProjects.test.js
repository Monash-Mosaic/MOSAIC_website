import { render, screen } from '@testing-library/react';
import RecentProjects from '@/components/RecentProjects';

describe('RecentProjects', () => {
  it('renders the section heading', () => {
    render(<RecentProjects />);

    expect(screen.getByRole('heading', { name: 'Recent projects', level: 2 })).toBeInTheDocument();
  });

  it('renders a card for each project', () => {
    const { container } = render(<RecentProjects />);

    expect(screen.getByRole('heading', { name: /International Federation of Red Cross/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Tackling Secondary Homelessnes/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Supporting aged care workers/ })).toBeInTheDocument();

    const images = container.querySelectorAll('img');
    expect(Array.from(images).map((image) => image.getAttribute('src'))).toEqual([
      '/mos+ifrc.png',
      '/nestled.jpg',
      '/agedCare.jpg',
    ]);
  });
});
