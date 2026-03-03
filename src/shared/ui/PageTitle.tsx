import type { CSSProperties, ReactNode } from "react";
import { useFavoritesStore } from "@/shared/model/favorites.store";

const wrapperStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
};

const leftStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
};

const titleStyle: CSSProperties = {
  fontSize: 20,
  fontWeight: 700,
  color: "#18181b",
  lineHeight: "28px",
  fontFamily: "'Pretendard', sans-serif",
  letterSpacing: 0,
};

const badgeStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "4px 12px",
  borderRadius: 12,
  border: "1px solid #7a5af8",
  background: "#fafaff",
  fontSize: 14,
  fontWeight: 500,
  color: "#7a5af8",
  lineHeight: "16px",
  fontFamily: "'Pretendard', sans-serif",
  whiteSpace: "nowrap",
};

const favoriteBtn: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 24,
  height: 24,
  border: "none",
  background: "transparent",
  cursor: "pointer",
  padding: 0,
};

const actionsStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
};

function StarIcon({ filled }: { filled: boolean }) {
  if (filled) {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="#f59e0b">
        <path d="M10 1.5l2.47 5.01L18 7.27l-4 3.9.94 5.5L10 14.27l-4.94 2.4.94-5.5-4-3.9 5.53-.76L10 1.5z" />
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M10 1.5l2.47 5.01L18 7.27l-4 3.9.94 5.5L10 14.27l-4.94 2.4.94-5.5-4-3.9 5.53-.76L10 1.5z"
        stroke="#d4d4d8"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface PageTitleProps {
  title: string;
  favoriteKey?: string;
  badge?: string;
  actions?: ReactNode;
}

export function PageTitle({ title, favoriteKey, badge, actions }: PageTitleProps) {
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);
  const isFavorite = useFavoritesStore((s) => s.isFavorite);
  const starred = favoriteKey ? isFavorite(favoriteKey) : false;

  return (
    <div style={wrapperStyle}>
      <div style={leftStyle}>
        <span style={titleStyle}>{title}</span>
        {badge && <span style={badgeStyle}>{badge}</span>}
        {favoriteKey && (
          <button
            style={favoriteBtn}
            onClick={() => toggleFavorite(favoriteKey)}
            title={starred ? "즐겨찾기 해제" : "즐겨찾기 추가"}
          >
            <StarIcon filled={starred} />
          </button>
        )}
      </div>
      {actions && <div style={actionsStyle}>{actions}</div>}
    </div>
  );
}
