import { NextResponse } from 'next/server';
import { env } from '@/shared/config/env';
import type { WeatherApiResponse, WeatherOneCallApiResponse } from '@/entities/weather/model/types';

export async function GET(req: Request): Promise<NextResponse<WeatherApiResponse>> {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  if (!lat || !lon) {
    const payload: WeatherApiResponse = { ok: false, message: 'lat/lon required' };
    return NextResponse.json(payload, { status: 400 });
  }

  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${env.OPENWEATHER_KEY}&units=metric&lang=kr`;

  const res = await fetch(url, { cache: 'no-store' });

  if (!res.ok) {
    const payload: WeatherApiResponse = { ok: false, message: 'weather fetch failed' };
    return NextResponse.json(payload, { status: res.status });
  }

  const data = (await res.json()) as WeatherOneCallApiResponse;
  const payload: WeatherApiResponse = { ok: true, result: data };
  return NextResponse.json(payload);
}
