const DRIVE_ID_PATTERN = /^[\w-]{10,}$/;

export function extractDriveFileId(imageUrl) {
  if (!imageUrl) return null;

  try {
    const parsed = new URL(imageUrl, 'https://drive.google.com');
    const fromQuery = parsed.searchParams.get('id');
    if (fromQuery && DRIVE_ID_PATTERN.test(fromQuery)) {
      return fromQuery;
    }

    const fileMatch = parsed.pathname.match(/\/(?:file\/d|d|thumbnail\/d)\/([\w-]{10,})/);
    if (fileMatch) {
      return fileMatch[1];
    }
  } catch {
    return null;
  }

  return null;
}

export function toProxiedProjectImage(imageUrl) {
  const fileId = extractDriveFileId(imageUrl);
  return fileId ? `/api/projects/images/${fileId}` : imageUrl || '';
}

export function isValidDriveFileId(fileId) {
  return DRIVE_ID_PATTERN.test(fileId || '');
}
