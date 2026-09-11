const DRIVE_ID_PATTERN = /^[\w-]{10,}$/;
const BUILT_IMAGE_PATTERN = /^\/project-images\/([\w-]{10,})(?:\.[A-Za-z0-9]+)?$/;

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

export function extractBuiltProjectFileId(imagePath) {
  const builtMatch = imagePath?.match(BUILT_IMAGE_PATTERN);
  if (builtMatch) return builtMatch[1];
  return extractDriveFileId(imagePath);
}

export function toBuiltProjectImage(imageUrl, extension = 'jpg') {
  const fileId = extractDriveFileId(imageUrl);
  if (!fileId) return imageUrl || '';
  const ext = extension.startsWith('.') ? extension.slice(1) : extension;
  return `/project-images/${fileId}.${ext}`;
}

export function isValidDriveFileId(fileId) {
  return DRIVE_ID_PATTERN.test(fileId || '');
}

export function extensionForContentType(contentType) {
  const mime = (contentType || '').split(';')[0].trim().toLowerCase();
  if (mime === 'image/png') return 'png';
  if (mime === 'image/webp') return 'webp';
  if (mime === 'image/gif') return 'gif';
  if (mime === 'image/svg+xml') return 'svg';
  return 'jpg';
}
