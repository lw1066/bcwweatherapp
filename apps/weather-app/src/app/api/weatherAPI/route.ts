import { NextResponse } from 'next/server';
import { AxiosError } from 'axios';
import { fetchWeatherData } from '../utils/fetchWeatherData';

export async function POST(req: Request) {
  const { location } = await req.json();

  try {
    const data = await fetchWeatherData(location as string);

    return NextResponse.json({
      status: 200,
      success: true,
      message: 'weather retrieved',
      data: data,
    });
  } catch (error) {
    console.error('server error:', error);
    const statusCode =
      error instanceof AxiosError &&
      error.message ===
        'Invalid location. Please check the spelling or try a different location.'
        ? 400
        : 500;

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof AxiosError
            ? error.message
            : 'An unexpected error occurred',
      },
      { status: statusCode }
    );
  }
}
