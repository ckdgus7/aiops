import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { useMdiStore } from "@/shared/model/mdi.store";
import { usePageHeader } from "@/shared/hooks/usePageHeader";
import { generateMockRequirements } from "../model/mock-data";
import type { Requirement } from "../model/types";

const STATUS_COLORS: Record<Requirement["status"], { bg: string; border: string; text: string }> = {
  "작성 중": { bg: "#fafafa", border: "#a1a1aa", text: "#a1a1aa" },
  "검토 중": { bg: "#fafaff", border: "#7a5af8", text: "#7a5af8" },
  "반려": { bg: "#fff5f5", border: "#f04438", text: "#f04438" },
  "승인": { bg: "#f0fdf4", border: "#12b76a", text: "#12b76a" },
  "완료": { bg: "#eff8ff", border: "#36bffa", text: "#36bffa" },
};

const allData = generateMockRequirements(36);

const s = {
  outer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    fontFamily: "'Pretendard', sans-serif",
  } satisfies CSSProperties,
  main: {
    flex: 1,
    overflow: "auto",
    padding: "0",
  } satisfies CSSProperties,
  tableSection: {
    display: "flex",
    flexDirection: "column",
    padding: "0",
    minHeight: "100%",
  } satisfies CSSProperties,
  filterWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#fff",
    borderRadius: 8,
    padding: "16px 24px",
    margin: "32px 32px 0 32px",
    gap: 24,
  } satisfies CSSProperties,
  filterLeft: {
    display: "flex",
    alignItems: "center",
    gap: 32,
  } satisfies CSSProperties,
  filterRight: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  } satisfies CSSProperties,
  dateRangeWrap: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  } satisfies CSSProperties,
  fieldLabel: {
    fontSize: 14,
    fontWeight: 500,
    color: "#a1a1aa",
    lineHeight: "18px",
    whiteSpace: "nowrap",
    marginRight: 4,
  } satisfies CSSProperties,
  fieldInput: {
    height: 40,
    border: "1px solid #e4e7ec",
    borderRadius: 4,
    padding: "8px 12px",
    fontSize: 14,
    color: "#3f3f46",
    background: "#fff",
    outline: "none",
    fontFamily: "'Pretendard', sans-serif",
    minWidth: 0,
  } satisfies CSSProperties,
  dateInput: {
    height: 40,
    border: "1px solid #e4e7ec",
    borderRadius: 4,
    padding: "8px 12px",
    fontSize: 14,
    color: "#3f3f46",
    background: "#fff",
    outline: "none",
    fontFamily: "'Pretendard', sans-serif",
    width: 140,
  } satisfies CSSProperties,
  dateSeparator: {
    fontSize: 14,
    color: "#a1a1aa",
  } satisfies CSSProperties,
  selectField: {
    height: 40,
    border: "1px solid #e4e7ec",
    borderRadius: 4,
    padding: "8px 12px",
    fontSize: 14,
    color: "#3f3f46",
    background: "#fff",
    outline: "none",
    fontFamily: "'Pretendard', sans-serif",
    appearance: "none",
    cursor: "pointer",
    minWidth: 120,
  } satisfies CSSProperties,
  searchInput: {
    height: 40,
    border: "1px solid #e4e7ec",
    borderRadius: 4,
    padding: "8px 8px 8px 36px",
    fontSize: 16,
    color: "#3f3f46",
    background: "#fff",
    outline: "none",
    fontFamily: "'Pretendard', sans-serif",
    flex: 1,
    minWidth: 180,
    lineHeight: "24px",
  } satisfies CSSProperties,
  searchInputWrap: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    flex: 1,
    minWidth: 180,
  } satisfies CSSProperties,
  searchIcon: {
    position: "absolute",
    left: 8,
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none",
    color: "#a1a1aa",
  } satisfies CSSProperties,
  searchCounter: {
    position: "absolute",
    right: 12,
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: 12,
    color: "#a1a1aa",
    lineHeight: "18px",
    pointerEvents: "none",
  } satisfies CSSProperties,
  searchBtn: {
    height: 40,
    padding: "8px 14px",
    borderRadius: 4,
    border: "1px solid #7a5af8",
    background: "#fff",
    color: "#7a5af8",
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "'Pretendard', sans-serif",
    lineHeight: "24px",
    whiteSpace: "nowrap",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  } satisfies CSSProperties,
  listWrap: {
    display: "flex",
    flexDirection: "column",
    margin: "16px 32px 0 32px",
    flex: 1,
  } satisfies CSSProperties,
  listFunction: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid #e4e4e7",
  } satisfies CSSProperties,
  tabWrap: {
    display: "flex",
    alignItems: "flex-end",
    height: 48,
  } satisfies CSSProperties,
  tabItem: (active: boolean): CSSProperties => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: "8px 16px",
    background: "#fff",
    borderBottom: active ? "2px solid #7a5af8" : "1px solid #e4e4e7",
    cursor: "pointer",
    fontSize: 16,
    color: active ? "#7a5af8" : "#a1a1aa",
    lineHeight: "24px",
    fontFamily: "'Pretendard', sans-serif",
    fontWeight: 400,
    whiteSpace: "nowrap",
    marginBottom: active ? -1 : 0,
  }),
  tabBadge: (active: boolean): CSSProperties => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "4px 10px",
    borderRadius: 12,
    background: active ? "#7a5af8" : "#a1a1aa",
    color: "#fff",
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "12px",
    fontFamily: "'Pretendard', sans-serif",
  }),
  chipSortWrap: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flex: 1,
    paddingLeft: 0,
  } satisfies CSSProperties,
  chipActive: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    padding: "5px 8px",
    borderRadius: 6,
    background: "#71717a",
    color: "#fafafa",
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "14px",
    cursor: "pointer",
    whiteSpace: "nowrap",
    fontFamily: "'Pretendard', sans-serif",
  } satisfies CSSProperties,
  chipInactive: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    padding: "5px 8px",
    borderRadius: 6,
    background: "#fafaff",
    color: "#a1a1aa",
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "14px",
    cursor: "pointer",
    whiteSpace: "nowrap",
    fontFamily: "'Pretendard', sans-serif",
  } satisfies CSSProperties,
  listAction: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 24,
    paddingBottom: 8,
  } satisfies CSSProperties,
  paginationLabel: {
    fontSize: 14,
    fontWeight: 500,
    color: "#a1a1aa",
    lineHeight: "18px",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  itemsPerPageSelect: {
    height: 40,
    border: "1px solid #e4e7ec",
    borderRadius: 4,
    padding: "3px 4px",
    fontSize: 14,
    color: "#3f3f46",
    background: "#fff",
    outline: "none",
    fontFamily: "'Pretendard', sans-serif",
    cursor: "pointer",
    minWidth: 50,
  } satisfies CSSProperties,
  paginationInfo: {
    fontSize: 14,
    color: "#71717a",
    lineHeight: "20px",
    textAlign: "center",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  paginationBtns: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  } satisfies CSSProperties,
  paginationBtn: (disabled: boolean): CSSProperties => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    background: "transparent",
    cursor: disabled ? "default" : "pointer",
    opacity: disabled ? 0.4 : 1,
    padding: 0,
    borderRadius: 4,
  }),
  list: {
    display: "flex",
    flexDirection: "column",
  } satisfies CSSProperties,
  card: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    padding: 16,
    background: "#fff",
    borderBottom: "1px solid #e4e4e7",
    height: 96,
    boxSizing: "border-box",
    cursor: "pointer",
  } satisfies CSSProperties,
  cardBadge: (status: Requirement["status"]): CSSProperties => {
    const c = STATUS_COLORS[status];
    return {
      width: 64,
      height: 64,
      borderRadius: 32,
      border: `1px solid ${c.border}`,
      background: c.bg,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    };
  },
  cardBadgeText: (status: Requirement["status"]): CSSProperties => ({
    fontSize: 12,
    fontWeight: 500,
    color: STATUS_COLORS[status].text,
    lineHeight: "16px",
    textAlign: "center",
    fontFamily: "'Pretendard', sans-serif",
    width: 60,
  }),
  cardContent: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    flex: 1,
    justifyContent: "flex-end",
    alignSelf: "stretch",
  } satisfies CSSProperties,
  cardRow: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    width: "100%",
  } satisfies CSSProperties,
  cardReqId: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "4px 12px",
    borderRadius: 12,
    border: "1px solid #36bffa",
    background: "#fff",
    color: "#36bffa",
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "16px",
    fontFamily: "'Pretendard', sans-serif",
    whiteSpace: "nowrap",
    flexShrink: 0,
  } satisfies CSSProperties,
  cardTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: "#3f3f46",
    lineHeight: "28px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  } satisfies CSSProperties,
  cardMeta: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  } satisfies CSSProperties,
  labelControl: {
    display: "flex",
    alignItems: "flex-start",
    gap: 4,
  } satisfies CSSProperties,
  labelText: {
    fontSize: 10,
    color: "#a1a1aa",
    lineHeight: "16px",
    fontWeight: 400,
    whiteSpace: "nowrap",
    display: "flex",
    alignItems: "center",
    height: 18,
  } satisfies CSSProperties,
  valueText: {
    fontSize: 12,
    color: "#3f3f46",
    lineHeight: "18px",
    fontWeight: 400,
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  taskBadge: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "3px 10px",
    borderRadius: 12,
    background: "#e4e4e7",
    color: "#52525b",
    fontSize: 10,
    fontWeight: 500,
    lineHeight: "12px",
    fontFamily: "'Pretendard', sans-serif",
    whiteSpace: "nowrap",
    flexShrink: 0,
  } satisfies CSSProperties,
  regInfo: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    alignSelf: "stretch",
    flexShrink: 0,
  } satisfies CSSProperties,
  timeWrap: {
    display: "flex",
    alignItems: "center",
    gap: 0,
  } satisfies CSSProperties,
  userCard: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  } satisfies CSSProperties,
  roleIcon: {
    width: 20,
    height: 20,
    borderRadius: "50%",
    background: "#e4e4e7",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  } satisfies CSSProperties,
  orgText: {
    fontSize: 10,
    color: "black",
    lineHeight: "16px",
    opacity: 0.3,
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  separator: {
    width: 1,
    height: 10,
    background: "black",
    opacity: 0.3,
    marginRight: 4,
  } satisfies CSSProperties,
};

function SearchIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35"
        stroke="#a1a1aa"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SortIcon({ active }: { active: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M3.5 8.5L7 12l3.5-3.5M3.5 5.5L7 2l3.5 3.5"
        stroke={active ? "#fafafa" : "#a1a1aa"}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M11.25 13.5L6.75 9l4.5-4.5" stroke="#3f3f46" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M6.75 4.5L11.25 9l-4.5 4.5" stroke="#3f3f46" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke="#a1a1aa" strokeWidth="1" />
      <path d="M8 4.5V8l2.5 1.5" stroke="#a1a1aa" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RoleIconSvg() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="10" fill="#e4e4e7" />
      <path
        d="M10 6a2.5 2.5 0 110 5 2.5 2.5 0 010-5zm0 6c2.5 0 5 1.25 5 2.5V16H5v-1.5C5 13.25 7.5 12 10 12z"
        fill="#a1a1aa"
      />
    </svg>
  );
}

function DropdownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M4 6l4 4 4-4" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function RequirementListView() {
  const addTab = useMdiStore((st) => st.addTab);
  const [activeTab, setActiveTab] = useState<"all" | "personal">("all");
  const [sortField, setSortField] = useState<"updatedAt" | "dueDate">("updatedAt");
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchScope, setSearchScope] = useState("전체");
  const [statusFilter, setStatusFilter] = useState("전체");

  useEffect(() => {
    addTab({ id: "/requirements", label: "요구사항", path: "/requirements" });
  }, [addTab]);

  const filtered = activeTab === "personal" ? [] : allData.filter((item) => {
    if (statusFilter !== "전체" && item.status !== statusFilter) return false;
    if (searchKeyword) {
      if (searchScope === "제목" && !item.title.includes(searchKeyword)) return false;
      if (searchScope === "ID" && !item.reqId.includes(searchKeyword)) return false;
      if (searchScope === "전체" && !item.title.includes(searchKeyword) && !item.reqId.includes(searchKeyword)) return false;
    }
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortField === "dueDate") return b.dueDate.localeCompare(a.dueDate);
    return 0;
  });

  const totalItems = sorted.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const currentPage = Math.min(page, totalPages);
  const pageItems = sorted.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  usePageHeader({
    breadcrumbItems: [{ label: "요구관리" }, { label: "요구사항" }],
    title: "요구사항",
    favoriteKey: "요구사항",
  });

  return (
    <div style={s.outer}>
      <div style={s.main}>
        <div style={s.tableSection}>
          <div style={s.filterWrap}>
            <div style={s.filterLeft}>
              <div style={s.dateRangeWrap}>
                <span style={s.fieldLabel}>등록일</span>
                <input type="date" style={s.dateInput} />
                <span style={s.dateSeparator}>~</span>
                <input type="date" style={s.dateInput} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={s.fieldLabel}>상태</span>
                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                  <select
                    style={{ ...s.selectField, paddingRight: 28 }}
                    value={statusFilter}
                    onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                  >
                    <option value="전체">전체</option>
                    <option value="작성 중">작성 중</option>
                    <option value="검토 중">검토 중</option>
                    <option value="반려">반려</option>
                    <option value="승인">승인</option>
                    <option value="완료">완료</option>
                  </select>
                  <div style={{ position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                    <DropdownIcon />
                  </div>
                </div>
              </div>
            </div>
            <div style={s.filterRight}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={s.fieldLabel}>검색</span>
                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                  <select
                    style={{ ...s.selectField, paddingRight: 28, minWidth: 100 }}
                    value={searchScope}
                    onChange={(e) => setSearchScope(e.target.value)}
                  >
                    <option value="전체">전체</option>
                    <option value="제목">제목</option>
                    <option value="ID">ID</option>
                  </select>
                  <div style={{ position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                    <DropdownIcon />
                  </div>
                </div>
              </div>
              <div style={s.searchInputWrap}>
                <div style={s.searchIcon}>
                  <SearchIcon />
                </div>
                <input
                  type="text"
                  style={s.searchInput}
                  placeholder="검색어를 입력하세요."
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  maxLength={20}
                />
                <span style={s.searchCounter}>{searchKeyword.length}/20</span>
              </div>
              <button
                style={s.searchBtn}
                onClick={() => setPage(1)}
              >
                검색
              </button>
            </div>
          </div>

          <div style={s.listWrap}>
            <div style={s.listFunction}>
              <div style={s.tabWrap}>
                <div style={s.tabItem(activeTab === "all")} onClick={() => { setActiveTab("all"); setPage(1); }}>
                  <span>All</span>
                  <span style={s.tabBadge(activeTab === "all")}>{allData.length}</span>
                </div>
                <div style={s.tabItem(activeTab === "personal")} onClick={() => { setActiveTab("personal"); setPage(1); }}>
                  <span>Personal</span>
                  <span style={s.tabBadge(activeTab === "personal")}>0</span>
                </div>
              </div>

              <div style={s.chipSortWrap}>
                <div
                  style={sortField === "updatedAt" ? s.chipActive : s.chipInactive}
                  onClick={() => setSortField("updatedAt")}
                >
                  <SortIcon active={sortField === "updatedAt"} />
                  <span>Update 일시</span>
                </div>
                <div
                  style={sortField === "dueDate" ? s.chipActive : s.chipInactive}
                  onClick={() => setSortField("dueDate")}
                >
                  <SortIcon active={sortField === "dueDate"} />
                  <span>완료 희망일</span>
                </div>
              </div>

              <div style={s.listAction}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={s.paginationLabel}>Items per page:</span>
                  <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                    <select
                      style={s.itemsPerPageSelect}
                      value={itemsPerPage}
                      onChange={(e) => { setItemsPerPage(Number(e.target.value)); setPage(1); }}
                    >
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={50}>50</option>
                    </select>
                  </div>
                </div>
                <span style={s.paginationInfo}>{startItem}-{endItem} of {totalItems}</span>
                <div style={s.paginationBtns}>
                  <button
                    style={s.paginationBtn(currentPage <= 1)}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage <= 1}
                  >
                    <ChevronLeftIcon />
                  </button>
                  <button
                    style={s.paginationBtn(currentPage >= totalPages)}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage >= totalPages}
                  >
                    <ChevronRightIcon />
                  </button>
                </div>
              </div>
            </div>

            <div style={s.list}>
              {pageItems.map((item) => (
                <div key={item.id} style={s.card}>
                  <div style={s.cardBadge(item.status)}>
                    <span style={s.cardBadgeText(item.status)}>{item.status}</span>
                  </div>

                  <div style={s.cardContent}>
                    <div style={s.cardRow}>
                      <span style={s.cardReqId}>{item.reqId}</span>
                      <span style={s.cardTitle}>{item.title}</span>
                    </div>
                    <div style={s.cardRow}>
                      <div style={s.labelControl}>
                        <span style={s.labelText}>완료 희망일</span>
                        <span style={s.valueText}>{item.dueDate}</span>
                      </div>
                      <div style={s.labelControl}>
                        <span style={s.labelText}>과제</span>
                        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <span style={s.taskBadge}>{item.taskId}</span>
                          <span style={s.valueText}>{item.taskName}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={s.regInfo}>
                    <div style={s.labelControl}>
                      <span style={s.labelText}>Updated</span>
                      <div style={s.timeWrap}>
                        <ClockIcon />
                        <span style={s.valueText}>{item.updatedAt}</span>
                      </div>
                    </div>
                    <div style={s.labelControl}>
                      <span style={s.labelText}>작성자</span>
                      <div style={s.userCard}>
                        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <span style={s.valueText}>{item.author}</span>
                          <RoleIconSvg />
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 4, opacity: 0.3 }}>
                          <div style={s.separator} />
                          <span style={s.orgText}>{item.authorOrg}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {pageItems.length === 0 && (
                <div style={{ padding: 60, textAlign: "center", color: "#a1a1aa", fontSize: 14, background: "#fff" }}>
                  데이터가 없습니다.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
