import { useEffect, useMemo, useState } from 'react';
import { addFavorite, loadFavorites, removeFavorite, updateFavorite } from './favorites';
import type { SavedPlace } from './types';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<SavedPlace[]>([]);

  useEffect(() => {
    setFavorites(loadFavorites());
  }, []);

  const api = useMemo(
    () => ({
      favorites,
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

  return api;
};
