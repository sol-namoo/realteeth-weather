// 위치, 현재 기온, 당일의 최저 기온, 당일의 최고 기온

import { CurrentWeather, DailyWeather } from '@/entities/weather/model/types';

type Props = {
  current: CurrentWeather;
  daily: DailyWeather[];
};

export const CurrentWeatherCard = ({ current, daily }: Props) => {
  return (
    <>
      <div>
        <p>
          현재 기온: <span>{current.temp}</span>{' '}
        </p>
      </div>
      <div>
        <p>
          위치: <span>{current.temp}</span>{' '}
        </p>
      </div>
      <div>
        <p>
          오늘의 최고 기온: <span>{daily[0].temp.max}</span>{' '}
        </p>
      </div>
      <div>
        <p>
          오늘의 최고 기온: <span>{daily[0].temp.min}</span>{' '}
        </p>
      </div>
    </>
  );
};
