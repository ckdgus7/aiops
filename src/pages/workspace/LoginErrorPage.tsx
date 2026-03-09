import type { CSSProperties } from "react";

const FONT_FAMILY = "'Pretendard', sans-serif";

function ErrorIcon() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <circle cx="40" cy="40" r="32" stroke="#f04438" strokeWidth="3" fill="none" />
      <line x1="30" y1="30" x2="50" y2="50" stroke="#f04438" strokeWidth="3" strokeLinecap="round" />
      <line x1="50" y1="30" x2="30" y2="50" stroke="#f04438" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

const s = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    minHeight: "100vh",
    backgroundColor: "#ffffff",
    fontFamily: FONT_FAMILY,
  } satisfies CSSProperties,
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 24,
  } satisfies CSSProperties,
  title: {
    fontSize: 24,
    fontWeight: 700,
    lineHeight: "32px",
    color: "#18181b",
    textAlign: "center",
  } satisfies CSSProperties,
  message: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: "24px",
    color: "#71717a",
    textAlign: "center",
    maxWidth: 400,
  } satisfies CSSProperties,
  subMessage: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "20px",
    color: "#a1a1aa",
    textAlign: "center",
    maxWidth: 400,
  } satisfies CSSProperties,
};

export function LoginErrorPage() {
  return (
    <div style={s.wrapper}>
      <div style={s.content}>
        <ErrorIcon />
        <span style={s.title}>로그인이 실패하였습니다.</span>
        {/* <span style={s.message}>
          아이디 또는 비밀번호가 올바르지 않거나, 접근 권한이 없습니다.
        </span> */}
        <span style={s.subMessage}>
          문제가 계속될 경우 시스템 관리자에게 문의해 주세요.
        </span>
      </div>
    </div>
  );
}
