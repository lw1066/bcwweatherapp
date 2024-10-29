import React from 'react';
import iconMap from '../../utils/iconMap';
import { ForecastDay } from '@weather-app/types/weather';
import styles from './WeatherCard.module.css';
import { formatDate } from '../../utils/formatDate';
import { useTemperature } from '../../context/TemperatureContext';

interface WeatherCardProps extends ForecastDay {
  isTomorrow?: boolean;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  icon,
  conditions,
  tempMax,
  tempMin,
  date,
  isTomorrow = false,
}) => {
  const iconSrc = iconMap[icon] || iconMap['clear-day'];
  const { unit } = useTemperature();

  const formattedDate = formatDate(date);
  const displayTempMax =
    unit === 'F' ? Math.round((tempMax * 9) / 5 + 32) : Math.round(tempMax);
  const displayTempMin =
    unit === 'F' ? Math.round((tempMin * 9) / 5 + 32) : Math.round(tempMin);

  return (
    <div className={styles.card}>
      <div className={styles.date}>
        {isTomorrow ? 'Tomorrow' : formattedDate}
      </div>
      <div className={styles.iconContainer}>
        <img src={iconSrc} alt={conditions} className={styles.icon} />
      </div>
      <div className={styles.conditions}> {conditions} </div>
      <div className={styles.temperatures}>
        <span>{`${displayTempMax} ${unit === 'F' ? '°F' : '°C'}`}</span>
        <span style={{ color: 'grey' }}>{`${displayTempMin} ${
          unit === 'F' ? '°F' : '°C'
        }`}</span>
      </div>
    </div>
  );
};

export default WeatherCard;
