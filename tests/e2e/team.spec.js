import { expect, test } from '@playwright/test';

test.describe('team', () => {
  test('is reachable from the navbar', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Our team' }).first().click();

    await expect(page).toHaveURL(/\/team$/);
    await expect(page.getByRole('heading', { name: 'Meet our team', level: 1 })).toBeVisible();
  });

  test('shows the advisor and student team sections', async ({ page }) => {
    await page.goto('/team');

    await expect(page.getByRole('heading', { name: 'Academic Advisors' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Student Team' })).toBeVisible();
    await expect(page.getByText('Meet the people behind MOSAIC')).toBeVisible();
    await expect(page.getByText('more introductions soon to come :)')).toBeVisible();
    await expect(page.getByText('Kla Tantithamthavorn')).toBeVisible();
  });
});
