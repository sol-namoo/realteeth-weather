'use client';

import { useState } from 'react';
import { SearchPlaceModal, useGetInitialPlace } from '@/features/search-place';
import { useFavorite } from '@/features/manage-favorite';
import { Button, StateCard } from '@/shared/ui';
import { AppHeaderHome, WeatherView } from '@/widgets/weather-view';
import { FavoritesGrid } from '@/widgets/favorites-grid';

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { locationState, retry } = useGetInitialPlace();
  const { favorites } = useFavorite();

  return (
    <>
      <AppHeaderHome />

      <div className="flex items-center py-4">
        <div>
          <h2 className="text-lg font-semibold">현재 날씨</h2>
          <p className="text-sm text-gray-500">접속한 지역의 날씨입니다</p>
        </div>
        <Button className="ml-auto" onClick={() => setIsModalOpen(true)}>
          위치 검색
        </Button>
      </div>

      {/* 날씨 표시 */}
      {(locationState.status === 'loading' || locationState.status === 'idle') && (
        <StateCard>
          <p>현재 위치를 확인 중입니다...</p>
        </StateCard>
      )}
      {locationState.status === 'denied' && (
        <StateCard>
          <p >위치 권한이 필요합니다.</p>
          <p className="text-sm text-gray-500">브라우저 설정에서 위치 권한을 허용해주세요.</p>
        </StateCard>
      )}
      {locationState.status === 'unavailable' && (
        <StateCard>
          <p >위치 정보를 가져올 수 없습니다.</p>
          <div className="pt-2">
            <Button onClick={retry}>다시 시도</Button>
          </div>
        </StateCard>
      )}
      {locationState.status === 'ready' && <WeatherView coords={locationState.coords} />}

      <FavoritesGrid favorites={favorites} />

      {isModalOpen && <SearchPlaceModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
}
