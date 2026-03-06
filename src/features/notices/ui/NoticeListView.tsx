import { useState, useEffect, type CSSProperties } from "react";
import { useNavigate } from "react-router";
import { SelectBox } from "@/shared/ui/global/SelectBox";
import { Input } from "@/shared/ui/global/Input";
import { Button } from "@/shared/ui/global/Button";
import { useMdiStore } from "@/shared/model/mdi.store";
import { usePageHeader } from "@/shared/hooks/usePageHeader";
import { useNoticesQuery } from "@/features/notices/api/notices.queries";
import type { NoticeSortKey, NoticeSortDir } from "@/features/notices/model/types";
import { NoticeCreatePopup } from "@/features/notices/ui/NoticeCreatePopup";
import { FONT, listStyles } from "@/shared/ui/styles";

function SortIcon({ active, dir }: { active: boolean; dir: NoticeSortDir }) {
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

const CATEGORY_OPTIONS = [
  { label: "전체", value: "전체" },
  { label: "공지", value: "공지" },
  { label: "일반", value: "일반" },
];

const SEARCH_SCOPE_OPTIONS = [
  { label: "전체", value: "전체" },
  { label: "제목", value: "제목" },
  { label: "작성자", value: "작성자" },
];

const COLUMNS: { key: NoticeSortKey; label: string; width: number | string; align?: "left" | "center" }[] = [
  { key: "no", label: "번호", width: 80, align: "center" },
  { key: "category", label: "분류", width: 120, align: "center" },
  { key: "title", label: "제목", width: "auto", align: "left" },
  { key: "author", label: "작성자", width: 120, align: "center" },
  { key: "createdAt", label: "등록일", width: 180, align: "center" },
  { key: "updatedAt", label: "수정일", width: 180, align: "center" },
  { key: "attachments", label: "첨부", width: 80, align: "center" },
  { key: "views", label: "조회수", width: 100, align: "center" },
];

const s = {
  filterLeft: {
    display: "flex",
    alignItems: "center",
    gap: 0,
    width: 140,
    flexShrink: 0,
  } satisfies CSSProperties,
  filterRight: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    width: 484,
    flexShrink: 0,
  } satisfies CSSProperties,
  titleRow: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  } satisfies CSSProperties,
  categoryBadge: {
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
  pinnedBadge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2px 8px",
    borderRadius: 4,
    backgroundColor: "#fef3f2",
    border: "1px solid #f04438",
    color: "#f04438",
    fontFamily: FONT,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    whiteSpace: "nowrap",
    flexShrink: 0,
  } satisfies CSSProperties,
  titleText: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    cursor: "pointer",
    color: "black",
  } satisfies CSSProperties,
};

function getCategoryBadgeStyle(category: string): CSSProperties {
  if (category === "공지") {
    return {
      backgroundColor: "#fafaff",
      border: "1px solid #7a5af8",
      color: "#7a5af8",
    };
  }
  return {
    backgroundColor: "#fafafa",
    border: "1px solid #a1a1aa",
    color: "#a1a1aa",
  };
}

export function NoticeListView() {
  const addTab = useMdiStore((st) => st.addTab);
  const navigate = useNavigate();
  useEffect(() => {
    addTab({ id: "/notices", label: "공지사항", path: "/notices" });
  }, [addTab]);

  const [createPopupOpen, setCreatePopupOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("전체");
  const [searchScope, setSearchScope] = useState("전체");
  const [searchKeywordDraft, setSearchKeywordDraft] = useState("");
  const [appliedKeyword, setAppliedKeyword] = useState("");
  const [appliedScope, setAppliedScope] = useState("전체");
  const [sortKey, setSortKey] = useState<NoticeSortKey | null>(null);
  const [sortDir, setSortDir] = useState<NoticeSortDir>(null);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { data, isLoading } = useNoticesQuery({
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

  const handleSort = (key: NoticeSortKey) => {
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

  usePageHeader({
    breadcrumbItems: [{ label: "게시판" }, { label: "공지사항" }],
    title: "공지사항",
    favoriteKey: "공지사항",
  });

  return (
    <div style={listStyles.outer}>
      <div style={listStyles.main}>
        <div style={listStyles.filterWrap}>
          <div style={s.filterLeft}>
            <SelectBox
              value={categoryFilter}
              onChange={(v) => { setCategoryFilter(v); setPage(1); }}
              options={CATEGORY_OPTIONS}
              placeholder="분류"
              wrapperStyle={{ width: 140 }}
            />
          </div>
          <div style={s.filterRight}>
            <SelectBox
              value={searchScope}
              onChange={setSearchScope}
              options={SEARCH_SCOPE_OPTIONS}
              placeholder="검색범위"
              wrapperStyle={{ width: 140, flexShrink: 0 }}
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

        <div style={listStyles.listWrap}>
          <div style={{ ...listStyles.tableFunction, minHeight: 48 }}>
            <div style={listStyles.tableFuncLeft}>
              <span style={listStyles.badge}>총 {totalCount}개</span>
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
            <table style={listStyles.table}>
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
                      style={listStyles.th}
                      onClick={() => handleSort(col.key)}
                    >
                      <div style={listStyles.thInner}>
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
                    <td colSpan={COLUMNS.length} style={{ ...listStyles.td, padding: 40, color: "#a1a1aa" }}>
                      데이터가 없습니다.
                    </td>
                  </tr>
                ) : (
                  pageItems.map((item) => (
                    <tr key={item.no} style={{ cursor: "pointer" }} onClick={() => navigate(`/notices/${item.no}`)}>
                      <td style={listStyles.td}>{item.no}</td>
                      <td style={listStyles.td}>
                        <span style={{ ...s.categoryBadge, ...getCategoryBadgeStyle(item.category) }}>
                          {item.category}
                        </span>
                      </td>
                      <td style={{ ...listStyles.td, ...listStyles.tdLeft }}>
                        <div style={s.titleRow}>
                          {item.isPinned && (
                            <span style={s.pinnedBadge}>필독</span>
                          )}
                          <span style={s.titleText}>{item.title}</span>
                        </div>
                      </td>
                      <td style={listStyles.td}>{item.author}</td>
                      <td style={listStyles.td}>{item.createdAt}</td>
                      <td style={listStyles.td}>{item.updatedAt}</td>
                      <td style={listStyles.td}>{item.attachments > 0 ? item.attachments : "-"}</td>
                      <td style={listStyles.td}>{item.views}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <NoticeCreatePopup
        open={createPopupOpen}
        onClose={() => setCreatePopupOpen(false)}
      />
    </div>
  );
}
