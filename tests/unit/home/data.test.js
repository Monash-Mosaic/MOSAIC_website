import { describe, expect, it } from 'vitest';
import { visionItems } from '@/modules/home/data';

describe('home vision data', () => {
  it('defines three vision pillars with media', () => {
    expect(visionItems).toHaveLength(3);
    for (const item of visionItems) {
      expect(item.title).toBeTruthy();
      expect(item.description).toBeTruthy();
      expect(item.image).toMatch(/^\//);
      expect(item.alt).toBeTruthy();
    }
  });
});
