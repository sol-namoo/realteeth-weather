'use client';

import { useState } from 'react';
import { SearchPlaceModal, useGetInitialPlace } from '@/features/search-place';
import { AppHeaderHome, WeatherView } from '@/widgets/weather-view';
import { FavoritesGrid } from '@/widgets/favorites-grid';

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { locationState, retry } = useGetInitialPlace();

  return (
    <>
      <AppHeaderHome />

      <button onClick={() => setIsModalOpen(true)}>위치 검색</button>

      {/* 날씨 표시 */}
      {(locationState.status === 'loading' || locationState.status === 'idle') && (
        <p>현재 위치를 확인 중입니다...</p>
      )}
      {locationState.status === 'denied' && (
        <>
          <p>위치 권한이 필요합니다.</p>
          <p className="text-sm text-gray-500">브라우저 설정에서 위치 권한을 허용해주세요.</p>
        </>
      )}
      {locationState.status === 'unavailable' && (
        <>
          <p>위치 정보를 가져올 수 없습니다.</p>
          <button onClick={retry}>다시 시도</button>
        </>
      )}
      {locationState.status === 'ready' && <WeatherView coords={locationState.coords} />}

      <FavoritesGrid />

      {isModalOpen && <SearchPlaceModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
}
