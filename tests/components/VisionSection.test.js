import { render, screen } from '@testing-library/react';
import VisionSection from '@/components/VisionSection';

describe('VisionSection', () => {
  it('renders the section heading', () => {
    render(<VisionSection />);

    expect(screen.getByRole('heading', { name: 'Our Vision', level: 2 })).toBeInTheDocument();
  });

  it('renders every vision card with an icon', () => {
    render(<VisionSection />);

    const titles = ['Scalable Solutions', 'Community Driven Projects', 'Lasting Impact'];
    for (const title of titles) {
      expect(screen.getByRole('heading', { name: title, level: 3 })).toBeInTheDocument();
    }

    expect(screen.getAllByAltText('Scalable Icon')).toHaveLength(titles.length);
  });
});
