import { useState, useEffect, type CSSProperties, type ReactNode } from "react";
import { useParams } from "react-router";
import { useMdiStore } from "@/shared/model/mdi.store";
import { usePageHeader } from "@/shared/hooks/usePageHeader";
import { BUSINESS_MOCK_DATA, COMPONENT_MOCK_DATA } from "@/features/ssf/model/mock-data";

const FONT = "'Pretendard', sans-serif";

function ChevronIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M6.75 4.5L11.25 9L6.75 13.5" stroke="#71717a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HistoryIcon() {
  return (
    <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
      <path d="M10 4C6.13 4 3 7.13 3 11C3 14.87 6.13 18 10 18C13.87 18 17 14.87 17 11" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 7V11L13 13" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function NoDataIcon() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <circle cx="26" cy="22" r="10" stroke="#d4d4d8" strokeWidth="1.5" />
      <path d="M20 36C20 32.6863 22.6863 30 26 30C29.3137 30 32 32.6863 32 36" stroke="#d4d4d8" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="34" y1="18" x2="38" y2="14" stroke="#d4d4d8" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function AccordionToggle({ open }: { open: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d={open ? "M16 14L12 10L8 14" : "M8 10L12 14L16 10"}
        stroke="#71717a"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface LabelValueProps {
  label: string;
  value: ReactNode;
  fullWidth?: boolean;
}

function LabelValue({ label, value, fullWidth }: LabelValueProps) {
  return (
    <div style={{ ...s.fieldCol, ...(fullWidth ? { width: "100%" } : {}) }}>
      <span style={s.fieldLabel}>{label}</span>
      <span style={s.fieldValue}>{value}</span>
    </div>
  );
}

interface ListItemRowProps {
  badge: string;
  badgeColor: string;
  badgeBg?: string;
  text: string;
}

function ListItemRow({ badge, badgeColor, badgeBg, text }: ListItemRowProps) {
  return (
    <div style={s.listItem}>
      <div style={s.listItemLeft}>
        <span style={{ ...s.listBadge, color: badgeColor, borderColor: badgeColor, backgroundColor: badgeBg || "transparent" }}>
          {badge}
        </span>
        <span style={s.listText}>{text}</span>
      </div>
      <button type="button" style={s.listArrowBtn}><ChevronIcon /></button>
    </div>
  );
}

function SectionHeader({ title, right }: { title: string; right?: ReactNode }) {
  return (
    <div style={s.sectionHeader}>
      <span style={s.sectionTitle}>{title}</span>
      {right && <div style={s.sectionRight}>{right}</div>}
    </div>
  );
}

function NoDataArea() {
  return (
    <div style={s.noData}>
      <NoDataIcon />
      <span style={s.noDataText}>등록된 정보가 없습니다.</span>
    </div>
  );
}

function MiniPagination({ current, total, perPage }: { current: number; total: number; perPage: number }) {
  return (
    <div style={s.miniPagination}>
      <span style={s.paginationLabel}>Items per page:</span>
      <select style={s.paginationSelect} defaultValue={perPage}><option>{perPage}</option></select>
      <span style={s.paginationLabel}>{(current - 1) * perPage + 1}-{Math.min(current * perPage, total)} of {total}</span>
      <span style={s.paginationNav}>{"< "}{current}{" >"}</span>
    </div>
  );
}

interface LevelBadgeProps {
  level: string;
  code: string;
  color: string;
  active?: boolean;
}

function LevelBadge({ level, code, color, active }: LevelBadgeProps) {
  return (
    <div style={{
      ...s.lvCard,
      ...(active ? { border: `1px solid #7a5af8` } : {}),
      ...(!active ? { opacity: 0.5 } : {}),
    }}>
      <div style={s.lvBadgeWrap}>
        <div style={{ ...s.lvBadgeBase, borderColor: color }}>
          <span style={{ ...s.lvDot, backgroundColor: color }}>
            <span style={s.lvDotText}>{level}</span>
          </span>
          <span style={{ ...s.lvBadgeText, color }}>{code}</span>
        </div>
      </div>
      <div style={s.lvNameRow}>
        <span style={s.lvName}>{code === "EPC" ? "엔터프라이즈 상품 카탈로그" : "서비스 카탈로그 관리"}</span>
        <button type="button" style={s.lvToggleBtn}>
          <AccordionToggle open={active || false} />
        </button>
      </div>
    </div>
  );
}

interface HistoryItemProps {
  type: string;
  typeColor: string;
  typeBg: string;
  typeBorderColor: string;
  user: string;
  date: string;
  isFirst?: boolean;
  isLast?: boolean;
  active?: boolean;
}

function HistoryItem({ type, typeColor, typeBg, typeBorderColor, user, date, isFirst, isLast, active }: HistoryItemProps) {
  return (
    <div style={s.historyItem}>
      <div style={s.historyMark}>
        {!isFirst && <div style={s.historyLineTop} />}
        <div style={{ ...s.historyDot, backgroundColor: active ? "#7a5af8" : "#d4d4d8" }} />
        {!isLast && <div style={s.historyLineBottom} />}
      </div>
      <div style={s.historyContent}>
        <span style={{ ...s.historyBadge, color: typeColor, backgroundColor: typeBg, borderColor: typeBorderColor }}>
          {type}
        </span>
        <span style={s.historyUser}>{user}</span>
        <span style={s.historyDate}>{date}</span>
      </div>
    </div>
  );
}

const HISTORY_DATA = [
  { type: "수정", typeColor: "#f79009", typeBg: "#fffaeb", typeBorderColor: "#f79009", user: "전우치", date: "2025-11-28 15:24", active: true },
  { type: "수정", typeColor: "#f79009", typeBg: "#fffaeb", typeBorderColor: "#f79009", user: "홍길동", date: "2025-11-20 09:15", active: false },
  { type: "저장", typeColor: "#1ac057", typeBg: "#f2fdf5", typeBorderColor: "#1ac057", user: "이순신", date: "2025-11-15 14:30", active: false },
];

const FLOW_ITEMS = [
  { id: "B0001", text: "고객인증" },
  { id: "B0002", text: "본인인증" },
  { id: "B0003", text: "업무승인 요청 및 처리" },
];

const REQ_ITEMS = [
  { id: "RQ-LA-0013", text: "인터페이스 구조개선" },
  { id: "RQ-LA-0014", text: "고객정보 연동 시스템 구축" },
  { id: "RQ-LA-0015", text: "결제 모듈 통합 관리" },
  { id: "RQ-LA-0016", text: "알림 서비스 고도화" },
];

const PROJECT_ITEMS = [
  { id: "PJ-0001", text: "차세대 시스템 고도화" },
  { id: "PJ-0002", text: "운영 안정화 프로젝트" },
  { id: "PJ-0003", text: "데이터 마이그레이션" },
  { id: "PJ-0004", text: "보안 체계 강화" },
];

const L3_ITEMS = [
  { id: "BZ-SKNC001-001", text: "서비스 카탈로그 조회" },
  { id: "BZ-SKNC001-002", text: "서비스 사양 관리" },
  { id: "BZ-SKNC001-003", text: "고객 중심 서비스 뷰" },
];

export function BusinessDetailView() {
  const { id } = useParams<{ id: string }>();
  const addTab = useMdiStore((st) => st.addTab);
  const [historyOpen, setHistoryOpen] = useState(true);

  const item = BUSINESS_MOCK_DATA.find((b) => b.businessId === id);

  useEffect(() => {
    addTab({ id: `/ssf/business/${id}`, label: "업무(L3)정보 상세", path: `/ssf/business/${id}` });
  }, [id, addTab]);

  usePageHeader({
    breadcrumbItems: [{ label: "SSF관리" }, { label: "업무(L3)정보 관리" }, { label: "업무(L3)정보 상세" }],
    title: "업무(L3)정보 상세",
  });

  if (!item) {
    return <div style={s.outer}><NoDataArea /></div>;
  }

  const comp = COMPONENT_MOCK_DATA.find(
    (c) => c.nameKo === item.componentNameKo && c.domainNameKo === item.domainNameKo,
  );

  return (
    <div style={s.outer}>
      <div style={s.row}>
        {/* Left Column */}
        <div style={s.leftCol}>
          {/* historyWrap: container + history panel */}
          <div style={s.historyWrap}>
            <div style={{ ...s.container, flex: 1 }}>
              <SectionHeader
                title="업무(L3) 기준 정보"
                right={
                  <button style={s.historyBtn} type="button" onClick={() => setHistoryOpen(!historyOpen)}>
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
                <LabelValue label="업무(L3) 설명" value={item.description} fullWidth />

                {/* SSF 정보 */}
                <div style={s.ssfSection}>
                  <span style={s.ssfLabel}>SSF 정보</span>
                  <div style={s.lvAccordion}>
                    {/* L1→L2 hierarchy bar */}
                    <div style={s.lvHierarchy}>
                      <LevelBadge level="L1" code="EPC" color="#3e1c96" />
                      <LevelBadge level="L2" code={comp?.componentId || "TMFC006"} color="#5925dc" active />
                    </div>

                    {/* Expanded content */}
                    <div style={s.lvContent}>
                      <div style={s.lvFieldRow}>
                        <LabelValue label="Component ID" value={comp?.componentId || "TMFC006"} />
                        <LabelValue label="Component(한글)" value={item.componentNameKo} />
                        <LabelValue label="Component명" value={comp?.nameEn || "Service Catalog Management"} />
                      </div>
                      <div style={s.lvFieldRow}>
                        <LabelValue label="L2기획리더" value={comp?.planLeader || item.planLeader} />
                        <LabelValue label="L2설계리더" value={comp?.designLeader || item.designLeader} />
                      </div>
                      <LabelValue
                        label="Component 설명"
                        value={comp?.description || "서비스 카탈로그 관리 구성 요소는 수행 가능한 모든 서비스 요구 사항을 식별하고 정의하는 서비스 사양 모음을 구성하는 역할을 합니다."}
                        fullWidth
                      />

                      {/* 연관 업무(L3) */}
                      <div style={s.relSection}>
                        <div style={s.relHeaderRow}>
                          <span style={{ ...s.fieldLabel, fontSize: 14 }}>연관 업무(L3)</span>
                          <MiniPagination current={1} total={L3_ITEMS.length} perPage={5} />
                        </div>
                        <div style={s.relList}>
                          {L3_ITEMS.map((l3) => (
                            <ListItemRow key={l3.id} badge={l3.id} badgeColor="#7a5af8" badgeBg="rgba(122,90,248,0.05)" text={l3.text} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* History Panel */}
            {historyOpen && (
              <div style={s.historyPanel}>
                <div style={s.historyList}>
                  {HISTORY_DATA.map((h, i) => (
                    <HistoryItem
                      key={i}
                      type={h.type}
                      typeColor={h.typeColor}
                      typeBg={h.typeBg}
                      typeBorderColor={h.typeBorderColor}
                      user={h.user}
                      date={h.date}
                      isFirst={i === 0}
                      isLast={i === HISTORY_DATA.length - 1}
                      active={h.active}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* BPD 관리 */}
          <div style={s.bpdContainer}>
            <div style={s.bpdInner}>
              <SectionHeader title="BPD 관리" />
              <NoDataArea />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div style={s.rightCol}>
          <SectionHeader title="연관 정보" />
          <div style={s.rightMain}>
            {/* 기능(L4) - empty state */}
            <div style={s.relSection}>
              <div style={s.relHeaderRow}>
                <span style={s.relLabel}>기능(L4)</span>
                <MiniPagination current={1} total={0} perPage={5} />
              </div>
              <NoDataArea />
            </div>

            {/* 업무Flow */}
            <div style={s.relSection}>
              <span style={s.relLabel}>업무Flow</span>
              <div style={s.relList}>
                {FLOW_ITEMS.map((f) => (
                  <ListItemRow key={f.id} badge={f.id} badgeColor="#12b76a" badgeBg="rgba(18,183,106,0.05)" text={f.text} />
                ))}
              </div>
            </div>

            {/* 요구사항 */}
            <div style={s.relSection}>
              <div style={s.relHeaderRow}>
                <span style={s.relLabel}>요구사항</span>
                <MiniPagination current={1} total={REQ_ITEMS.length} perPage={5} />
              </div>
              <div style={s.relList}>
                {REQ_ITEMS.map((r) => (
                  <ListItemRow key={r.id} badge={r.id} badgeColor="#36bffa" text={r.text} />
                ))}
              </div>
            </div>

            {/* 연관 과제 */}
            <div style={s.relSection}>
              <div style={s.relHeaderRow}>
                <span style={s.relLabel}>연관 과제</span>
                <MiniPagination current={1} total={PROJECT_ITEMS.length} perPage={5} />
              </div>
              <div style={s.relList}>
                {PROJECT_ITEMS.map((p) => (
                  <ListItemRow key={p.id} badge={p.id} badgeColor="#a1a1aa" text={p.text} />
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
  } satisfies CSSProperties,
  row: {
    display: "flex",
    width: "100%",
    minHeight: "100%",
  } satisfies CSSProperties,

  leftCol: {
    width: "62%",
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
  } satisfies CSSProperties,
  historyWrap: {
    display: "flex",
    flexDirection: "row",
  } satisfies CSSProperties,
  container: {
    padding: "24px 32px",
    display: "flex",
    flexDirection: "column",
    gap: 16,
  } satisfies CSSProperties,

  sectionHeader: {
    display: "flex",
    alignItems: "flex-start",
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
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    flex: 1,
    minHeight: 20,
  } satisfies CSSProperties,

  mainFields: {
    display: "flex",
    flexDirection: "column",
    gap: 32,
    width: "100%",
  } satisfies CSSProperties,
  fieldCol: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  } satisfies CSSProperties,
  fieldLabel: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "18px",
    color: "#a1a1aa",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  fieldValue: {
    fontFamily: FONT,
    fontSize: 16,
    fontWeight: 400,
    lineHeight: "24px",
    color: "#3f3f46",
  } satisfies CSSProperties,
  fieldRow: {
    display: "flex",
    gap: 32,
    width: "100%",
  } satisfies CSSProperties,

  ssfSection: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    width: "100%",
  } satisfies CSSProperties,
  ssfLabel: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "18px",
    color: "#a1a1aa",
    marginBottom: 4,
  } satisfies CSSProperties,

  lvAccordion: {
    border: "1px solid #e4e4e7",
    borderRadius: 8,
    overflow: "hidden",
    width: "100%",
    boxShadow: "0px 4px 8px 0px rgba(0,0,0,0.1)",
    backgroundColor: "#ffffff",
  } satisfies CSSProperties,
  lvHierarchy: {
    display: "flex",
    alignItems: "center",
    padding: 8,
    gap: 0,
  } satisfies CSSProperties,
  lvCard: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "12px 16px",
    borderRadius: 4,
    backgroundColor: "#ffffff",
    flexShrink: 0,
  } satisfies CSSProperties,
  lvBadgeWrap: {
    display: "flex",
    alignItems: "flex-start",
  } satisfies CSSProperties,
  lvBadgeBase: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    paddingLeft: 3,
    paddingRight: 10,
    paddingTop: 3,
    paddingBottom: 3,
    borderRadius: 12,
    border: "1px solid",
    backgroundColor: "#ffffff",
  } satisfies CSSProperties,
  lvDot: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 12,
    height: 12,
    borderRadius: 8,
  } satisfies CSSProperties,
  lvDotText: {
    fontFamily: FONT,
    fontSize: 8,
    fontWeight: 700,
    color: "#ffffff",
    textAlign: "center",
    lineHeight: "8px",
  } satisfies CSSProperties,
  lvBadgeText: {
    fontFamily: FONT,
    fontSize: 10,
    fontWeight: 500,
    lineHeight: "12px",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  lvNameRow: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  } satisfies CSSProperties,
  lvName: {
    fontFamily: FONT,
    fontSize: 16,
    fontWeight: 400,
    lineHeight: "24px",
    color: "#3f3f46",
    maxWidth: 140,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  lvToggleBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    padding: 0,
  } satisfies CSSProperties,

  lvContent: {
    borderTop: "1px solid #e4e4e7",
    display: "flex",
    flexDirection: "column",
    gap: 16,
    padding: "16px 16px 24px",
  } satisfies CSSProperties,
  lvFieldRow: {
    display: "flex",
    gap: 32,
    width: "100%",
  } satisfies CSSProperties,

  historyBtn: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    border: "none",
    background: "transparent",
    cursor: "pointer",
    padding: "0 4px",
  } satisfies CSSProperties,
  historyBtnText: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "20px",
    color: "#71717a",
  } satisfies CSSProperties,

  historyPanel: {
    width: 190,
    flexShrink: 0,
    backgroundColor: "#fafafa",
    borderLeft: "1px solid #e4e4e7",
    padding: 24,
  } satisfies CSSProperties,
  historyList: {
    display: "flex",
    flexDirection: "column",
  } satisfies CSSProperties,
  historyItem: {
    display: "flex",
    gap: 8,
    alignItems: "flex-start",
    minWidth: 142,
  } satisfies CSSProperties,
  historyMark: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "stretch",
    width: 20,
    flexShrink: 0,
    position: "relative",
  } satisfies CSSProperties,
  historyLineTop: {
    width: 1,
    height: 6,
    backgroundColor: "#e4e4e7",
    flexShrink: 0,
  } satisfies CSSProperties,
  historyDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    flexShrink: 0,
  } satisfies CSSProperties,
  historyLineBottom: {
    width: 1,
    flex: 1,
    backgroundColor: "#e4e4e7",
  } satisfies CSSProperties,
  historyContent: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    paddingBottom: 16,
    minWidth: 100,
  } satisfies CSSProperties,
  historyBadge: {
    fontFamily: FONT,
    fontSize: 10,
    fontWeight: 500,
    lineHeight: "12px",
    border: "1px solid",
    borderRadius: 12,
    padding: "3px 10px",
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
    lineHeight: "18px",
    color: "#3f3f46",
  } satisfies CSSProperties,

  bpdContainer: {
    borderTop: "1px solid #e4e4e7",
    display: "flex",
    flexDirection: "column",
  } satisfies CSSProperties,
  bpdInner: {
    padding: "24px 32px",
    display: "flex",
    flexDirection: "column",
    gap: 16,
  } satisfies CSSProperties,

  rightCol: {
    flex: 1,
    borderLeft: "1px solid #e4e4e7",
    display: "flex",
    flexDirection: "column",
    padding: "24px 32px",
    gap: 16,
  } satisfies CSSProperties,
  rightMain: {
    display: "flex",
    flexDirection: "column",
    gap: 32,
  } satisfies CSSProperties,
  relSection: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  } satisfies CSSProperties,
  relHeaderRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 48,
  } satisfies CSSProperties,
  relLabel: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "18px",
    color: "#a1a1aa",
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
    backgroundColor: "#ffffff",
    minHeight: 40,
  } satisfies CSSProperties,
  listItemLeft: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    flex: 1,
    minWidth: 0,
  } satisfies CSSProperties,
  listBadge: {
    fontFamily: FONT,
    fontSize: 10,
    fontWeight: 500,
    lineHeight: "12px",
    border: "1px solid",
    borderRadius: 12,
    padding: "3px 10px",
    whiteSpace: "nowrap",
    flexShrink: 0,
  } satisfies CSSProperties,
  listText: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "20px",
    color: "#3f3f46",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    flex: 1,
    minWidth: 0,
  } satisfies CSSProperties,
  listArrowBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 24,
    height: 24,
    border: "1px solid #71717a",
    borderRadius: 4,
    background: "#ffffff",
    cursor: "pointer",
    padding: 3,
    flexShrink: 0,
  } satisfies CSSProperties,

  noData: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 24,
    backgroundColor: "#fafafa",
    borderRadius: 4,
    minHeight: 160,
  } satisfies CSSProperties,
  noDataText: {
    fontFamily: FONT,
    fontSize: 16,
    fontWeight: 400,
    lineHeight: "24px",
    color: "#71717a",
    textAlign: "center",
  } satisfies CSSProperties,

  miniPagination: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  } satisfies CSSProperties,
  paginationLabel: {
    fontFamily: FONT,
    fontSize: 10,
    fontWeight: 400,
    lineHeight: "16px",
    color: "#a1a1aa",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  paginationSelect: {
    fontFamily: FONT,
    fontSize: 10,
    fontWeight: 400,
    color: "#3f3f46",
    border: "1px solid #e4e4e7",
    borderRadius: 4,
    padding: "2px 4px",
    height: 20,
    outline: "none",
  } satisfies CSSProperties,
  paginationNav: {
    fontFamily: FONT,
    fontSize: 10,
    fontWeight: 400,
    lineHeight: "16px",
    color: "#a1a1aa",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
};
