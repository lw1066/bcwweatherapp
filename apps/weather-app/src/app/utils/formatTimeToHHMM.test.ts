import { formatTimeToHHMM } from './formatTimeToHHMM';

describe('fetchWeatherData', () => {
  test('correctly formats time in HH:MM:SS to HH:MM', () => {
    expect(formatTimeToHHMM('12:03:34')).toBe('12:03');
  });

  test('correctly formats single-digit hour and minute values', () => {
    expect(formatTimeToHHMM('07:09:00')).toBe('07:09');
  });

  test('handles midnight correctly', () => {
    expect(formatTimeToHHMM('00:00:00')).toBe('00:00');
  });

  test('handles input without seconds', () => {
    expect(formatTimeToHHMM('12:03')).toBe('12:03');
  });

  test('handles invalid formats', () => {
    expect(() => formatTimeToHHMM('no-time')).toThrow();
  });
});
