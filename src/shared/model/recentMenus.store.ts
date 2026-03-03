import { create } from "zustand";

interface RecentMenusState {
  recentMenus: string[];
  addRecentMenu: (item: string) => void;
  removeRecentMenu: (item: string) => void;
  clearAllRecentMenus: () => void;
}

export const useRecentMenusStore = create<RecentMenusState>((set) => ({
  recentMenus: [],

  addRecentMenu: (item) =>
    set((s) => {
      const filtered = s.recentMenus.filter((m) => m !== item);
      return { recentMenus: [item, ...filtered].slice(0, 5) };
    }),

  removeRecentMenu: (item) =>
    set((s) => ({
      recentMenus: s.recentMenus.filter((m) => m !== item),
    })),

  clearAllRecentMenus: () => set({ recentMenus: [] }),
}));
