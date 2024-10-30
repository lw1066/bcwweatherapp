type WeatherCondition =
  | 'snow'
  | 'rain'
  | 'fog'
  | 'wind'
  | 'cloudy'
  | 'partly-cloudy-day'
  | 'partly-cloudy-night'
  | 'clear-day'
  | 'clear-night';

const iconMap: Record<WeatherCondition, string> = {
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

const getIconForCondition = (condition: string): string => {
  return (
    iconMap[condition as WeatherCondition] || '/images/weatherApp/default.png'
  ); // Default icon if not found
};

export { iconMap, getIconForCondition };
