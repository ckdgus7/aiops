import { useState, useEffect, type CSSProperties } from "react";
import { Button } from "@/shared/ui/Button";
import { Textarea } from "@/shared/ui/Textarea";
import { AlertModal } from "@/shared/ui/AlertModal";

const FONT = "'Pretendard', sans-serif";

interface DomainDeletePopupProps {
  open: boolean;
  onClose: () => void;
  onDelete?: (reason: string) => void;
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
    gap: 12,
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
    fontSize: 25,
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
    gap: 24,
    padding: "24px 32px",
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
};

export function DomainDeletePopup({ open, onClose, onDelete }: DomainDeletePopupProps) {
  const [reason, setReason] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);

  useEffect(() => {
    if (open) {
      setReason("");
      setAlertOpen(false);
    }
  }, [open]);

  const handleClose = () => {
    if (reason.trim().length > 0) {
      setAlertOpen(true);
    } else {
      onClose();
    }
  };

  const handleAlertDiscard = () => {
    setAlertOpen(false);
    onClose();
  };

  const handleAlertDelete = () => {
    setAlertOpen(false);
    onDelete?.(reason);
    onClose();
  };

  const handleDelete = () => {
    onDelete?.(reason);
    onClose();
  };

  if (!open) return null;

  return (
    <>
      <div style={s.overlay} onClick={handleClose}>
        <div style={s.popup} onClick={(e) => e.stopPropagation()}>
          <div style={s.header}>
            <div style={s.titleRow}>
              <span style={s.titleText}>삭제 사유</span>
              <button style={s.closeBtn} onClick={handleClose}>
                <CloseIcon />
              </button>
            </div>
          </div>

          <div style={s.main}>
            <Textarea
              label="삭제 사유"
              required
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="삭제 사유를 입력하세요."
              maxLength={300}
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
                onClick={handleClose}
              >
                닫기
              </Button>
            </div>
            <div>
              <Button
                size="l"
                variant="filled"
                color="negative"
                onClick={handleDelete}
              >
                삭제
              </Button>
            </div>
          </div>
        </div>
      </div>

      <AlertModal
        open={alertOpen}
        onClose={() => setAlertOpen(false)}
        type="warning"
        message="입력된 값을 폐기하고 삭제를 취소할까요?"
        showCancel
        cancelLabel="확인"
        confirmLabel="삭제"
        onCancel={handleAlertDiscard}
        onConfirm={handleAlertDelete}
      />
    </>
  );
}
