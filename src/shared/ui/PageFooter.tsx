import type { CSSProperties } from "react";

const st = {
  footer: {
    width: "100%",
    background: "white",
    borderTop: "1px solid #e4e4e7",
    padding: "16px 32px",
    boxSizing: "border-box",
    flexShrink: 0,
    zIndex: 10,
  } satisfies CSSProperties,
  row: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: "100%",
  } satisfies CSSProperties,
  left: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  } satisfies CSSProperties,
  copyright: {
    fontFamily: "'Pretendard', sans-serif",
    fontWeight: 400,
    fontSize: 10,
    lineHeight: "16px",
    color: "#a1a1aa",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  right: {
    display: "flex",
    alignItems: "flex-start",
    gap: 16,
    flexShrink: 0,
    color: "#52525b",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  link: {
    fontFamily: "'Pretendard', sans-serif",
    fontWeight: 400,
    fontSize: 12,
    lineHeight: "18px",
    color: "inherit",
    cursor: "pointer",
  } satisfies CSSProperties,
  linkBold: {
    fontFamily: "'Pretendard', sans-serif",
    fontWeight: 700,
    fontSize: 12,
    lineHeight: "18px",
    color: "inherit",
    cursor: "pointer",
  } satisfies CSSProperties,
};

export function PageFooter() {
  return (
    <footer style={st.footer}>
      <div style={st.row}>
        <div style={st.left}>
          <span style={st.copyright}>
            COPYRIGHT © SKT NOVA AI DevOps. ALL RIGHTS RESERVED.
          </span>
        </div>
        <div style={st.right}>
          <span style={st.link}>서비스 이용약관</span>
          <span style={st.linkBold}>개인정보처리방침</span>
        </div>
      </div>
    </footer>
  );
}
