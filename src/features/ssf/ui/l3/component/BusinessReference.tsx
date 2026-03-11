import { useState, type CSSProperties, type ReactNode } from "react";
import { DomainDetail } from "@/features/ssf/ui/l1/component/DomainDetail";
import { ComponentDetail } from "@/features/ssf/ui/l2/component/ComponentDetail";
import type { ComponentDetailData } from "@/features/ssf/ui/l2/component/ComponentDetail";
import type { DomainItem } from "@/features/ssf/model/types";
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
  domain: Partial<DomainItem> | undefined;
  comp: CompItem | undefined;
  onHistoryToggle: () => void;
  historySnapshot?: HistorySnapshot;
}

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

export function BusinessReference({ item, domain, comp, onHistoryToggle, historySnapshot }: BusinessReferenceProps) {
  const [activeSsfTab, setActiveSsfTab] = useState<"EPC" | "TMFC" | null>("TMFC");

  const domainData: DomainItem = {
    no: 0,
    abbr: domain?.abbr || "EPC",
    nameKo: domain?.nameKo || item.domainNameKo,
    nameEn: domain?.nameEn || "Enterprise Product Catalog",
    description: domain?.description || "엔터프라이즈 상품 카탈로그는 상품의 전체 라이프사이클을 관리하고, 상품 사양 및 카테고리를 체계적으로 구성하는 역할을 합니다.",
    useYn: "Y",
  };

  const componentSnapshot = {
    componentId: comp?.componentId || "TMFC006",
    nameKo: item.componentNameKo,
    nameEn: comp?.nameEn || "Service Catalog Management",
    planLeader: comp?.planLeader || item.planLeader,
    designLeader: comp?.designLeader || item.designLeader,
    description: comp?.description || "서비스 카탈로그 관리 구성 요소는 수행 가능한 모든 서비스 요구 사항을 식별하고 정의하는 서비스 사양 모음을 구성하는 역할을 합니다.",
    useYn: "Y",
    domain: domainData,
    l3Items: L3_ITEMS.map((l3) => ({ id: l3.id, name: l3.text, hasBpd: false })),
  };

  const componentDetailData: ComponentDetailData = {
    ...componentSnapshot,
    history: [
      { name: "최신", date: "2025-11-28 15:24", snapshot: componentSnapshot },
    ],
  };

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
                <DomainDetail
                  data={domainData}
                  showUseYn={false}
                />
              </div>
            )}

            {activeSsfTab === "TMFC" && (
              <div style={s.lvContent}>
                <ComponentDetail
                  data={componentDetailData}
                  showUseYn={false}
                  showDomainBox={false}
                  showHistoryBox={false}
                />
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
};
