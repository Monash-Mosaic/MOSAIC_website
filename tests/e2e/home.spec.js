import { expect, test } from '@playwright/test';

test.describe('home', () => {
  test('shows the hero, vision, and navigation', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/MOSAIC/);
    await expect(page.getByRole('heading', { name: 'AI for Social Impact' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Our Vision' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Explore projects' })).toHaveAttribute('href', '/projects');
  });
});
