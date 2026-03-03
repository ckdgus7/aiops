import { create } from "zustand";

export interface MdiTabItem {
  id: string;
  label: string;
  path: string;
}

interface MdiState {
  tabs: MdiTabItem[];
  activeTabId: string | null;
  addTab: (tab: MdiTabItem) => void;
  removeTab: (id: string) => void;
  setActiveTab: (id: string) => void;
  closeOtherTabs: (id: string) => void;
  closeAllTabs: () => void;
}

export const useMdiStore = create<MdiState>((set, get) => ({
  tabs: [],
  activeTabId: null,

  addTab: (tab) => {
    const { tabs } = get();
    const existing = tabs.find((t) => t.id === tab.id);
    if (existing) {
      set({ activeTabId: tab.id });
      return;
    }
    set({ tabs: [...tabs, tab], activeTabId: tab.id });
  },

  removeTab: (id) => {
    const { tabs, activeTabId } = get();
    const idx = tabs.findIndex((t) => t.id === id);
    const next = tabs.filter((t) => t.id !== id);
    if (activeTabId === id) {
      const newActive =
        next.length === 0
          ? null
          : next[Math.min(idx, next.length - 1)]?.id ?? null;
      set({ tabs: next, activeTabId: newActive });
    } else {
      set({ tabs: next });
    }
  },

  setActiveTab: (id) => set({ activeTabId: id }),

  closeOtherTabs: (id) => {
    const { tabs } = get();
    set({ tabs: tabs.filter((t) => t.id === id), activeTabId: id });
  },

  closeAllTabs: () => set({ tabs: [], activeTabId: null }),
}));
