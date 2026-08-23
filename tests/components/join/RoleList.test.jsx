import { describe, expect, it } from 'vitest';
import RoleList from '@/modules/join/components/RoleList';
import { projectRoles } from '@/modules/join/data';
import { render, screen } from '@tests/setup/test-utils.jsx';

const roles = projectRoles.slice(0, 2);

describe('RoleList', () => {
  it('expands a role to show the description and apply link', async () => {
    const onToggle = vi.fn();
    const { user, rerender } = render(
      <RoleList title="Project Roles" roles={roles} expandedRole={null} onToggle={onToggle} />,
    );

    expect(screen.getByRole('heading', { name: 'Project Roles' })).toBeInTheDocument();
    expect(screen.queryByText(roles[0].description)).not.toBeInTheDocument();

    await user.click(screen.getByText(roles[0].title));
    expect(onToggle).toHaveBeenCalledWith(roles[0].id);

    rerender(<RoleList title="Project Roles" roles={roles} expandedRole={roles[0].id} onToggle={onToggle} />);
    expect(screen.getByText(roles[0].description)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Apply now' })).toHaveAttribute('href', roles[0].formPath);
  });
});
