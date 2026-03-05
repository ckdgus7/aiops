import { useState, useMemo, useEffect, type CSSProperties } from "react";
import { useParams, useNavigate } from "react-router";
import { Button } from "@/shared/ui/Button";
import { useMdiStore } from "@/shared/model/mdi.store";
import { usePageHeader } from "@/shared/hooks/usePageHeader";
import { BUSINESS_MOCK_DATA, COMPONENT_MOCK_DATA } from "@/features/ssf/model/mock-data";

const FONT = "'Pretendard', sans-serif";

function HistoryIcon() {
  return (
    <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
      <path d="M10 4V12L14 14" stroke="#7a5af8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="10" cy="12" r="7" stroke="#7a5af8" strokeWidth="1.5" />
    </svg>
  );
}

function ChevronRightSmall() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M7 5L11 9L7 13" stroke="#71717a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EmptyState() {
  return (
    <div style={s.emptyState}>
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
        <path d="M21 21L31 31M31 21L21 31" stroke="#d4d4d8" strokeWidth="2" strokeLinecap="round" />
        <circle cx="26" cy="26" r="14" stroke="#d4d4d8" strokeWidth="2" />
      </svg>
      <span style={s.emptyText}>등록된 정보가 없습니다.</span>
    </div>
  );
}

function AddIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M6 1V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M1 6H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

interface SectionHeaderProps {
  title: string;
  right?: React.ReactNode;
}

function SectionHeader({ title, right }: SectionHeaderProps) {
  return (
    <div style={s.sectionHeader}>
      <span style={s.sectionTitle}>{title}</span>
      {right && <div style={s.sectionRight}>{right}</div>}
    </div>
  );
}

interface LabelValueProps {
  label: string;
  value: string;
  labelSize?: "s" | "m";
}

function LabelValue({ label, value, labelSize = "s" }: LabelValueProps) {
  return (
    <div style={s.labelControl}>
      <span style={labelSize === "s" ? s.fieldLabelS : s.fieldLabelM}>{label}</span>
      <span style={s.fieldValue}>{value}</span>
    </div>
  );
}

interface ListItemRowProps {
  badge: string;
  badgeColor: string;
  badgeBg?: string;
  text: string;
  onClick?: () => void;
}

function ListItemRow({ badge, badgeColor, badgeBg, text, onClick }: ListItemRowProps) {
  return (
    <div style={s.listItem} onClick={onClick}>
      <div style={s.listItemLeft}>
        <span
          style={{
            ...s.listBadge,
            color: badgeColor,
            borderColor: badgeColor,
            backgroundColor: badgeBg || "transparent",
          }}
        >
          {badge}
        </span>
        <span style={s.listItemText}>{text}</span>
      </div>
      <button style={s.listItemArrow} type="button">
        <ChevronRightSmall />
      </button>
    </div>
  );
}

const HISTORY_ITEMS = [
  { type: "초안", color: "#7a5af8", bg: "rgba(122, 90, 248, 0.08)", user: "전우치", date: "2025-11-28 15:24" },
  { type: "수정", color: "#f79009", bg: "rgba(247, 144, 9, 0.08)", user: "전우치", date: "2025-11-28 15:24" },
  { type: "삭제", color: "#f04438", bg: "rgba(240, 68, 56, 0.08)", user: "전우치", date: "2025-11-28 15:24" },
];

const FLOW_ITEMS = [
  { id: "B0001", text: "고객인증" },
  { id: "B0002", text: "본인인증" },
  { id: "B0003", text: "업무승인 요청 및 처리" },
];

const REQ_ITEMS = [
  { id: "RQ-LA-0013", text: "납부정보의 관리" },
  { id: "RQ-BP-7603", text: "대리납부/분할납부" },
  { id: "RQ-BP-7604", text: "미납 Event 통폐합에 따른 Event 생성 기능 변경" },
  { id: "RQ-BP-7006", text: "미납 채널 발송 프로세스 표준화" },
];

const PROJECT_ITEMS = [
  { id: "TK-BP-A010", text: "계약 이력 관리 시스템 구축" },
  { id: "RQ-BP-7603", text: "계약 이력 관리 시스템 구축" },
  { id: "RQ-BP-7604", text: "계약 이력 관리 시스템 구축" },
  { id: "RQ-BP-7605", text: "계약 이력 관리 시스템 구축" },
];

const L3_ITEMS = [
  { id: "BZ-EPCTMFC006-0001", text: "유선 서비스 기술방식 기준정보 관리", hasBpd: true },
  { id: "BZ-EPCTMFC006-0004", text: "인터페이스 기준 및 운영관리", hasBpd: true },
  { id: "BZ-EPCTMFC006-0012", text: "제휴사 연동 포맷 관리", hasBpd: false },
];

export function BusinessDetailView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const addTab = useMdiStore((st) => st.addTab);
  const [historyOpen, setHistoryOpen] = useState(true);
  const [ssfAccordionOpen, setSsfAccordionOpen] = useState(true);

  useEffect(() => {
    addTab({
      id: `/ssf/business/${id}`,
      label: "업무(L3)정보 상세",
      path: `/ssf/business/${id}`,
    });
  }, [addTab, id]);

  const item = useMemo(
    () => BUSINESS_MOCK_DATA.find((b) => b.businessId === id),
    [id],
  );

  const comp = useMemo(() => {
    if (!item) return null;
    return COMPONENT_MOCK_DATA.find(
      (c) => c.nameKo === item.componentNameKo && c.domainNameKo === item.domainNameKo,
    ) ?? null;
  }, [item]);

  usePageHeader({
    breadcrumbItems: [
      { label: "SSF관리" },
      { label: "업무(L3)정보 관리", onClick: () => navigate("/ssf/business") },
      { label: "업무(L3)정보 상세" },
    ],
    title: "업무(L3)정보 상세",
    favoriteKey: "업무(L3)정보 관리",
  });

  if (!item) {
    return (
      <div style={{ padding: 40, textAlign: "center", color: "#a1a1aa", fontFamily: FONT }}>
        해당 업무 정보를 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div style={s.outer}>
      <div style={s.row}>
        <div style={s.leftCol}>
          <div style={s.historyWrap}>
            <div style={s.container}>
              <SectionHeader
                title="업무(L3) 기준 정보"
                right={
                  <button
                    style={s.historyBtn}
                    type="button"
                    onClick={() => setHistoryOpen(!historyOpen)}
                  >
                    <HistoryIcon />
                    <span style={s.historyBtnText}>3 History</span>
                  </button>
                }
              />
              <div style={s.mainFields}>
                <LabelValue label="업무(L3) ID" value={item.businessId} />
                <LabelValue label="업무(L3) 명" value={item.nameKo} />
                <div style={s.fieldRow}>
                  <LabelValue label="L2기획리더" value={item.planLeader} />
                  <LabelValue label="L3설계리더" value={item.designLeader} />
                </div>
                <div style={s.fieldRow}>
                  <LabelValue label="저장일시" value="2025-11-28 15:24" />
                  <LabelValue label="마지막 수정일시" value="2025-11-28 15:24" />
                </div>
                <div style={s.labelControl}>
                  <span style={s.fieldLabelS}>업무(L3) 설명</span>
                  <p style={s.descriptionText}>{item.description}</p>
                </div>

                <div style={s.ssfInfoSection}>
                  <span style={s.ssfInfoLabel}>SSF 정보</span>
                  {comp && (
                    <div style={s.accordionWrap}>
                      <div style={s.accordionTabs}>
                        <div style={s.accordionTabInactive}>
                          <span style={s.accordionTabBadge}>BPC</span>
                          <span style={s.accordionTabText}>엔터프라이즈 상품...</span>
                        </div>
                        <button
                          style={s.accordionTabActive}
                          type="button"
                          onClick={() => setSsfAccordionOpen(!ssfAccordionOpen)}
                        >
                          <span style={s.accordionTabBadgePurple}>{comp.componentId}</span>
                          <span style={s.accordionTabText}>{comp.nameKo}</span>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            style={{
                              transform: ssfAccordionOpen ? "rotate(180deg)" : "rotate(0deg)",
                              transition: "transform 0.2s",
                            }}
                          >
                            <path d="M4 6L8 10L12 6" stroke="#71717a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      </div>
                      {ssfAccordionOpen && (
                        <div style={s.accordionBody}>
                          <div style={s.compInfoGrid}>
                            <div style={s.compInfoItem}>
                              <span style={s.compInfoLabel}>Component ID</span>
                              <span style={s.compInfoValue}>{comp.componentId}</span>
                            </div>
                            <div style={s.compInfoItem}>
                              <span style={s.compInfoLabel}>Component(한글)</span>
                              <span style={s.compInfoValue}>{comp.nameKo}</span>
                            </div>
                            <div style={s.compInfoItem}>
                              <span style={s.compInfoLabel}>Component명</span>
                              <span style={s.compInfoValue}>{comp.nameEn}</span>
                            </div>
                          </div>
                          <div style={s.compInfoGrid}>
                            <div style={s.compInfoItem}>
                              <span style={s.compInfoLabel}>L2기획리더</span>
                              <span style={s.compInfoValue}>{comp.planLeader}</span>
                            </div>
                            <div style={s.compInfoItem}>
                              <span style={s.compInfoLabel}>L2설계리더</span>
                              <span style={s.compInfoValue}>{comp.designLeader}</span>
                            </div>
                          </div>
                          <div style={s.compDescWrap}>
                            <span style={s.compInfoLabel}>Component 설명</span>
                            <p style={s.compDescText}>{comp.description}</p>
                          </div>

                          <div style={s.relL3Section}>
                            <div style={s.relL3Header}>
                              <span style={s.compInfoLabel}>연관 업무(L3)</span>
                              <div style={s.relL3Pagination}>
                                <span style={s.paginationInfo}>Items per page:</span>
                                <select style={s.paginationSelect}>
                                  <option>10</option>
                                </select>
                                <span style={s.paginationInfo}>1-3 of 3</span>
                                <span style={s.paginationNav}>{"< 1 >"}</span>
                                <button style={s.paginationClose} type="button">✕</button>
                              </div>
                            </div>
                            {L3_ITEMS.map((l3) => (
                              <div key={l3.id} style={s.l3Item}>
                                <div style={s.l3Left}>
                                  <span style={s.l3Badge}>{l3.id}</span>
                                  <span style={s.l3Text}>{l3.text}</span>
                                </div>
                                <div style={s.l3Right}>
                                  {l3.hasBpd && (
                                    <span style={s.bpdBadge}>
                                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                        <rect x="1" y="1" width="12" height="12" rx="2" stroke="#7a5af8" strokeWidth="1.2" />
                                        <path d="M4 7H10" stroke="#7a5af8" strokeWidth="1.2" strokeLinecap="round" />
                                      </svg>
                                    </span>
                                  )}
                                  <button style={s.listItemArrow} type="button">
                                    <ChevronRightSmall />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {historyOpen && (
              <div style={s.historySidebar}>
                <div style={s.historyList}>
                  {HISTORY_ITEMS.map((h, idx) => (
                    <div key={idx} style={s.historyItem}>
                      <div style={s.historyDotLine}>
                        <div
                          style={{
                            ...s.historyDot,
                            backgroundColor: h.color,
                          }}
                        />
                        {idx < HISTORY_ITEMS.length - 1 && <div style={s.historyLine} />}
                      </div>
                      <div style={s.historyContent}>
                        <span
                          style={{
                            ...s.historyType,
                            color: h.color,
                            backgroundColor: h.bg,
                          }}
                        >
                          {h.type}
                        </span>
                        <span style={s.historyUser}>{h.user}</span>
                        <span style={s.historyDate}>{h.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div style={s.bpdSection}>
            <div style={s.bpdHeader}>
              <span style={s.bpdTitle}>BPD 관리</span>
            </div>
            <div style={s.bpdMain}>
              <Button size="m" variant="outlined" color="positive" leadingIcon={<AddIcon />}>
                BPD 추가
              </Button>
              <EmptyState />
            </div>
          </div>
        </div>

        <div style={s.rightCol}>
          <SectionHeader title="연관 정보" />

          <div style={s.rightMainScroll}>
            <div style={s.relSection}>
              <span style={s.relLabel}>기능(L4)</span>
              <EmptyState />
            </div>

            <div style={s.relSection}>
              <span style={s.relLabel}>업무Flow</span>
              <div style={s.relList}>
                {FLOW_ITEMS.map((f) => (
                  <ListItemRow
                    key={f.id}
                    badge={f.id}
                    badgeColor="#12b76a"
                    badgeBg="rgba(18, 183, 106, 0.05)"
                    text={f.text}
                  />
                ))}
              </div>
            </div>

            <div style={s.relSection}>
              <div style={s.relSectionHeader}>
                <span style={s.relLabel}>요구사항</span>
                <div style={s.miniPagination}>
                  <span style={s.paginationInfo}>Items per page:</span>
                  <select style={s.paginationSelect}>
                    <option>5</option>
                  </select>
                  <span style={s.paginationInfo}>1-3 of 3</span>
                  <span style={s.paginationNav}>{"< 1 >"}</span>
                </div>
              </div>
              <div style={s.relList}>
                {REQ_ITEMS.map((r) => (
                  <ListItemRow
                    key={r.id}
                    badge={r.id}
                    badgeColor="#36bffa"
                    text={r.text}
                  />
                ))}
              </div>
            </div>

            <div style={s.relSection}>
              <div style={s.relSectionHeader}>
                <span style={s.relLabel}>연관 과제</span>
                <div style={s.miniPagination}>
                  <span style={s.paginationInfo}>Items per page:</span>
                  <select style={s.paginationSelect}>
                    <option>5</option>
                  </select>
                  <span style={s.paginationInfo}>1-4 of 4</span>
                  <span style={s.paginationNav}>{"< 1 >"}</span>
                </div>
              </div>
              <div style={s.relList}>
                {PROJECT_ITEMS.map((p, idx) => (
                  <ListItemRow
                    key={idx}
                    badge={p.id}
                    badgeColor="#71717a"
                    text={p.text}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const s = {
  outer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    overflow: "auto",
    fontFamily: FONT,
  } satisfies CSSProperties,
  row: {
    display: "flex",
    gap: 0,
    width: "100%",
    minHeight: "100%",
  } satisfies CSSProperties,
  leftCol: {
    flex: "0 0 62%",
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    borderRight: "1px solid #e4e4e7",
  } satisfies CSSProperties,
  rightCol: {
    flex: 1,
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    padding: "24px 32px",
    overflow: "hidden",
  } satisfies CSSProperties,
  historyWrap: {
    display: "flex",
    borderBottom: "1px solid #e4e4e7",
  } satisfies CSSProperties,
  container: {
    flex: 1,
    minWidth: 0,
    padding: "24px 32px",
    display: "flex",
    flexDirection: "column",
    gap: 16,
  } satisfies CSSProperties,
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 40,
    width: "100%",
  } satisfies CSSProperties,
  sectionTitle: {
    fontFamily: FONT,
    fontSize: 16,
    fontWeight: 700,
    lineHeight: "24px",
    color: "#000000",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  sectionRight: {
    display: "flex",
    alignItems: "center",
  } satisfies CSSProperties,
  historyBtn: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    border: "none",
    background: "transparent",
    cursor: "pointer",
    padding: 0,
    borderRadius: 4,
  } satisfies CSSProperties,
  historyBtnText: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "20px",
    color: "#7a5af8",
  } satisfies CSSProperties,
  mainFields: {
    display: "flex",
    flexDirection: "column",
    gap: 32,
  } satisfies CSSProperties,
  fieldRow: {
    display: "flex",
    gap: 32,
    alignItems: "flex-start",
  } satisfies CSSProperties,
  labelControl: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  } satisfies CSSProperties,
  fieldLabelS: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "18px",
    color: "#a1a1aa",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  fieldLabelM: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "18px",
    color: "#a1a1aa",
  } satisfies CSSProperties,
  fieldValue: {
    fontFamily: FONT,
    fontSize: 16,
    fontWeight: 400,
    lineHeight: "24px",
    color: "#3f3f46",
  } satisfies CSSProperties,
  descriptionText: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "20px",
    color: "#3f3f46",
    margin: 0,
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  } satisfies CSSProperties,
  ssfInfoSection: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  } satisfies CSSProperties,
  ssfInfoLabel: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "18px",
    color: "#a1a1aa",
  } satisfies CSSProperties,
  accordionWrap: {
    border: "1px solid #e4e4e7",
    borderRadius: 8,
    overflow: "hidden",
  } satisfies CSSProperties,
  accordionTabs: {
    display: "flex",
    borderBottom: "1px solid #e4e4e7",
  } satisfies CSSProperties,
  accordionTabInactive: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "10px 16px",
    backgroundColor: "#fafafa",
    borderRight: "1px solid #e4e4e7",
    cursor: "pointer",
  } satisfies CSSProperties,
  accordionTabActive: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "10px 16px",
    backgroundColor: "#ffffff",
    border: "none",
    borderRight: "1px solid #e4e4e7",
    cursor: "pointer",
    fontFamily: FONT,
  } satisfies CSSProperties,
  accordionTabBadge: {
    fontFamily: FONT,
    fontSize: 10,
    fontWeight: 500,
    lineHeight: "12px",
    color: "#12b76a",
    border: "1px solid #12b76a",
    borderRadius: 12,
    padding: "3px 10px",
    backgroundColor: "rgba(18, 183, 106, 0.05)",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  accordionTabBadgePurple: {
    fontFamily: FONT,
    fontSize: 10,
    fontWeight: 500,
    lineHeight: "12px",
    color: "#7a5af8",
    border: "1px solid #7a5af8",
    borderRadius: 12,
    padding: "3px 10px",
    backgroundColor: "rgba(122, 90, 248, 0.05)",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  accordionTabText: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "20px",
    color: "#3f3f46",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: 160,
  } satisfies CSSProperties,
  accordionBody: {
    padding: "16px 20px",
    display: "flex",
    flexDirection: "column",
    gap: 16,
  } satisfies CSSProperties,
  compInfoGrid: {
    display: "flex",
    gap: 24,
    flexWrap: "wrap",
  } satisfies CSSProperties,
  compInfoItem: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  } satisfies CSSProperties,
  compInfoLabel: {
    fontFamily: FONT,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    color: "#a1a1aa",
  } satisfies CSSProperties,
  compInfoValue: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "20px",
    color: "#3f3f46",
  } satisfies CSSProperties,
  compDescWrap: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  } satisfies CSSProperties,
  compDescText: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "20px",
    color: "#3f3f46",
    margin: 0,
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  } satisfies CSSProperties,
  relL3Section: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    marginTop: 8,
    borderTop: "1px solid #e4e4e7",
    paddingTop: 12,
  } satisfies CSSProperties,
  relL3Header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  } satisfies CSSProperties,
  relL3Pagination: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  } satisfies CSSProperties,
  paginationInfo: {
    fontFamily: FONT,
    fontSize: 12,
    fontWeight: 400,
    lineHeight: "16px",
    color: "#71717a",
  } satisfies CSSProperties,
  paginationSelect: {
    fontFamily: FONT,
    fontSize: 12,
    border: "1px solid #e4e4e7",
    borderRadius: 4,
    padding: "2px 4px",
    color: "#3f3f46",
    background: "#fff",
  } satisfies CSSProperties,
  paginationNav: {
    fontFamily: FONT,
    fontSize: 12,
    color: "#71717a",
    display: "flex",
    alignItems: "center",
    gap: 4,
  } satisfies CSSProperties,
  paginationClose: {
    border: "none",
    background: "transparent",
    color: "#71717a",
    cursor: "pointer",
    fontSize: 12,
    padding: 0,
  } satisfies CSSProperties,
  l3Item: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px",
    border: "1px solid #e4e4e7",
    borderRadius: 4,
    minHeight: 36,
    gap: 8,
  } satisfies CSSProperties,
  l3Left: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flex: 1,
    minWidth: 0,
    overflow: "hidden",
  } satisfies CSSProperties,
  l3Badge: {
    fontFamily: FONT,
    fontSize: 10,
    fontWeight: 500,
    lineHeight: "12px",
    color: "#7a5af8",
    border: "1px solid #7a5af8",
    borderRadius: 12,
    padding: "3px 10px",
    backgroundColor: "rgba(122, 90, 248, 0.05)",
    whiteSpace: "nowrap",
    flexShrink: 0,
  } satisfies CSSProperties,
  l3Text: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "20px",
    color: "#3f3f46",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  l3Right: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    flexShrink: 0,
  } satisfies CSSProperties,
  bpdBadge: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 24,
    height: 24,
    borderRadius: 4,
    backgroundColor: "rgba(122, 90, 248, 0.08)",
  } satisfies CSSProperties,
  historySidebar: {
    width: 190,
    flexShrink: 0,
    borderLeft: "1px solid #e4e4e7",
    padding: "24px 24px",
  } satisfies CSSProperties,
  historyList: {
    display: "flex",
    flexDirection: "column",
  } satisfies CSSProperties,
  historyItem: {
    display: "flex",
    gap: 12,
    minHeight: 80,
  } satisfies CSSProperties,
  historyDotLine: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: 12,
    flexShrink: 0,
    paddingTop: 6,
  } satisfies CSSProperties,
  historyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    flexShrink: 0,
  } satisfies CSSProperties,
  historyLine: {
    width: 1,
    flex: 1,
    backgroundColor: "#e4e4e7",
    marginTop: 4,
  } satisfies CSSProperties,
  historyContent: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  } satisfies CSSProperties,
  historyType: {
    fontFamily: FONT,
    fontSize: 10,
    fontWeight: 500,
    lineHeight: "12px",
    borderRadius: 4,
    padding: "2px 8px",
    alignSelf: "flex-start",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  historyUser: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "20px",
    color: "#3f3f46",
  } satisfies CSSProperties,
  historyDate: {
    fontFamily: FONT,
    fontSize: 12,
    fontWeight: 400,
    lineHeight: "16px",
    color: "#a1a1aa",
  } satisfies CSSProperties,
  bpdSection: {
    padding: "24px 32px",
    display: "flex",
    flexDirection: "column",
    gap: 16,
  } satisfies CSSProperties,
  bpdHeader: {
    display: "flex",
    alignItems: "center",
    minHeight: 40,
  } satisfies CSSProperties,
  bpdTitle: {
    fontFamily: FONT,
    fontSize: 16,
    fontWeight: 700,
    lineHeight: "24px",
    color: "#000000",
  } satisfies CSSProperties,
  bpdMain: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    alignItems: "flex-start",
  } satisfies CSSProperties,
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#fafafa",
    borderRadius: 4,
    minHeight: 160,
    padding: 24,
    width: "100%",
  } satisfies CSSProperties,
  emptyText: {
    fontFamily: FONT,
    fontSize: 16,
    fontWeight: 400,
    lineHeight: "24px",
    color: "#71717a",
  } satisfies CSSProperties,
  rightMainScroll: {
    display: "flex",
    flexDirection: "column",
    gap: 32,
    marginTop: 16,
    overflow: "auto",
    flex: 1,
  } satisfies CSSProperties,
  relSection: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  } satisfies CSSProperties,
  relSectionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  } satisfies CSSProperties,
  relLabel: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "18px",
    color: "#a1a1aa",
  } satisfies CSSProperties,
  miniPagination: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  } satisfies CSSProperties,
  relList: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  } satisfies CSSProperties,
  listItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    padding: "8px 12px 8px 8px",
    border: "1px solid #e4e4e7",
    borderRadius: 4,
    minHeight: 40,
    cursor: "pointer",
  } satisfies CSSProperties,
  listItemLeft: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    flex: 1,
    minWidth: 0,
    overflow: "hidden",
  } satisfies CSSProperties,
  listBadge: {
    fontFamily: FONT,
    fontSize: 10,
    fontWeight: 500,
    lineHeight: "12px",
    borderRadius: 12,
    padding: "3px 10px",
    border: "1px solid",
    whiteSpace: "nowrap",
    flexShrink: 0,
  } satisfies CSSProperties,
  listItemText: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "20px",
    color: "#3f3f46",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  listItemArrow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 24,
    height: 24,
    border: "1px solid #71717a",
    borderRadius: 4,
    background: "#fff",
    cursor: "pointer",
    padding: 0,
    flexShrink: 0,
  } satisfies CSSProperties,
};
