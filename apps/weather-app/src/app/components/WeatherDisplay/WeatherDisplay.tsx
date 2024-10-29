import React, { useEffect, useState } from 'react';
import { WeatherData } from '@weather-app/types/weather';
import TodayWeatherCard from '../TodayWeatherCard/TodayWeatherCard';
import WeatherCard from '../WeatherCard/WeatherCard';
import styles from './WeatherDisplay.module.css';
import NumberCard from '../NumberDisplay/NumberCard';
import StatBar from '../StatBar/StatBar';
import axios from 'axios';
import TemperatureButtons from '../TemperatureButtons/TemperatureButtons';
import { useTemperature } from '../../context/TemperatureContext';

const WeatherDisplay: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const { unit } = useTemperature();

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.post('/api/weatherAPI', {
          location: 'brighton',
        });

        setWeatherData(response.data.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, []);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const { today, forecast } = weatherData;
  const displayTempMax =
    unit === 'F'
      ? Math.round((today.tempMax * 9) / 5 + 32)
      : Math.round(today.tempMax);
  const displayTempMin =
    unit === 'F'
      ? Math.round((today.tempMin * 9) / 5 + 32)
      : Math.round(today.tempMin);

  return (
    <div className={styles.dashboardGrid}>
      {/* Left Column */}
      <div className={styles.todayWeatherCard}>
        <TodayWeatherCard {...today} setWeatherData={setWeatherData} />
      </div>

      {/* Right Column: Row 1 */}
      <div className={styles.dayOverview}>
        <div className={styles.overviewHeader}>
          <h2 style={{ marginBottom: '5px' }}>Day Overview</h2>
          <TemperatureButtons />
        </div>
        <div className={styles.todayStats}>
          <StatBar text="Humidity" stat={today.humidity} />
          <StatBar text="Cloud cover" stat={today.cloudCover} />
        </div>
      </div>

      {/* Right Column: Row 2 */}
      <div className={styles.todayTempsAndSun}>
        <NumberCard
          text="Max Temp."
          number={`${displayTempMax} ${unit === 'F' ? '°F' : '°C'}`}
        />
        <NumberCard
          text="Min Temp."
          number={`${displayTempMin} ${unit === 'F' ? '°F' : '°C'}`}
        />
        <NumberCard text="Sunrise" number={today.sunrise} />
        <NumberCard text="Sunset." number={today.sunset} />
      </div>

      {/* Right Column: Rows 3 & 4 for 5-Day Forecast */}

      <div className={styles.forecastSection}>
        <h2 style={{ marginBottom: '10px' }}>5 Day Forecast</h2>
        <ul className={styles.forecastContainer}>
          {forecast.map((day, index) => (
            <WeatherCard key={day.date} {...day} isTomorrow={index === 0} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WeatherDisplay;
