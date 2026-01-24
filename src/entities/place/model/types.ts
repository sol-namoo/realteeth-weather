type Coords = { lat: number; lon: number };

type GeocodeResult = Coords & {
  placeName: string;
};

type GeocodeApiResponse = { ok: true; result: GeocodeResult } | { ok: false; message: string };

type SavedPlace = GeocodeResult & {
  id: string; // `${lat}&${lon}`
  alias?: string; // 사용자 별칭
};

export type { Coords, GeocodeResult, GeocodeApiResponse, SavedPlace };
