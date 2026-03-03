import { type CSSProperties } from "react";
import { Button } from "@/shared/ui/Button";
import type { DomainItem } from "@/features/ssf/model/types";

const FONT = "'Pretendard', sans-serif";

interface DomainDetailPopupProps {
  open: boolean;
  onClose: () => void;
  data: DomainItem | null;
  onEdit?: () => void;
  onDelete?: () => void;
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M6 6L18 18" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18 6L6 18" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const s = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  } satisfies CSSProperties,
  popup: {
    width: 880,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    boxShadow: "0 4px 24px rgba(0, 0, 0, 0.12)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  } satisfies CSSProperties,
  header: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 32,
    paddingLeft: 32,
    paddingRight: 32,
    paddingBottom: 16,
  } satisfies CSSProperties,
  titleRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  } satisfies CSSProperties,
  titleText: {
    fontFamily: FONT,
    fontSize: 24,
    fontWeight: 700,
    lineHeight: "32px",
    color: "#52525b",
  } satisfies CSSProperties,
  closeBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 32,
    height: 32,
    border: "none",
    background: "transparent",
    cursor: "pointer",
    borderRadius: 4,
    padding: 0,
  } satisfies CSSProperties,
  main: {
    display: "flex",
    flexDirection: "column",
    padding: "24px 32px",
  } satisfies CSSProperties,
  content: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  } satisfies CSSProperties,
  fieldRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "16px 32px",
    alignItems: "flex-start",
  } satisfies CSSProperties,
  fieldItem: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  } satisfies CSSProperties,
  fieldItemFull: {
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
  } satisfies CSSProperties,
  value: {
    fontFamily: FONT,
    fontSize: 16,
    fontWeight: 400,
    lineHeight: "24px",
    color: "#3f3f46",
  } satisfies CSSProperties,
  valueSmall: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "20px",
    color: "#3f3f46",
  } satisfies CSSProperties,
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 16,
    paddingBottom: 32,
    paddingLeft: 32,
    paddingRight: 32,
  } satisfies CSSProperties,
  footerLeft: {
    display: "flex",
    flex: 1,
    alignItems: "flex-start",
  } satisfies CSSProperties,
  footerRight: {
    display: "flex",
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    gap: 12,
  } satisfies CSSProperties,
};

export function DomainDetailPopup({ open, onClose, data, onEdit, onDelete }: DomainDetailPopupProps) {
  if (!open || !data) return null;

  return (
    <div style={s.overlay} onClick={onClose}>
      <div style={s.popup} onClick={(e) => e.stopPropagation()}>
        <div style={s.header}>
          <div style={s.titleRow}>
            <span style={s.titleText}>도메인(L1) 정보 조회</span>
            <button style={s.closeBtn} onClick={onClose}>
              <CloseIcon />
            </button>
          </div>
        </div>

        <div style={s.main}>
          <div style={s.content}>
            <div style={s.fieldRow}>
              <div style={s.fieldItem}>
                <span style={s.label}>도메인(약어)</span>
                <span style={s.value}>{data.abbr}</span>
              </div>
              <div style={s.fieldItem}>
                <span style={s.label}>도메인(한글)</span>
                <span style={s.value}>{data.nameKo}</span>
              </div>
              <div style={s.fieldItem}>
                <span style={s.label}>도메인(영문)</span>
                <span style={s.value}>{data.nameEn}</span>
              </div>
            </div>

            <div style={s.fieldItemFull}>
              <span style={s.label}>도메인(L1) 설명</span>
              <span style={s.value}>{data.description}</span>
            </div>

            <div style={s.fieldRow}>
              <div style={s.fieldItem}>
                <span style={s.label}>사용여부</span>
                <span style={s.valueSmall}>{data.useYn}</span>
              </div>
            </div>
          </div>
        </div>

        <div style={s.footer}>
          <div style={s.footerLeft}>
            <Button size="l" variant="outlined" color="info" onClick={onClose}>
              닫기
            </Button>
          </div>
          <div style={s.footerRight}>
            <Button size="l" variant="filled" color="negative" onClick={() => { onClose(); onDelete?.(); }}>
              삭제
            </Button>
            <Button size="l" variant="filled" color="positive" onClick={() => { onClose(); onEdit?.(); }}>
              수정
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
