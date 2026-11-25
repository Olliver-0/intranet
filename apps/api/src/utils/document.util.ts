import { AppError } from './AppError.js';

/** Maximum allowed corporate document upload size (10 MB). */
export const MAX_DOCUMENT_SIZE_BYTES = 10 * 1024 * 1024;

/** File extensions permitted for Portal Brenner MinIO document uploads. */
export const ALLOWED_DOCUMENT_EXTENSIONS = [
  '.pdf',
  '.docx',
  '.xlsx',
  '.png',
  '.jpg',
  '.jpeg',
] as const;

export type AllowedDocumentExtension =
  (typeof ALLOWED_DOCUMENT_EXTENSIONS)[number];

export interface DocumentUploadInput {
  fileName: string;
  sizeInBytes: number;
}

export interface ValidatedDocumentUpload {
  fileName: string;
  extension: AllowedDocumentExtension;
  sizeInBytes: number;
}

const isAllowedExtension = (value: string): value is AllowedDocumentExtension =>
  (ALLOWED_DOCUMENT_EXTENSIONS as readonly string[]).includes(value);

/**
 * Validates document metadata before persisting the object to MinIO storage.
 * Rejects empty names, disallowed extensions, non-positive sizes, and files over 10 MB.
 */
export const validateDocumentUpload = (
  input: DocumentUploadInput,
): ValidatedDocumentUpload => {
  const trimmedName = input.fileName.trim();
  if (!trimmedName) {
    throw new AppError('File name is required', 400);
  }

  const lastDotIndex = trimmedName.lastIndexOf('.');
  const extension =
    lastDotIndex > 0 ? trimmedName.slice(lastDotIndex).toLowerCase() : '';

  if (!isAllowedExtension(extension)) {
    throw new AppError('Unsupported file extension', 400);
  }

  if (!Number.isFinite(input.sizeInBytes) || input.sizeInBytes <= 0) {
    throw new AppError('File size must be greater than zero', 400);
  }

  if (input.sizeInBytes > MAX_DOCUMENT_SIZE_BYTES) {
    throw new AppError('File size exceeds the 10 MB limit', 400);
  }

  return {
    fileName: trimmedName,
    extension,
    sizeInBytes: input.sizeInBytes,
  };
};
