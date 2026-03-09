import { useState, useEffect, type CSSProperties } from "react";
import { Button } from "@/shared/ui/global/Button";
import { ComponentDeletePopup } from "@/features/ssf/ui/ComponentDeletePopup";
import { ComponentEditPopup } from "@/features/ssf/ui/ComponentEditPopup";
import type { ComponentItem } from "@/features/ssf/model/types";
import { DOMAIN_MOCK_DATA } from "@/features/ssf/model/mock-data";
import { FONT, popupStyles } from "@/shared/ui/styles";

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M6 6L18 18" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18 6L6 18" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
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

function DeleteIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M4.5 9H13.5" stroke="#f04438" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

interface L3Item {
  id: string;
  name: string;
  hasBpd: boolean;
}

const MOCK_L3_ITEMS: L3Item[] = [
  { id: "BZ-PTYTMFC028-0022", name: "대리점정보관리", hasBpd: true },
  { id: "BZ-PTYTMFC028-0021", name: "파트너사정보관리", hasBpd: true },
  { id: "BZ-PTYTMFC028-0020", name: "제휴서비스관리", hasBpd: false },
  { id: "BZ-PTYTMFC028-0019", name: "마케팅분석관리", hasBpd: true },
  { id: "BZ-PTYTMFC028-0018", name: "고객세분화관리", hasBpd: false },
  { id: "BZ-PTYTMFC028-0017", name: "파트너계약관리", hasBpd: true },
  { id: "BZ-PTYTMFC028-0016", name: "대리점계약관리", hasBpd: false },
  { id: "BZ-PTYTMFC028-0015", name: "거래처정보관리", hasBpd: true },
  { id: "BZ-PTYTMFC028-0014", name: "협력업체관리", hasBpd: false },
  { id: "BZ-PTYTMFC028-0013", name: "위탁판매관리", hasBpd: true },
  { id: "BZ-PTYTMFC028-0012", name: "직영점관리", hasBpd: false },
  { id: "BZ-PTYTMFC028-0011", name: "온라인채널관리", hasBpd: true },
  { id: "BZ-PTYTMFC028-0010", name: "오프라인채널관리", hasBpd: false },
  { id: "BZ-PTYTMFC028-0009", name: "채널통합관리", hasBpd: true },
  { id: "BZ-PTYTMFC028-0008", name: "파트너수수료관리", hasBpd: true },
  { id: "BZ-PTYTMFC028-0007", name: "대리점수수료관리", hasBpd: false },
  { id: "BZ-PTYTMFC028-0006", name: "인센티브관리", hasBpd: true },
  { id: "BZ-PTYTMFC028-0005", name: "파트너교육관리", hasBpd: false },
  { id: "BZ-PTYTMFC028-0004", name: "자격인증관리", hasBpd: true },
  { id: "BZ-PTYTMFC028-0003", name: "실적평가관리", hasBpd: true },
];

const L3_PAGE_SIZE = 5;

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

interface HistoryEntry {
  name: string;
  date: string;
  active: boolean;
}

const MOCK_HISTORY: HistoryEntry[] = [
  { name: "전상세", date: "2025-11-28 15:24", active: true },
  { name: "전상세", date: "2025-11-28 15:24", active: false },
  { name: "원본", date: "2025-11-28 15:24", active: false },
];

const st = {
  overlay: {
    ...popupStyles.overlay,
    zIndex: 1000,
  } satisfies CSSProperties,
  popup: {
    ...popupStyles.popup,
    boxShadow: "0 4px 24px rgba(0, 0, 0, 0.12)",
    fontFamily: undefined,
  } satisfies CSSProperties,
  header: {
    display: "flex",
    flexDirection: "column",
    padding: "32px 32px 16px 32px",
    flexShrink: 0,
  } satisfies CSSProperties,
  titleRow: {
    ...popupStyles.titleRow,
    marginBottom: undefined,
    width: "100%",
    gap: 10,
  } satisfies CSSProperties,
  titleText: {
    ...popupStyles.titleText,
    color: "#52525b",
    flex: 1,
  } satisfies CSSProperties,
  closeBtn: popupStyles.closeBtn,
  main: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
    padding: "24px 32px",
    overflowY: "auto",
    flex: 1,
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
  domainRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px 32px",
    alignItems: "flex-start",
    width: "100%",
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
  l3DeleteBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
    border: "1px solid #f04438",
    borderRadius: 4,
    backgroundColor: "#ffffff",
    cursor: "pointer",
    flexShrink: 0,
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
  footer: {
    ...popupStyles.footer,
    padding: "16px 32px 32px 32px",
    borderTop: undefined,
  } satisfies CSSProperties,
  footerLeft: {
    display: "flex",
    alignItems: "center",
  } satisfies CSSProperties,
  footerRight: popupStyles.footerRight,
};

function HistoryTimeline({ entries }: { entries: HistoryEntry[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {entries.map((entry, idx) => {
        const isFirst = idx === 0;
        const isLast = idx === entries.length - 1;
        return (
          <div key={idx} style={st.historyItem}>
            <div style={st.historyMark}>
              <div style={st.historyDotRow}>
                {!isFirst && (
                  <div style={{ position: "absolute", top: 0, bottom: "50%", width: 1, backgroundColor: "#e4e4e7" }} />
                )}
                <div style={{ ...st.historyDot, backgroundColor: entry.active ? "#7a5af8" : "#d4d4d8", position: "relative", zIndex: 1 }} />
                {!isLast && (
                  <div style={{ position: "absolute", top: "50%", bottom: 0, width: 1, backgroundColor: "#e4e4e7" }} />
                )}
              </div>
              {!isLast && <div style={st.historyLine} />}
            </div>
            <div style={st.historyCol}>
              <span style={st.historyName}>{entry.name}</span>
              <span style={st.historyDate}>{entry.date}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function L3ListItem({ item }: { item: L3Item }) {
  return (
    <div style={st.l3Item}>
      <div style={st.l3ItemContent}>
        <div style={st.l3ItemRow}>
          <div style={st.l3Badge}>
            <div style={st.l3BadgeDot}>
              <span style={st.l3BadgeDotText}>L3</span>
            </div>
            <span style={st.l3BadgeText}>{item.id}</span>
          </div>
          <span style={st.l3Name}>{item.name}</span>
        </div>
      </div>
      {item.hasBpd && (
        <div style={{ flexShrink: 0 }}>
          <BpdIcon />
        </div>
      )}
      <button style={st.l3IconBtn} type="button">
        <LinkIcon />
      </button>
      <button style={st.l3DeleteBtn} type="button">
        <DeleteIcon />
      </button>
    </div>
  );
}

interface ComponentDetailPopupProps {
  open: boolean;
  onClose: () => void;
  item: ComponentItem | null;
  onDeleted?: () => void;
}

export function ComponentDetailPopup({ open, onClose, item, onDeleted }: ComponentDetailPopupProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [l3Page, setL3Page] = useState(1);

  const totalL3 = MOCK_L3_ITEMS.length;
  const totalL3Pages = Math.ceil(totalL3 / L3_PAGE_SIZE);
  const l3Start = (l3Page - 1) * L3_PAGE_SIZE;
  const l3End = Math.min(l3Start + L3_PAGE_SIZE, totalL3);
  const pagedL3Items = MOCK_L3_ITEMS.slice(l3Start, l3End);

  useEffect(() => {
    if (!open) {
      setEditOpen(false);
      setDeleteOpen(false);
      setL3Page(1);
    }
  }, [open]);

  if (!open || !item) return null;

  const domain = DOMAIN_MOCK_DATA.find(
    (d) => d.nameKo === item.domainNameKo
  ) ?? DOMAIN_MOCK_DATA.find(
    (d) => item.domainNameKo.includes(d.nameKo) || d.nameKo.includes(item.domainNameKo)
  );

  return (
    <>
      <div style={st.overlay} onClick={onClose}>
        <div style={st.popup} onClick={(e) => e.stopPropagation()}>
          <div style={st.header}>
            <div style={st.titleRow}>
              <span style={st.titleText}>컴포넌트(L2) 조회</span>
              <button style={st.closeBtn} onClick={onClose} type="button">
                <CloseIcon />
              </button>
            </div>
          </div>

          <div style={st.main}>
            <div style={st.topArea}>
              <div style={st.leftCol}>
                <div style={st.infoRowWithHistory}>
                  <div style={{ display: "flex", gap: 32, alignItems: "flex-start", flex: 1 }}>
                    <div style={st.labelControl}>
                      <span style={st.label}>컴포넌트 ID</span>
                      <span style={st.value}>{item.componentId}</span>
                    </div>
                    <div style={st.labelControl}>
                      <span style={st.label}>컴포넌트(한글)</span>
                      <span style={st.value}>{item.nameKo}</span>
                    </div>
                    <div style={st.labelControl}>
                      <span style={st.label}>컴포넌트(영문)</span>
                      <span style={st.value}>{item.nameEn}</span>
                    </div>
                  </div>
                  <button style={st.historyBtn} type="button">
                    <HistoryIcon />
                    <span style={st.historyBtnText}>{MOCK_HISTORY.length} History</span>
                  </button>
                </div>

                <div style={st.infoRow}>
                  <div style={st.labelControl}>
                    <span style={st.label}>L2기획리더</span>
                    <span style={st.value}>{item.planLeader}</span>
                  </div>
                  <div style={st.labelControl}>
                    <span style={st.label}>L2설계리더</span>
                    <span style={st.value}>{item.designLeader}</span>
                  </div>
                </div>

                <div style={st.labelControlFull}>
                  <span style={st.label}>컴포넌트(L2) 설명</span>
                  <div style={st.value}>{item.description}</div>
                </div>

                <div style={st.labelControl}>
                  <span style={st.label}>사용여부</span>
                  <span style={st.value}>{item.useYn}</span>
                </div>
              </div>

              <div style={st.rightCol}>
                <HistoryTimeline entries={MOCK_HISTORY} />
              </div>
            </div>

            <div style={st.domainBox}>
              <div style={st.domainRow}>
                <div style={st.labelControl}>
                  <span style={st.label}>도메인(약어)</span>
                  <span style={st.value}>{domain?.abbr ?? "-"}</span>
                </div>
                <div style={st.labelControl}>
                  <span style={st.label}>도메인(한글)</span>
                  <span style={st.value}>{item.domainNameKo}</span>
                </div>
                <div style={st.labelControl}>
                  <span style={st.label}>도메인(영문)</span>
                  <span style={st.value}>{domain?.nameEn ?? "-"}</span>
                </div>
              </div>
              <div style={st.labelControlFull}>
                <span style={st.label}>도메인(L1) 설명</span>
                <span style={st.value}>{domain?.description ?? "-"}</span>
              </div>
            </div>

            <div style={st.labelControlFull}>
              <div style={st.l3Header}>
                <span style={{ ...st.l3Label, fontSize: 14 }}>업무(L3)</span>
                <div style={st.l3Pagination}>
                  <span style={st.l3PageInfo}>{l3Start + 1}-{l3End} of {totalL3}</span>
                  <button
                    style={l3Page <= 1 ? st.l3PageBtnDisabled : st.l3PageBtn}
                    type="button"
                    onClick={() => { if (l3Page > 1) setL3Page(l3Page - 1); }}
                    disabled={l3Page <= 1}
                  >
                    <ChevronLeftIcon />
                  </button>
                  <button
                    style={l3Page >= totalL3Pages ? st.l3PageBtnDisabled : st.l3PageBtn}
                    type="button"
                    onClick={() => { if (l3Page < totalL3Pages) setL3Page(l3Page + 1); }}
                    disabled={l3Page >= totalL3Pages}
                  >
                    <ChevronRightIcon />
                  </button>
                </div>
              </div>
              <div style={st.l3List}>
                {pagedL3Items.map((l3) => (
                  <L3ListItem key={l3.id} item={l3} />
                ))}
              </div>
            </div>
          </div>

          <div style={st.footer}>
            <div style={st.footerLeft}>
              <Button size="l" variant="outlined" color="info" onClick={onClose}>
                닫기
              </Button>
            </div>
            <div style={st.footerRight}>
              <Button size="l" variant="filled" color="negative" onClick={() => setDeleteOpen(true)}>
                삭제
              </Button>
              <Button size="l" variant="filled" color="positive" onClick={() => setEditOpen(true)}>
                수정
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ComponentEditPopup
        open={editOpen}
        onClose={() => setEditOpen(false)}
        item={item}
      />

      <ComponentDeletePopup
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirmDelete={() => {
          setDeleteOpen(false);
          onClose();
          onDeleted?.();
        }}
      />
    </>
  );
}
