import { useState, useEffect, type CSSProperties, type ReactNode } from "react";
import { useParams } from "react-router";
import { Button } from "@/shared/ui/Button";
import { useMdiStore } from "@/shared/model/mdi.store";
import { usePageHeader } from "@/shared/hooks/usePageHeader";
import { BUSINESS_MOCK_DATA, COMPONENT_MOCK_DATA } from "@/features/ssf/model/mock-data";

const FONT = "'Pretendard', sans-serif";

function HistoryIcon() {
  return (
    <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
      <path
        d="M10 4C6.13 4 3 7.13 3 11C3 14.87 6.13 18 10 18C13.87 18 17 14.87 17 11"
        stroke="#71717a"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="M10 7V11L13 13" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M6.75 4.5L11.25 9L6.75 13.5" stroke="#71717a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
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

function AccordionChevron({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      style={{
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 0.2s",
      }}
    >
      <path d="M4 6L8 10L12 6" stroke="#71717a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface LabelValueProps {
  label: string;
  value: ReactNode;
}

function LabelValue({ label, value }: LabelValueProps) {
  return (
    <div style={s.fieldCol}>
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

interface SectionHeaderProps {
  title: string;
  right?: ReactNode;
}

function SectionHeader({ title, right }: SectionHeaderProps) {
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

interface MiniPaginationProps {
  current: number;
  total: number;
  perPage: number;
}

function MiniPagination({ current, total, perPage }: MiniPaginationProps) {
  return (
    <div style={s.miniPagination}>
      <span style={s.paginationLabel}>Items per page:</span>
      <select style={s.paginationSelect} defaultValue={perPage}>
        <option>{perPage}</option>
      </select>
      <span style={s.paginationLabel}>
        {(current - 1) * perPage + 1}-{Math.min(current * perPage, total)} of {total}
      </span>
      <span style={s.paginationNav}>{"< "}{current}{" >"}</span>
    </div>
  );
}

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

const L4_ITEMS = [
  { id: "FN-001", type: "Composite", text: "미납 이벤트 생성" },
  { id: "FN-002", type: "Orchestration", text: "미납 원부 조회" },
  { id: "FN-003", type: "Composite", text: "미납 알림 발송" },
  { id: "FN-004", type: "Orchestration", text: "채권 상태 변경" },
  { id: "FN-005", type: "Composite", text: "미납 이력 관리" },
];

export function BusinessDetailView() {
  const { id } = useParams<{ id: string }>();
  const addTab = useMdiStore((st) => st.addTab);
  const [ssfAccordionOpen, setSsfAccordionOpen] = useState(true);

  const item = BUSINESS_MOCK_DATA.find((b) => b.businessId === id);

  useEffect(() => {
    addTab({
      id: `/ssf/business/${id}`,
      label: "업무(L3)정보 상세",
      path: `/ssf/business/${id}`,
    });
  }, [id, addTab]);

  usePageHeader({
    breadcrumbItems: [
      { label: "SSF관리" },
      { label: "업무(L3)정보 관리" },
      { label: "업무(L3)정보 상세" },
    ],
    title: "업무(L3)정보 상세",
  });

  if (!item) {
    return (
      <div style={s.outer}>
        <NoDataArea />
      </div>
    );
  }

  const comp = COMPONENT_MOCK_DATA.find(
    (c) => c.nameKo === item.componentNameKo && c.domainNameKo === item.domainNameKo,
  );

  return (
    <div style={s.outer}>
      <div style={s.row}>
        <div style={s.leftCol}>
          <div style={s.historyWrap}>
            <div style={s.container}>
              <SectionHeader
                title="업무(L3) 기준 정보"
                right={
                  <button style={s.historyBtn} type="button">
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
                <div style={{ ...s.fieldCol, width: "100%" }}>
                  <span style={s.fieldLabel}>업무(L3) 설명</span>
                  <span style={{ ...s.fieldValue, lineHeight: "24px" }}>
                    {item.description}
                  </span>
                </div>

                <div style={s.ssfSection}>
                  <span style={s.ssfLabel}>SSF 정보</span>
                  <div style={s.accordion}>
                    <button
                      type="button"
                      style={s.accordionHeader}
                      onClick={() => setSsfAccordionOpen(!ssfAccordionOpen)}
                    >
                      <div style={s.accordionLeft}>
                        <span style={s.accordionBadge}>{comp?.componentId || "SKNC001"}</span>
                        <span style={s.accordionTitle}>{item.componentNameKo}</span>
                      </div>
                      <AccordionChevron open={ssfAccordionOpen} />
                    </button>
                    {ssfAccordionOpen && (
                      <div style={s.accordionBody}>
                        <div style={s.accordionRow}>
                          <span style={s.accordionFieldLabel}>도메인</span>
                          <span style={s.accordionFieldValue}>{item.domainNameKo}</span>
                        </div>
                        <div style={s.accordionRow}>
                          <span style={s.accordionFieldLabel}>L2기획리더</span>
                          <span style={s.accordionFieldValue}>{comp?.planLeader || item.planLeader}</span>
                        </div>
                        <div style={s.accordionRow}>
                          <span style={s.accordionFieldLabel}>L2설계리더</span>
                          <span style={s.accordionFieldValue}>{comp?.designLeader || item.designLeader}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={s.bpdContainer}>
            <div style={s.bpdInner}>
              <Button size="m" variant="filled" color="positive">
                BPD 등록
              </Button>
              <div style={{ marginTop: 16 }}>
                <NoDataArea />
              </div>
            </div>
          </div>
        </div>

        <div style={s.rightCol}>
          <SectionHeader title="연관 정보" />

          <div style={s.rightMain}>
            <div style={s.relSection}>
              <div style={s.relHeaderRow}>
                <span style={s.relLabel}>기능(L4)</span>
                <MiniPagination current={1} total={L4_ITEMS.length} perPage={5} />
              </div>
              <div style={s.relList}>
                {L4_ITEMS.map((item) => (
                  <div key={item.id} style={s.listItem}>
                    <div style={s.listItemLeft}>
                      <span
                        style={{
                          ...s.l4Badge,
                          backgroundColor: item.type === "Composite" ? "#9b8afb" : "#36bffa",
                        }}
                      >
                        {item.type}
                      </span>
                      <span style={s.listText}>{item.text}</span>
                    </div>
                    <button type="button" style={s.listArrowBtn}>
                      <ChevronIcon />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div style={s.relSection}>
              <span style={s.relLabel}>업무Flow</span>
              <div style={s.relList}>
                {FLOW_ITEMS.map((f) => (
                  <ListItemRow
                    key={f.id}
                    badge={f.id}
                    badgeColor="#12b76a"
                    badgeBg="rgba(18,183,106,0.05)"
                    text={f.text}
                  />
                ))}
              </div>
            </div>

            <div style={s.relSection}>
              <div style={s.relHeaderRow}>
                <span style={s.relLabel}>요구사항</span>
                <MiniPagination current={1} total={REQ_ITEMS.length} perPage={5} />
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
              <div style={s.relHeaderRow}>
                <span style={s.relLabel}>연관 과제</span>
                <MiniPagination current={1} total={PROJECT_ITEMS.length} perPage={5} />
              </div>
              <div style={s.relList}>
                {PROJECT_ITEMS.map((p) => (
                  <ListItemRow
                    key={p.id}
                    badge={p.id}
                    badgeColor="#a1a1aa"
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
    flexDirection: "column",
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
  accordion: {
    border: "1px solid #e4e4e7",
    borderRadius: 4,
    overflow: "hidden",
    width: "100%",
  } satisfies CSSProperties,
  accordionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: "12px 16px",
    background: "#fafafa",
    border: "none",
    cursor: "pointer",
    boxSizing: "border-box",
  } satisfies CSSProperties,
  accordionLeft: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  } satisfies CSSProperties,
  accordionBadge: {
    fontFamily: FONT,
    fontSize: 10,
    fontWeight: 500,
    lineHeight: "12px",
    color: "#7a5af8",
    backgroundColor: "rgba(122,90,248,0.08)",
    border: "1px solid #7a5af8",
    borderRadius: 12,
    padding: "3px 10px",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  accordionTitle: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "20px",
    color: "#3f3f46",
  } satisfies CSSProperties,
  accordionBody: {
    padding: "12px 16px",
    display: "flex",
    flexDirection: "column",
    gap: 8,
    borderTop: "1px solid #e4e4e7",
  } satisfies CSSProperties,
  accordionRow: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  } satisfies CSSProperties,
  accordionFieldLabel: {
    fontFamily: FONT,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    color: "#a1a1aa",
    minWidth: 70,
  } satisfies CSSProperties,
  accordionFieldValue: {
    fontFamily: FONT,
    fontSize: 12,
    fontWeight: 400,
    lineHeight: "16px",
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
  } satisfies CSSProperties,

  historyBtn: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    border: "none",
    background: "transparent",
    cursor: "pointer",
    padding: "0 4px",
    borderRadius: 36,
  } satisfies CSSProperties,
  historyBtnText: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "20px",
    color: "#71717a",
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
  l4Badge: {
    fontFamily: FONT,
    fontSize: 10,
    fontWeight: 500,
    lineHeight: "12px",
    color: "#fafafa",
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
