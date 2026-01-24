import { HourlyWeather } from '@/entities/weather/model/types';
import { dtToHour } from '@/widgets/lib/dtToHour';
import { Card } from '@/shared/ui';

type Props = {
  hourly: HourlyWeather[];
};

export const HourlyWeatherCard = ({ hourly }: Props) => {
  return (
    <Card className="md:max-h-96 md:overflow-y-auto">
      <p>시간대별 기온</p>
      <ul>
        {hourly.map((hour) => {
          return (
            <li key={hour.dt}>
              {dtToHour(hour.dt)}시 : {Math.round(hour.temp)}°
            </li>
          );
        })}
      </ul>
    </Card>
  );
};
