import { formatTimeToHHMM } from '../../utils/formatTimeToHHMM';
import { fetchWeatherData } from '../utils/fetchWeatherData';
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

jest.mock('axios');

test('formatTimeToHHMM returns properly formatted time', () => {
  const input = '12:03:34';
  expect(formatTimeToHHMM(input)).toBe('12:03');
});

describe('fetchWeatherData', () => {
  it('returns valid response when given a valid location', async () => {
    const input = 'Brighton';

    const mockWeatherData = {
      days: [
        {
          datetime: '2024-10-29',
          tempmax: 15.8,
          tempmin: 11.7,
          temp: 14.1,
          humidity: 90.3,
          cloudcover: 80.9,
          sunrise: '06:47:51',
          sunset: '16:39:53',
          conditions: 'Rain, Partially cloudy',
          icon: 'rain',
        },
        {
          datetime: '2024-10-30',
          tempmax: 15.8,
          tempmin: 13.1,
          temp: 14.4,
          humidity: 79.2,
          cloudcover: 35.8,
          sunrise: '06:49:34',
          sunset: '16:38:04',
          conditions: 'Partially cloudy',
          icon: 'partly-cloudy-day',
        },
        {
          datetime: '2024-10-31',
          tempmax: 15.4,
          tempmin: 13.2,
          temp: 14.2,
          humidity: 81.2,
          cloudcover: 1.8,
          sunrise: '06:51:17',
          sunset: '16:36:17',
          conditions: 'Clear',
          icon: 'clear-day',
        },
        {
          datetime: '2024-11-01',
          tempmax: 15.8,
          tempmin: 13.1,
          temp: 14.1,
          humidity: 78,
          cloudcover: 1.6,
          sunrise: '06:53:00',
          sunset: '16:34:31',
          conditions: 'Clear',
          icon: 'clear-day',
        },
        {
          datetime: '2024-11-02',
          tempmax: 14.5,
          tempmin: 13,
          temp: 13.7,
          humidity: 85.5,
          cloudcover: 51.2,
          sunrise: '06:54:43',
          sunset: '16:32:47',
          conditions: 'Partially cloudy',
          icon: 'partly-cloudy-day',
        },
        {
          datetime: '2024-11-03',
          tempmax: 13.7,
          tempmin: 12.4,
          temp: 13.2,
          humidity: 78.2,
          cloudcover: 57.5,
          sunrise: '06:56:27',
          sunset: '16:31:05',
          conditions: 'Partially cloudy',
          icon: 'partly-cloudy-day',
        },
      ],
    };

    const testResponse = {
      today: {
        date: '2024-10-29',
        tempMax: 15.8,
        tempMin: 11.7,
        temp: 14.1,
        humidity: 90.3,
        cloudCover: 80.9,
        sunrise: '06:47',
        sunset: '16:39',
        conditions: 'Rain, Partially cloudy',
        icon: 'rain',
      },
      forecast: [
        {
          date: '2024-10-30',
          tempMax: 15.8,
          tempMin: 13.1,
          conditions: 'Partially cloudy',
          icon: 'partly-cloudy-day',
        },
        {
          date: '2024-10-31',
          tempMax: 15.4,
          tempMin: 13.2,
          conditions: 'Clear',
          icon: 'clear-day',
        },
        {
          date: '2024-11-01',
          tempMax: 15.8,
          tempMin: 13.1,
          conditions: 'Clear',
          icon: 'clear-day',
        },
        {
          date: '2024-11-02',
          tempMax: 14.5,
          tempMin: 13,
          conditions: 'Partially cloudy',
          icon: 'partly-cloudy-day',
        },
        {
          date: '2024-11-03',
          tempMax: 13.7,
          tempMin: 12.4,
          conditions: 'Partially cloudy',
          icon: 'partly-cloudy-day',
        },
      ],
    };

    // Define mocked Axios response
    const mockedResponse: AxiosResponse = {
      data: mockWeatherData,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: { headers: {} } as InternalAxiosRequestConfig,
    };

    // Mock axios.get with proper typing
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue(
      mockedResponse
    );

    const result = await fetchWeatherData(input);
    expect(result).toEqual(testResponse);
  });

  it('throws an error if given a non-existent location', async () => {
    const input = 'rwfgy';

    const mockedAxiosError: AxiosError = {
      isAxiosError: true,
      code: 'ERR_BAD_REQUEST',
      message: 'Request failed with status code 400',
      name: 'AxiosError',
      config: {} as InternalAxiosRequestConfig, // You can leave this empty or customize as needed
      response: {
        status: 400,
        statusText: 'Bad Request',
        data: 'Invalid location. Please check the spelling or try a different location.',
        headers: {},
        config: {} as InternalAxiosRequestConfig,
      },
      // Define toJSON method to fulfill the interface requirements
      toJSON: () => ({
        message: 'Request failed with status code 400',
        name: 'AxiosError',
        code: 'ERR_BAD_REQUEST',
        status: 400,
      }),
    };

    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue(
      mockedAxiosError
    );

    await expect(fetchWeatherData(input)).rejects.toThrow(
      'Invalid location. Please check the spelling or try a different location.'
    );
  });
});
