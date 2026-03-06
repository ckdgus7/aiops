import type { CSSProperties, ReactNode } from "react";
import { LNB } from "./service/LNB";

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

export function Layout({
  children,
  activeGnb = "게시판",
  activeLnb = "Q&A",
}: LayoutProps) {
  return (
    <div style={styles.container}>
      <LNB activeItem={activeLnb} activeGnb={activeGnb} />
      <main style={styles.content}>{children}</main>
    </div>
  );
}
