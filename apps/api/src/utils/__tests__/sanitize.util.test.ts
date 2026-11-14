import { describe, it, expect } from 'vitest';
import { sanitizeForHeader, stripHtmlTags } from '../sanitize.util.js';

describe('sanitizeForHeader', () => {
  it('should remove carriage return characters', () => {
    expect(sanitizeForHeader('hello\rworld')).toBe('helloworld');
  });

  it('should remove newline characters', () => {
    expect(sanitizeForHeader('hello\nworld')).toBe('helloworld');
  });

  it('should remove null bytes', () => {
    expect(sanitizeForHeader('hello\0world')).toBe('helloworld');
  });

  it('should escape double quotes', () => {
    expect(sanitizeForHeader('file "name".pdf')).toBe('file \\"name\\".pdf');
  });

  it('should truncate strings longer than 255 characters', () => {
    const longString = 'a'.repeat(300);
    const result = sanitizeForHeader(longString);
    expect(result.length).toBe(255);
  });

  it('should handle combined dangerous characters', () => {
    const input = 'evil\r\n\0"file"';
    const result = sanitizeForHeader(input);
    expect(result).not.toContain('\r');
    expect(result).not.toContain('\n');
    expect(result).not.toContain('\0');
    expect(result).toBe('evil\\"file\\"');
  });

  it('should handle empty strings', () => {
    expect(sanitizeForHeader('')).toBe('');
  });
});

describe('stripHtmlTags', () => {
  it('should remove simple HTML tags', () => {
    expect(stripHtmlTags('<b>bold</b>')).toBe('bold');
  });

  it('should remove tags with attributes', () => {
    expect(stripHtmlTags('<a href="http://example.com">click</a>')).toBe(
      'click',
    );
  });

  it('should remove self-closing tags', () => {
    expect(stripHtmlTags('hello<br/>world')).toBe('helloworld');
  });

  it('should remove script tags', () => {
    expect(stripHtmlTags('<script>alert("xss")</script>')).toBe(
      'alert("xss")',
    );
  });

  it('should handle strings without HTML', () => {
    expect(stripHtmlTags('plain text')).toBe('plain text');
  });

  it('should handle empty strings', () => {
    expect(stripHtmlTags('')).toBe('');
  });
});
