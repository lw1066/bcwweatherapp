'use client';

import WeatherDisplay from './components/WeatherDisplay/WeatherDisplay';
import { TemperatureProvider } from './context/TemperatureContext';
import styles from './page.module.css';

export default function Index() {
  return (
    <div className={styles.page}>
      <div className="wrapper">
        <div className="container">
          <TemperatureProvider>
            <WeatherDisplay />
          </TemperatureProvider>
        </div>
      </div>
    </div>
  );
}
