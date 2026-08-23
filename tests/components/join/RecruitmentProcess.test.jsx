import { describe, expect, it } from 'vitest';
import RecruitmentProcess from '@/modules/join/components/RecruitmentProcess';
import { render, screen } from '@tests/setup/test-utils.jsx';

describe('RecruitmentProcess', () => {
  it('renders the three recruitment steps', () => {
    render(<RecruitmentProcess />);
    expect(screen.getByRole('heading', { name: 'Our Recruitment Process' })).toBeInTheDocument();
    expect(screen.getByText('Apply Online')).toBeInTheDocument();
    expect(screen.getByText('Interview')).toBeInTheDocument();
    expect(screen.getByText('Trial Period')).toBeInTheDocument();
  });
});
