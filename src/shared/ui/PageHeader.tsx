import type { CSSProperties, ReactNode } from "react";

const headerStyle: CSSProperties = {
  padding: "12px 0",
  marginBottom: 8,
};

interface PageHeaderProps {
  children: ReactNode;
}

export function PageHeader({ children }: PageHeaderProps) {
  return <div style={headerStyle}>{children}</div>;
}
