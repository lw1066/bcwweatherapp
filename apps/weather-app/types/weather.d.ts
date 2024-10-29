export interface ForecastDay {
  date: string;
  conditions: string;
  tempMax: number;
  tempMin: number;
  icon: string;
}

export interface TodayForecast extends ForecastDay {
  humidity: number;
  cloudCover: number;
  sunrise: string;
  sunset: string;
  temp: number;
}

export interface WeatherData {
  today: TodayForecast;
  forecast: ForecastDay[];
}
