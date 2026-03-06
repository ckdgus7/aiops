import type { CSSProperties } from "react";
import { FONT } from "@/shared/ui/styles";

interface NotificationItem {
  id: string;
  content: string;
  linkText: string;
  linkHref?: string;
  time: string;
  highlighted?: boolean;
}

interface MyNotificationProps {
  open: boolean;
  notifications: NotificationItem[];
  totalCount: number;
  loadedCount: number;
  onClose: () => void;
  onMore?: () => void;
  onLinkClick?: (item: NotificationItem) => void;
}

const s = {
  wrapper: {
    width: 340,
    minWidth: 340,
    height: "100%",
    flexShrink: 0,
    fontFamily: FONT,
    display: "flex",
    flexDirection: "column",
    borderLeft: "1px solid #e4e4e7",
    background: "#98a2b3",
    boxSizing: "border-box",
    overflow: "hidden",
  } satisfies CSSProperties,
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    padding: "24px 24px 32px 24px",
    gap: 16,
  } satisfies CSSProperties,
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    flexShrink: 0,
  } satisfies CSSProperties,
  titleRow: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  } satisfies CSSProperties,
  titleText: {
    fontFamily: FONT,
    fontSize: 16,
    fontWeight: 600,
    lineHeight: "28px",
    color: "#ffffff",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  closeBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 18,
    height: 18,
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
    flexShrink: 0,
  } satisfies CSSProperties,
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    flex: 1,
    overflowY: "auto",
    width: "100%",
  } satisfies CSSProperties,
  cardBase: {
    display: "flex",
    flexDirection: "column",
    padding: "12px 16px",
    borderRadius: 8,
    width: "100%",
    boxSizing: "border-box",
  } satisfies CSSProperties,
  cardNormal: {
    background: "#ffffff",
  } satisfies CSSProperties,
  cardHighlighted: {
    background: "#f5fbff",
    border: "2px solid #7cd4fd",
  } satisfies CSSProperties,
  cardCol: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    width: "100%",
  } satisfies CSSProperties,
  content: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "20px",
    color: "#3f3f46",
    flex: "1 0 0",
  } satisfies CSSProperties,
  linkRow: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    fontFamily: FONT,
  } satisfies CSSProperties,
  linkText: {
    fontFamily: FONT,
    fontSize: 12,
    fontWeight: 400,
    lineHeight: "18px",
    color: "#1570ef",
    whiteSpace: "nowrap",
    cursor: "pointer",
    flexShrink: 0,
  } satisfies CSSProperties,
  linkArrow: {
    flex: "1 0 0",
    fontSize: 12,
    lineHeight: "18px",
    color: "#1570ef",
  } satisfies CSSProperties,
  regInfo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
  } satisfies CSSProperties,
  timeRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 0,
  } satisfies CSSProperties,
  timeText: {
    fontFamily: FONT,
    fontSize: 12,
    fontWeight: 400,
    lineHeight: "18px",
    color: "#3f3f46",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  footer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    flexShrink: 0,
  } satisfies CSSProperties,
  moreBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 6,
    background: "transparent",
    border: "1px solid #ffffff",
    borderRadius: 4,
    cursor: "pointer",
    boxSizing: "border-box",
    gap: 6,
  } satisfies CSSProperties,
  moreBtnText: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "20px",
    color: "#ffffff",
    whiteSpace: "nowrap",
    textAlign: "center",
  } satisfies CSSProperties,
};

function BellIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 3C8.68629 3 6 5.68629 6 9V13.5858L4.29289 15.2929C4.00681 15.579 3.92134 16.009 4.07612 16.3827C4.2309 16.7564 4.59554 17 5 17H19C19.4045 17 19.7691 16.7564 19.9239 16.3827C20.0787 16.009 19.9932 15.579 19.7071 15.2929L18 13.5858V9C18 5.68629 15.3137 3 12 3Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 17V18C9 19.6569 10.3431 21 12 21C13.6569 21 15 19.6569 15 18V17" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M1 1L11 11M11 1L1 11" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.25" stroke="#a1a1aa" strokeWidth="1.2" />
      <path d="M8 4.5V8L10 10" stroke="#a1a1aa" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MoreIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M6 8L10 12L14 8" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MyNotification({
  open,
  notifications,
  totalCount,
  loadedCount,
  onClose,
  onMore,
  onLinkClick,
}: MyNotificationProps) {
  if (!open) return null;

  return (
    <div style={s.wrapper}>
      <div style={s.container}>
        <div style={s.header}>
          <div style={s.titleRow}>
            <BellIcon />
            <span style={s.titleText}>나의 알림</span>
          </div>
          <button style={s.closeBtn} onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        <div style={s.list}>
          {notifications.map((item) => {
            const cardStyle = item.highlighted
              ? { ...s.cardBase, ...s.cardHighlighted }
              : { ...s.cardBase, ...s.cardNormal };

            return (
              <div key={item.id} style={cardStyle}>
                <div style={s.cardCol}>
                  <div style={s.content}>
                    <p style={{ margin: 0 }}>{item.content}</p>
                  </div>
                  <div style={s.linkRow}>
                    <span
                      style={s.linkText}
                      onClick={() => onLinkClick?.(item)}
                    >
                      {item.linkText}
                    </span>
                    <span style={s.linkArrow}>&nbsp;→</span>
                  </div>
                  <div style={s.regInfo}>
                    <div style={s.timeRow}>
                      <ClockIcon />
                      <span style={s.timeText}>{item.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {loadedCount < totalCount && (
          <div style={s.footer}>
            <button style={s.moreBtn} onClick={onMore}>
              <MoreIcon />
              <span style={s.moreBtnText}>More ({loadedCount} / {totalCount})</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
