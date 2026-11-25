import { AppError } from './AppError.js';

/**
 * Converts a USD amount to BRL using the provided AwesomeAPI exchange rate.
 * Rejects non-finite, zero, or negative amounts and exchange rates.
 */
export const convertUsdToBrl = (
  amountInUsd: number,
  exchangeRate: number,
): number => {
  if (!Number.isFinite(amountInUsd) || amountInUsd <= 0) {
    throw new AppError('USD amount must be greater than zero', 400);
  }

  if (!Number.isFinite(exchangeRate) || exchangeRate <= 0) {
    throw new AppError('Exchange rate must be greater than zero', 400);
  }

  return Math.round((amountInUsd * exchangeRate + Number.EPSILON) * 100) / 100;
};
