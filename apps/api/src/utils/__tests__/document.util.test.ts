import { describe, it, expect } from 'vitest';
import { AppError } from '../AppError.js';
import {
  MAX_DOCUMENT_SIZE_BYTES,
  validateDocumentUpload,
} from '../document.util.js';

describe('validateDocumentUpload', () => {
  it('should accept a valid PDF document within the size limit', () => {
    const result = validateDocumentUpload({
      fileName: '  manual-integracao.PDF  ',
      sizeInBytes: 1024 * 500,
    });

    expect(result).toEqual({
      fileName: 'manual-integracao.PDF',
      extension: '.pdf',
      sizeInBytes: 1024 * 500,
    });
  });

  it('should accept all allowed corporate document extensions', () => {
    const extensions = ['.pdf', '.docx', '.xlsx', '.png', '.jpg', '.jpeg'];

    for (const ext of extensions) {
      const result = validateDocumentUpload({
        fileName: `arquivo${ext}`,
        sizeInBytes: 2048,
      });
      expect(result.extension).toBe(ext);
    }
  });

  it('should accept a file at the exact 10 MB limit', () => {
    const result = validateDocumentUpload({
      fileName: 'relatorio.xlsx',
      sizeInBytes: MAX_DOCUMENT_SIZE_BYTES,
    });

    expect(result.sizeInBytes).toBe(MAX_DOCUMENT_SIZE_BYTES);
  });

  it('should reject empty or whitespace-only file names', () => {
    expect(() =>
      validateDocumentUpload({ fileName: '   ', sizeInBytes: 100 }),
    ).toThrow(AppError);
  });

  it('should reject files without an extension', () => {
    expect(() =>
      validateDocumentUpload({ fileName: 'README', sizeInBytes: 100 }),
    ).toThrow('Unsupported file extension');
  });

  it('should reject disallowed extensions such as executables or scripts', () => {
    expect(() =>
      validateDocumentUpload({ fileName: 'payload.exe', sizeInBytes: 100 }),
    ).toThrow('Unsupported file extension');

    expect(() =>
      validateDocumentUpload({ fileName: 'script.sh', sizeInBytes: 100 }),
    ).toThrow(AppError);
  });

  it('should reject zero, negative, or non-finite file sizes', () => {
    expect(() =>
      validateDocumentUpload({ fileName: 'doc.pdf', sizeInBytes: 0 }),
    ).toThrow('File size must be greater than zero');

    expect(() =>
      validateDocumentUpload({ fileName: 'doc.pdf', sizeInBytes: -50 }),
    ).toThrow('File size must be greater than zero');

    expect(() =>
      validateDocumentUpload({ fileName: 'doc.pdf', sizeInBytes: Number.NaN }),
    ).toThrow('File size must be greater than zero');
  });

  it('should reject files larger than 10 MB', () => {
    expect(() =>
      validateDocumentUpload({
        fileName: 'video.pdf',
        sizeInBytes: MAX_DOCUMENT_SIZE_BYTES + 1,
      }),
    ).toThrow('File size exceeds the 10 MB limit');
  });
});
