import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { Notice } from "../model/types";
import { NOTICE_MOCK_DATA, getNoticeDetail } from "../model/mock-data";

interface NoticeListParams {
  category?: string;
  searchScope?: string;
  keyword?: string;
  page?: number;
  pageSize?: number;
  sortKey?: string | null;
  sortDir?: string | null;
}

interface NoticeListResponse {
  items: Notice[];
  total: number;
  page: number;
  totalPages: number;
}

const keys = {
  all: ["notices"] as const,
  list: (params: NoticeListParams) => ["notices", "list", params] as const,
  detail: (id: number) => ["notices", "detail", id] as const,
};

function filterAndSort(params: NoticeListParams): NoticeListResponse {
  const {
    category = "",
    searchScope = "전체",
    keyword = "",
    page = 1,
    pageSize = 10,
    sortKey = null,
    sortDir = null,
  } = params;

  let filtered = [...NOTICE_MOCK_DATA];

  if (category) {
    filtered = filtered.filter((item) => item.category === category);
  }

  if (keyword) {
    const kw = keyword.toLowerCase();
    filtered = filtered.filter((item) => {
      if (searchScope === "제목") return item.title.toLowerCase().includes(kw);
      if (searchScope === "작성자") return item.author.toLowerCase().includes(kw);
      return (
        item.title.toLowerCase().includes(kw) ||
        item.author.toLowerCase().includes(kw)
      );
    });
  }

  if (sortKey && sortDir) {
    filtered.sort((a, b) => {
      const aVal = a[sortKey as keyof Notice];
      const bVal = b[sortKey as keyof Notice];
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDir === "asc" ? aVal - bVal : bVal - aVal;
      }
      return sortDir === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);
  const startIdx = (safePage - 1) * pageSize;
  const items = filtered.slice(startIdx, startIdx + pageSize);

  return { items, total, page: safePage, totalPages };
}

export function useNoticesQuery(params: NoticeListParams) {
  const normalized: NoticeListParams = {
    category: params.category ?? "",
    searchScope: params.searchScope ?? "전체",
    keyword: params.keyword ?? "",
    page: params.page ?? 1,
    pageSize: params.pageSize ?? 10,
    sortKey: params.sortKey ?? null,
    sortDir: params.sortDir ?? null,
  };

  return useQuery({
    queryKey: keys.list(normalized),
    queryFn: () => Promise.resolve(filterAndSort(normalized)),
    placeholderData: keepPreviousData,
  });
}

export function useNoticeDetailQuery(id: number) {
  return useQuery({
    queryKey: keys.detail(id),
    queryFn: () => {
      const detail = getNoticeDetail(id);
      if (!detail) throw new Error(`Notice ${id} not found`);
      return detail;
    },
    enabled: id > 0,
  });
}
