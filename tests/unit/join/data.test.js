import { describe, expect, it } from 'vitest';
import { committeeRoles, projectRoles, recruitmentSteps } from '@/modules/join/data';

describe('join role data', () => {
  it('gives every role a unique id, title, and apply form', () => {
    const roles = [...projectRoles, ...committeeRoles];
    const ids = roles.map((role) => role.id);

    expect(new Set(ids).size).toBe(ids.length);
    for (const role of roles) {
      expect(role.title).toBeTruthy();
      expect(role.description).toBeTruthy();
      expect(role.formPath).toMatch(/^https:\/\//);
    }
  });

  it('lists recruitment as apply, interview, then trial', () => {
    expect(recruitmentSteps.map((step) => step.title)).toEqual(['Apply Online', 'Interview', 'Trial Period']);
    expect(recruitmentSteps.map((step) => step.step)).toEqual([1, 2, 3]);
  });
});
