'use client';
import { notFound, useParams } from 'next/navigation';

import { loadLastPlace } from '@/entities/place/model/lastSearchedPlace';
import { AppHeaderDetail, WeatherView } from '@/widgets/weather-view';
import { useFavorite } from '@/features/manage-favorite';
import { PlaceCard } from '@/widgets/weather-view/ui/PlaceCard';

export default function DetailPage() {
  const params = useParams<{ coords: string }>();
  const placeId = decodeURIComponent(params.coords);
  const [latParam, lonParam] = placeId.split(',');
  const lat = Number(latParam);
  const lon = Number(lonParam);
  const isValidCoords = Number.isFinite(lat) && Number.isFinite(lon);

  const { favorites, add, remove, update, canAddMore } = useFavorite();
  const favoriteData = favorites.find((place) => place.id === placeId);
  const lastData =
    !favoriteData && isValidCoords && placeId === `${lat},${lon}` ? loadLastPlace() : null;
  const resolvedLastData = lastData && lastData.id === placeId ? lastData : null;
  const placeData = favoriteData ?? resolvedLastData;
  const isFavorite = !!favoriteData;

  if (!isValidCoords || !placeData) {
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
