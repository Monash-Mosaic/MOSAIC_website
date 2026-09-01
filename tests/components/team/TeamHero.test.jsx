import { describe, expect, it } from 'vitest';
import TeamHero from '@/modules/team/components/TeamHero';
import { render, screen } from '@tests/setup/test-utils.jsx';

describe('TeamHero', () => {
  it('shows the page title', () => {
    render(<TeamHero />);
    expect(screen.getByRole('heading', { name: 'Meet our team', level: 1 })).toBeInTheDocument();
  });
});
