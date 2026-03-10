import { useState, useEffect, useMemo, type CSSProperties } from "react";
import { ChooseButton } from "@/shared/ui/global/ChooseButton";
import { SelectBox } from "@/shared/ui/global/SelectBox";
import { Input } from "@/shared/ui/global/Input";
import { Button } from "@/shared/ui/global/Button";
import { useMdiStore } from "@/shared/model/mdi.store";
import { usePageHeader } from "@/shared/hooks/usePageHeader";
import type { FunctionSortKey, SortDir } from "@/features/ssf/model/types";
import { useFunctionListQuery } from "@/features/ssf/api/function.queries";
import { FONT, listStyles } from "@/shared/ui/styles";

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

function CheckboxIcon({ checked }: { checked: boolean }) {
  if (checked) {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="0.5" y="0.5" width="17" height="17" rx="3.5" fill="#7a5af8" stroke="#7a5af8" />
        <path d="M5 9L8 12L13 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="0.5" y="0.5" width="17" height="17" rx="3.5" fill="white" stroke="#d4d4d8" />
    </svg>
  );
}

const USE_OPTIONS = [
  { label: "전체", value: "전체" },
  { label: "사용", value: "사용" },
  { label: "미사용", value: "미사용" },
];

const SEARCH_KEY_OPTIONS = [
  { label: "기능(L4)명", value: "기능(L4)명" },
  { label: "기능(L4)ID", value: "기능(L4)ID" },
];

const s = {
  filterWrap: {
    ...listStyles.filterWrap,
  } as CSSProperties,
  filterLeft: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  } satisfies CSSProperties,
  filterRight: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  } satisfies CSSProperties,
  searchWrap: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    width: 384,
  } satisfies CSSProperties,
  tableFuncLeft: {
    ...listStyles.tableFuncLeft,
    gap: 16,
  } as CSSProperties,
  selectAllWrap: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    cursor: "pointer",
    userSelect: "none",
  } satisfies CSSProperties,
  selectAllLabel: {
    fontFamily: FONT,
    fontSize: 12,
    fontWeight: 400,
    lineHeight: "18px",
    color: "#3f3f46",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  checkboxCell: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  } satisfies CSSProperties,
  tdEllipsis: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    maxWidth: 0,
  } satisfies CSSProperties,
};

type ColumnDef = { key: FunctionSortKey | "_checkbox"; label: string; width: number; align?: "left" | "center"; sortable?: boolean };

const COLUMNS: ColumnDef[] = [
  { key: "_checkbox", label: "", width: 34, align: "center", sortable: false },
  { key: "no", label: "No", width: 80, align: "center" },
  { key: "functionId", label: "기능(L4) ID", width: 200, align: "center" },
  { key: "nameKo", label: "기능(L4) 명", width: 186, align: "center" },
  { key: "functionType", label: "기능(L4) 구성 방식", width: 140, align: "center" },
  { key: "description", label: "기능(L4) 설명", width: 370, align: "left" },
  { key: "businessId", label: "업무(L3) ID", width: 140, align: "center" },
  { key: "businessNameKo", label: "업무(L3) 명", width: 140, align: "center" },
  { key: "componentNameKo", label: "컴포넌트(L2) 명", width: 108, align: "center" },
  { key: "domainNameKo", label: "도메인(L1)명", width: 108, align: "center" },
  { key: "useYn", label: "사용여부", width: 120, align: "center" },
];

const TABLE_TOTAL_WIDTH = COLUMNS.reduce((sum, col) => sum + col.width, 0);

export function FunctionInfoListView() {
  const { data: functionList = [] } = useFunctionListQuery();
  const addTab = useMdiStore((st) => st.addTab);
  useEffect(() => {
    addTab({ id: "/ssf/function", label: "기능(L4)정보 관리", path: "/ssf/function" });
  }, [addTab]);

  const [useFilter, setUseFilter] = useState("전체");
  const [domainFilter, setDomainFilter] = useState("");
  const [componentFilter, setComponentFilter] = useState<string[]>([]);
  const [businessFilter, setBusinessFilter] = useState<string[]>([]);
  const [searchKey, setSearchKey] = useState("기능(L4)명");
  const [searchKeywordDraft, setSearchKeywordDraft] = useState("");
  const [appliedKeyword, setAppliedKeyword] = useState("");
  const [appliedSearchKey, setAppliedSearchKey] = useState("기능(L4)명");
  const [sortKey, setSortKey] = useState<FunctionSortKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [selectAll, setSelectAll] = useState(false);

  const domainOptions = useMemo(() => {
    const names = [...new Set(functionList.map((f) => f.domainNameKo))];
    return names.map((n) => ({ label: n, value: n }));
  }, [functionList]);

  const componentOptions = useMemo(() => {
    const names = [...new Set(functionList.map((f) => f.componentNameKo))];
    return names.map((n) => ({ label: n, value: n }));
  }, [functionList]);

  const businessOptions = useMemo(() => {
    const names = [...new Set(functionList.map((f) => f.businessNameKo))];
    return names.map((n) => ({ label: n, value: n }));
  }, [functionList]);

  const handleSort = (key: FunctionSortKey) => {
    if (sortKey === key) {
      if (sortDir === "asc") setSortDir("desc");
      else if (sortDir === "desc") { setSortKey(null); setSortDir(null); }
      else setSortDir("asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const handleSearch = () => {
    setAppliedKeyword(searchKeywordDraft);
    setAppliedSearchKey(searchKey);
    setPage(1);
  };

  const filtered = functionList.filter((item) => {
    if (useFilter !== "전체" && item.useYn !== useFilter) return false;
    if (domainFilter && item.domainNameKo !== domainFilter) return false;
    if (componentFilter.length > 0 && !componentFilter.includes(item.componentNameKo)) return false;
    if (businessFilter.length > 0 && !businessFilter.includes(item.businessNameKo)) return false;
    if (appliedKeyword) {
      const kw = appliedKeyword.toLowerCase();
      if (appliedSearchKey === "기능(L4)명") {
        return item.nameKo.toLowerCase().includes(kw) || item.nameEn.toLowerCase().includes(kw);
      }
      if (appliedSearchKey === "기능(L4)ID") {
        return item.functionId.toLowerCase().includes(kw);
      }
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
    if (safePage <= 4) {
      for (let i = 1; i <= 5; i++) pageNumbers.push(i);
      pageNumbers.push("...", totalPages);
    } else if (safePage >= totalPages - 3) {
      pageNumbers.push(1, "...");
      for (let i = totalPages - 4; i <= totalPages; i++) pageNumbers.push(i);
    } else {
      pageNumbers.push(1, "...", safePage - 1, safePage, safePage + 1, "...", totalPages);
    }
  }

  const handleToggleRow = (no: number) => {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      if (next.has(no)) next.delete(no);
      else next.add(no);
      return next;
    });
  };

  const handleToggleSelectAll = () => {
    if (selectAll) {
      setSelectedRows(new Set());
      setSelectAll(false);
    } else {
      setSelectedRows(new Set(pageItems.map((item) => item.no)));
      setSelectAll(true);
    }
  };

  useEffect(() => {
    const allSelected = pageItems.length > 0 && pageItems.every((item) => selectedRows.has(item.no));
    setSelectAll(allSelected);
  }, [selectedRows, pageItems]);

  usePageHeader({
    breadcrumbItems: [{ label: "SSF관리" }, { label: "기능(L4)정보 관리" }],
    title: "기능(L4)정보 관리",
    favoriteKey: "기능(L4)정보 관리",
    actions: (
      <Button
        size="m"
        variant="filled"
        color="positive"
      >
        기능(L4) 신규 등록
      </Button>
    ),
  });

  return (
    <div style={listStyles.outer}>
      <div style={listStyles.main}>
        <div style={s.filterWrap}>
          <div style={s.filterLeft}>
            <ChooseButton
              value={useFilter}
              onChange={(v) => { setUseFilter(v); setPage(1); }}
              options={USE_OPTIONS}
            />
            <SelectBox
              value={domainFilter}
              onChange={(v) => { setDomainFilter(v); setPage(1); }}
              options={domainOptions}
              placeholder="도메인(L1)"
              wrapperStyle={{ width: 132 }}
            />
            <SelectBox
              multiple
              searchable
              value={componentFilter}
              onChange={(v) => { setComponentFilter(v); setPage(1); }}
              options={componentOptions}
              placeholder="컴포넌트(L2)"
              wrapperStyle={{ width: 149 }}
            />
            <SelectBox
              multiple
              searchable
              value={businessFilter}
              onChange={(v) => { setBusinessFilter(v); setPage(1); }}
              options={businessOptions}
              placeholder="업무(L3)"
              wrapperStyle={{ width: 121 }}
            />
          </div>
          <div style={s.filterRight}>
            <SelectBox
              value={searchKey}
              onChange={setSearchKey}
              options={SEARCH_KEY_OPTIONS}
              placeholder="기능(L4)명"
              wrapperStyle={{ width: 135, flexShrink: 0 }}
            />
            <div style={s.searchWrap}>
              <Input
                value={searchKeywordDraft}
                onChange={(e) => setSearchKeywordDraft(e.target.value)}
                placeholder="검색어를 입력하세요."
                prefix="search"
                indicator={`${searchKeywordDraft.length}/20`}
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
        </div>

        <div style={listStyles.listWrap}>
          <div style={listStyles.tableFunction}>
            <div style={s.tableFuncLeft}>
              <span style={listStyles.badge}>총 {totalCount}개</span>
              <div style={s.selectAllWrap} onClick={handleToggleSelectAll}>
                <CheckboxIcon checked={selectAll} />
                <span style={s.selectAllLabel}>전체 선택</span>
              </div>
            </div>
            <div style={listStyles.listAction}>
              <div style={listStyles.paginationField}>
                <span style={listStyles.paginationLabel}>Items per page:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => { setItemsPerPage(Number(e.target.value)); setPage(1); }}
                  style={listStyles.itemsSelect}
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>
              <span style={listStyles.indicator}>
                {totalCount === 0 ? "0" : `${startIdx + 1}-${Math.min(startIdx + itemsPerPage, totalCount)}`} of {totalCount}
              </span>
              <div style={listStyles.paginationWrap}>
                <button
                  style={{ ...listStyles.pageBtn, opacity: safePage === 1 ? 0.4 : 1 }}
                  disabled={safePage === 1}
                  onClick={() => setPage(1)}
                >
                  <ChevronDoubleLeftIcon disabled={safePage === 1} />
                </button>
                <button
                  style={{ ...listStyles.pageBtn, opacity: safePage === 1 ? 0.4 : 1 }}
                  disabled={safePage === 1}
                  onClick={() => setPage(Math.max(1, safePage - 1))}
                >
                  <ChevronLeftIcon disabled={safePage === 1} />
                </button>
                {pageNumbers.map((pn, idx) => (
                  <button
                    key={idx}
                    style={{
                      ...listStyles.pageBtn,
                      ...(pn === safePage ? listStyles.pageBtnActive : listStyles.pageBtnInactive),
                    }}
                    disabled={pn === "..."}
                    onClick={() => { if (typeof pn === "number") setPage(pn); }}
                  >
                    {pn}
                  </button>
                ))}
                <button
                  style={{ ...listStyles.pageBtn, opacity: safePage === totalPages ? 0.4 : 1 }}
                  disabled={safePage === totalPages}
                  onClick={() => setPage(Math.min(totalPages, safePage + 1))}
                >
                  <ChevronRightIcon disabled={safePage === totalPages} />
                </button>
                <button
                  style={{ ...listStyles.pageBtn, opacity: safePage === totalPages ? 0.4 : 1 }}
                  disabled={safePage === totalPages}
                  onClick={() => setPage(totalPages)}
                >
                  <ChevronDoubleRightIcon disabled={safePage === totalPages} />
                </button>
              </div>
              <button style={listStyles.downloadBtn} title="다운로드">
                <DownloadIcon />
              </button>
            </div>
          </div>

          <div style={{ width: "100%", overflowX: "auto" }}>
            <table style={{ ...listStyles.table, minWidth: TABLE_TOTAL_WIDTH }}>
              <colgroup>
                {COLUMNS.map((col, idx) => (
                  <col key={idx} style={{ width: col.width }} />
                ))}
              </colgroup>
              <thead>
                <tr>
                  {COLUMNS.map((col, idx) => {
                    if (col.key === "_checkbox") {
                      return (
                        <th key="checkbox" style={listStyles.th}>
                          <div style={listStyles.thInner}>
                            <div style={s.checkboxCell} onClick={handleToggleSelectAll}>
                              <CheckboxIcon checked={selectAll} />
                            </div>
                          </div>
                        </th>
                      );
                    }
                    const sortable = col.sortable !== false;
                    return (
                      <th
                        key={idx}
                        style={listStyles.th}
                        onClick={() => sortable && handleSort(col.key as FunctionSortKey)}
                      >
                        <div style={listStyles.thInner}>
                          <span>{col.label}</span>
                          {sortable && (
                            <SortIcon active={sortKey === col.key} dir={sortKey === col.key ? sortDir : null} />
                          )}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {pageItems.length === 0 ? (
                  <tr>
                    <td colSpan={COLUMNS.length} style={{ ...listStyles.td, padding: 40, color: "#a1a1aa" }}>
                      데이터가 없습니다.
                    </td>
                  </tr>
                ) : (
                  pageItems.map((item) => (
                    <tr
                      key={item.no}
                      style={{ cursor: "pointer" }}
                    >
                      <td style={listStyles.td}>
                        <div
                          style={s.checkboxCell}
                          onClick={(e) => { e.stopPropagation(); handleToggleRow(item.no); }}
                        >
                          <CheckboxIcon checked={selectedRows.has(item.no)} />
                        </div>
                      </td>
                      <td style={listStyles.td}>{item.no}</td>
                      <td style={{ ...listStyles.td, ...listStyles.tdLeft, ...s.tdEllipsis }} title={item.functionId}>{item.functionId}</td>
                      <td style={{ ...listStyles.td, ...s.tdEllipsis }} title={item.nameKo}>{item.nameKo}</td>
                      <td style={{ ...listStyles.td, ...s.tdEllipsis }}>{item.functionType}</td>
                      <td style={{ ...listStyles.td, ...listStyles.tdLeft, ...s.tdEllipsis }} title={item.description}>{item.description}</td>
                      <td style={{ ...listStyles.td, ...s.tdEllipsis }} title={item.businessId}>{item.businessId}</td>
                      <td style={{ ...listStyles.td, ...s.tdEllipsis }} title={item.businessNameKo}>{item.businessNameKo}</td>
                      <td style={{ ...listStyles.td, ...s.tdEllipsis }} title={item.componentNameKo}>{item.componentNameKo}</td>
                      <td style={{ ...listStyles.td, ...s.tdEllipsis }} title={item.domainNameKo}>{item.domainNameKo}</td>
                      <td style={listStyles.td}>
                        <span style={item.useYn === "사용" ? listStyles.useBadge : listStyles.unuseBadge}>
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
    </div>
  );
}
