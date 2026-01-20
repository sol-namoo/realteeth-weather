import { useQuery } from '@tanstack/react-query';

export function useWeather(placeId: string, lat: number, lon: number) {
  return useQuery({
    queryKey: ['weather', placeId],
    queryFn: async () => {
      const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
      //Todo: route.ts에서 받은 에러 메시지로 교체
      if (!res.ok) throw new Error('weather fetch failed');
      return res.json();
    },
  });
}
