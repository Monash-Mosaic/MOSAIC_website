import { describe, expect, it } from 'vitest';
import TeamImage from '@/modules/team/components/TeamImage';
import { render, screen } from '@tests/setup/test-utils.jsx';

describe('TeamImage', () => {
  it('renders the photo once a source is provided', () => {
    render(<TeamImage src="/team/grace.jpg" alt="Jue (Grace) Xie" />);
    // next/image rewrites `src` to the optimizer route, so assert on the source it points at.
    expect(screen.getByRole('img', { name: 'Jue (Grace) Xie' })).toHaveAttribute(
      'src',
      expect.stringContaining(encodeURIComponent('/team/grace.jpg')),
    );
  });

  it('falls back to a labelled placeholder while the photo is missing', () => {
    render(<TeamImage src={null} alt="Trang Vu" />);
    expect(screen.getByRole('img', { name: 'Trang Vu — photo coming soon' })).toBeInTheDocument();
    expect(screen.queryByRole('img', { name: 'Trang Vu' })).not.toBeInTheDocument();
  });
});
