import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { http } from "@/shared/lib/http";
import type { NoticeDetail, NoticeListParams, NoticeListResponse } from "../model/types";

const keys = {
  all: ["notices"] as const,
  list: (params: NoticeListParams) => ["notices", "list", params] as const,
  detail: (id: number) => ["notices", "detail", id] as const,
};

export function useNoticesQuery(params: NoticeListParams) {
  const normalized: NoticeListParams = {
    title: params.title ?? "",
    fromDate: params.fromDate ?? "",
    toDate: params.toDate ?? "",
    page: params.page ?? 1,
    pageSize: params.pageSize ?? 10,
  };

  return useQuery({
    queryKey: keys.list(normalized),
    queryFn: async () => {
      const sp = new URLSearchParams();
      if (normalized.title) sp.set("title", normalized.title);
      if (normalized.fromDate) sp.set("fromDate", normalized.fromDate);
      if (normalized.toDate) sp.set("toDate", normalized.toDate);
      sp.set("page", String(normalized.page));
      sp.set("pageSize", String(normalized.pageSize));
      const qs = sp.toString();
      return http<NoticeListResponse>(`/api/notices${qs ? `?${qs}` : ""}`);
    },
    placeholderData: keepPreviousData,
  });
}

export function useNoticeQuery(id: number) {
  return useQuery({
    queryKey: keys.detail(id),
    queryFn: () => http<NoticeDetail>(`/api/notices/${id}`),
    enabled: Number.isFinite(id) && id > 0,
  });
}
