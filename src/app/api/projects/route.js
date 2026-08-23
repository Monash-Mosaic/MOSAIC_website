import { NextResponse } from 'next/server';
import { getProjects } from '@/modules/projects/api';

export const dynamic = 'force-dynamic';

export async function GET() {
  const { projects, error, cached, cachedAt } = await getProjects();

  if (error) {
    return NextResponse.json({ success: false, error, projects: [] }, { status: 502 });
  }

  return NextResponse.json({ success: true, projects, cached: Boolean(cached), cachedAt: cachedAt || null });
}
