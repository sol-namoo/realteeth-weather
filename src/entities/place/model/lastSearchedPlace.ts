'use client';

import { SavedPlace } from './types';

const STORAGE_KEY = 'lastSaved';

export function loadLastPlace(id?: string): SavedPlace | null {
  if (typeof window === 'undefined') return null;

  const rawData = localStorage.getItem(STORAGE_KEY);
  if (!rawData) return null;

  const parsedData = JSON.parse(rawData);

  if (id && parsedData.id !== id) return null;

  return parsedData;
}

export function saveLastPlace(place: SavedPlace) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(place));
}
