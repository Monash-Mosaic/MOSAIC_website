import { expect, test } from '@playwright/test';

test.describe('contact', () => {
  test('shows the contact email and makerspace address', async ({ page }) => {
    await page.goto('/contact');
    await expect(page.getByRole('heading', { name: /shoot us an email/i })).toBeVisible();
    await expect(page.getByRole('link', { name: 'mosaic@monash.edu' })).toHaveAttribute(
      'href',
      'mailto:mosaic@monash.edu'
    );
    await expect(page.getByRole('img', { name: /makerspace address/i })).toBeVisible();
  });

  test('copies the email address to the clipboard', async ({ page, context, browserName }) => {
    test.skip(browserName !== 'chromium', 'Clipboard permissions are only grantable in Chromium');
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);

    await page.goto('/contact');
    await page.getByRole('button', { name: 'copy email' }).click();

    await expect(page.getByRole('button', { name: 'copied!' })).toBeVisible();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('mosaic@monash.edu');
  });
});
