import { describe, it, expect } from 'vitest';
import { AppError } from '../AppError.js';
import { convertUsdToBrl } from '../currency.util.js';

describe('convertUsdToBrl', () => {
  it('should convert a positive USD amount using the provided exchange rate', () => {
    expect(convertUsdToBrl(100, 5.25)).toBe(525);
  });

  it('should round the converted BRL total to two decimal places', () => {
    expect(convertUsdToBrl(19.99, 5.137)).toBe(102.69);
    expect(convertUsdToBrl(10.005, 5.0)).toBe(50.03);
  });

  it('should reject negative USD amounts', () => {
    expect(() => convertUsdToBrl(-10, 5.2)).toThrow(AppError);
    expect(() => convertUsdToBrl(-10, 5.2)).toThrow(
      'USD amount must be greater than zero',
    );
  });

  it('should reject zero USD amounts', () => {
    expect(() => convertUsdToBrl(0, 5.2)).toThrow(
      'USD amount must be greater than zero',
    );
  });

  it('should reject non-finite USD amounts', () => {
    expect(() => convertUsdToBrl(Number.NaN, 5.2)).toThrow(
      'USD amount must be greater than zero',
    );
    expect(() => convertUsdToBrl(Number.POSITIVE_INFINITY, 5.2)).toThrow(
      AppError,
    );
  });

  it('should reject zero, negative, or non-finite exchange rates', () => {
    expect(() => convertUsdToBrl(50, 0)).toThrow(
      'Exchange rate must be greater than zero',
    );
    expect(() => convertUsdToBrl(50, -5.1)).toThrow(
      'Exchange rate must be greater than zero',
    );
    expect(() => convertUsdToBrl(50, Number.NaN)).toThrow(AppError);
  });
});
