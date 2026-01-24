// 사용자가 저장한 목록(최대 6개, 별칭 수정, 삭제)

import type { SavedPlace } from './types';

const STORAGE_KEY = 'favorites';
const MAX_FAVORITES = 6;

const parseJson = (json: string | null): SavedPlace[] => {
  if (!json) return [];
  const data = JSON.parse(json);
  if (!Array.isArray(data)) return [];
  return data.filter((x) => x);
};

export const loadFavorites = (): SavedPlace[] => {
  if (typeof window === 'undefined') return [];
  return parseJson(localStorage.getItem(STORAGE_KEY));
};

export const saveFavorites = (list: SavedPlace[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
};

export const getFavoriteById = (id: string): SavedPlace | undefined => {
  return loadFavorites().find((p) => p.id === id);
};

export const isFavorite = (id: string): boolean => {
  return !!getFavoriteById(id);
};

export const canAddMore = (): boolean => {
  return loadFavorites().length < MAX_FAVORITES;
};

export const addFavorite = (
  place: SavedPlace,
): { ok: true } | { ok: false; reason: 'max' | 'duplicate' } => {
  const list = loadFavorites();

  if (list.some((p) => p.id === place.id)) return { ok: false, reason: 'duplicate' };
  if (list.length >= MAX_FAVORITES) return { ok: false, reason: 'max' };

  const updated = [place, ...list];
  saveFavorites(updated);
  return { ok: true };
};

export const removeFavorite = (id: string) => {
  const list = loadFavorites();
  const updated = list.filter((p) => p.id !== id);
  saveFavorites(updated);
};

export const updateFavorite = (
  id: string,
  patch: Partial<Pick<SavedPlace, 'alias' | 'placeName'>>,
) => {
  const list = loadFavorites();
  const updated = list.map((p) => (p.id === id ? { ...p, ...patch } : p));
  saveFavorites(updated);
};
