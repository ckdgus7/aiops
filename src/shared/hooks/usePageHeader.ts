import { useEffect, useMemo } from "react";
import type { ReactNode } from "react";
import { usePageHeaderStore } from "@/shared/model/pageHeader.store";

interface UsePageHeaderConfig {
  breadcrumbItems: { label: string }[];
  title: string;
  favoriteKey?: string;
  badge?: string;
  idBadge?: string;
  actions?: ReactNode;
  onBack?: () => void;
  showRefresh?: boolean;
  onRefresh?: () => void;
}

export function usePageHeader(config: UsePageHeaderConfig) {
  const setPageHeader = usePageHeaderStore((s) => s.setPageHeader);
  const resetPageHeader = usePageHeaderStore((s) => s.resetPageHeader);

  const breadcrumbKey = useMemo(
    () => config.breadcrumbItems.map((i) => i.label).join("/"),
    [config.breadcrumbItems],
  );

  useEffect(() => {
    setPageHeader(config);
  }, [
    setPageHeader,
    breadcrumbKey,
    config.title,
    config.favoriteKey,
    config.badge,
    config.idBadge,
    config.actions,
    config.onBack,
    config.showRefresh,
    config.onRefresh,
  ]);

  useEffect(() => {
    return () => {
      resetPageHeader();
    };
  }, [resetPageHeader]);
}
