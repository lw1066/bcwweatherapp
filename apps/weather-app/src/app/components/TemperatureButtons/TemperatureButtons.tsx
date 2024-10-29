import React from 'react';
import { useTemperature } from '../../context/TemperatureContext';
import styles from './TemperatureButtons.module.css';

const TemperatureButtons: React.FC = () => {
  const { unit, setUnit } = useTemperature();

  return (
    <div className={styles.tempButtonsContainer}>
      <button
        className={`${styles.tempButton} ${unit === 'C' ? styles.active : ''}`}
        onClick={() => setUnit('C')}
      >
        °C
      </button>
      <button
        className={`${styles.tempButton} ${unit === 'F' ? styles.active : ''}`}
        onClick={() => setUnit('F')}
      >
        °F
      </button>
    </div>
  );
};

export default TemperatureButtons;
