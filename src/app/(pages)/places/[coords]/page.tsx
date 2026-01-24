'use client';
import { notFound, useParams } from 'next/navigation';

// 접근 케이스
// 1. 검색 후 디테일 뷰
// 2. 즐겨찾기에서 디테일 뷰

import { loadLastPlace } from '@/entities/place/model/lastSearchedPlace';
import { AppHeaderDetail, WeatherView } from '@/widgets/weather-view';
import { useFavorite } from '@/features/manage-favorite';
import { PlaceCard } from '@/widgets/weather-view/ui/PlaceCard';

export default function DetailPage() {
  const params = useParams<{ coords: string }>();
  const placeId = decodeURIComponent(params.coords);

  const { favorites, add, remove, update, canAddMore } = useFavorite();
  const favoriteData = favorites.find((place) => place.id === placeId);
  const lastData = !favoriteData ? loadLastPlace() : null;
  const placeData = favoriteData ?? lastData;
  const isFavorite = !!favoriteData;

  if (!placeData) {
    return notFound();
  }
  const coords = { lat: Number(placeData.lat), lon: Number(placeData.lon) };

  return (
    <>
      <AppHeaderDetail />
      <PlaceCard
        isFavorite={isFavorite}
        alias={placeData?.alias || ''}
        placeName={placeData?.placeName}
        coords={coords}
        canAddMore={canAddMore}
        onAddFavorite={add}
        onRemoveFavorite={remove}
        onUpdateFavorite={update}
      />
      <WeatherView coords={coords} />
    </>
  );
}
