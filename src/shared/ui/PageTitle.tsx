import type { CSSProperties, ReactNode } from "react";
import { useFavoritesStore } from "@/shared/model/favorites.store";

const wrapperStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 8,
};

const leftStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
};

const titleStyle: CSSProperties = {
  fontSize: 20,
  fontWeight: 700,
  color: "#111",
};

const starStyle: CSSProperties = {
  fontSize: 18,
  cursor: "pointer",
  userSelect: "none",
};

interface PageTitleProps {
  title: string;
  favoriteKey?: string;
  actions?: ReactNode;
}

export function PageTitle({ title, favoriteKey, actions }: PageTitleProps) {
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);
  const isFavorite = useFavoritesStore((s) => s.isFavorite);
  const starred = favoriteKey ? isFavorite(favoriteKey) : false;

  return (
    <div style={wrapperStyle}>
      <div style={leftStyle}>
        <span style={titleStyle}>{title}</span>
        {favoriteKey && (
          <span
            style={starStyle}
            onClick={() => toggleFavorite(favoriteKey)}
            title={starred ? "즐겨찾기 해제" : "즐겨찾기 추가"}
          >
            {starred ? "★" : "☆"}
          </span>
        )}
      </div>
      {actions && <div>{actions}</div>}
    </div>
  );
}
