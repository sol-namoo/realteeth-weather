import { useCallback, useEffect, useState } from 'react';
import { Coords } from '@/entities/place/model/types';

type InitialPlaceState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'ready'; coords: Coords }
  | { status: 'denied' }
  | { status: 'unavailable'; message?: string };

export const useGetInitialPlace = () => {
  // geolocation 성공하면 해당 좌표로 fetch
  // 실패하면 localStorage 마지막 위치
  // 없으면 서울

  const [locationState, setLocationState] = useState<InitialPlaceState>({ status: 'idle' });

  const request = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationState({ status: 'unavailable', message: 'Geolocation not supported' });
      return;
    }

    setLocationState({ status: 'loading' });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationState({
          status: 'ready',
          coords: {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          },
        });
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          setLocationState({ status: 'denied' });
        } else {
          setLocationState({
            status: 'unavailable',
            message: error.message,
          });
        }
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
      },
    );
  }, []);

  useEffect(() => {
    request();
  }, [request]);

  return {
    locationState,
    retry: request,
  };
};
