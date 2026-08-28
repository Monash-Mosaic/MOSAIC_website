import { expect, test } from '@playwright/test';

test.describe('team', () => {
  test('is reachable from the navbar', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Our team' }).first().click();

    await expect(page).toHaveURL(/\/team$/);
    await expect(page.getByRole('heading', { name: 'Our team', level: 1 })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Team profiles coming soon' })).toBeVisible();
  });
});
