'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  addFavorite,
  loadFavorites,
  removeFavorite,
  updateFavorite,
} from '@/entities/place/model/favorites';
import type { SavedPlace } from '@/entities/place/model/types';

const MAX_FAVORITES = 6;

export const useFavorite = () => {
  const [favorites, setFavorites] = useState<SavedPlace[]>([]);

  useEffect(() => {
    setFavorites(loadFavorites());
  }, []);

  return useMemo(
    () => ({
      favorites,
      canAddMore: favorites.length < MAX_FAVORITES,
      add: (place: SavedPlace) => {
        const result = addFavorite(place);
        setFavorites(loadFavorites());
        return result;
      },
      remove: (id: string) => {
        removeFavorite(id);
        setFavorites(loadFavorites());
      },
      update: (id: string, patch: Partial<Pick<SavedPlace, 'alias' | 'placeName'>>) => {
        updateFavorite(id, patch);
        setFavorites(loadFavorites());
      },
    }),
    [favorites],
  );
};
