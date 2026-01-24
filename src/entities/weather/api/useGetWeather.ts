import { useQuery } from '@tanstack/react-query';
import type { WeatherOneCallApiResponse, WeatherApiResponse } from '../model/types';
import { Coords } from '@/entities/place/model/types';

export const useGetWeather = (coords: Coords) => {
  const { lat, lon } = coords;

  return useQuery<WeatherOneCallApiResponse, Error>({
    queryKey: ['weather', `${coords.lat}&${coords.lon}`],
    queryFn: async () => {
      const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
      const data = (await res.json()) as WeatherApiResponse;

      if (!res.ok || !data.ok) {
        const errorMessage = data.ok ? 'weather fetch failed' : data.message;
        throw new Error(errorMessage);
      }

      return data.result;
    },
    enabled: !!coords,
  });
};
