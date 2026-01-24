'use client';
// “최근에 검색해서 들어온 1개”(임시 컨텍스트, 규칙 다름)

import { SavedPlace } from './types';

const STORAGE_KEY = 'lastSaved';

export function loadLastPlace(id?: string): SavedPlace | null {
  if (typeof window === 'undefined') return null;

  const rawData = localStorage.getItem(STORAGE_KEY);
  if (!rawData) return null;

  const parsedData = JSON.parse(rawData);

  // 특정 장소를 조회하고자 하였으나 실패한 경우
  if (id && parsedData.id !== id) return null;

  return parsedData;
}

export function saveLastPlace(place: SavedPlace) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(place));
}

// 현재 사용처 없음
export function clearLastPlace() {
  localStorage.removeItem(STORAGE_KEY);
}
