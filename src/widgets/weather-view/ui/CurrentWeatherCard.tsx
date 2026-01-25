import { CurrentWeather, DailyWeather } from '@/entities/weather/model/types';
import { Card } from '@/shared/ui';

type Props = {
  current: CurrentWeather;
  daily: DailyWeather[];
};

export const CurrentWeatherCard = ({ current, daily }: Props) => {
  return (
    <Card>
      <div>
        <p>
          현재 기온: <span>{Math.round(current.temp)}°</span>
        </p>
      </div>
      <div>
        <p>
          위치: <span>{Math.round(current.temp)}°</span>
        </p>
      </div>
      <div>
        <p>
          오늘의 최고 기온: <span>{Math.round(daily[0].temp.max)}°</span>
        </p>
      </div>
      <div>
        <p>
          오늘의 최저 기온: <span>{Math.round(daily[0].temp.min)}°</span>
        </p>
      </div>
    </Card>
  );
};
