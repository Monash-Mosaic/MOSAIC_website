import { createHash, timingSafeEqual } from 'node:crypto';
import { NextResponse } from 'next/server';
import { refreshProjectsCache } from '@/modules/projects/api';

export const dynamic = 'force-dynamic';

// `===` on strings short-circuits at the first differing byte, so how long the
// comparison takes leaks how much of the secret a caller guessed correctly.
// Comparing SHA-256 digests instead keeps the comparison constant-time and
// fixed-length, so neither the contents nor the length of the secret leak.
function secretsMatch(token, secret) {
  const a = createHash('sha256').update(token).digest();
  const b = createHash('sha256').update(secret).digest();
  return timingSafeEqual(a, b);
}

function isAuthorized(request) {
  const secret = process.env.CACHE_REFRESH_SECRET;
  if (!secret) return false;

  const header = request.headers.get('authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  return secretsMatch(token, secret);
}

export async function POST(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { projects, error, cachedAt } = await refreshProjectsCache();
    if (error) {
      return NextResponse.json({ success: false, error, projects: [] }, { status: 502 });
    }

    return NextResponse.json({
      success: true,
      refreshed: true,
      count: projects.length,
      cachedAt,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to refresh projects cache' },
      { status: 500 },
    );
  }
}
