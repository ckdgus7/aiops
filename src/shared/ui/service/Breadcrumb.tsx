import { useState } from "react";
import type { CSSProperties } from "react";

const wrapperStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 0,
  height: 16,
};

const itemStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "'Pretendard', sans-serif",
  fontSize: 12,
  lineHeight: "16px",
  color: "#a1a1aa",
  fontWeight: 400,
  whiteSpace: "nowrap",
  cursor: "default",
  textDecoration: "none",
};

const activeItemStyle: CSSProperties = {
  ...itemStyle,
  color: "#3f3f46",
  fontWeight: 500,
  cursor: "pointer",
};

const dividerWrapStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 16,
  height: 16,
};

function HomeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M2.667 8L8 3.333L13.333 8"
        stroke="#a1a1aa"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 7v4.667a.667.667 0 00.667.667h2V10h2.666v2.334h2A.667.667 0 0012 11.667V7"
        stroke="#a1a1aa"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DividerIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M6 4L10 8L6 12"
        stroke="#d4d4d8"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <nav style={wrapperStyle}>
      <div style={dividerWrapStyle}>
        <HomeIcon />
      </div>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        const isActive = isLast;
        const isHovered = hoveredIndex === i;

        return (
          <span key={i} style={{ display: "flex", alignItems: "center" }}>
            <div style={dividerWrapStyle}>
              <DividerIcon />
            </div>
            <span
              style={{
                ...(isActive ? activeItemStyle : itemStyle),
                textDecoration: isActive && isHovered ? "underline" : "none",
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={isActive && item.onClick ? item.onClick : undefined}
            >
              {item.label}
            </span>
          </span>
        );
      })}
    </nav>
  );
}
