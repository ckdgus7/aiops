import { useState, type CSSProperties } from "react";
import { DomainDetail } from "@/features/ssf/ui/l1/component/DomainDetail";
import type { DomainItem } from "@/features/ssf/model/types";
import { FONT } from "@/shared/ui/styles";

interface L3Item {
  id: string;
  name: string;
  hasBpd: boolean;
}

export interface ComponentDetailSnapshot {
  componentId: string;
  nameKo: string;
  nameEn: string;
  planLeader: string;
  designLeader: string;
  description: string;
  useYn: string;
  domain: DomainItem;
  l3Items: L3Item[];
}

export interface HistoryEntry {
  name: string;
  date: string;
  snapshot: ComponentDetailSnapshot;
}

export interface ComponentDetailData extends ComponentDetailSnapshot {
  history: HistoryEntry[];
}

interface ComponentDetailProps {
  data: ComponentDetailData;
  showUseYn?: boolean;
  showDomainBox?: boolean;
}

function HistoryIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 4V9L12 11" stroke="#7a5af8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 1.5C4.86 1.5 1.5 4.86 1.5 9C1.5 13.14 4.86 16.5 9 16.5C13.14 16.5 16.5 13.14 16.5 9C16.5 4.86 13.14 1.5 9 1.5Z" stroke="#7a5af8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M7 11L11 7" stroke="#71717a" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M10.5 11.5L8.5 13.5C7.39543 14.6046 5.60457 14.6046 4.5 13.5V13.5C3.39543 12.3954 3.39543 10.6046 4.5 9.5L6.5 7.5" stroke="#71717a" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M7.5 6.5L9.5 4.5C10.6046 3.39543 12.3954 3.39543 13.5 4.5V4.5C14.6046 5.60457 14.6046 7.39543 13.5 8.5L11.5 10.5" stroke="#71717a" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function BpdIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="1" y="1" width="18" height="18" rx="4" fill="#7a5af8" />
      <path d="M6 7H14M6 10H14M6 13H10" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M8.5 3L4.5 7L8.5 11" stroke="#71717a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M5.5 3L9.5 7L5.5 11" stroke="#71717a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const L3_PAGE_SIZE = 5;

const s = {
  content: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
  } satisfies CSSProperties,
  topArea: {
    display: "flex",
    gap: 24,
    alignItems: "flex-start",
    width: "100%",
  } satisfies CSSProperties,
  leftCol: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
    flex: 1,
    minWidth: 0,
  } satisfies CSSProperties,
  rightCol: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    width: 150,
    flexShrink: 0,
    paddingLeft: 8,
  } satisfies CSSProperties,
  infoRow: {
    display: "flex",
    gap: 32,
    alignItems: "flex-start",
    width: "100%",
  } satisfies CSSProperties,
  infoRowWithHistory: {
    display: "flex",
    gap: 32,
    alignItems: "flex-start",
    width: "100%",
    justifyContent: "space-between",
  } satisfies CSSProperties,
  labelControl: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    flexShrink: 0,
  } satisfies CSSProperties,
  labelControlFull: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    width: "100%",
  } satisfies CSSProperties,
  label: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "18px",
    color: "#a1a1aa",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  value: {
    fontFamily: FONT,
    fontSize: 16,
    fontWeight: 400,
    lineHeight: "24px",
    color: "#3f3f46",
  } satisfies CSSProperties,
  historyBtn: {
    display: "flex",
    alignItems: "center",
    gap: 3,
    padding: "0 4px",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    borderRadius: 36,
    flexShrink: 0,
  } satisfies CSSProperties,
  historyBtnText: {
    fontFamily: FONT,
    fontSize: 12,
    fontWeight: 400,
    lineHeight: "18px",
    color: "#7a5af8",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  domainBox: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
    padding: 16,
    border: "1px solid #e4e4e7",
    borderRadius: 8,
    width: "100%",
    boxSizing: "border-box",
  } satisfies CSSProperties,
  l3Header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  } satisfies CSSProperties,
  l3Label: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "18px",
    color: "#a1a1aa",
  } satisfies CSSProperties,
  l3Pagination: {
    display: "flex",
    gap: 8,
    alignItems: "center",
  } satisfies CSSProperties,
  l3PageInfo: {
    fontFamily: FONT,
    fontSize: 12,
    fontWeight: 400,
    lineHeight: "18px",
    color: "#71717a",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  l3PageBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 24,
    height: 24,
    border: "1px solid #e4e4e7",
    borderRadius: 4,
    backgroundColor: "#ffffff",
    cursor: "pointer",
    padding: 0,
    flexShrink: 0,
  } satisfies CSSProperties,
  l3PageBtnDisabled: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 24,
    height: 24,
    border: "1px solid #e4e4e7",
    borderRadius: 4,
    backgroundColor: "#ffffff",
    cursor: "default",
    padding: 0,
    flexShrink: 0,
    opacity: 0.4,
  } satisfies CSSProperties,
  l3List: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    width: "100%",
  } satisfies CSSProperties,
  l3Item: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    minHeight: 40,
    padding: "8px 12px 8px 8px",
    border: "1px solid #e4e4e7",
    borderRadius: 4,
    backgroundColor: "#ffffff",
    boxSizing: "border-box",
    width: "100%",
  } satisfies CSSProperties,
  l3ItemContent: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    minWidth: 0,
    justifyContent: "center",
  } satisfies CSSProperties,
  l3ItemRow: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    width: "100%",
  } satisfies CSSProperties,
  l3Badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 2,
    padding: "3px 10px 3px 3px",
    border: "1px solid #7a5af8",
    borderRadius: 12,
    flexShrink: 0,
  } satisfies CSSProperties,
  l3BadgeDot: {
    width: 12,
    height: 12,
    borderRadius: 8,
    backgroundColor: "#7a5af8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  } satisfies CSSProperties,
  l3BadgeDotText: {
    fontFamily: FONT,
    fontSize: 8,
    fontWeight: 700,
    lineHeight: "0",
    color: "#ffffff",
    textAlign: "center",
  } satisfies CSSProperties,
  l3BadgeText: {
    fontFamily: FONT,
    fontSize: 10,
    fontWeight: 500,
    lineHeight: "12px",
    color: "#7a5af8",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  l3Name: {
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
  l3IconBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
    border: "1px solid #71717a",
    borderRadius: 4,
    backgroundColor: "#ffffff",
    cursor: "pointer",
    flexShrink: 0,
  } satisfies CSSProperties,
  historyItemWrap: {
    display: "flex",
    gap: 8,
    alignItems: "flex-start",
    minWidth: 142,
    cursor: "pointer",
  } satisfies CSSProperties,
  historyMark: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "stretch",
    width: 20,
    flexShrink: 0,
  } satisfies CSSProperties,
  historyDotRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 20,
    height: 20,
    position: "relative",
  } satisfies CSSProperties,
  historyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  } satisfies CSSProperties,
  historyLine: {
    width: 1,
    flex: 1,
    backgroundColor: "#e4e4e7",
  } satisfies CSSProperties,
  historyCol: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    minWidth: 100,
    paddingBottom: 16,
  } satisfies CSSProperties,
  historyName: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "20px",
    color: "#3f3f46",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  historyDate: {
    fontFamily: FONT,
    fontSize: 12,
    fontWeight: 400,
    lineHeight: "18px",
    color: "#3f3f46",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
};

function HistoryTimeline({ entries, activeIndex, onSelect }: {
  entries: HistoryEntry[];
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {entries.map((entry, idx) => {
        const isFirst = idx === 0;
        const isLast = idx === entries.length - 1;
        const isActive = idx === activeIndex;
        return (
          <div key={idx} style={s.historyItemWrap} onClick={() => onSelect(idx)}>
            <div style={s.historyMark}>
              <div style={s.historyDotRow}>
                {!isFirst && (
                  <div style={{ position: "absolute", top: 0, bottom: "50%", width: 1, backgroundColor: "#e4e4e7" }} />
                )}
                <div style={{ ...s.historyDot, backgroundColor: isActive ? "#7a5af8" : "#d4d4d8", position: "relative", zIndex: 1 }} />
                {!isLast && (
                  <div style={{ position: "absolute", top: "50%", bottom: 0, width: 1, backgroundColor: "#e4e4e7" }} />
                )}
              </div>
              {!isLast && <div style={s.historyLine} />}
            </div>
            <div style={s.historyCol}>
              <span style={{ ...s.historyName, fontWeight: isActive ? 600 : 400 }}>{entry.name}</span>
              <span style={s.historyDate}>{entry.date}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function L3ListItem({ item }: { item: L3Item }) {
  return (
    <div style={s.l3Item}>
      <div style={s.l3ItemContent}>
        <div style={s.l3ItemRow}>
          <div style={s.l3Badge}>
            <div style={s.l3BadgeDot}>
              <span style={s.l3BadgeDotText}>L3</span>
            </div>
            <span style={s.l3BadgeText}>{item.id}</span>
          </div>
          <span style={s.l3Name}>{item.name}</span>
        </div>
      </div>
      {item.hasBpd && (
        <div style={{ flexShrink: 0 }}>
          <BpdIcon />
        </div>
      )}
      <button style={s.l3IconBtn} type="button">
        <LinkIcon />
      </button>
    </div>
  );
}

export function ComponentDetail({ data, showUseYn = true, showDomainBox = true }: ComponentDetailProps) {
  const [l3Page, setL3Page] = useState(1);
  const [activeHistoryIndex, setActiveHistoryIndex] = useState(0);

  const displayData: ComponentDetailSnapshot =
    data.history[activeHistoryIndex]?.snapshot ?? data;

  const handleHistorySelect = (index: number) => {
    setActiveHistoryIndex(index);
    setL3Page(1);
  };

  const totalL3 = displayData.l3Items.length;
  const totalL3Pages = Math.max(1, Math.ceil(totalL3 / L3_PAGE_SIZE));
  const clampedPage = Math.min(l3Page, totalL3Pages);
  const l3Start = (clampedPage - 1) * L3_PAGE_SIZE;
  const l3End = Math.min(l3Start + L3_PAGE_SIZE, totalL3);
  const pagedL3Items = displayData.l3Items.slice(l3Start, l3End);

  return (
    <div style={s.content}>
      <div style={s.topArea}>
        <div style={s.leftCol}>
          <div style={s.infoRowWithHistory}>
            <div style={{ display: "flex", gap: 32, alignItems: "flex-start", flex: 1 }}>
              <div style={s.labelControl}>
                <span style={s.label}>컴포넌트 ID</span>
                <span style={s.value}>{displayData.componentId}</span>
              </div>
              <div style={s.labelControl}>
                <span style={s.label}>컴포넌트(한글)</span>
                <span style={s.value}>{displayData.nameKo}</span>
              </div>
              <div style={s.labelControl}>
                <span style={s.label}>컴포넌트(영문)</span>
                <span style={s.value}>{displayData.nameEn}</span>
              </div>
            </div>
            <button style={s.historyBtn} type="button">
              <HistoryIcon />
              <span style={s.historyBtnText}>{data.history.length} History</span>
            </button>
          </div>

          <div style={s.infoRow}>
            <div style={s.labelControl}>
              <span style={s.label}>L2기획리더</span>
              <span style={s.value}>{displayData.planLeader}</span>
            </div>
            <div style={s.labelControl}>
              <span style={s.label}>L2설계리더</span>
              <span style={s.value}>{displayData.designLeader}</span>
            </div>
          </div>

          <div style={s.labelControlFull}>
            <span style={s.label}>컴포넌트(L2) 설명</span>
            <div style={s.value}>{displayData.description}</div>
          </div>

          {showUseYn && (
            <div style={s.labelControl}>
              <span style={s.label}>사용여부</span>
              <span style={s.value}>{displayData.useYn}</span>
            </div>
          )}
        </div>

        <div style={s.rightCol}>
          <HistoryTimeline
            entries={data.history}
            activeIndex={activeHistoryIndex}
            onSelect={handleHistorySelect}
          />
        </div>
      </div>

      {showDomainBox && (
        <div style={s.domainBox}>
          <DomainDetail data={displayData.domain} showUseYn={false} />
        </div>
      )}

      <div style={s.labelControlFull}>
        <div style={s.l3Header}>
          <span style={{ ...s.l3Label, fontSize: 14 }}>업무(L3)</span>
          <div style={s.l3Pagination}>
            <span style={s.l3PageInfo}>{totalL3 === 0 ? "0" : `${l3Start + 1}-${l3End}`} of {totalL3}</span>
            <button
              style={l3Page <= 1 ? s.l3PageBtnDisabled : s.l3PageBtn}
              type="button"
              onClick={() => { if (l3Page > 1) setL3Page(l3Page - 1); }}
              disabled={l3Page <= 1}
            >
              <ChevronLeftIcon />
            </button>
            <button
              style={l3Page >= totalL3Pages ? s.l3PageBtnDisabled : s.l3PageBtn}
              type="button"
              onClick={() => { if (l3Page < totalL3Pages) setL3Page(l3Page + 1); }}
              disabled={l3Page >= totalL3Pages}
            >
              <ChevronRightIcon />
            </button>
          </div>
        </div>
        <div style={s.l3List}>
          {pagedL3Items.map((l3) => (
            <L3ListItem key={l3.id} item={l3} />
          ))}
        </div>
      </div>
    </div>
  );
}
