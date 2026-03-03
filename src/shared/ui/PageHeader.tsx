import type { CSSProperties, ReactNode } from "react";
import { MdiTab } from "./MdiTab";

const siteHeaderStyle: CSSProperties = {
  width: "100%",
  fontFamily: "'Pretendard', sans-serif",
};

const pageTitleWrapStyle: CSSProperties = {
  width: "100%",
  height: 120,
  background: "#ffffff",
  display: "flex",
  alignItems: "flex-start",
  boxSizing: "border-box",
};

const pageTitleInnerStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: 8,
  width: "100%",
  height: "100%",
  padding: "24px 32px",
  boxSizing: "border-box",
};

interface PageHeaderProps {
  children: ReactNode;
}

export function PageHeader({ children }: PageHeaderProps) {
  return (
    <div style={siteHeaderStyle}>
      <MdiTab />
      <div style={pageTitleWrapStyle}>
        <div style={pageTitleInnerStyle}>{children}</div>
      </div>
    </div>
  );
}
