import { useState, useEffect, type CSSProperties } from "react";
import { PageHeader } from "@/shared/ui/PageHeader";
import { Breadcrumb } from "@/shared/ui/Breadcrumb";
import { PageTitle } from "@/shared/ui/PageTitle";
import { SelectBox } from "@/shared/ui/SelectBox";
import { Input } from "@/shared/ui/Input";
import { Button } from "@/shared/ui/Button";
import { useMdiStore } from "@/shared/model/mdi.store";
import { useQnAListQuery } from "@/features/qna/api/qna.queries";
import type { QnASortKey, QnASortDir } from "@/features/qna/model/types";
import { QnACreatePopup } from "@/features/qna/ui/QnACreatePopup";

const FONT = "'Pretendard', sans-serif";

function SortIcon({ active, dir }: { active: boolean; dir: QnASortDir }) {
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

function ReplyIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M6 8H14C15.1046 8 16 8.89543 16 10V14C16 15.1046 15.1046 16 14 16H6C4.89543 16 4 15.1046 4 14V10C4 8.89543 4.89543 8 6 8Z" stroke="#7a5af8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 8V6C8 4.89543 8.89543 4 10 4H10C11.1046 4 12 4.89543 12 6V8" stroke="#7a5af8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const CATEGORY_OPTIONS = [
  { label: "전체", value: "전체" },
  { label: "이용문의", value: "이용문의" },
  { label: "기술", value: "기술" },
];

const SEARCH_SCOPE_OPTIONS = [
  { label: "전체", value: "전체" },
  { label: "제목", value: "제목" },
  { label: "작성자", value: "작성자" },
];

const COLUMNS: { key: QnASortKey; label: string; width: number | string; align?: "left" | "center"; sortable?: boolean }[] = [
  { key: "no", label: "번호", width: 80, align: "center" },
  { key: "category", label: "분류", width: 160, align: "center" },
  { key: "title", label: "제목", width: "auto", align: "left", sortable: false },
  { key: "author", label: "작성자", width: 120, align: "center" },
  { key: "createdAt", label: "등록일", width: 200, align: "center" },
  { key: "status", label: "상태", width: 140, align: "center" },
];

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
    width: 92,
    flexShrink: 0,
  } satisfies CSSProperties,
  filterRight: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    width: 484,
    flexShrink: 0,
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
    minHeight: 48,
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
  titleRow: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  } satisfies CSSProperties,
  titleText: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    cursor: "pointer",
    color: "black",
  } satisfies CSSProperties,
  statusBadge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2px 8px",
    borderRadius: 4,
    fontFamily: FONT,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    whiteSpace: "nowrap",
    flexShrink: 0,
  } satisfies CSSProperties,
};

function getStatusBadgeStyle(status: string): CSSProperties {
  if (status === "답변완료") {
    return {
      backgroundColor: "#f0fdf4",
      border: "1px solid #1ac057",
      color: "#1ac057",
    };
  }
  return {
    backgroundColor: "#fefce8",
    border: "1px solid #f79009",
    color: "#f79009",
  };
}

export function QnAListView() {
  const addTab = useMdiStore((st) => st.addTab);
  useEffect(() => {
    addTab({ id: "/qna", label: "Q&A", path: "/qna" });
  }, [addTab]);

  const [createPopupOpen, setCreatePopupOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("전체");
  const [searchScope, setSearchScope] = useState("전체");
  const [searchKeywordDraft, setSearchKeywordDraft] = useState("");
  const [appliedKeyword, setAppliedKeyword] = useState("");
  const [appliedScope, setAppliedScope] = useState("전체");
  const [sortKey, setSortKey] = useState<QnASortKey | null>(null);
  const [sortDir, setSortDir] = useState<QnASortDir>(null);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { data, isLoading } = useQnAListQuery({
    category: categoryFilter,
    searchScope: appliedScope,
    keyword: appliedKeyword,
    page,
    pageSize: itemsPerPage,
    sortKey,
    sortDir,
  });

  const totalCount = data?.total ?? 0;
  const totalPages = data?.totalPages ?? 1;
  const safePage = data?.page ?? 1;
  const pageItems = data?.items ?? [];
  const startIdx = (safePage - 1) * itemsPerPage;

  const handleSort = (key: QnASortKey) => {
    const col = COLUMNS.find((c) => c.key === key);
    if (col?.sortable === false) return;
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
    setAppliedScope(searchScope);
    setPage(1);
  };

  const pageNumbers: (number | string)[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
  } else {
    pageNumbers.push(1, 2, 3, 4, 5, "...", totalPages);
  }

  return (
    <div style={s.outer}>
      <PageHeader>
        <Breadcrumb items={[{ label: "게시판" }, { label: "Q&A" }]} />
        <PageTitle title="Q&A" favoriteKey="Q&A" />
      </PageHeader>

      <div style={s.main}>
        <div style={s.filterWrap}>
          <div style={s.filterLeft}>
            <SelectBox
              value={categoryFilter}
              onChange={(v) => { setCategoryFilter(v); setPage(1); }}
              options={CATEGORY_OPTIONS}
              placeholder="분류"
              wrapperStyle={{ width: 92 }}
            />
          </div>
          <div style={s.filterRight}>
            <SelectBox
              value={searchScope}
              onChange={setSearchScope}
              options={SEARCH_SCOPE_OPTIONS}
              placeholder="검색범위"
              wrapperStyle={{ width: 92, flexShrink: 0 }}
            />
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
              style={{ flexShrink: 0 }}
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
              <Button
                size="m"
                variant="filled"
                color="positive"
                onClick={() => setCreatePopupOpen(true)}
              >
                등록
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div style={{ padding: 40, textAlign: "center", color: "#a1a1aa", fontFamily: FONT }}>
              Loading...
            </div>
          ) : (
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
                        {col.sortable !== false && (
                          <SortIcon active={sortKey === col.key} dir={sortKey === col.key ? sortDir : null} />
                        )}
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
                    <tr key={item.no} style={{ cursor: "pointer" }}>
                      <td style={s.td}>{item.no}</td>
                      <td style={s.td}>{item.category}</td>
                      <td style={{ ...s.td, ...s.tdLeft }}>
                        <div style={s.titleRow}>
                          <span style={s.titleText}>{item.title}</span>
                          {item.hasReply && <ReplyIcon />}
                        </div>
                      </td>
                      <td style={s.td}>{item.author}</td>
                      <td style={s.td}>{item.createdAt}</td>
                      <td style={s.td}>
                        <span style={{ ...s.statusBadge, ...getStatusBadgeStyle(item.status) }}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <QnACreatePopup
        open={createPopupOpen}
        onClose={() => setCreatePopupOpen(false)}
      />
    </div>
  );
}
