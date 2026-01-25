export type WeatherCondition = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export type Precipitation1h = {
  '1h': number;
};

export type CurrentWeather = {
  dt: number;
  sunrise?: number;
  sunset?: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_gust?: number;
  wind_deg: number;
  rain?: Precipitation1h;
  snow?: Precipitation1h;
  weather: WeatherCondition[];
};

export type MinutelyWeather = {
  dt: number;
  precipitation: number;
};

export type HourlyWeather = {
  dt: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_gust?: number;
  wind_deg: number;
  pop: number;
  rain?: Precipitation1h;
  snow?: Precipitation1h;
  weather: WeatherCondition[];
};

export type DailyTemp = {
  morn: number;
  day: number;
  eve: number;
  night: number;
  min: number;
  max: number;
};

export type DailyFeelsLike = {
  morn: number;
  day: number;
  eve: number;
  night: number;
};

export type DailyWeather = {
  dt: number;
  sunrise?: number;
  sunset?: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  summary?: string;
  temp: DailyTemp;
  feels_like: DailyFeelsLike;
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_gust?: number;
  wind_deg: number;
  clouds: number;
  uvi: number;
  pop: number;
  rain?: number;
  snow?: number;
  weather: WeatherCondition[];
};

export type WeatherAlert = {
  sender_name: string;
  event: string;
  start: number;
  end: number;
  description: string;
  tags: string[];
};

export type WeatherOneCallApiResponse = {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: CurrentWeather;
  hourly: HourlyWeather[];
  daily: DailyWeather[];
};

export type WeatherSummary = {
  currentTemp: number;
  minTemp: number;
  maxTemp: number;
  icon?: string;
  description?: string;
};

export type WeatherApiResponse =
  | { ok: true; result: WeatherOneCallApiResponse }
  | { ok: false; message: string };

export type WeatherSummaryApiResponse =
  | { ok: true; result: WeatherSummary }
  | { ok: false; message: string };