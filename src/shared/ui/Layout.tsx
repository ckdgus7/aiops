import type { CSSProperties, ReactNode } from "react";
import { GNB } from "./GNB";
import { LNB } from "./LNB";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    width: "100%",
    fontFamily: "'Pretendard', sans-serif",
  } satisfies CSSProperties,
  body: {
    display: "flex",
    flex: 1,
    overflow: "hidden",
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

export function Layout({
  children,
  activeGnb = "게시판",
  activeLnb = "Q&A",
}: LayoutProps) {
  return (
    <div style={styles.container}>
      <GNB activeMenu={activeGnb} />
      <div style={styles.body}>
        <LNB activeItem={activeLnb} activeGnb={activeGnb} />
        <main style={styles.content}>{children}</main>
      </div>
    </div>
  );
}
