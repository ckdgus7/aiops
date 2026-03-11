import { useState, type CSSProperties } from "react";
import { Button } from "@/shared/ui/global/Button";
import { DomainEditPopup } from "@/features/ssf/ui/l1/DomainEditPopup";
import { DomainDetail } from "@/features/ssf/ui/component/DomainDetail";
import type { DomainItem } from "@/features/ssf/model/types";
import { popupStyles } from "@/shared/ui/styles";

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
    ...popupStyles.overlay,
    zIndex: 1000,
  } satisfies CSSProperties,
  popup: {
    ...popupStyles.popup,
    maxHeight: undefined,
    boxShadow: "0 4px 24px rgba(0, 0, 0, 0.12)",
    fontFamily: undefined,
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
    ...popupStyles.titleRow,
    marginBottom: undefined,
    width: "100%",
  } satisfies CSSProperties,
  titleText: {
    ...popupStyles.titleText,
    color: "#52525b",
  } satisfies CSSProperties,
  closeBtn: popupStyles.closeBtn,
  main: {
    display: "flex",
    flexDirection: "column",
    padding: "24px 32px",
  } satisfies CSSProperties,
  footer: {
    ...popupStyles.footer,
    padding: undefined,
    borderTop: undefined,
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
    ...popupStyles.footerRight,
    flex: 1,
    justifyContent: "flex-end",
  } satisfies CSSProperties,
};

export function DomainDetailPopup({ open, onClose, data, onEdit, onDelete }: DomainDetailPopupProps) {
  const [editPopupOpen, setEditPopupOpen] = useState(false);

  if (!open || !data) return null;

  return (
    <>
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
            <DomainDetail domainId={data.nameKo} showUseYn />
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
              <Button size="l" variant="filled" color="positive" onClick={() => { setEditPopupOpen(true); }}>
                수정
              </Button>
            </div>
          </div>
        </div>
      </div>
      <DomainEditPopup
        open={editPopupOpen}
        onClose={() => setEditPopupOpen(false)}
        initialData={data}
      />
    </>
  );
}
