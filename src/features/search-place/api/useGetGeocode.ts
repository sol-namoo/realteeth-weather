import { GeocodeApiResponse } from '@/entities/place/model/types';
import { useQuery } from '@tanstack/react-query';

export const useGetGeocode = (query: string, enabled: boolean) => {
  return useQuery({
    queryKey: ['query', query],
    queryFn: async () => {
      const res = await fetch(`/api/geocode?query=${query}`);
      const data = (await res.json()) as GeocodeApiResponse;

      if (!res.ok || !data.ok) {
        const errorMessage = data.ok ? 'geocode fetch failed' : data.message;
        throw new Error(errorMessage);
      }

      return data.result;
    },
    enabled,
  });
};
