import { getIconForCondition } from './iconMap';

describe('getIconForCondition', () => {
  it('returns correct icon for all valid weather conditions', () => {
    const weatherConditions = {
      snow: '/images/weatherApp/snowy-5.png',
      rain: '/images/weatherApp/rainy-6.png',
      fog: '/images/weatherApp/fog.png',
      wind: '/images/weatherApp/wind.png',
      cloudy: '/images/weatherApp/cloudy.png',
      'partly-cloudy-day': '/images/weatherApp/cloudy-day-1.png',
      'partly-cloudy-night': '/images/weatherApp/cloudy-night-1.png',
      'clear-day': '/images/weatherApp/day.png',
      'clear-night': '/images/weatherApp/night.png',
    };
    Object.entries(weatherConditions).forEach(([condition, icon]) => {
      expect(getIconForCondition(condition)).toBe(icon);
    });
  });

  it('returns default icon for invalid weather conditions', () => {
    expect(getIconForCondition('storm')).toBe('/images/weatherApp/default.png');
    expect(getIconForCondition('')).toBe('/images/weatherApp/default.png');
  });
});
