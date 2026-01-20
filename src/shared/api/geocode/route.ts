import { NextResponse } from 'next/server';
import { env } from '@/shared/config/env';

// Todo: 타입 정의 분리?
type KakaoAddressDoc = {
  address_name: string;
  x: string; // lon
  y: string; // lat
  address_type: string;
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q');

  if (!q) {
    // Todo: ui에서 "q is required" 처리
    return NextResponse.json({ message: 'q is required' }, { status: 400 });
  }

  const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(q)}`;

  const res = await fetch(url, {
    headers: { Authorization: `KakaoAK ${env.KAKAO_REST_KEY}` },
    cache: 'no-store',
  });

  if (!res.ok) {
    return NextResponse.json({ message: 'kakao geocode failed' }, { status: res.status });
  }

  const data = (await res.json()) as { documents: KakaoAddressDoc[] };
  const docs = data.documents ?? [];

  if (docs.length === 0) {
    // Todo: "해당 장소의 정보가 제공되지 않습니다" 처리
    return NextResponse.json({ message: 'no result' }, { status: 404 });
  }

  return NextResponse.json({
    addressName: docs[0].address_name,
    lat: Number(docs[0].y),
    lon: Number(docs[0].x),
  });
}
