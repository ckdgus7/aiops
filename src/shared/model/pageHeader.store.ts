import { create } from "zustand";
import type { ReactNode } from "react";

interface BreadcrumbItem {
  label: string;
}

interface PageHeaderConfig {
  breadcrumbItems: BreadcrumbItem[];
  title: string;
  favoriteKey?: string;
  badge?: string;
  idBadge?: string;
  actions?: ReactNode;
  onBack?: () => void;
  showRefresh?: boolean;
  onRefresh?: () => void;
}

interface PageHeaderState extends PageHeaderConfig {
  setPageHeader: (config: PageHeaderConfig) => void;
  resetPageHeader: () => void;
}

const initialState: PageHeaderConfig = {
  breadcrumbItems: [],
  title: "",
  favoriteKey: undefined,
  badge: undefined,
  idBadge: undefined,
  actions: undefined,
  onBack: undefined,
  showRefresh: undefined,
  onRefresh: undefined,
};

export const usePageHeaderStore = create<PageHeaderState>((set) => ({
  ...initialState,
  setPageHeader: (config) => set(config),
  resetPageHeader: () => set(initialState),
}));
