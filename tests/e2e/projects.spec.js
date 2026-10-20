import { expect, test } from '@playwright/test';

test.describe('projects', () => {
  test('loads the projects page shell', async ({ page }) => {
    await page.goto('/projects');

    await expect(page.getByRole('banner').getByRole('link', { name: 'MOSAIC logo' })).toBeVisible();
    await expect(
      page.getByRole('heading', { name: /Project 1:/ }).or(page.getByText('Projects will appear here soon.')),
    ).toBeVisible();
  });
});
