import { useState, useEffect, type CSSProperties } from "react";
import { Button } from "@/shared/ui/global/Button";
import { FONT, popupStyles } from "@/shared/ui/styles";

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M6 6L18 18" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18 6L6 18" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const st = {
  overlay: {
    ...popupStyles.overlay,
    zIndex: 1002,
  } satisfies CSSProperties,
  popup: {
    ...popupStyles.popup,
    boxShadow: "0 4px 24px rgba(0, 0, 0, 0.12)",
    fontFamily: undefined,
    maxHeight: "auto",
    overflow: "visible",
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
  requiredMark: {
    ...popupStyles.requiredDot,
    borderRadius: 3,
  } satisfies CSSProperties,
  labelRow: popupStyles.fieldLabel,
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

interface ComponentDeletePopupProps {
  open: boolean;
  onClose: () => void;
  onConfirmDelete: () => void;
}

export function ComponentDeletePopup({ open, onClose, onConfirmDelete }: ComponentDeletePopupProps) {
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (open) {
      setReason("");
    }
  }, [open]);

  if (!open) return null;

  const canDelete = reason.trim().length > 0;

  const handleDelete = () => {
    if (!canDelete) return;
    onConfirmDelete();
  };

  return (
    <div style={st.overlay} onClick={onClose}>
      <div style={st.popup} onClick={(e) => e.stopPropagation()}>
        <div style={st.header}>
          <div style={st.titleRow}>
            <span style={st.titleText}>삭제 사유</span>
            <button style={st.closeBtn} onClick={onClose} type="button">
              <CloseIcon />
            </button>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: "24px 32px" }}>
          <div style={st.labelRow}>
            <span style={{ fontFamily: FONT, fontSize: 15, fontWeight: 500, lineHeight: "18px", color: "#a1a1aa" }}>삭제 사유</span>
            <div style={st.requiredMark} />
          </div>
          <div style={{ position: "relative", width: "100%" }}>
            <textarea
              value={reason}
              onChange={(e) => {
                if (e.target.value.length <= 300) setReason(e.target.value);
              }}
              placeholder="삭제 사유를 입력하세요."
              maxLength={300}
              style={{
                width: "100%",
                minHeight: 120,
                padding: "8px 16px",
                border: "1px solid #e4e7ec",
                borderRadius: 4,
                backgroundColor: "#ffffff",
                fontFamily: FONT,
                fontSize: 17,
                fontWeight: 400,
                lineHeight: "24px",
                color: "#3f3f46",
                resize: "vertical",
                boxSizing: "border-box",
                outline: "none",
              }}
            />
            <div style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "4px 8px 0 0",
            }}>
              <span style={{
                fontFamily: FONT,
                fontSize: 13,
                fontWeight: 400,
                lineHeight: "18px",
                color: "#a1a1aa",
              }}>{reason.length}/300</span>
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
            <Button
              size="l"
              variant="filled"
              color="negative"
              disabled={!canDelete}
              onClick={handleDelete}
            >
              삭제
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
