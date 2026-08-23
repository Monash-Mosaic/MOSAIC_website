import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/modules/projects/googleAuth', () => ({
  fetchWithGoogleAccessToken: vi.fn(),
  getGoogleAccessToken: vi.fn(),
}));

import { GET } from '@/app/api/projects/images/[fileId]/route';
import { fetchWithGoogleAccessToken, getGoogleAccessToken } from '@/modules/projects/googleAuth';

describe('GET /api/projects/images/[fileId]', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('rejects invalid Drive ids', async () => {
    const response = await GET(new Request('http://localhost/api/projects/images/bad'), {
      params: Promise.resolve({ fileId: 'bad' }),
    });

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({ error: 'Invalid image id' });
  });

  it('streams a Drive thumbnail', async () => {
    getGoogleAccessToken.mockResolvedValue('token');
    fetchWithGoogleAccessToken.mockResolvedValue({
      ok: true,
      headers: new Headers({ 'content-type': 'image/jpeg' }),
      arrayBuffer: async () => new Uint8Array([1, 2, 3]).buffer,
    });

    const response = await GET(new Request('http://localhost/api/projects/images/abcdefghij1234567890'), {
      params: Promise.resolve({ fileId: 'abcdefghij1234567890' }),
    });

    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toBe('image/jpeg');
    const body = Buffer.from(await response.arrayBuffer());
    expect(body.equals(Buffer.from([1, 2, 3]))).toBe(true);
  });

  it('returns 502 when Drive does not return an image', async () => {
    getGoogleAccessToken.mockResolvedValue('token');
    fetchWithGoogleAccessToken.mockResolvedValue({
      ok: true,
      headers: new Headers({ 'content-type': 'text/html' }),
      arrayBuffer: async () => new ArrayBuffer(0),
    });
    vi.spyOn(console, 'error').mockImplementation(() => {});

    const response = await GET(new Request('http://localhost/api/projects/images/zzzzzzzzzz1234567890'), {
      params: Promise.resolve({ fileId: 'zzzzzzzzzz1234567890' }),
    });

    expect(response.status).toBe(502);
  });
});
