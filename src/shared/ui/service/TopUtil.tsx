import type { CSSProperties } from "react";
import { FONT } from "@/shared/ui/styles";

interface TopUtilProps {
  onBellClick?: () => void;
  onUserClick?: () => void;
  onChatClick?: () => void;
  bellNotification?: boolean;
  chatNotification?: boolean;
}

const s = {
  wrapper: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    flexShrink: 0,
    padding: "0 12px",
  } satisfies CSSProperties,
  iconBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 32,
    height: 32,
    background: "none",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    position: "relative",
    padding: 0,
    flexShrink: 0,
  } satisfies CSSProperties,
  separator: {
    width: 1,
    height: 16,
    backgroundColor: "#e4e4e7",
    margin: "0 4px",
    flexShrink: 0,
  } satisfies CSSProperties,
  notificationDot: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 6,
    height: 6,
    borderRadius: "50%",
    backgroundColor: "#f04438",
  } satisfies CSSProperties,
};

function BellIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M10 2C7.23858 2 5 4.23858 5 7V10.5858L3.29289 12.2929C3.00681 12.579 2.92134 13.009 3.07612 13.3827C3.2309 13.7564 3.59554 14 4 14H16C16.4045 14 16.7691 13.7564 16.9239 13.3827C17.0787 13.009 16.9932 12.579 16.7071 12.2929L15 10.5858V7C15 4.23858 12.7614 2 10 2Z"
        stroke="#71717a"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 14V15C8 16.1046 8.89543 17 10 17C11.1046 17 12 16.1046 12 15V14"
        stroke="#71717a"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M3 4C3 3.44772 3.44772 3 4 3H16C16.5523 3 17 3.44772 17 4V13C17 13.5523 16.5523 14 16 14H7L3 17V4Z"
        stroke="#71717a"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="7" r="3.25" stroke="#71717a" strokeWidth="1.5" />
      <path
        d="M4 16.5C4 14.0147 6.01472 12 8.5 12H11.5C13.9853 12 16 14.0147 16 16.5V17H4V16.5Z"
        stroke="#71717a"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TopUtil({
  onBellClick,
  onUserClick,
  onChatClick,
  bellNotification = false,
  chatNotification = false,
}: TopUtilProps) {
  return (
    <div style={s.wrapper}>
      {/* <button style={s.iconBtn} onClick={onChatClick} title="채팅">
        <ChatIcon />
        {chatNotification && <span style={s.notificationDot} />}
      </button> */}
      <button style={s.iconBtn} onClick={onBellClick} title="알림">
        <BellIcon />
        {bellNotification && <span style={s.notificationDot} />}
      </button>
      <div style={s.separator} />
      <button style={s.iconBtn} onClick={onUserClick} title="사용자">
        <UserIcon />
      </button>
    </div>
  );
}
