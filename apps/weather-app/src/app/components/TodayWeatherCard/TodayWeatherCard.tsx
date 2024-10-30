import React, { useState } from 'react';
import { getIconForCondition } from '../../utils/iconMap';
import { TodayForecast, WeatherData } from 'apps/weather-app/types/weather';
import styles from './TodayWeatherCard.module.css';
import { formatDate } from '../../utils/formatDate';
import LocationInput from '../LocationInput/LocationInput';
import { useTemperature } from '../../context/TemperatureContext';

interface TodayWeatherCardProps extends TodayForecast {
  setWeatherData: React.Dispatch<React.SetStateAction<WeatherData | null>>;
}

const TodayWeatherCard: React.FC<TodayWeatherCardProps> = ({
  icon,
  conditions,
  temp,
  date,
  setWeatherData,
}) => {
  const [location, setLocation] = useState<string>('Brighton');
  const iconSrc = getIconForCondition(icon);
  const { unit } = useTemperature();

  const formattedDate = formatDate(date);
  const displayTemp =
    unit === 'F' ? Math.round((temp * 9) / 5 + 32) : Math.round(temp);

  return (
    <div className={styles.card}>
      <div className={styles.locationInputContainer}>
        <LocationInput
          setWeatherData={setWeatherData}
          setLocation={setLocation}
        />
      </div>
      <div className={styles.location}>{location}</div>
      <div className={styles.date}>{formattedDate}</div>
      <div className={styles.iconContainer}>
        <img src={iconSrc} alt={conditions} className={styles.icon} />
      </div>
      <div className={styles.temperatures}>
        {displayTemp}
        <span style={{ fontSize: '1.5rem', verticalAlign: 'super' }}>
          {unit === 'F' ? '°F' : '°C'}
        </span>
      </div>
      <div className={styles.conditions}>{conditions}</div>
    </div>
  );
};

export default TodayWeatherCard;
