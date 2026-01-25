'use client';

import { Coords } from '@/entities/place/model/types';
import { useGetWeather } from '@/entities/weather';
import { StateCard } from '@/shared/ui';
import { CurrentWeatherCard } from './CurrentWeatherCard';
import { HourlyWeatherCard } from './HourlyWeatherCard';

type Props = {
  coords: Coords;
};

export const WeatherView = ({ coords }: Props) => {
  const { isPending, isError, data } = useGetWeather(coords);

  if (isPending) {
    return (
      <StateCard>
        <p>날씨 정보 로딩 중입니다</p>
      </StateCard>
    );
  }

  if (isError) {
    return (
      <StateCard>
        <p >해당 장소의 날씨 정보가 제공되지 않습니다.</p>
      </StateCard>
    );
  }

  return (
    <section className="grid gap-4 md:grid-cols-2">
      <CurrentWeatherCard daily={data.daily} current={data.current} />
      <HourlyWeatherCard hourly={data.hourly} />
    </section>
  );
};
