import type { NoticeDetail, NoticeListResponse } from "@/features/notices/model/types";

const DB: Array<NoticeDetail> = [
  { id: 1, title: "시스템 점검 안내", createdAt: "2026-02-27", views: 124, content: "2/27(목) 02:00~04:00 시스템 점검이 진행됩니다." },
  { id: 2, title: "신규 기능 업데이트", createdAt: "2026-02-26", views: 98, content: "공지사항 검색 기능 및 UI가 개선되었습니다." },
  { id: 3, title: "개인정보 처리방침 변경", createdAt: "2026-02-25", views: 301, content: "처리방침이 일부 변경되어 공지드립니다." },
  { id: 4, title: "이벤트 당첨자 발표", createdAt: "2026-02-24", views: 512, content: "이벤트 당첨자 명단을 확인해주세요." },
  { id: 5, title: "서비스 오픈 안내", createdAt: "2026-02-23", views: 888, content: "서비스가 정식 오픈되었습니다." },
  { id: 6, title: "보안 패치 완료 공지", createdAt: "2026-02-22", views: 76, content: "보안 패치가 완료되었습니다." },
  { id: 7, title: "데이터 마이그레이션 안내", createdAt: "2026-02-21", views: 143, content: "2/21 데이터 마이그레이션이 진행됩니다." },
  { id: 8, title: "신규 모듈 배포 공지", createdAt: "2026-02-20", views: 67, content: "신규 모듈이 배포되었습니다." },
  { id: 9, title: "정기 점검 일정 변경", createdAt: "2026-02-19", views: 210, content: "정기 점검 일정이 변경되었습니다." },
  { id: 10, title: "API 버전 업데이트", createdAt: "2026-02-18", views: 155, content: "API v2.0이 적용되었습니다." },
  { id: 11, title: "사용자 매뉴얼 업데이트", createdAt: "2026-02-17", views: 89, content: "사용자 매뉴얼이 업데이트되었습니다." },
  { id: 12, title: "시스템 성능 개선 안내", createdAt: "2026-02-16", views: 334, content: "시스템 성능이 개선되었습니다." },
  { id: 13, title: "신규 대시보드 오픈", createdAt: "2026-02-15", views: 445, content: "신규 대시보드가 오픈되었습니다." },
  { id: 14, title: "서버 증설 완료", createdAt: "2026-02-14", views: 102, content: "서버 증설이 완료되었습니다." },
  { id: 15, title: "모니터링 시스템 도입", createdAt: "2026-02-13", views: 178, content: "실시간 모니터링 시스템이 도입되었습니다." },
  { id: 16, title: "접근 권한 정책 변경", createdAt: "2026-02-12", views: 267, content: "접근 권한 정책이 변경되었습니다." },
  { id: 17, title: "테스트 환경 구축 안내", createdAt: "2026-02-11", views: 54, content: "테스트 환경이 구축되었습니다." },
  { id: 18, title: "코드 리뷰 가이드 공지", createdAt: "2026-02-10", views: 321, content: "코드 리뷰 가이드가 공지되었습니다." },
  { id: 19, title: "CI/CD 파이프라인 업데이트", createdAt: "2026-02-09", views: 198, content: "CI/CD 파이프라인이 업데이트되었습니다." },
  { id: 20, title: "연간 시스템 운영 계획", createdAt: "2026-02-08", views: 412, content: "연간 시스템 운영 계획을 공유합니다." },
];

function isWithin(date: string, from?: string, to?: string) {
  const d = new Date(date + "T00:00:00");
  if (from) {
    const f = new Date(from + "T00:00:00");
    if (d < f) return false;
  }
  if (to) {
    const t = new Date(to + "T23:59:59");
    if (d > t) return false;
  }
  return true;
}

function mockNoticeApi(url: string, init?: RequestInit): { ok: boolean; status: number; json: any } | null {
  if (!url.startsWith("/api/notices")) return null;
  if ((init?.method ?? "GET").toUpperCase() !== "GET") {
    return { ok: false, status: 405, json: { message: "Method Not Allowed" } };
  }

  const detailMatch = url.match(/^\/api\/notices\/(\d+)(\?.*)?$/);
  if (detailMatch) {
    const id = Number(detailMatch[1]);
    const found = DB.find((x) => x.id === id);
    if (!found) return { ok: false, status: 404, json: { message: "Not Found" } };
    return { ok: true, status: 200, json: found };
  }

  const qsIndex = url.indexOf("?");
  const search = qsIndex >= 0 ? url.substring(qsIndex + 1) : "";
  const sp = new URLSearchParams(search);
  const title = (sp.get("title") ?? "").trim().toLowerCase();
  const fromDate = sp.get("fromDate") ?? undefined;
  const toDate = sp.get("toDate") ?? undefined;
  const page = Math.max(1, Number(sp.get("page") ?? 1));
  const pageSize = Math.max(1, Number(sp.get("pageSize") ?? 10));

  const filtered = DB
    .filter((x) => (title ? x.title.toLowerCase().includes(title) : true))
    .filter((x) => isWithin(x.createdAt, fromDate, toDate))
    .map(({ content, ...rest }) => rest)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize;
  const items = filtered.slice(start, start + pageSize);

  const resp: NoticeListResponse = { items, total, page, totalPages };
  return { ok: true, status: 200, json: resp };
}

export async function http<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const url = typeof input === "string" ? input : input.url;

  const mocked = mockNoticeApi(url, init);
  if (mocked) {
    if (!mocked.ok) throw new Error(mocked.json?.message ?? `HTTP ${mocked.status}`);
    return mocked.json as T;
  }

  const res = await fetch(input, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `HTTP ${res.status}`);
  }

  return (await res.json()) as T;
}
