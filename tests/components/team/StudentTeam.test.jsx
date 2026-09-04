import { describe, expect, it } from 'vitest';
import StudentTeam from '@/modules/team/components/StudentTeam';
import { studentTeam } from '@/modules/team/data';
import { render, screen } from '@tests/setup/test-utils.jsx';

describe('StudentTeam', () => {
  it('introduces the student team with a caption per group', () => {
    render(<StudentTeam />);
    expect(screen.getByRole('heading', { name: 'Student Team' })).toBeInTheDocument();
    expect(screen.getByText('Meet the people behind MOSAIC')).toBeInTheDocument();
    studentTeam.forEach((group) => {
      expect(screen.getByText(group.caption)).toBeInTheDocument();
    });
    expect(screen.getByText('more introductions soon to come :)')).toBeInTheDocument();
  });
});
