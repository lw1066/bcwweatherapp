'use client';

import { WeatherData } from 'apps/weather-app/types/weather';
import axios from 'axios';
import { useState } from 'react';
import styles from './LocationInput.module.css';
import { showUserFeedback } from '../../utils/showUserFeedback';

interface LocationInputProps {
  setWeatherData: (data: WeatherData) => void;
  setLocation: (location: string) => void;
}

const LocationInput: React.FC<LocationInputProps> = ({
  setWeatherData,
  setLocation,
}) => {
  const [inputLocation, setInputLocation] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputLocation(e.target.value);
    1;
  };

  const capitalizeFirstLetter = (string: string) => {
    if (string.length === 0) return '';
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/weatherAPI', {
        location: inputLocation,
      });
      setWeatherData(response.data.data);
      const capitalizedLocation = capitalizeFirstLetter(inputLocation);
      setLocation(capitalizedLocation);
      setInputLocation('');
    } catch (error) {
      console.error('Error fetching weather data:', error);

      showUserFeedback('No weather for that place - check your spelling!');
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <input
          type="text"
          value={inputLocation}
          onChange={handleInputChange}
          placeholder="Enter location"
          required
        />
        <button className={styles.locationButton} type="submit">
          <span style={{ paddingBottom: '5px' }}>&rarr;</span>
        </button>
      </form>
    </div>
  );
};

export default LocationInput;
