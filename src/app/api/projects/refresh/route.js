import { NextResponse } from 'next/server';
import { refreshProjectsCache } from '@/modules/projects/api';

export const dynamic = 'force-dynamic';

function isAuthorized(request) {
  const secret = process.env.CACHE_REFRESH_SECRET;
  if (!secret) return false;

  const header = request.headers.get('authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  return token === secret;
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
