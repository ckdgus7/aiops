import { create } from "zustand";

interface FavoritesState {
  favorites: string[];
  addFavorite: (item: string) => void;
  removeFavorite: (item: string) => void;
  toggleFavorite: (item: string) => void;
  isFavorite: (item: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],

  addFavorite: (item) =>
    set((s) => ({
      favorites: s.favorites.includes(item) ? s.favorites : [...s.favorites, item],
    })),

  removeFavorite: (item) =>
    set((s) => ({
      favorites: s.favorites.filter((f) => f !== item),
    })),

  toggleFavorite: (item) => {
    const { favorites } = get();
    if (favorites.includes(item)) {
      set({ favorites: favorites.filter((f) => f !== item) });
    } else {
      set({ favorites: [...favorites, item] });
    }
  },

  isFavorite: (item) => get().favorites.includes(item),
}));
