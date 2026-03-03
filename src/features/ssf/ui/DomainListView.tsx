import { useState, useEffect, type CSSProperties } from "react";
import { PageHeader } from "@/shared/ui/PageHeader";
import { Breadcrumb } from "@/shared/ui/Breadcrumb";
import { PageTitle } from "@/shared/ui/PageTitle";
import { ChooseButton } from "@/shared/ui/ChooseButton";
import { Input } from "@/shared/ui/Input";
import { Button } from "@/shared/ui/Button";
import { useMdiStore } from "@/shared/model/mdi.store";
import type { SortKey, SortDir } from "@/features/ssf/model/types";
import { DOMAIN_MOCK_DATA } from "@/features/ssf/model/mock-data";

const FONT = "'Pretendard', sans-serif";

function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0, cursor: "pointer" }}>
      <path d="M6 7L9 4L12 7" stroke={active && dir === "asc" ? "#7a5af8" : "#a1a1aa"} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 11L9 14L12 11" stroke={active && dir === "desc" ? "#7a5af8" : "#a1a1aa"} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronLeftIcon({ disabled }: { disabled?: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ opacity: disabled ? 0.4 : 1 }}>
      <path d="M12 5L7 10L12 15" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRightIcon({ disabled }: { disabled?: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ opacity: disabled ? 0.4 : 1 }}>
      <path d="M8 5L13 10L8 15" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronDoubleLeftIcon({ disabled }: { disabled?: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ opacity: disabled ? 0.4 : 1 }}>
      <path d="M11 5L6 10L11 15" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 5L10 10L15 15" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronDoubleRightIcon({ disabled }: { disabled?: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ opacity: disabled ? 0.4 : 1 }}>
      <path d="M5 5L10 10L5 15" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 5L14 10L9 15" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 3V13M10 13L6 9M10 13L14 9" stroke="#71717a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 15V16C3 16.5523 3.44772 17 4 17H16C16.5523 17 17 16.5523 17 16V15" stroke="#71717a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const s = {
  outer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minHeight: "100%",
    fontFamily: FONT,
  } satisfies CSSProperties,
  main: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    padding: 32,
    flex: 1,
  } satisfies CSSProperties,
  filterWrap: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    padding: "16px 24px",
    backgroundColor: "#f8f9fc",
    borderRadius: 8,
  } satisfies CSSProperties,
  filterLeft: {
    display: "flex",
    alignItems: "center",
    gap: 0,
  } satisfies CSSProperties,
  filterRight: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    width: 384,
  } satisfies CSSProperties,
  listWrap: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  } satisfies CSSProperties,
  tableFunction: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  } satisfies CSSProperties,
  tableFuncLeft: {
    display: "flex",
    alignItems: "center",
    gap: 32,
  } satisfies CSSProperties,
  badge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "4px 12px",
    borderRadius: 12,
    border: "1px solid #71717a",
    backgroundColor: "#fafafa",
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "16px",
    color: "#71717a",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  listAction: {
    display: "flex",
    alignItems: "center",
    gap: 24,
    paddingBottom: 8,
  } satisfies CSSProperties,
  paginationField: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  } satisfies CSSProperties,
  paginationLabel: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "18px",
    color: "#a1a1aa",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  itemsSelect: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    height: 40,
    padding: "3px 4px",
    border: "1px solid #e4e7ec",
    borderRadius: 4,
    backgroundColor: "white",
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "20px",
    color: "#3f3f46",
    cursor: "pointer",
    boxSizing: "border-box",
    outline: "none",
  } satisfies CSSProperties,
  indicator: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "20px",
    color: "#71717a",
    textAlign: "center",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  paginationWrap: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  } satisfies CSSProperties,
  pageBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    padding: 0,
    borderRadius: 4,
  } satisfies CSSProperties,
  pageBtnActive: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "20px",
    color: "#71717a",
    padding: "0 6px",
    opacity: 1,
  } satisfies CSSProperties,
  pageBtnInactive: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "20px",
    color: "#71717a",
    padding: "0 6px",
    opacity: 0.4,
  } satisfies CSSProperties,
  downloadBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    padding: 0,
    borderRadius: 4,
  } satisfies CSSProperties,
  table: {
    width: "100%",
    borderCollapse: "collapse",
    border: "1px solid #e4e4e7",
    borderRadius: 4,
    overflow: "hidden",
    tableLayout: "fixed",
  } satisfies CSSProperties,
  th: {
    backgroundColor: "#f4f4f5",
    border: "1px solid #e4e4e7",
    padding: 8,
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "20px",
    color: "black",
    textAlign: "center",
    whiteSpace: "nowrap",
    minHeight: 36,
    boxSizing: "border-box",
  } satisfies CSSProperties,
  thInner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    width: "100%",
  } satisfies CSSProperties,
  td: {
    backgroundColor: "white",
    border: "1px solid #e4e4e7",
    padding: 8,
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "20px",
    color: "black",
    textAlign: "center",
    minHeight: 40,
    boxSizing: "border-box",
    verticalAlign: "middle",
  } satisfies CSSProperties,
  tdLeft: {
    textAlign: "left",
  } satisfies CSSProperties,
  useBadge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "4px 12px",
    borderRadius: 12,
    border: "1px solid #7a5af8",
    backgroundColor: "#fafaff",
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "16px",
    color: "#7a5af8",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  unuseBadge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "4px 12px",
    borderRadius: 12,
    border: "1px solid #a1a1aa",
    backgroundColor: "#fafafa",
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "16px",
    color: "#a1a1aa",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
};

const COLUMNS: { key: SortKey; label: string; width: number | string; align?: "left" | "center" }[] = [
  { key: "no", label: "No", width: 80, align: "center" },
  { key: "abbr", label: "도메인(약어)", width: 139, align: "center" },
  { key: "nameKo", label: "도메인(한글)", width: 190, align: "center" },
  { key: "nameEn", label: "도메인(영문)", width: 200, align: "center" },
  { key: "description", label: "도메인 설명", width: "auto", align: "left" },
  { key: "useYn", label: "사용여부", width: 120, align: "center" },
];

export function DomainListView() {
  const addTab = useMdiStore((st) => st.addTab);
  useEffect(() => {
    addTab({ id: "/ssf/domain", label: "도메인(L1)정보 관리", path: "/ssf/domain" });
  }, [addTab]);

  const [statusFilter, setStatusFilter] = useState("전체");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      if (sortDir === "asc") setSortDir("desc");
      else if (sortDir === "desc") { setSortKey(null); setSortDir(null); }
      else setSortDir("asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const filtered = DOMAIN_MOCK_DATA.filter((item) => {
    if (statusFilter === "사용" && item.useYn !== "사용") return false;
    if (statusFilter === "미사용" && item.useYn !== "미사용") return false;
    if (searchKeyword) {
      const kw = searchKeyword.toLowerCase();
      return (
        item.nameKo.toLowerCase().includes(kw) ||
        item.nameEn.toLowerCase().includes(kw) ||
        item.abbr.toLowerCase().includes(kw)
      );
    }
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (!sortKey || !sortDir) return 0;
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    if (typeof aVal === "number" && typeof bVal === "number") {
      return sortDir === "asc" ? aVal - bVal : bVal - aVal;
    }
    return sortDir === "asc"
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal));
  });

  const totalCount = sorted.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / itemsPerPage));
  const safePage = Math.min(page, totalPages);
  const startIdx = (safePage - 1) * itemsPerPage;
  const pageItems = sorted.slice(startIdx, startIdx + itemsPerPage);

  const pageNumbers: (number | string)[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
  } else {
    pageNumbers.push(1, 2, 3, 4, 5, "...", totalPages);
  }

  const handleSearch = () => {
    setPage(1);
  };

  return (
    <div style={s.outer}>
      <PageHeader>
        <Breadcrumb items={[{ label: "SSF관리" }, { label: "도메인(L1)정보 관리" }]} />
        <PageTitle title="도메인(L1)정보 관리" favoriteKey="도메인(L1)정보 관리" />
      </PageHeader>

      <div style={s.main}>
        <div style={s.filterWrap}>
          <div style={s.filterLeft}>
            <ChooseButton
              value={statusFilter}
              onChange={(v) => { setStatusFilter(v); setPage(1); }}
              options={[
                { label: "전체", value: "전체" },
                { label: "사용", value: "사용" },
                { label: "미사용", value: "미사용" },
              ]}
            />
          </div>
          <div style={s.filterRight}>
            <Input
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="도메인명이나 약어로 검색하세요."
              prefix="search"
              indicator={`${searchKeyword.length}/20`}
              maxLength={20}
              style={{ flex: 1 }}
              onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
            />
            <Button
              size="l"
              variant="outlined"
              color="positive"
              onClick={handleSearch}
            >
              검색
            </Button>
          </div>
        </div>

        <div style={s.listWrap}>
          <div style={s.tableFunction}>
            <div style={s.tableFuncLeft}>
              <span style={s.badge}>총 {totalCount}개</span>
            </div>
            <div style={s.listAction}>
              <div style={s.paginationField}>
                <span style={s.paginationLabel}>Items per page:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => { setItemsPerPage(Number(e.target.value)); setPage(1); }}
                  style={s.itemsSelect}
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>
              <span style={s.indicator}>
                {totalCount === 0 ? "0" : `${startIdx + 1}-${Math.min(startIdx + itemsPerPage, totalCount)}`} of {totalCount}
              </span>
              <div style={s.paginationWrap}>
                <button
                  style={{ ...s.pageBtn, opacity: safePage === 1 ? 0.4 : 1 }}
                  disabled={safePage === 1}
                  onClick={() => setPage(1)}
                >
                  <ChevronDoubleLeftIcon disabled={safePage === 1} />
                </button>
                <button
                  style={{ ...s.pageBtn, opacity: safePage === 1 ? 0.4 : 1 }}
                  disabled={safePage === 1}
                  onClick={() => setPage(Math.max(1, safePage - 1))}
                >
                  <ChevronLeftIcon disabled={safePage === 1} />
                </button>
                {pageNumbers.map((pn, idx) => (
                  <button
                    key={idx}
                    style={{
                      ...s.pageBtn,
                      ...(pn === safePage ? s.pageBtnActive : s.pageBtnInactive),
                    }}
                    disabled={pn === "..."}
                    onClick={() => { if (typeof pn === "number") setPage(pn); }}
                  >
                    {pn}
                  </button>
                ))}
                <button
                  style={{ ...s.pageBtn, opacity: safePage === totalPages ? 0.4 : 1 }}
                  disabled={safePage === totalPages}
                  onClick={() => setPage(Math.min(totalPages, safePage + 1))}
                >
                  <ChevronRightIcon disabled={safePage === totalPages} />
                </button>
                <button
                  style={{ ...s.pageBtn, opacity: safePage === totalPages ? 0.4 : 1 }}
                  disabled={safePage === totalPages}
                  onClick={() => setPage(totalPages)}
                >
                  <ChevronDoubleRightIcon disabled={safePage === totalPages} />
                </button>
              </div>
              <button style={s.downloadBtn} title="다운로드">
                <DownloadIcon />
              </button>
            </div>
          </div>

          <table style={s.table}>
            <colgroup>
              {COLUMNS.map((col) => (
                <col
                  key={col.key}
                  style={{ width: typeof col.width === "number" ? col.width : undefined }}
                />
              ))}
            </colgroup>
            <thead>
              <tr>
                {COLUMNS.map((col) => (
                  <th
                    key={col.key}
                    style={s.th}
                    onClick={() => handleSort(col.key)}
                  >
                    <div style={s.thInner}>
                      <span>{col.label}</span>
                      <SortIcon active={sortKey === col.key} dir={sortKey === col.key ? sortDir : null} />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pageItems.length === 0 ? (
                <tr>
                  <td colSpan={COLUMNS.length} style={{ ...s.td, padding: 40, color: "#a1a1aa" }}>
                    데이터가 없습니다.
                  </td>
                </tr>
              ) : (
                pageItems.map((item) => (
                  <tr key={item.no}>
                    <td style={s.td}>{item.no}</td>
                    <td style={s.td}>{item.abbr}</td>
                    <td style={s.td}>{item.nameKo}</td>
                    <td style={s.td}>{item.nameEn}</td>
                    <td style={{ ...s.td, ...s.tdLeft }}>{item.description}</td>
                    <td style={s.td}>
                      <span style={item.useYn === "사용" ? s.useBadge : s.unuseBadge}>
                        {item.useYn}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
