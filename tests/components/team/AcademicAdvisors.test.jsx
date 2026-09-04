import { describe, expect, it } from 'vitest';
import AcademicAdvisors from '@/modules/team/components/AcademicAdvisors';
import { academicAdvisors } from '@/modules/team/data';
import { render, screen } from '@tests/setup/test-utils.jsx';

describe('AcademicAdvisors', () => {
  it('lists every advisor under the section heading', () => {
    render(<AcademicAdvisors />);
    expect(screen.getByRole('heading', { name: 'Academic Advisors' })).toBeInTheDocument();
    academicAdvisors.forEach((advisor) => {
      expect(screen.getByText(advisor.name)).toBeInTheDocument();
    });
  });
});
