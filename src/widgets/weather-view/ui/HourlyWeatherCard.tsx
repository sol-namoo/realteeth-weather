import { HourlyWeather } from '@/entities/weather/model/types';
import { dtToHour } from '@/widgets/lib/dtToHour';

type Props = {
  hourly: HourlyWeather[];
};

export const HourlyWeatherCard = ({ hourly }: Props) => {
  return (
    <div>
      <p>시간대별 기온</p>
      <ul>
        {hourly.map((hour) => {
          return (
            <li key={hour.dt}>
              {dtToHour(hour.dt)} : {hour.temp}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
