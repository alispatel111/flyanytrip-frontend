/**
 * Currency utility for FlyAnyTrip hotel booking.
 * Maps currency codes to symbols and provides a consistent formatter.
 * Includes USD→INR conversion so all prices display in INR for Indian guests.
 */

export const CURRENCY_SYMBOLS = {
  INR: '₹',
  USD: '$',
  EUR: '€',
  GBP: '£',
  AED: 'AED ',
  SGD: 'S$',
  MYR: 'RM ',
  THB: '฿',
  JPY: '¥',
  AUD: 'A$',
  CAD: 'C$',
  CHF: 'CHF ',
  HKD: 'HK$',
  SAR: 'SAR ',
  QAR: 'QAR ',
  OMR: 'OMR ',
  KWD: 'KWD ',
  BHD: 'BHD ',
};

/**
 * Approximate conversion rates to INR (static fallback).
 * These are used only when the API returns prices in a foreign currency.
 */
const TO_INR = {
  USD: 84,
  EUR: 91,
  GBP: 107,
  AED: 22.9,
  SGD: 62,
  MYR: 18,
  THB: 2.3,
  JPY: 0.55,
  AUD: 55,
  CAD: 62,
  CHF: 94,
  HKD: 10.8,
  SAR: 22.4,
  QAR: 23.1,
  OMR: 218,
  KWD: 275,
  BHD: 224,
  INR: 1,
};

/**
 * Converts an amount from a source currency to INR.
 * Falls back to the original amount if no rate is known.
 */
export const convertToINR = (amount, fromCurrency = 'INR') => {
  const code = fromCurrency?.toUpperCase() || 'INR';
  const rate = TO_INR[code] || 1;
  return amount * rate;
};

/**
 * Returns the symbol for a currency code (e.g. 'INR' → '₹').
 * Falls back to the code itself if unknown.
 */
export const getCurrencySymbol = (code = 'INR') => {
  return CURRENCY_SYMBOLS[code?.toUpperCase()] || `${code} `;
};

/**
 * Formats a price in INR always (converts from source currency first).
 * All hotel prices shown to Indian guests in ₹.
 * @param {number} amount - raw amount from API
 * @param {string} sourceCurrency - currency code from the API response
 */
export const formatPrice = (amount, sourceCurrency = 'INR') => {
  const inrAmount = convertToINR(amount, sourceCurrency);
  return `₹${Math.ceil(inrAmount).toLocaleString('en-IN')}`;
};

/**
 * Returns the INR amount (number) after conversion.
 */
export const toINR = (amount, sourceCurrency = 'INR') => {
  return Math.ceil(convertToINR(amount, sourceCurrency));
};

/**
 * Detects the currency from an Adivaha hotel API response.
 * Checks multiple possible field locations.
 */
export const detectCurrency = (hotelListOrResponse) => {
  if (!hotelListOrResponse) return 'INR';

  // If it's a full response object
  if (hotelListOrResponse.responseData) {
    const rd = hotelListOrResponse.responseData;
    if (rd.currency) return rd.currency;
    if (rd.Currency) return rd.Currency;
    const list = rd.HotelLists?.HotelList || [];
    if (list[0]?.Currency) return list[0].Currency;
    if (list[0]?.currency) return list[0].currency;
    if (list[0]?.RoomTypes?.[0]?.rates?.[0]?.currency) return list[0].RoomTypes[0].rates[0].currency;
  }

  // If it's an array of hotels
  if (Array.isArray(hotelListOrResponse) && hotelListOrResponse.length > 0) {
    const first = hotelListOrResponse[0];
    return first?.Currency || first?.currency || first?.RoomTypes?.[0]?.rates?.[0]?.currency || 'INR';
  }

  return 'INR';
};
