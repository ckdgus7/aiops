import type { CSSProperties, ReactNode } from "react";
import { useFavoritesStore } from "@/shared/model/favorites.store";

const st = {
  header: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    alignContent: "center",
    gap: 16,
    width: "100%",
    flexShrink: 0,
  } satisfies CSSProperties,
  leadingFunction: {
    display: "flex",
    alignItems: "center",
    flexShrink: 0,
  } satisfies CSSProperties,
  backBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    padding: 0,
    borderRadius: 4,
  } satisfies CSSProperties,
  titleArea: {
    display: "flex",
    flex: "1 0 0",
    flexWrap: "wrap",
    alignItems: "center",
    alignContent: "center",
    gap: "8px 16px",
    minWidth: 360,
    minHeight: 1,
  } satisfies CSSProperties,
  badgeWrap: {
    display: "flex",
    alignItems: "center",
    gap: 0,
    flexShrink: 0,
  } satisfies CSSProperties,
  titleText: {
    fontSize: 32,
    fontWeight: 700,
    color: "black",
    lineHeight: "40px",
    fontFamily: "'Pretendard', sans-serif",
    fontStyle: "normal",
    whiteSpace: "nowrap",
    flexShrink: 0,
  } satisfies CSSProperties,
  badgeBase: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "4px 12px",
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: "solid",
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "16px",
    fontFamily: "'Pretendard', sans-serif",
    whiteSpace: "nowrap",
    flexShrink: 0,
  } satisfies CSSProperties,
  badgeStatus: {
    borderColor: "#7a5af8",
    background: "#fafaff",
    color: "#7a5af8",
  } satisfies CSSProperties,
  badgeId: {
    borderColor: "#36bffa",
    background: "white",
    color: "#36bffa",
  } satisfies CSSProperties,
  functionWrap: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexShrink: 0,
  } satisfies CSSProperties,
  iconBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid black",
    background: "white",
    cursor: "pointer",
    padding: 3,
    borderRadius: 4,
    flexShrink: 0,
  } satisfies CSSProperties,
  ctaWrap: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginLeft: "auto",
    flexShrink: 0,
  } satisfies CSSProperties,
};

function BackArrowIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ overflow: "hidden" }}>
      <path
        d="M14.5 7.43L9.93 12l4.57 4.57"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FavIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="18" height="24" viewBox="0 0 18 24" fill="none" style={{ overflow: "hidden", flexShrink: 0 }}>
      <path
        d="M9 14.1L5.87 15.84l.6-3.48L4 9.9l3.5-.51L9 6.24l1.5 3.15 3.5.51-2.47 2.46.6 3.48L9 14.1z"
        stroke={filled ? "#EAAA08" : "black"}
        strokeWidth="1"
        strokeLinejoin="round"
        fill={filled ? "#EAAA08" : "none"}
      />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ overflow: "hidden", flexShrink: 0 }}>
      <path
        d="M4 12a8 8 0 0114.93-4M20 12a8 8 0 01-14.93 4"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 4v4h-4M4 20v-4h4"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface PageTitleProps {
  title: string;
  favoriteKey?: string;
  badge?: string;
  idBadge?: string;
  actions?: ReactNode;
  onBack?: () => void;
  showRefresh?: boolean;
  onRefresh?: () => void;
}

export function PageTitle({
  title,
  favoriteKey,
  badge,
  idBadge,
  actions,
  onBack,
  showRefresh,
  onRefresh,
}: PageTitleProps) {
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);
  const isFavorite = useFavoritesStore((s) => s.isFavorite);
  const starred = favoriteKey ? isFavorite(favoriteKey) : false;

  return (
    <div style={st.header}>
      {onBack && (
        <div style={st.leadingFunction}>
          <button style={st.backBtn} onClick={onBack} title="뒤로 가기">
            <BackArrowIcon />
          </button>
        </div>
      )}

      <div style={st.titleArea}>
        {idBadge && (
          <div style={st.badgeWrap}>
            <span style={{ ...st.badgeBase, ...st.badgeId }}>{idBadge}</span>
          </div>
        )}
        <span style={st.titleText}>{title}</span>
        {badge && (
          <div style={st.badgeWrap}>
            <span style={{ ...st.badgeBase, ...st.badgeStatus }}>{badge}</span>
          </div>
        )}
        {(favoriteKey || showRefresh) && (
          <div style={st.functionWrap}>
            {favoriteKey && (
              <button
                style={st.iconBtn}
                onClick={() => toggleFavorite(favoriteKey)}
                title={starred ? "즐겨찾기 해제" : "즐겨찾기 추가"}
              >
                <FavIcon filled={starred} />
              </button>
            )}
            {showRefresh && (
              <button
                style={st.iconBtn}
                onClick={onRefresh}
                title="새로고침"
              >
                <RefreshIcon />
              </button>
            )}
          </div>
        )}
      </div>

      {actions && <div style={st.ctaWrap}>{actions}</div>}
    </div>
  );
}
