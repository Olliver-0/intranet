import { describe, it, expect } from 'vitest';
import {
  formatPhoneNumber,
  formatWhatsAppNumber,
  getWhatsAppUrl,
} from '../formatters';

describe('formatPhoneNumber', () => {
  it('should return "-" for null or empty strings', () => {
    expect(formatPhoneNumber(null)).toBe('-');
    expect(formatPhoneNumber('')).toBe('-');
    expect(formatPhoneNumber('---')).toBe('-');
  });

  it('should format a mobile number with DDD (11 digits)', () => {
    expect(formatPhoneNumber('11999887766')).toBe('(11) 99988-7766');
  });

  it('should format a landline number with DDD (10 digits)', () => {
    expect(formatPhoneNumber('1132071546')).toBe('(11) 3207-1546');
  });

  it('should strip DDI 55 before formatting 12 or 13 digit numbers', () => {
    expect(formatPhoneNumber('5511999887766')).toBe('(11) 99988-7766');
    expect(formatPhoneNumber('+55 (11) 3207-1546')).toBe('(11) 3207-1546');
  });

  it('should format 8 or 9 digit local numbers without DDD', () => {
    expect(formatPhoneNumber('32071546')).toBe('3207-1546');
    expect(formatPhoneNumber('999887766')).toBe('99988-7766');
  });

  it('should return cleaned digits when pattern does not match', () => {
    expect(formatPhoneNumber('123')).toBe('123');
  });
});

describe('formatWhatsAppNumber', () => {
  it('should return empty string for null, empty, or non-digit input', () => {
    expect(formatWhatsAppNumber(null)).toBe('');
    expect(formatWhatsAppNumber('')).toBe('');
    expect(formatWhatsAppNumber('abc')).toBe('');
  });

  it('should prepend DDI 55 for 10 or 11 digit numbers', () => {
    expect(formatWhatsAppNumber('1132071546')).toBe('551132071546');
    expect(formatWhatsAppNumber('(11) 99988-7766')).toBe('5511999887766');
  });

  it('should preserve DDI 55 for 12 or 13 digit numbers', () => {
    expect(formatWhatsAppNumber('5511999887766')).toBe('5511999887766');
    expect(formatWhatsAppNumber('551132071546')).toBe('551132071546');
  });

  it('should return cleaned digits for other lengths', () => {
    expect(formatWhatsAppNumber('12345')).toBe('12345');
  });
});

describe('getWhatsAppUrl', () => {
  it('should build a valid wa.me URL for valid phone numbers', () => {
    expect(getWhatsAppUrl('11999887766')).toBe('https://wa.me/5511999887766');
  });

  it('should return empty string for null or empty input', () => {
    expect(getWhatsAppUrl(null)).toBe('');
    expect(getWhatsAppUrl('')).toBe('');
  });
});
