import type { CSSProperties } from "react";

export const layout = {
  page: {
    maxWidth: 980,
    margin: "0 auto",
    padding: "24px 16px",
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji'",
  } satisfies CSSProperties,
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: 12,
    marginBottom: 12,
  } satisfies CSSProperties,
  formRow: {
    display: "grid",
    gridTemplateColumns: "1.2fr 0.9fr 0.9fr auto",
    gap: 12,
    alignItems: "end",
  } satisfies CSSProperties,
  field: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  } satisfies CSSProperties,
  label: {
    fontSize: 12,
    color: "#444",
    fontWeight: 600,
  } satisfies CSSProperties,
};

export const h1: CSSProperties = {
  margin: 0,
  fontSize: 20,
  fontWeight: 800,
  letterSpacing: "-0.2px",
};

export const muted: CSSProperties = {
  color: "#666",
  fontSize: 12,
};

export const card: CSSProperties = {
  border: "1px solid #e6e6e6",
  borderRadius: 12,
  padding: 16,
  background: "#fff",
  boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
  marginBottom: 12,
};

export const input: CSSProperties = {
  height: 36,
  padding: "0 12px",
  borderRadius: 10,
  border: "1px solid #d9d9d9",
  outline: "none",
};

export const button = {
  primary: {
    height: 36,
    padding: "0 14px",
    borderRadius: 10,
    border: "1px solid #111",
    background: "#111",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 700,
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  secondary: {
    height: 36,
    padding: "0 14px",
    borderRadius: 10,
    border: "1px solid #d9d9d9",
    background: "#fff",
    color: "#111",
    cursor: "pointer",
    fontWeight: 700,
    whiteSpace: "nowrap",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  } satisfies CSSProperties,
};

export const table: CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
};

export const th: CSSProperties = {
  textAlign: "left",
  fontSize: 12,
  color: "#333",
  background: "#f6f6f6",
  padding: "10px 12px",
  borderBottom: "1px solid #e6e6e6",
};

export const td: CSSProperties = {
  padding: "10px 12px",
  borderBottom: "1px solid #f0f0f0",
  fontSize: 13,
  color: "#111",
};

export const link: CSSProperties = {
  color: "#111",
  textDecoration: "underline",
};
