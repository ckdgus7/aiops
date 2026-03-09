import type { CSSProperties, ReactNode } from "react";
import { Outlet } from "react-router";
const styles = {
  container: {
    display: "flex",
    height: "100vh",
    width: "100%",
    fontFamily: "'Pretendard', sans-serif",
  } satisfies CSSProperties,
  content: {
    flex: 1,
    overflow: "auto",
    background: "#f5f5f5",
    position: "relative",
  } satisfies CSSProperties,
};

interface LayoutProps {
  children: ReactNode;
  activeGnb?: string;
  activeLnb?: string;
}

export function Layout() {
  return (
    <div style={styles.container}>
      <main style={styles.content}><Outlet /></main>
    </div>
  );
}
