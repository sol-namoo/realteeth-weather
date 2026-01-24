'use client';

// 위치 그리고 날씨 정보(현재 기온, 당일의 최저 기온, 당일의 최고 기온, 시간대 별 기온)

import { Coords } from '@/entities/place/model/types';
import { useGetWeather } from '@/entities/weather';
import { CurrentWeatherCard } from './CurrentWeatherCard';
import { HourlyWeatherCard } from './HourlyWeatherCard';

type Props = {
  coords: Coords;
};

export const WeatherView = ({ coords }: Props) => {
  const { isPending, isError, data } = useGetWeather(coords);

  if (isPending) {
    return <p>날씨 정보 로딩 중입니다</p>;
  }

  if (isError) {
    return (
      <>
        <p>해당 장소의 날씨 정보가 제공되지 않습니다.</p>
      </>
    );
  }

  return (
    <>
      <CurrentWeatherCard daily={data.daily} current={data.current} />
      <HourlyWeatherCard hourly={data.hourly} />
    </>
  );
};
