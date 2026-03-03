import type { CSSProperties } from "react";

const wrapperStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 4,
  fontSize: 13,
  color: "#999",
  marginBottom: 6,
};

const separatorStyle: CSSProperties = {
  color: "#ccc",
};

const lastItemStyle: CSSProperties = {
  color: "#444",
  fontWeight: 600,
};

interface BreadcrumbItem {
  label: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav style={wrapperStyle}>
      {items.map((item, i) => (
        <span key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {i > 0 && <span style={separatorStyle}>&gt;</span>}
          <span style={i === items.length - 1 ? lastItemStyle : undefined}>
            {item.label}
          </span>
        </span>
      ))}
    </nav>
  );
}
