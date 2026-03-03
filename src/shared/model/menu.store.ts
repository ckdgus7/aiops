import { create } from "zustand";

export interface LnbItem {
  name: string;
  path: string;
}

interface GnbMenuItem {
  id: string;
  gnbName: string;
  lnb: LnbItem[];
}

interface MenuState {
  menuItems: GnbMenuItem[];
  loaded: boolean;
  fetchMenu: () => Promise<void>;
  getLnbItems: (gnbName: string) => LnbItem[];
}

export const useMenuStore = create<MenuState>((set, get) => ({
  menuItems: [],
  loaded: false,

  fetchMenu: async () => {
    if (get().loaded) return;
    try {
      const res = await fetch("/menu-mock-data.json");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: GnbMenuItem[] = await res.json();
      set({ menuItems: data, loaded: true });
    } catch {
      set({ menuItems: [], loaded: true });
    }
  },

  getLnbItems: (gnbName: string) => {
    const found = get().menuItems.find((m) => m.gnbName === gnbName);
    return found?.lnb ?? [];
  },
}));
