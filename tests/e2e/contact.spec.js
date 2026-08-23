import { expect, test } from '@playwright/test';

test.describe('contact', () => {
  test('submits the contact form through the proxy', async ({ page }) => {
    await page.route('**/api/proxy-contact', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ ok: true }),
      });
    });

    await page.goto('/contact');
    await expect(page.getByRole('heading', { name: /love to hear from you/i })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Submit' })).toBeEnabled();

    await page.getByPlaceholder('Type your name here').fill('Ada Lovelace');
    await page.getByPlaceholder('abc@gmail.com').fill('ada@example.com');
    await page.getByPlaceholder('Type your message here').fill('Hello MOSAIC');
    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(page.getByText('Thank you! Your message has been sent.')).toBeVisible();
  });
});
