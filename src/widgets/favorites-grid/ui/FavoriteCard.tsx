import type { SavedPlace } from '@/entities/place/model/types';
import type { WeatherSummary } from '@/entities/weather';
import { Card } from '@/shared/ui';
import Link from 'next/link';

type Props = {
  place: SavedPlace;
  summary?: WeatherSummary;
  isLoading?: boolean;
  isError?: boolean;
};

export const FavoriteCard = ({ place, summary, isLoading, isError }: Props) => {
  const title = place.alias || place.placeName;
  const subtitle = place.alias ?? null;
  const currentTemp = summary ? Math.round(summary.currentTemp) : null;
  const minTemp = summary ? Math.round(summary.minTemp) : null;
  const maxTemp = summary ? Math.round(summary.maxTemp) : null;

  return (
    <Link className="block" href={`/places/${place.id}`}>
      <Card className="transition-shadow hover:shadow-md">
      <div className="mb-2">
        <p className="font-semibold">{title}</p>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>

      {isLoading && <p>날씨 정보를 불러오는 중입니다.</p>}
      {isError && <p>날씨 정보를 불러오지 못했습니다.</p>}
      {!isLoading && !isError && summary && (
        <div className="space-y-1">
          <p>현재 기온: {currentTemp}°</p>
          <p>
            오늘 최저/최고: {minTemp}° / {maxTemp}°
          </p>
        </div>
      )}
      </Card>
    </Link>
  );
};
