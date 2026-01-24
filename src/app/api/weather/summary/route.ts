import { NextResponse } from 'next/server';
import { env } from '@/shared/config/env';
import type {
  WeatherOneCallApiResponse,
  WeatherSummaryApiResponse,
} from '@/entities/weather/model/types';

export async function GET(
  req: Request,
): Promise<NextResponse<WeatherSummaryApiResponse>> {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  if (!lat || !lon) {
    const payload: WeatherSummaryApiResponse = { ok: false, message: 'lat/lon required' };
    return NextResponse.json(payload, { status: 400 });
  }

  const url =
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}` +
    `&lon=${lon}&appid=${env.OPENWEATHER_KEY}&units=metric&lang=kr` +
    `&exclude=minutely,hourly,alerts`;

  const res = await fetch(url, { cache: 'no-store' });

  if (!res.ok) {
    const payload: WeatherSummaryApiResponse = { ok: false, message: 'weather fetch failed' };
    return NextResponse.json(payload, { status: res.status });
  }

  const data = (await res.json()) as WeatherOneCallApiResponse;
  const today = data.daily?.[0];
  const current = data.current;

  if (!current || !today) {
    const payload: WeatherSummaryApiResponse = { ok: false, message: 'weather data unavailable' };
    return NextResponse.json(payload, { status: 502 });
  }

  const payload: WeatherSummaryApiResponse = {
    ok: true,
    result: {
      currentTemp: current.temp,
      minTemp: today.temp.min,
      maxTemp: today.temp.max,
      icon: current.weather[0]?.icon,
      description: current.weather[0]?.description,
    },
  };

  return NextResponse.json(payload);
}
