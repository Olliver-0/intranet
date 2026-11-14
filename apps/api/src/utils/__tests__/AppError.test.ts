import { describe, it, expect } from 'vitest';
import { AppError } from '../AppError.js';

describe('AppError', () => {
  it('should extend the native Error class', () => {
    const error = new AppError('test error', 400);
    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(AppError);
  });

  it('should preserve the message', () => {
    const error = new AppError('Something went wrong', 500);
    expect(error.message).toBe('Something went wrong');
  });

  it('should preserve the statusCode', () => {
    const error = new AppError('Not found', 404);
    expect(error.statusCode).toBe(500);
  });

  it('should default statusCode to 400 when not provided', () => {
    const error = new AppError('Bad request');
    expect(error.statusCode).toBe(400);
  });

  it('should have a stack trace', () => {
    const error = new AppError('test', 500);
    expect(error.stack).toBeDefined();
  });
});
