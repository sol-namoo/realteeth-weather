'use client';

import { useState } from 'react';
import { SearchPlaceModal, useGetInitialPlace } from '@/features/search-place';
import { Button, StateCard } from '@/shared/ui';
import { AppHeaderHome, WeatherView } from '@/widgets/weather-view';
import { FavoritesGrid } from '@/widgets/favorites-grid';

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { locationState, retry } = useGetInitialPlace();

  return (
    <>
      <AppHeaderHome />

      <div className="flex">
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
          <p className="font-semibold">위치 권한이 필요합니다.</p>
          <p className="text-sm text-gray-500">브라우저 설정에서 위치 권한을 허용해주세요.</p>
        </StateCard>
      )}
      {locationState.status === 'unavailable' && (
        <StateCard>
          <p className="font-semibold">위치 정보를 가져올 수 없습니다.</p>
          <div className="pt-2">
            <Button onClick={retry}>다시 시도</Button>
          </div>
        </StateCard>
      )}
      {locationState.status === 'ready' && <WeatherView coords={locationState.coords} />}

      <FavoritesGrid />

      {isModalOpen && <SearchPlaceModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
}
