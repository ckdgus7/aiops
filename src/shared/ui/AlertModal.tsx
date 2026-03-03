import { type CSSProperties, type ReactNode, type ReactElement, useEffect } from "react";
import { Button } from "./Button";

type AlertType = "info" | "success" | "warning" | "error";

interface AlertModalProps {
  open: boolean;
  onClose: () => void;
  type?: AlertType;
  message: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  showCancel?: boolean;
}

const FONT_FAMILY = "'Pretendard', sans-serif";

function InfoIcon() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <circle cx="26" cy="26" r="18" stroke="#7a5af8" strokeWidth="2.5" fill="none" />
      <line x1="26" y1="22" x2="26" y2="36" stroke="#7a5af8" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="26" cy="17" r="1.5" fill="#7a5af8" />
    </svg>
  );
}

function SuccessIcon() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <circle cx="26" cy="26" r="18" stroke="#1ac057" strokeWidth="2.5" fill="none" />
      <path d="M18 26L23 31L34 20" stroke="#1ac057" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <path d="M26 8L46 44H6L26 8Z" stroke="#f79009" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
      <line x1="26" y1="22" x2="26" y2="33" stroke="#f79009" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="26" cy="38" r="1.5" fill="#f79009" />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <circle cx="26" cy="26" r="18" stroke="#f04438" strokeWidth="2.5" fill="none" />
      <line x1="20" y1="20" x2="32" y2="32" stroke="#f04438" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="32" y1="20" x2="20" y2="32" stroke="#f04438" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M8 8L16 16" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 8L8 16" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const ICON_MAP: Record<AlertType, () => ReactElement> = {
  info: InfoIcon,
  success: SuccessIcon,
  warning: WarningIcon,
  error: ErrorIcon,
};

export function AlertModal({
  open,
  onClose,
  type = "info",
  message,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
  showCancel = false,
}: AlertModalProps) {
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const Icon = ICON_MAP[type];

  const overlayStyle: CSSProperties = {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  };

  const modalStyle: CSSProperties = {
    width: 440,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 24,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    boxShadow: "0px 12px 24px 0px rgba(113, 113, 122, 0.1)",
  };

  const contentStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    alignItems: "center",
    width: "100%",
    overflowX: "hidden",
    overflowY: "auto",
  };

  const iconWrapStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  };

  const messageStyle: CSSProperties = {
    fontFamily: FONT_FAMILY,
    fontSize: 16,
    fontWeight: 400,
    lineHeight: "24px",
    color: "#71717a",
    textAlign: "center",
    width: "100%",
    wordBreak: "keep-all",
  };

  const buttonRowStyle: CSSProperties = {
    display: "flex",
    gap: showCancel ? 16 : 0,
    height: 40,
    alignItems: "flex-start",
    justifyContent: "center",
    width: "100%",
    flexShrink: 0,
  };

  const closeButtonStyle: CSSProperties = {
    position: "absolute",
    top: 10,
    right: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    border: "none",
    background: "none",
    padding: 0,
    borderRadius: 4,
  };

  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  const handleCancel = () => {
    onCancel?.();
    onClose();
  };

  const resolvedConfirmLabel = confirmLabel ?? (showCancel ? "삭제" : "확인");
  const resolvedCancelLabel = cancelLabel ?? "취소";

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          style={closeButtonStyle}
          onClick={onClose}
          aria-label="닫기"
        >
          <CloseIcon />
        </button>

        <div style={contentStyle}>
          <div style={iconWrapStyle}>
            <Icon />
          </div>

          <div style={messageStyle}>
            {message}
          </div>

          <div style={buttonRowStyle}>
            {showCancel && (
              <Button
                size="l"
                variant="outlined"
                color="info"
                onClick={handleCancel}
              >
                {resolvedCancelLabel}
              </Button>
            )}
            <Button
              size="l"
              variant={showCancel ? "filled" : "outlined"}
              color={showCancel ? "negative" : "info"}
              onClick={handleConfirm}
            >
              {resolvedConfirmLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
