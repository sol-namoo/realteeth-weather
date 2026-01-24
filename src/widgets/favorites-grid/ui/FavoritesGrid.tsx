import { useQueries } from '@tanstack/react-query';
import { useFavorites } from '@/entities/place';
import { fetchWeatherSummary } from '@/entities/weather';
import { FavoriteCard } from './FavoriteCard';

export const FavoritesGrid = () => {
  const { favorites } = useFavorites();
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
    <section className="space-y-3">
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
