import { expect, test } from '@playwright/test';

test.describe('join', () => {
  test('lists project and committee roles', async ({ page }) => {
    await page.goto('/join');

    await expect(page.getByRole('heading', { name: 'Why should you join us?' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Project Roles' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Committee Roles' })).toBeVisible();

    await page.getByText('AI Engineer').click();
    await expect(page.getByRole('link', { name: 'Apply now' })).toBeVisible();
  });
});
