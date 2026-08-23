import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { POST } from '@/modules/contact/api';
import { contactFormValues } from '@tests/fixtures/contact.js';

const ORIGINAL_ENV = { ...process.env };

describe('POST /api/proxy-contact', () => {
  beforeEach(() => {
    process.env = { ...ORIGINAL_ENV, NEXT_PUBLIC_S3_BASE_URL: 'https://s3.example.com/forms' };
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
    vi.unstubAllGlobals();
  });

  it('forwards the JSON body to the contact endpoint', async () => {
    fetch.mockResolvedValue({
      json: async () => ({ ok: true }),
    });

    const response = await POST(
      new Request('http://localhost/api/proxy-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactFormValues),
      }),
    );

    expect(fetch).toHaveBeenCalledWith(
      'https://s3.example.com/forms/contact_us_form',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(contactFormValues),
      }),
    );
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ ok: true });
  });

  it('returns 500 when the upstream request fails', async () => {
    fetch.mockRejectedValue(new Error('timeout'));

    const response = await POST(
      new Request('http://localhost/api/proxy-contact', {
        method: 'POST',
        body: JSON.stringify(contactFormValues),
      }),
    );

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({ error: 'Failed to submit form' });
  });
});
