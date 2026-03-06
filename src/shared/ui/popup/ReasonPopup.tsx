import { useState, useEffect, type CSSProperties } from "react";
import { Button } from "@/shared/ui/global/Button";
import { Textarea } from "@/shared/ui/global/Textarea";
import { popupStyles } from "@/shared/ui/styles";

interface ReasonPopupProps {
  open: boolean;
  title: string;
  onCancel: () => void;
  onConfirm: (reason: string) => void;
  cancelLabel?: string;
  confirmLabel?: string;
  placeholder?: string;
  label?: string;
  maxLength?: number;
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M5 5L15 15" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M15 5L5 15" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const s = {
  overlay: {
    ...popupStyles.overlay,
  } satisfies CSSProperties,
  popup: {
    ...popupStyles.popup,
    maxHeight: undefined,
    overflow: undefined,
  } satisfies CSSProperties,
  header: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
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
    gap: 0,
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
};

export function ReasonPopup({
  open,
  title,
  onCancel,
  onConfirm,
  cancelLabel = "닫기",
  confirmLabel = "승인",
  placeholder,
  label,
  maxLength = 300,
}: ReasonPopupProps) {
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (open) {
      setReason("");
    }
  }, [open]);

  const handleConfirm = () => {
    onConfirm(reason);
  };

  if (!open) return null;

  return (
    <div style={s.overlay} onClick={onCancel}>
      <div style={s.popup} onClick={(e) => e.stopPropagation()}>
        <div style={s.header}>
          <div style={s.titleRow}>
            <span style={s.titleText}>{title}</span>
            <button style={s.closeBtn} onClick={onCancel}>
              <CloseIcon />
            </button>
          </div>
        </div>

        <div style={s.main}>
          <Textarea
            label={label ?? `${title}사유`}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder={placeholder ?? `${title} 사유를 입력할 수 있습니다.`}
            maxLength={maxLength}
            indicator
            style={{ minHeight: 120 }}
          />
        </div>

        <div style={s.footer}>
          <div>
            <Button
              size="l"
              variant="outlined"
              color="info"
              onClick={onCancel}
            >
              {cancelLabel}
            </Button>
          </div>
          <div>
            <Button
              size="l"
              variant="filled"
              color="positive"
              onClick={handleConfirm}
            >
              {confirmLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
