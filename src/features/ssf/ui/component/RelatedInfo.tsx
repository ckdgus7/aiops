import { useState, type CSSProperties, type ReactNode } from "react";
import { FONT } from "@/shared/ui/styles";

const FUNC_L4_ITEMS = [
  { id: "BZ-PTYMFC028-0062-H001", type: "Composite" as const, text: "서비스기술방식 등록" },
  { id: "BZ-PTYMFC028-0062-H002", type: "Composite" as const, text: "서비스기술방식별 속도종류 등록" },
  { id: "BZ-PTYMFC028-0062-H004", type: "Orchestration" as const, text: "서비스기술방식그룹 관리" },
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
  { id: "RQ-LA-0017", text: "사용자 인증 체계 개선" },
  { id: "RQ-LA-0018", text: "실시간 데이터 동기화" },
  { id: "RQ-LA-0019", text: "API 게이트웨이 구축" },
  { id: "RQ-LA-0020", text: "로그 모니터링 시스템" },
  { id: "RQ-LA-0021", text: "배치 처리 자동화" },
  { id: "RQ-LA-0022", text: "성능 최적화 작업" },
];

const PROJECT_ITEMS = [
  { id: "PJ-0001", text: "차세대 시스템 고도화" },
  { id: "PJ-0002", text: "운영 안정화 프로젝트" },
  { id: "PJ-0003", text: "데이터 마이그레이션" },
  { id: "PJ-0004", text: "보안 체계 강화" },
  { id: "PJ-0005", text: "클라우드 전환 프로젝트" },
  { id: "PJ-0006", text: "AI 기반 자동화 구축" },
  { id: "PJ-0007", text: "통합 모니터링 체계" },
  { id: "PJ-0008", text: "레거시 시스템 현대화" },
  { id: "PJ-0009", text: "DevOps 파이프라인 구축" },
  { id: "PJ-0010", text: "마이크로서비스 전환" },
];

const PAGE_SIZE = 5;

function ChevronIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M6.75 4.5L11.25 9L6.75 13.5" stroke="#71717a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
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

function ListItemRow({ badge, badgeColor, badgeBg, text }: { badge: string; badgeColor: string; badgeBg?: string; text: string }) {
  return (
    <div style={s.listItem}>
      <div style={s.listItemLeft}>
        <span style={{ ...s.listBadge, color: badgeColor, borderColor: badgeColor, backgroundColor: badgeBg || "transparent" }}>{badge}</span>
        <span style={s.listText}>{text}</span>
      </div>
      <button type="button" style={s.listArrowBtn}><ChevronIcon /></button>
    </div>
  );
}

function L4LevelBadge({ id }: { id: string }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 2, borderRadius: 12,
      border: "1px solid #9b8afb", backgroundColor: "#ffffff",
      paddingLeft: 3, paddingRight: 10, paddingTop: 3, paddingBottom: 3, flexShrink: 0,
    }}>
      <span style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        width: 12, height: 12, borderRadius: 8, backgroundColor: "#9b8afb",
        fontFamily: FONT, fontSize: 8, fontWeight: 700, color: "#ffffff", lineHeight: "1",
      }}>L4</span>
      <span style={{
        fontFamily: FONT, fontSize: 10, fontWeight: 500, lineHeight: "12px",
        color: "#9b8afb", whiteSpace: "nowrap",
      }}>{id}</span>
    </span>
  );
}

function L4TypeBadge({ type }: { type: "Composite" | "Orchestration" }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      borderRadius: 12, backgroundColor: "#9b8afb", padding: "3px 10px",
      fontFamily: FONT, fontSize: 10, fontWeight: 500, lineHeight: "12px",
      color: "#fafafa", whiteSpace: "nowrap", flexShrink: 0,
    }}>{type}</span>
  );
}

function AssetIconBtn({ iconType }: { iconType: "bpd" | "sd" }) {
  return (
    <div style={{
      width: 24, height: 24, borderRadius: 5, backgroundColor: "#7a5af8",
      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, cursor: "pointer",
    }}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        {iconType === "bpd" ? (
          <>
            <rect x="1" y="2" width="12" height="10" rx="1.5" stroke="white" strokeWidth="1.2" />
            <path d="M4 6H10" stroke="white" strokeWidth="1" strokeLinecap="round" />
            <path d="M4 8.5H8" stroke="white" strokeWidth="1" strokeLinecap="round" />
          </>
        ) : (
          <>
            <circle cx="7" cy="5" r="2.5" stroke="white" strokeWidth="1.2" />
            <path d="M3 12C3 9.79 4.79 8 7 8C9.21 8 11 9.79 11 12" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
          </>
        )}
      </svg>
    </div>
  );
}

function L4ListItemRow({ item }: { item: { id: string; type: "Composite" | "Orchestration"; text: string } }) {
  return (
    <div style={s.listItem}>
      <div style={s.listItemLeft}>
        <L4LevelBadge id={item.id} />
        <L4TypeBadge type={item.type} />
        <span style={s.listText}>{item.text}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
        <AssetIconBtn iconType="bpd" />
        <AssetIconBtn iconType="sd" />
        <button type="button" style={s.listArrowBtn}><ChevronIcon /></button>
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
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    width: 20, height: 20, border: "none", background: "transparent",
    cursor: disabled ? "default" : "pointer", opacity: disabled ? 0.4 : 1,
    padding: 0, fontFamily: FONT, fontSize: 14, color: "#71717a",
  });

  return (
    <div style={s.miniPagination}>
      <span style={s.paginationLabel}>Items per page:</span>
      <select style={s.paginationSelect} defaultValue={perPage}><option>{perPage}</option></select>
      <span style={s.paginationLabel}>{start}-{end} of {total}</span>
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

export function RelatedInfo() {
  const [funcL4Page, setFuncL4Page] = useState(1);
  const [reqPage, setReqPage] = useState(1);
  const [projectPage, setProjectPage] = useState(1);

  return (
    <div style={s.rightCol}>
      <SectionHeader title="연관 정보" />
      <div style={s.rightMain}>
        <div style={s.relSection}>
          <div style={s.relHeaderRow}>
            <span style={s.relLabel}>기능(L4)</span>
            <MiniPagination current={funcL4Page} total={FUNC_L4_ITEMS.length} perPage={PAGE_SIZE} onPageChange={setFuncL4Page} />
          </div>
          <div style={s.relList}>
            {FUNC_L4_ITEMS.slice((funcL4Page - 1) * PAGE_SIZE, funcL4Page * PAGE_SIZE).map((fItem) => (
              <L4ListItemRow key={fItem.id} item={fItem} />
            ))}
          </div>
        </div>

        <div style={s.relSection}>
          <span style={s.relLabel}>업무Flow</span>
          <div style={s.relList}>
            {FLOW_ITEMS.map((f) => (
              <ListItemRow key={f.id} badge={f.id} badgeColor="#12b76a" badgeBg="rgba(18,183,106,0.05)" text={f.text} />
            ))}
          </div>
        </div>

        <div style={s.relSection}>
          <div style={s.relHeaderRow}>
            <span style={s.relLabel}>요구사항</span>
            <MiniPagination current={reqPage} total={REQ_ITEMS.length} perPage={PAGE_SIZE} onPageChange={setReqPage} />
          </div>
          <div style={s.relList}>
            {REQ_ITEMS.slice((reqPage - 1) * PAGE_SIZE, reqPage * PAGE_SIZE).map((r) => (
              <ListItemRow key={r.id} badge={r.id} badgeColor="#36bffa" text={r.text} />
            ))}
          </div>
        </div>

        <div style={s.relSection}>
          <div style={s.relHeaderRow}>
            <span style={s.relLabel}>연관 과제</span>
            <MiniPagination current={projectPage} total={PROJECT_ITEMS.length} perPage={PAGE_SIZE} onPageChange={setProjectPage} />
          </div>
          <div style={s.relList}>
            {PROJECT_ITEMS.slice((projectPage - 1) * PAGE_SIZE, projectPage * PAGE_SIZE).map((p) => (
              <ListItemRow key={p.id} badge={p.id} badgeColor="#a1a1aa" text={p.text} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const s = {
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
