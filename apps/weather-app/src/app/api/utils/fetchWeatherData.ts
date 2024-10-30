import {
  ForecastDay,
  TodayForecast,
  WeatherData,
} from '@weather-app/types/weather';
import axios, { AxiosError } from 'axios';
import { formatTimeToHHMM } from '../../utils/formatTimeToHHMM';

const BASE_URL =
  'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

export const fetchWeatherData = async (
  location: string
): Promise<WeatherData> => {
  const apiKey = process.env.VISUAL_CROSSING_API_KEY;

  try {
    const response = await axios.get(`${BASE_URL}/${location}/next5days`, {
      params: {
        key: apiKey,
        unitGroup: 'metric',
        include: 'days',
        elements:
          'tempmax,tempmin,datetime,icon,conditions,sunset,sunrise,cloudcover,humidity,temp',
      },
    });

    const data = response.data;
    const todayData = data.days[0];

    const formattedSunrise = formatTimeToHHMM(todayData.sunrise);
    const formattedSunset = formatTimeToHHMM(todayData.sunset);

    const todayForecast: TodayForecast = {
      date: todayData.datetime,
      conditions: todayData.conditions,
      tempMax: todayData.tempmax,
      tempMin: todayData.tempmin,
      humidity: todayData.humidity,
      cloudCover: todayData.cloudcover,
      sunrise: formattedSunrise,
      sunset: formattedSunset,
      icon: todayData.icon,
      temp: todayData.temp,
    };

    const forecast: ForecastDay[] = data.days.slice(1, 6).map((day: any) => ({
      date: day.datetime,
      conditions: day.conditions,
      tempMax: day.tempmax,
      tempMin: day.tempmin,
      icon: day.icon,
    }));

    return { today: todayForecast, forecast };
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === 400) {
      throw new Error(
        'Invalid location. Please check the spelling or try a different location.'
      );
    }

    throw new Error('An error occurred while fetching the weather data.');
  }
};
