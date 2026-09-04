import { describe, expect, it } from 'vitest';
import TeamImage from '@/modules/team/components/TeamImage';
import { render, screen } from '@tests/setup/test-utils.jsx';

describe('TeamImage', () => {
  it('renders the photo once a source is provided', () => {
    render(<TeamImage src="/team/grace.jpg" alt="Jue (Grace) Xie" />);
    expect(screen.getByRole('img', { name: 'Jue (Grace) Xie' })).toHaveAttribute('src', '/team/grace.jpg');
  });

  it('falls back to a labelled placeholder while the photo is missing', () => {
    render(<TeamImage src={null} alt="Trang Vu" />);
    expect(screen.getByRole('img', { name: 'Trang Vu — photo coming soon' })).toBeInTheDocument();
    expect(screen.queryByRole('img', { name: 'Trang Vu' })).not.toBeInTheDocument();
  });
});
