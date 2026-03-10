import { useState, type CSSProperties, type ReactNode } from "react";
import { FONT } from "@/shared/ui/styles";

interface BusinessItem {
  businessId: string;
  nameKo: string;
  planLeader: string;
  designLeader: string;
  description: string;
  componentNameKo: string;
  domainNameKo: string;
}

interface DomainItem {
  nameKo: string;
  abbr: string;
  nameEn: string;
  description: string;
}

interface CompItem {
  componentId: string;
  nameEn: string;
  planLeader: string;
  designLeader: string;
  description: string;
}

interface HistorySnapshot {
  nameKo: string;
  planLeader: string;
  designLeader: string;
  description: string;
  savedAt: string;
  modifiedAt: string;
}

interface BusinessReferenceProps {
  item: BusinessItem;
  domain: DomainItem | undefined;
  comp: CompItem | undefined;
  onHistoryToggle: () => void;
  historySnapshot?: HistorySnapshot;
}

const EPC_L3_ITEMS = [
  { id: "BZ-EPC001-001", text: "상품 카탈로그 조회" },
  { id: "BZ-EPC001-002", text: "상품 사양 관리" },
  { id: "BZ-EPC001-003", text: "상품 카테고리 관리" },
  { id: "BZ-EPC001-004", text: "상품 가격 정책 관리" },
  { id: "BZ-EPC001-005", text: "상품 번들 구성" },
  { id: "BZ-EPC001-006", text: "상품 프로모션 관리" },
  { id: "BZ-EPC001-007", text: "상품 라이프사이클 관리" },
  { id: "BZ-EPC001-008", text: "상품 속성 정의" },
  { id: "BZ-EPC001-009", text: "상품 유효성 검증" },
  { id: "BZ-EPC001-010", text: "상품 배포 관리" },
];

const L3_ITEMS = [
  { id: "BZ-SKNC001-001", text: "서비스 카탈로그 조회" },
  { id: "BZ-SKNC001-002", text: "서비스 사양 관리" },
  { id: "BZ-SKNC001-003", text: "고객 중심 서비스 뷰" },
  { id: "BZ-SKNC001-004", text: "서비스 품질 모니터링" },
  { id: "BZ-SKNC001-005", text: "서비스 요청 처리" },
  { id: "BZ-SKNC001-006", text: "서비스 이력 관리" },
  { id: "BZ-SKNC001-007", text: "서비스 레벨 관리" },
  { id: "BZ-SKNC001-008", text: "서비스 장애 대응" },
  { id: "BZ-SKNC001-009", text: "서비스 변경 관리" },
  { id: "BZ-SKNC001-010", text: "서비스 리포트 생성" },
];

const PAGE_SIZE = 5;

function ChevronIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M6.75 4.5L11.25 9L6.75 13.5"
        stroke="#71717a"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HistoryIcon() {
  return (
    <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
      <path
        d="M10 4C6.13 4 3 7.13 3 11C3 14.87 6.13 18 10 18C13.87 18 17 14.87 17 11"
        stroke="#71717a"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M10 7V11L13 13"
        stroke="#71717a"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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

function SectionHeader({ title, right }: { title: string; right?: ReactNode }) {
  return (
    <div style={s.sectionHeader}>
      <span style={s.sectionTitle}>{title}</span>
      {right && <div style={s.sectionRight}>{right}</div>}
    </div>
  );
}

function LabelValue({ label, value, fullWidth }: { label: string; value: ReactNode; fullWidth?: boolean }) {
  return (
    <div style={{ ...s.fieldCol, ...(fullWidth ? { width: "100%" } : {}) }}>
      <span style={s.fieldLabel}>{label}</span>
      <span style={s.fieldValue}>{value}</span>
    </div>
  );
}

function ListItemRow({ badge, badgeColor, badgeBg, text }: { badge: string; badgeColor: string; badgeBg?: string; text: string }) {
  return (
    <div style={s.listItem}>
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
        <span style={s.listText}>{text}</span>
      </div>
      <button type="button" style={s.listArrowBtn}>
        <ChevronIcon />
      </button>
    </div>
  );
}

function LevelBadge({ level, code, color, name, active, onClick }: {
  level: string;
  code: string;
  color: string;
  name: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      style={{
        ...s.lvCard,
        ...(active ? { border: `1px solid #7a5af8` } : {}),
        ...(!active ? { opacity: 0.5 } : {}),
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <div style={s.lvBadgeWrap}>
        <div style={{ ...s.lvBadgeBase, borderColor: color }}>
          <span style={{ ...s.lvDot, backgroundColor: color }}>
            <span style={s.lvDotText}>{level}</span>
          </span>
          <span style={{ ...s.lvBadgeText, color }}>{code}</span>
        </div>
      </div>
      <div style={s.lvNameRow}>
        <span style={s.lvName}>{name}</span>
        <button type="button" style={s.lvToggleBtn}>
          <AccordionToggle open={active || false} />
        </button>
      </div>
    </div>
  );
}

function MiniPagination({
  current,
  total,
  perPage,
  onPageChange,
}: {
  current: number;
  total: number;
  perPage: number;
  onPageChange?: (page: number) => void;
}) {
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const start = total === 0 ? 0 : (current - 1) * perPage + 1;
  const end = Math.min(current * perPage, total);
  const canPrev = current > 1;
  const canNext = current < totalPages;

  const navBtnStyle = (disabled: boolean): CSSProperties => ({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 20,
    height: 20,
    border: "none",
    background: "transparent",
    cursor: disabled ? "default" : "pointer",
    opacity: disabled ? 0.4 : 1,
    padding: 0,
    fontFamily: FONT,
    fontSize: 14,
    color: "#71717a",
  });

  return (
    <div style={s.miniPagination}>
      <span style={s.paginationLabel}>Items per page:</span>
      <select style={s.paginationSelect} defaultValue={perPage}>
        <option>{perPage}</option>
      </select>
      <span style={s.paginationLabel}>
        {start}-{end} of {total}
      </span>
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <button type="button" style={navBtnStyle(!canPrev)} disabled={!canPrev} onClick={() => canPrev && onPageChange?.(1)}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M6 2L3 5L6 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9 2L6 5L9 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button type="button" style={navBtnStyle(!canPrev)} disabled={!canPrev} onClick={() => canPrev && onPageChange?.(current - 1)}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M7 2L4 5L7 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span style={{ ...s.paginationLabel, fontWeight: 500, color: "#71717a", minWidth: 16, textAlign: "center" as const }}>{current}</span>
        <button type="button" style={navBtnStyle(!canNext)} disabled={!canNext} onClick={() => canNext && onPageChange?.(current + 1)}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M3 2L6 5L3 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button type="button" style={navBtnStyle(!canNext)} disabled={!canNext} onClick={() => canNext && onPageChange?.(totalPages)}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M1 2L4 5L1 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 2L7 5L4 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export function BusinessReference({ item, domain, comp, onHistoryToggle, historySnapshot }: BusinessReferenceProps) {
  const [activeSsfTab, setActiveSsfTab] = useState<"EPC" | "TMFC" | null>("TMFC");
  const [epcL3Page, setEpcL3Page] = useState(1);
  const [tmfcL3Page, setTmfcL3Page] = useState(1);

  const displayName = historySnapshot?.nameKo ?? item.nameKo;
  const displayPlanLeader = historySnapshot?.planLeader ?? item.planLeader;
  const displayDesignLeader = historySnapshot?.designLeader ?? item.designLeader;
  const displayDescription = historySnapshot?.description ?? item.description;
  const displaySavedAt = historySnapshot?.savedAt ?? "2025-11-28 15:24";
  const displayModifiedAt = historySnapshot?.modifiedAt ?? "2025-11-28 15:24";

  return (
    <div style={{ ...s.container, flex: 1 }}>
      <SectionHeader
        title="업무(L3) 기준 정보"
        right={
          <button
            style={s.historyBtn}
            type="button"
            onClick={onHistoryToggle}
          >
            <HistoryIcon />
            <span style={s.historyBtnText}>3 History</span>
          </button>
        }
      />
      <div style={s.mainFields}>
        <LabelValue label="업무(L3) ID" value={item.businessId} />
        <LabelValue label="업무(L3) 명" value={displayName} />
        <div style={s.fieldRow}>
          <LabelValue label="L2기획리더" value={displayPlanLeader} />
          <LabelValue label="L3설계리더" value={displayDesignLeader} />
        </div>
        <div style={s.fieldRow}>
          <LabelValue label="저장일시" value={displaySavedAt} />
          <LabelValue label="마지막 수정일시" value={displayModifiedAt} />
        </div>
        <LabelValue label="업무(L3) 설명" value={displayDescription} fullWidth />

        <div style={s.ssfSection}>
          <span style={s.ssfLabel}>SSF 정보</span>
          <div style={s.lvAccordion}>
            <div style={s.lvHierarchy}>
              <LevelBadge
                level="L1"
                code="EPC"
                color="#3e1c96"
                name={domain?.nameKo || "엔터프라이즈 상품 카탈로그"}
                active={activeSsfTab === "EPC"}
                onClick={() => setActiveSsfTab(activeSsfTab === "EPC" ? null : "EPC")}
              />
              <LevelBadge
                level="L2"
                code={comp?.componentId || "TMFC006"}
                color="#5925dc"
                name={item.componentNameKo}
                active={activeSsfTab === "TMFC"}
                onClick={() => setActiveSsfTab(activeSsfTab === "TMFC" ? null : "TMFC")}
              />
            </div>

            {activeSsfTab === "EPC" && (
              <div style={s.lvContent}>
                <div style={s.lvFieldRow}>
                  <LabelValue label="Domain ID" value={domain?.abbr || "EPC"} />
                  <LabelValue label="Domain(한글)" value={domain?.nameKo || item.domainNameKo} />
                  <LabelValue label="Domain명" value={domain?.nameEn || "Enterprise Product Catalog"} />
                </div>
                <LabelValue
                  label="Domain 설명"
                  value={
                    domain?.description ||
                    "엔터프라이즈 상품 카탈로그는 상품의 전체 라이프사이클을 관리하고, 상품 사양 및 카테고리를 체계적으로 구성하는 역할을 합니다."
                  }
                  fullWidth
                />
                <div style={s.relSection}>
                  <div style={s.relHeaderRow}>
                    <span style={{ ...s.fieldLabel, fontSize: 14 }}>연관 업무(L3)</span>
                    <MiniPagination current={epcL3Page} total={EPC_L3_ITEMS.length} perPage={PAGE_SIZE} onPageChange={setEpcL3Page} />
                  </div>
                  <div style={s.relList}>
                    {EPC_L3_ITEMS.slice((epcL3Page - 1) * PAGE_SIZE, epcL3Page * PAGE_SIZE).map((l3) => (
                      <ListItemRow key={l3.id} badge={l3.id} badgeColor="#3e1c96" badgeBg="rgba(62,28,150,0.05)" text={l3.text} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeSsfTab === "TMFC" && (
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
                  value={
                    comp?.description ||
                    "서비스 카탈로그 관리 구성 요소는 수행 가능한 모든 서비스 요구 사항을 식별하고 정의하는 서비스 사양 모음을 구성하는 역할을 합니다."
                  }
                  fullWidth
                />
                <div style={s.relSection}>
                  <div style={s.relHeaderRow}>
                    <span style={{ ...s.fieldLabel, fontSize: 14 }}>연관 업무(L3)</span>
                    <MiniPagination current={tmfcL3Page} total={L3_ITEMS.length} perPage={PAGE_SIZE} onPageChange={setTmfcL3Page} />
                  </div>
                  <div style={s.relList}>
                    {L3_ITEMS.slice((tmfcL3Page - 1) * PAGE_SIZE, tmfcL3Page * PAGE_SIZE).map((l3) => (
                      <ListItemRow key={l3.id} badge={l3.id} badgeColor="#7a5af8" badgeBg="rgba(122,90,248,0.05)" text={l3.text} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const s = {
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
    borderWidth: 1,
    borderStyle: "solid",
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
    borderWidth: 1,
    borderStyle: "solid",
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
};
