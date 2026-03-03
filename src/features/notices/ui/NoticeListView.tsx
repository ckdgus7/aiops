import { useEffect } from "react";
import type { CSSProperties } from "react";
import { Link } from "react-router";
import type { Notice } from "../model/types";
import { Input } from "@/shared/ui/Input";
import { DatePicker } from "@/shared/ui/DatePicker";
import { PageHeader } from "@/shared/ui/PageHeader";
import { Breadcrumb } from "@/shared/ui/Breadcrumb";
import { PageTitle } from "@/shared/ui/PageTitle";
import { useMdiStore } from "@/shared/model/mdi.store";

const actionBtnStyle: CSSProperties = {
  height: 40,
  padding: "0 20px",
  borderRadius: 6,
  border: "none",
  background: "#222",
  color: "#fff",
  fontSize: 16,
  fontWeight: 600,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: 6,
  whiteSpace: "nowrap",
};

const s = {
  outerWrapper: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    fontFamily: "'Pretendard', sans-serif",
  } satisfies CSSProperties,
  wrapper: {
    padding: "0 32px 20px",
    fontFamily: "'Pretendard', sans-serif",
    flex: 1,
    overflow: "auto",
  } satisfies CSSProperties,
  searchBox: {
    background: "#fff",
    borderRadius: 8,
    padding: "14px 20px",
    display: "flex",
    alignItems: "center",
    gap: 30,
    marginBottom: 14,
  } satisfies CSSProperties,
  searchFields: {
    display: "flex",
    alignItems: "center",
    gap: 30,
    flex: 1,
  } satisfies CSSProperties,
  searchField: {
    display: "flex",
    alignItems: "center",
    gap: 2,
    flex: 1,
  } satisfies CSSProperties,
  searchFieldFlex: {
    display: "flex",
    alignItems: "center",
    gap: 2,
    flex: 1,
  } satisfies CSSProperties,
  searchLabel: {
    width: 100,
    fontSize: 14,
    fontWeight: 700,
    color: "#222",
    flexShrink: 0,
  } satisfies CSSProperties,
  searchSelect: {
    flex: 1,
    height: 36,
    border: "1px solid #ddd",
    borderRadius: 6,
    padding: "0 8px",
    fontSize: 14,
    color: "#999",
    background: "#fff",
    outline: "none",
    appearance: "none",
    cursor: "pointer",
  } satisfies CSSProperties,
  searchBtn: {
    height: 36,
    padding: "0 16px",
    borderRadius: 6,
    border: "none",
    background: "#222",
    color: "#fff",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 6,
    whiteSpace: "nowrap",
    flexShrink: 0,
  } satisfies CSSProperties,
  gridTitleRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "12px 0 8px",
  } satisfies CSSProperties,
  gridTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: "#000",
  } satisfies CSSProperties,
  gridCount: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  } satisfies CSSProperties,
  gridCountLabel: {
    fontSize: 13,
    color: "#999",
  } satisfies CSSProperties,
  gridCountBadge: {
    background: "#d9d9d9",
    borderRadius: 50,
    padding: "3px 10px",
    fontSize: 13,
    fontWeight: 600,
    color: "#000",
    lineHeight: "14px",
  } satisfies CSSProperties,
  gridWrapper: {
    background: "#fff",
    borderRadius: 8,
    overflow: "hidden",
  } satisfies CSSProperties,
  table: {
    width: "100%",
    borderCollapse: "collapse",
  } satisfies CSSProperties,
  th: {
    background: "#f1f1f1",
    border: "1px solid #d9d7e7",
    padding: "0 10px",
    height: 40,
    fontSize: 14,
    fontWeight: 400,
    color: "#222",
    textAlign: "center",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  td: {
    border: "1px solid #d9d7e7",
    padding: "0 10px",
    height: 42,
    fontSize: 14,
    fontWeight: 500,
    color: "#222",
    textAlign: "center",
    background: "#fff",
  } satisfies CSSProperties,
  tdTitle: {
    border: "1px solid #d9d7e7",
    padding: "0 10px",
    height: 42,
    fontSize: 14,
    fontWeight: 500,
    color: "#222",
    textAlign: "left",
    background: "#fff",
  } satisfies CSSProperties,
  emptyRow: {
    textAlign: "center",
    color: "#999",
    padding: "40px 0",
    fontSize: 14,
  } satisfies CSSProperties,
  pagination: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
    padding: "16px 0",
  } satisfies CSSProperties,
  pageNumbers: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  } satisfies CSSProperties,
  pageBtn: {
    width: 24,
    height: 24,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 13,
    cursor: "pointer",
    borderRadius: 2,
    border: "none",
    background: "transparent",
    color: "#000",
    fontWeight: 500,
    padding: 0,
  } satisfies CSSProperties,
  pageBtnActive: {
    width: 24,
    height: 24,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 13,
    cursor: "pointer",
    borderRadius: 6,
    border: "1px solid #000",
    background: "#000",
    color: "#fff",
    fontWeight: 400,
    padding: 0,
  } satisfies CSSProperties,
  pageNav: {
    width: 36,
    height: 36,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    background: "transparent",
    border: "none",
    fontSize: 16,
    color: "#666",
    padding: 0,
  } satisfies CSSProperties,
  pageInput: {
    display: "flex",
    alignItems: "center",
    gap: 6,
  } satisfies CSSProperties,
  pageInputField: {
    width: 180,
    height: 36,
    border: "1px solid #ddd",
    borderRadius: 6,
    padding: "0 12px",
    fontSize: 14,
    color: "#000",
    outline: "none",
  } satisfies CSSProperties,
  pageInputLabel: {
    fontSize: 13,
    color: "#5b5b6b",
    fontWeight: 500,
  } satisfies CSSProperties,
  dateSeparator: {
    fontSize: 14,
    color: "#999",
    padding: "0 4px",
    flexShrink: 0,
  } satisfies CSSProperties,
};

interface NoticeListViewProps {
  titleDraft: string;
  fromDateDraft: string;
  toDateDraft: string;
  items: Notice[];
  total: number;
  page: number;
  totalPages: number;
  loading: boolean;
  error: boolean;
  onTitleDraftChange: (v: string) => void;
  onFromDateDraftChange: (v: string) => void;
  onToDateDraftChange: (v: string) => void;
  onReset: () => void;
  onSearch: () => void;
  onPageChange: (page: number) => void;
}

export function NoticeListView({
  titleDraft,
  fromDateDraft,
  toDateDraft,
  items,
  total,
  page,
  totalPages,
  loading,
  error,
  onTitleDraftChange,
  onFromDateDraftChange,
  onToDateDraftChange,
  onReset,
  onSearch,
  onPageChange,
}: NoticeListViewProps) {
  const addTab = useMdiStore((s) => s.addTab);

  useEffect(() => {
    addTab({ id: "/notices", label: "공지사항", path: "/notices" });
  }, [addTab]);

  const clampedPage = Math.min(page, totalPages);
  const startPage = Math.max(1, clampedPage - 4);
  const endPage = Math.min(totalPages, startPage + 9);
  const pageNumberList = endPage >= startPage
    ? Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
    : [1];

  return (
    <div style={s.outerWrapper}>
      <PageHeader>
        <Breadcrumb items={[{ label: "게시판" }, { label: "공지사항" }]} />
        <PageTitle
          title="공지사항"
          favoriteKey="공지사항"
          badge="활성"
          actions={
            <button style={actionBtnStyle}>
              <span>✏️</span>
              <span>글쓰기</span>
            </button>
          }
        />
      </PageHeader>

      <div style={s.wrapper}>
      <div style={s.searchBox}>
        <div style={s.searchFields}>
          <div style={s.searchField}>
            <span style={s.searchLabel}>제목</span>
            <Input
              value={titleDraft}
              onChange={(e) => onTitleDraftChange(e.target.value)}
              placeholder="입력"
              onKeyDown={(e) => {
                if (e.key === "Enter") onSearch();
              }}
            />
          </div>
          <div style={s.searchFieldFlex}>
            <span style={s.searchLabel}>등록일</span>
            <DatePicker value={fromDateDraft} onChange={onFromDateDraftChange} />
            <span style={s.dateSeparator}>~</span>
            <DatePicker value={toDateDraft} onChange={onToDateDraftChange} />
          </div>
        </div>
        <button style={s.searchBtn} onClick={onSearch}>
          <span>🔍</span>
          <span>검색</span>
        </button>
      </div>

      <div style={s.gridTitleRow}>
        <span style={s.gridTitle}>목록</span>
        <div style={s.gridCount}>
          <span style={s.gridCountLabel}>총</span>
          <span style={s.gridCountBadge}>{total}</span>
        </div>
      </div>

      <div style={s.gridWrapper}>
        {loading && (
          <div style={{ padding: 40, textAlign: "center", color: "#999" }}>
            Loading...
          </div>
        )}
        {error && (
          <div style={{ padding: 40, textAlign: "center", color: "#999" }}>
            에러가 발생했습니다.
          </div>
        )}
        {!loading && !error && (
          <>
            <table style={s.table}>
              <thead>
                <tr>
                  <th style={{ ...s.th, width: 60 }}>번호</th>
                  <th style={s.th}>제목</th>
                  <th style={{ ...s.th, width: 140 }}>등록일</th>
                  <th style={{ ...s.th, width: 100 }}>조회수</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td style={s.emptyRow} colSpan={4}>
                      데이터가 없습니다.
                    </td>
                  </tr>
                ) : (
                  items.map((item) => (
                    <tr key={item.id}>
                      <td style={s.td}>{item.id}</td>
                      <td style={s.tdTitle}>
                        <Link
                          to={`/notices/${item.id}`}
                          style={{ color: "#222", textDecoration: "none" }}
                        >
                          {item.title}
                        </Link>
                      </td>
                      <td style={s.td}>{item.createdAt}</td>
                      <td style={s.td}>{item.views}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            <div style={s.pagination}>
              <div style={s.pageNumbers}>
                <button
                  style={s.pageNav}
                  onClick={() => onPageChange(1)}
                  disabled={page === 1}
                >
                  «
                </button>
                <button
                  style={s.pageNav}
                  onClick={() => onPageChange(Math.max(1, page - 1))}
                  disabled={page === 1}
                >
                  ‹
                </button>
                {pageNumberList.map((p) => (
                  <button
                    key={p}
                    style={p === page ? s.pageBtnActive : s.pageBtn}
                    onClick={() => onPageChange(p)}
                  >
                    {p}
                  </button>
                ))}
                <button
                  style={s.pageNav}
                  onClick={() => onPageChange(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                >
                  ›
                </button>
                <button
                  style={s.pageNav}
                  onClick={() => onPageChange(totalPages)}
                  disabled={page === totalPages}
                >
                  »
                </button>
              </div>
              <div style={s.pageInput}>
                <input
                  style={s.pageInputField}
                  type="number"
                  min={1}
                  max={totalPages}
                  defaultValue={page}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const v = Number((e.target as HTMLInputElement).value);
                      if (v >= 1 && v <= totalPages) onPageChange(v);
                    }
                  }}
                />
                <span style={s.pageInputLabel}>/{totalPages}</span>
              </div>
            </div>
          </>
        )}
      </div>
      </div>
    </div>
  );
}
