import { expect, test } from '@playwright/test';

test.describe('home', () => {
  test('shows the hero, vision, and navigation', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/MOSAIC/);
    await expect(
      page.getByRole('heading', { name: /Building Production-Ready Software/ })
    ).toBeVisible();
    await expect(page.getByRole('link', { name: 'Get in touch' })).toHaveAttribute(
      'href',
      '/contact'
    );

    await page.mouse.wheel(0, 800);
    await expect(page.getByRole('heading', { name: 'Partnerships' })).toBeVisible();

    await page.waitForTimeout(1100);
    await page.mouse.wheel(0, 800);
    await expect(page.getByRole('heading', { name: 'Projects' })).toBeVisible();

    await page.waitForTimeout(1100);
    await page.mouse.wheel(0, 800);
    await expect(page.getByRole('heading', { name: 'Who we are' })).toBeVisible();

    await page.getByRole('link', { name: 'About' }).first().click();
    await expect(page.getByRole('contentinfo')).toBeVisible();
    await page.getByRole('link', { name: 'MOSAIC logo' }).first().click();
    await expect(
      page.getByRole('heading', { name: /Building Production-Ready Software/ })
    ).toBeVisible();
  });

  test('shows readable ink-colored items in the mobile menu', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    await page.getByRole('button', { name: 'Open menu' }).click();

    const mobileMenu = page
      .getByRole('navigation')
      .filter({ has: page.getByRole('link', { name: 'About' }) })
      .filter({ visible: true });
    await expect(mobileMenu.getByRole('link', { name: 'About' })).toBeVisible();
    await expect(mobileMenu.getByRole('link', { name: 'About' })).toHaveCSS(
      'color',
      'rgb(28, 28, 28)'
    );
    await expect(mobileMenu.getByRole('link', { name: 'Projects' })).toBeVisible();
    await expect(mobileMenu.getByRole('link', { name: 'Partners' })).toBeVisible();
    await expect(mobileMenu.getByRole('link', { name: 'Contact Us' })).toBeVisible();
  });
});
