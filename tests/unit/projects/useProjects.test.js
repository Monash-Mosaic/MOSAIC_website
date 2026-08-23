import { renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import useProjects from '@/modules/projects/useProjects';
import { normalizedProjects } from '@tests/fixtures/projects.js';

describe('useProjects', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('loads projects from /api/projects', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, projects: normalizedProjects }),
    });

    const { result } = renderHook(() => useProjects());
    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.projects).toEqual(normalizedProjects);
    expect(result.current.error).toBeNull();
    expect(fetch).toHaveBeenCalledWith('/api/projects', expect.objectContaining({ signal: expect.any(AbortSignal) }));
  });

  it('surfaces API failures', async () => {
    fetch.mockResolvedValue({
      ok: false,
      json: async () => ({ success: false, error: 'Apps Script down' }),
    });

    const { result } = renderHook(() => useProjects());
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.projects).toEqual([]);
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error.message).toBe('Apps Script down');
  });
});
