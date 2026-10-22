import { expect, test } from '@playwright/test';

test.describe('contact', () => {
  test('shows the contact email and makerspace address', async ({ page }) => {
    await page.goto('/contact');
    await expect(page.getByRole('heading', { name: /shoot us an email/i })).toBeVisible();
    await expect(page.getByRole('link', { name: 'mosaic@monash.edu' })).toHaveAttribute(
      'href',
      'mailto:mosaic@monash.edu'
    );
    await expect(page.getByRole('heading', { name: 'Makerspace Address' })).toBeVisible();
    await expect(page.getByText(/G03, 20 Exhibition Walk \(Building 94\)/)).toBeVisible();
  });

  test('keeps the email inside the viewport with right-side margin', async ({ page }) => {
    await page.goto('/contact');

    for (const width of [390, 1024, 1100, 1280, 1440]) {
      await page.setViewportSize({ width, height: 800 });

      const email = page.getByRole('link', { name: 'mosaic@monash.edu' });
      await expect(email).toBeVisible();

      const box = await email.boundingBox();
      expect(box, `email should render at ${width}px`).toBeTruthy();
      expect(box.x + box.width, `email overflows the viewport at ${width}px`).toBeLessThanOrEqual(
        width
      );
      expect(
        width - (box.x + box.width),
        `right margin is too small at ${width}px`
      ).toBeGreaterThanOrEqual(16);

      const clipped = await email.evaluate((el) => el.scrollWidth - el.clientWidth);
      expect(clipped, `email text is clipped at ${width}px`).toBeLessThanOrEqual(1);
    }
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
