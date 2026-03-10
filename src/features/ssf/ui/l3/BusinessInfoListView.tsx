import { useState, useEffect, useMemo, type CSSProperties } from "react";
import { useNavigate } from "react-router";
import { SelectBox } from "@/shared/ui/global/SelectBox";
import { Input } from "@/shared/ui/global/Input";
import { Button } from "@/shared/ui/global/Button";
import { useMdiStore } from "@/shared/model/mdi.store";
import { usePageHeader } from "@/shared/hooks/usePageHeader";
import type { BusinessSortKey, SortDir, BusinessItem } from "@/features/ssf/model/types";
import { useBusinessListQuery } from "@/features/ssf/api/business.queries";
import { useComponentListQuery } from "@/features/ssf/api/component.queries";
import { BusinessCreatePopup } from "@/features/ssf/ui/l3/BusinessCreatePopup";
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

const SEARCH_KEY_OPTIONS = [
  { label: "업무(L3)명(한글/영문)", value: "업무(L3)명(한글/영문)" },
  { label: "업무(L3)ID", value: "업무(L3)ID" },
  { label: "담당자명(L2기획리더/L3설계리더)", value: "담당자명(L2기획리더/L3설계리더)" },
];

const s = {
  filterWrap: {
    ...listStyles.filterWrap,
    rowGap: 16,
    gap: undefined,
  } as CSSProperties,
  filterLeft: {
    display: "flex",
    alignItems: "center",
    gap: 32,
  } satisfies CSSProperties,
  filterRight: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    width: 554,
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
};

type ColumnDef = { key: BusinessSortKey | "_checkbox"; label: string; width: number | string; align?: "left" | "center"; sortable?: boolean };

const COLUMNS: ColumnDef[] = [
  { key: "_checkbox", label: "", width: 36, align: "center", sortable: false },
  { key: "no", label: "No", width: 56, align: "center" },
  { key: "businessId", label: "업무(L3) ID", width: 170, align: "center" },
  { key: "nameKo", label: "업무(L3) 명", width: 145, align: "center" },
  { key: "description", label: "업무(L3) 설명", width: "auto", align: "left" },
  { key: "domainNameKo", label: "컴포넌트(L2) ID", width: 125, align: "center" },
  { key: "componentNameKo", label: "컴포넌트(L2) 명", width: 135, align: "center" },
  { key: "planLeader", label: "L2기획리더", width: 105, align: "center" },
  { key: "designLeader", label: "L3설계리더", width: 105, align: "center" },
  { key: "useYn", label: "사용여부", width: 90, align: "center" },
];

export function BusinessInfoListView() {
  const { data: businessList = [] } = useBusinessListQuery();
  const { data: componentListData = [] } = useComponentListQuery();
  const addTab = useMdiStore((st) => st.addTab);
  const navigate = useNavigate();
  useEffect(() => {
    addTab({ id: "/ssf/business", label: "업무(L3)정보 관리", path: "/ssf/business" });
  }, [addTab]);

  const [domainFilter, setDomainFilter] = useState("");
  const [componentFilter, setComponentFilter] = useState<string[]>([]);
  const [searchKey, setSearchKey] = useState("업무(L3)명(한글/영문)");
  const [searchKeywordDraft, setSearchKeywordDraft] = useState("");
  const [appliedKeyword, setAppliedKeyword] = useState("");
  const [appliedSearchKey, setAppliedSearchKey] = useState("업무(L3)명(한글/영문)");
  const [sortKey, setSortKey] = useState<BusinessSortKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  const domainOptions = useMemo(() => [
    { label: "마케팅 & 오퍼링", value: "마케팅 & 오퍼링" },
    { label: "CRM", value: "CRM" },
    { label: "파티", value: "파티" },
    { label: "파트너", value: "파트너" },
    { label: "엔터프라이즈 상품 카탈로그", value: "엔터프라이즈 상품 카탈로그" },
    { label: "상품 주문", value: "상품 주문" },
    { label: "서비스 주문", value: "서비스 주문" },
    { label: "리소스 주문 & 풀필먼트", value: "리소스 주문 & 풀필먼트" },
    { label: "통합 과금", value: "통합 과금" },
    { label: "빌링", value: "빌링" },
    { label: "AI & 데이터", value: "AI & 데이터" },
    { label: "공통 비즈니스 서비스", value: "공통 비즈니스 서비스" },
    { label: "엔터프라이즈 통합", value: "엔터프라이즈 통합" },
  ], []);

  const componentOptions = useMemo(() => {
    const names = [...new Set(componentListData.map((c) => c.nameKo))];
    return names.map((n) => ({ label: n, value: n }));
  }, [componentListData]);

  const handleSort = (key: BusinessSortKey) => {
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

  const filtered = businessList.filter((item) => {
    if (domainFilter && item.domainNameKo !== domainFilter) return false;
    if (componentFilter.length > 0 && !componentFilter.includes(item.componentNameKo)) return false;
    if (appliedKeyword) {
      const kw = appliedKeyword.toLowerCase();
      if (appliedSearchKey === "업무(L3)명(한글/영문)") {
        return item.nameKo.toLowerCase().includes(kw) || item.nameEn.toLowerCase().includes(kw);
      }
      if (appliedSearchKey === "업무(L3)ID") {
        return item.businessId.toLowerCase().includes(kw);
      }
      if (appliedSearchKey === "담당자명(L2기획리더/L3설계리더)") {
        return item.planLeader.toLowerCase().includes(kw) || item.designLeader.toLowerCase().includes(kw);
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
    pageNumbers.push(1, 2, 3, 4, 5, "...", totalPages);
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
    breadcrumbItems: [{ label: "SSF관리" }, { label: "업무(L3)정보 관리" }],
    title: "업무(L3)정보 관리",
    favoriteKey: "업무(L3)정보 관리",
    actions: (
      <Button
        size="m"
        variant="filled"
        color="positive"
        onClick={() => setCreateOpen(true)}
      >
        업무(L3) 신규 등록
      </Button>
    ),
  });

  return (
    <div style={listStyles.outer}>
      <div style={listStyles.main}>
        <div style={s.filterWrap}>
          <div style={s.filterLeft}>
            <SelectBox
              value={domainFilter}
              onChange={(v) => { setDomainFilter(v); setPage(1); }}
              options={domainOptions}
              placeholder="도메인(L1)"
              wrapperStyle={{ width: 250 }}
            />
            <SelectBox
              multiple
              searchable
              value={componentFilter}
              onChange={(v) => { setComponentFilter(v); setPage(1); }}
              options={componentOptions}
              placeholder="컴포넌트(L2)"
              wrapperStyle={{ width: 220 }}
            />
          </div>
          <div style={s.filterRight}>
            <SelectBox
              value={searchKey}
              onChange={setSearchKey}
              options={SEARCH_KEY_OPTIONS}
              placeholder="업무(L3) 명"
              wrapperStyle={{ width: 290, flexShrink: 0 }}
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

          <table style={listStyles.table}>
            <colgroup>
              {COLUMNS.map((col, idx) => (
                <col
                  key={idx}
                  style={{ width: typeof col.width === "number" ? col.width : undefined }}
                />
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
                      onClick={() => sortable && handleSort(col.key as BusinessSortKey)}
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
                    onClick={() => navigate(`/ssf/business/${item.businessId}`)}
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
                    <td style={listStyles.td}>{item.businessId}</td>
                    <td style={listStyles.td}>{item.nameKo}</td>
                    <td style={{ ...listStyles.td, ...listStyles.tdLeft }}>{item.description}</td>
                    <td style={listStyles.td}>{item.domainNameKo}</td>
                    <td style={listStyles.td}>{item.componentNameKo}</td>
                    <td style={listStyles.td}>{item.planLeader}</td>
                    <td style={listStyles.td}>{item.designLeader}</td>
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
      <BusinessCreatePopup
        open={createOpen}
        onClose={() => setCreateOpen(false)}
      />
    </div>
  );
}
