import type { Coords } from '@/entities/place/model/types';
import type { WeatherSummary, WeatherSummaryApiResponse } from '../model/types';

export const fetchWeatherSummary = async (coords: Coords): Promise<WeatherSummary> => {
  const res = await fetch(`/api/weather/summary?lat=${coords.lat}&lon=${coords.lon}`);
  const data = (await res.json()) as WeatherSummaryApiResponse;

  if (!res.ok || !data.ok) {
    const errorMessage = data.ok ? 'weather fetch failed' : data.message;
    throw new Error(errorMessage);
  }

  return data.result;
};
