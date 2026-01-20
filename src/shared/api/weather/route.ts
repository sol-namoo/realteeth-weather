import { NextResponse } from 'next/server';
import { env } from '@/shared/config/env';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  if (!lat || !lon) {
    return NextResponse.json({ message: 'lat/lon required' }, { status: 400 });
  }

  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${env.OPENWEATHER_KEY}&units=metric&lang=kr`;

  const res = await fetch(url, { cache: 'no-store' });

  if (!res.ok) {
    return NextResponse.json({ message: 'weather fetch failed' }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
}
