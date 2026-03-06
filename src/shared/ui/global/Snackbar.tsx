import { useEffect, useCallback, type CSSProperties, type ReactNode } from "react";

type SnackbarType = "info" | "positive" | "negative" | "error" | "warning" | "success";

interface SnackbarProps {
  open: boolean;
  onClose: () => void;
  message: ReactNode;
  type?: SnackbarType;
  duration?: number;
  style?: CSSProperties;
}

const FONT_FAMILY = "'Pretendard', sans-serif";

const BG_COLORS: Record<SnackbarType, string> = {
  info: "#71717a",
  positive: "#7a5af8",
  negative: "#f04438",
  error: "#ee46bc",
  warning: "#f79009",
  success: "#1ac057",
};

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M8 8L16 16" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 8L8 16" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function Snackbar({
  open,
  onClose,
  message,
  type = "info",
  duration = 3000,
  style,
}: SnackbarProps) {
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open || duration <= 0) return;
    const timer = setTimeout(handleClose, duration);
    return () => clearTimeout(timer);
  }, [open, duration, handleClose]);

  if (!open) return null;

  const containerStyle: CSSProperties = {
    position: "fixed",
    bottom: 40,
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 10000,
    width: 480,
    display: "flex",
    gap: 16,
    alignItems: "flex-start",
    paddingLeft: 24,
    paddingRight: 12,
    paddingTop: 16,
    paddingBottom: 16,
    borderRadius: 8,
    backgroundColor: BG_COLORS[type],
    boxSizing: "border-box",
    ...style,
  };

  const textStyle: CSSProperties = {
    flex: "1 0 0",
    fontFamily: FONT_FAMILY,
    fontSize: 16,
    fontWeight: 400,
    lineHeight: "24px",
    color: "#ffffff",
    minHeight: 1,
    minWidth: 1,
  };

  const closeButtonStyle: CSSProperties = {
    display: "flex",
    alignItems: "flex-start",
    flexShrink: 0,
    borderRadius: 36,
    cursor: "pointer",
    border: "none",
    background: "none",
    padding: 0,
  };

  return (
    <div style={containerStyle}>
      <p style={textStyle}>{message}</p>
      <button
        type="button"
        style={closeButtonStyle}
        onClick={handleClose}
        aria-label="닫기"
      >
        <CloseIcon />
      </button>
    </div>
  );
}
