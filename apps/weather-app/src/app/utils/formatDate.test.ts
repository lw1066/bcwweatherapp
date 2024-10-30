import { formatDate } from './formatDate';

describe('formatDate', () => {
  it('returns correctly formatted date for valid YYYY-MM-DD input', () => {
    expect(formatDate('2024-10-29')).toBe('Tue, Oct 29');
    expect(formatDate('2024-12-25')).toBe('Wed, Dec 25');
    expect(formatDate('2023-01-01')).toBe('Sun, Jan 01');
  });

  it('throws an error for invalid date formats', () => {
    expect(() => formatDate('10-29-2024')).toThrow(
      "Invalid date format. Please use 'YYYY-MM-DD'."
    );
    expect(() => formatDate('2024/10/29')).toThrow(
      "Invalid date format. Please use 'YYYY-MM-DD'."
    );
    expect(() => formatDate('October 29, 2024')).toThrow(
      "Invalid date format. Please use 'YYYY-MM-DD'."
    );
  });

  it('throws an error for empty string input', () => {
    expect(() => formatDate('')).toThrow(
      "Invalid date format. Please use 'YYYY-MM-DD'."
    );
  });

  it('throws an error for invalid date values', () => {
    expect(() => formatDate('2024-13-01')).toThrow(
      "Invalid date format. Please use 'YYYY-MM-DD'."
    );
    expect(() => formatDate('2024-02-30')).toThrow(
      "Invalid date format. Please use 'YYYY-MM-DD'."
    );
  });
});
