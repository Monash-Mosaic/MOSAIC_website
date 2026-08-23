import { describe, expect, it } from 'vitest';
import {
  extractDriveFileId,
  isValidDriveFileId,
  toProxiedProjectImage,
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

describe('toProxiedProjectImage', () => {
  it('rewrites Drive URLs onto the local image proxy', () => {
    expect(toProxiedProjectImage('https://drive.google.com/file/d/abcdefghij1234567890/view')).toBe(
      '/api/projects/images/abcdefghij1234567890',
    );
  });

  it('leaves public or empty image paths unchanged', () => {
    expect(toProxiedProjectImage('/ScalableSolutions.svg')).toBe('/ScalableSolutions.svg');
    expect(toProxiedProjectImage('')).toBe('');
  });
});

describe('isValidDriveFileId', () => {
  it('accepts Drive-like ids of 10+ characters', () => {
    expect(isValidDriveFileId('abcdefghij1234567890')).toBe(true);
    expect(isValidDriveFileId('short')).toBe(false);
    expect(isValidDriveFileId('')).toBe(false);
  });
});
