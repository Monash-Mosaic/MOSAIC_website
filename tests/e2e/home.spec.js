import { expect, test } from '@playwright/test';

test.describe('home', () => {
  test('shows the hero, vision, and navigation', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/MOSAIC/);
    await expect(page.getByRole('heading', { name: /Building Production-Ready Software/ })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Get in touch' })).toHaveAttribute('href', '/contact');
    await expect(page.getByRole('heading', { name: 'Partnerships' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Projects' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Who we are' })).toBeVisible();
    await page.getByRole('link', { name: 'About' }).first().click();
    await expect(page.getByRole('contentinfo')).toBeVisible();
  });
});
