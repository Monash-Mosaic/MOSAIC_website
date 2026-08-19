import { NextResponse } from 'next/server';
import { isValidDriveFileId } from '@/modules/projects/drive';
import { fetchWithGoogleAccessToken, getGoogleAccessToken } from '@/modules/projects/googleAuth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const IMAGE_CACHE_SECONDS = 60 * 60 * 24;
const imageCache = new Map();

function cacheHeaders(contentType) {
  return {
    'Content-Type': contentType,
    'Cache-Control': `public, max-age=${IMAGE_CACHE_SECONDS}, s-maxage=${IMAGE_CACHE_SECONDS}`,
  };
}

async function loadDriveThumbnail(fileId) {
  const cached = imageCache.get(fileId);
  if (cached && Date.now() - cached.cachedAt < IMAGE_CACHE_SECONDS * 1000) {
    return cached;
  }

  const accessToken = await getGoogleAccessToken();
  const response = await fetchWithGoogleAccessToken(
    `https://drive.google.com/thumbnail?id=${encodeURIComponent(fileId)}&sz=w1600`,
    accessToken,
  );

  if (!response.ok) {
    throw new Error(`Drive thumbnail failed with HTTP ${response.status}`);
  }

  const contentType = response.headers.get('content-type') || 'image/jpeg';
  if (!contentType.startsWith('image/')) {
    throw new Error('Drive thumbnail did not return an image');
  }

  const body = Buffer.from(await response.arrayBuffer());
  const payload = { body, contentType, cachedAt: Date.now() };
  imageCache.set(fileId, payload);
  return payload;
}

export async function GET(_request, { params }) {
  const { fileId } = await params;
  if (!isValidDriveFileId(fileId)) {
    return NextResponse.json({ error: 'Invalid image id' }, { status: 400 });
  }

  try {
    const image = await loadDriveThumbnail(fileId);
    return new NextResponse(new Uint8Array(image.body), { headers: cacheHeaders(image.contentType) });
  } catch (error) {
    console.error('Failed to load project image', error);
    return NextResponse.json({ error: 'Failed to load image' }, { status: 502 });
  }
}
