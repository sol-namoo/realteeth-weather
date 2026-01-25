import { NextResponse } from 'next/server';
import { env } from '@/shared/config/env';
import { GeocodeResult } from '@/entities/place/model/types';

type KakaoAddressDoc = {
  address_name: string;
  x: string; // lon
  y: string; // lat
  address_type: string;
};

type GeocodeApiResponse = { ok: true; result: GeocodeResult } | { ok: false; message: string };

export async function GET(req: Request): Promise<NextResponse<GeocodeApiResponse>> {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('query');

  if (!q) {
    return NextResponse.json({ ok: false, message: 'query is required' }, { status: 400 });
  }

  const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(q)}`;

  const res = await fetch(url, {
    headers: { Authorization: `KakaoAK ${env.KAKAO_REST_KEY}` },
    cache: 'no-store',
  });

  if (!res.ok) {
    return NextResponse.json(
      { ok: false, message: 'kakao geocode failed' },
      { status: res.status },
    );
  }

  const data = (await res.json()) as { documents: KakaoAddressDoc[] };
  const docs = data.documents ?? [];

  if (docs.length === 0) {
    return NextResponse.json({ ok: false, message: 'no result' }, { status: 404 });
  }

  return NextResponse.json({
    ok: true,
    result: { placeName: docs[0].address_name, lat: Number(docs[0].y), lon: Number(docs[0].x) },
  });
}
