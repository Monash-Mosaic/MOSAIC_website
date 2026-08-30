import { describe, expect, it } from 'vitest';
import VisionSection from '@/modules/home/components/VisionSection';
import { visionItems } from '@/modules/home/data';
import { render, screen } from '@tests/setup/test-utils.jsx';

describe('VisionSection', () => {
  it('renders every vision pillar', () => {
    render(<VisionSection />);
    expect(screen.getByRole('heading', { name: 'Our Vision' })).toBeInTheDocument();
    for (const item of visionItems) {
      expect(screen.getByRole('heading', { name: item.title })).toBeInTheDocument();
      expect(screen.getByAltText(item.alt)).toHaveAttribute('src', item.image);
    }
  });
});
