import { describe, expect, it } from 'vitest';
import {
  extensionForContentType,
  extractBuiltProjectFileId,
  extractDriveFileId,
  isValidDriveFileId,
  toBuiltProjectImage,
} from '@/modules/projects/drive';

describe('extractDriveFileId', () => {
  it('reads an id query parameter', () => {
    expect(extractDriveFileId('https://drive.google.com/open?id=abcdefghij1234567890')).toBe(
      'abcdefghij1234567890',
    );
  });

  it('reads file/d, d, and thumbnail/d path ids', () => {
    expect(extractDriveFileId('https://drive.google.com/file/d/abcdefghij1234567890/view')).toBe(
      'abcdefghij1234567890',
    );
    expect(extractDriveFileId('https://drive.google.com/d/abcdefghij1234567890')).toBe(
      'abcdefghij1234567890',
    );
    expect(extractDriveFileId('https://drive.google.com/thumbnail/d/abcdefghij1234567890')).toBe(
      'abcdefghij1234567890',
    );
  });

  it('returns null for missing, invalid, or non-drive values', () => {
    expect(extractDriveFileId('')).toBeNull();
    expect(extractDriveFileId(null)).toBeNull();
    expect(extractDriveFileId('https://example.com/photo.png')).toBeNull();
    expect(extractDriveFileId('https://drive.google.com/open?id=short')).toBeNull();
  });
});

describe('toBuiltProjectImage', () => {
  it('rewrites Drive URLs onto static project-image paths', () => {
    expect(toBuiltProjectImage('https://drive.google.com/file/d/abcdefghij1234567890/view')).toBe(
      '/project-images/abcdefghij1234567890.jpg',
    );
    expect(toBuiltProjectImage('https://drive.google.com/file/d/abcdefghij1234567890/view', 'png')).toBe(
      '/project-images/abcdefghij1234567890.png',
    );
  });

  it('leaves public or empty image paths unchanged', () => {
    expect(toBuiltProjectImage('/ScalableSolutions.svg')).toBe('/ScalableSolutions.svg');
    expect(toBuiltProjectImage('')).toBe('');
  });
});

describe('extractBuiltProjectFileId', () => {
  it('reads ids from built image paths and Drive URLs', () => {
    expect(extractBuiltProjectFileId('/project-images/abcdefghij1234567890.jpg')).toBe(
      'abcdefghij1234567890',
    );
    expect(extractBuiltProjectFileId('https://drive.google.com/file/d/abcdefghij1234567890/view')).toBe(
      'abcdefghij1234567890',
    );
    expect(extractBuiltProjectFileId('/ScalableSolutions.svg')).toBeNull();
  });
});

describe('extensionForContentType', () => {
  it('maps image MIME types to file extensions', () => {
    expect(extensionForContentType('image/png; charset=utf-8')).toBe('png');
    expect(extensionForContentType('image/webp')).toBe('webp');
    expect(extensionForContentType('image/gif')).toBe('gif');
    expect(extensionForContentType('image/svg+xml')).toBe('svg');
    expect(extensionForContentType('image/jpeg')).toBe('jpg');
    expect(extensionForContentType('text/html')).toBe('jpg');
  });
});

describe('isValidDriveFileId', () => {
  it('accepts Drive-like ids of 10+ characters', () => {
    expect(isValidDriveFileId('abcdefghij1234567890')).toBe(true);
    expect(isValidDriveFileId('short')).toBe(false);
    expect(isValidDriveFileId('')).toBe(false);
  });
});
