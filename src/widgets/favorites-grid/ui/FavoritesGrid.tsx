import { useQueries } from '@tanstack/react-query';
import type { SavedPlace } from '@/entities/place/model/types';
import { fetchWeatherSummary } from '@/entities/weather';
import { FavoriteCard } from './FavoriteCard';

type Props = {
  favorites: SavedPlace[];
};

export const FavoritesGrid = ({ favorites }: Props) => {
  const queries = useQueries({
    queries: favorites.map((place) => ({
      queryKey: ['weather-summary', place.id],
      queryFn: () => fetchWeatherSummary(place),
    })),
  });

  if (favorites.length === 0) {
    return null;
  }

  return (
    <section className="py-4 space-y-3">
      <h2 className="text-lg font-semibold">즐겨찾기 목록</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {favorites.map((place, index) => {
          const query = queries[index];
          return (
            <FavoriteCard
              key={place.id}
              place={place}
              summary={query.data}
              isLoading={query.isPending}
              isError={query.isError}
            />
          );
        })}
      </div>
    </section>
  );
};
