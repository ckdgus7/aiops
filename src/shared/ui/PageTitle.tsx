import type { CSSProperties, ReactNode } from "react";
import { useFavoritesStore } from "@/shared/model/favorites.store";

const st = {
  wrapper: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    alignContent: "center",
    gap: 16,
    width: "100%",
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
    width: 24,
    height: 24,
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
  titleText: {
    fontSize: 32,
    fontWeight: 700,
    color: "black",
    lineHeight: "40px",
    fontFamily: "'Pretendard', sans-serif",
    whiteSpace: "nowrap",
    flexShrink: 0,
  } satisfies CSSProperties,
  badgeBase: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "4px 12px",
    borderRadius: 12,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "16px",
    fontFamily: "'Pretendard', sans-serif",
    whiteSpace: "nowrap",
    flexShrink: 0,
  } satisfies CSSProperties,
  badgeStatus: {
    border: "1px solid #7a5af8",
    background: "#fafaff",
    color: "#7a5af8",
  } satisfies CSSProperties,
  badgeId: {
    border: "1px solid #36bffa",
    background: "#ffffff",
    color: "#36bffa",
  } satisfies CSSProperties,
  functionWrap: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexShrink: 0,
  } satisfies CSSProperties,
  starBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 32,
    height: 32,
    border: "1px solid black",
    background: "white",
    cursor: "pointer",
    padding: 4,
    borderRadius: 4,
    boxSizing: "border-box",
  } satisfies CSSProperties,
  trailingActions: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginLeft: "auto",
    flexShrink: 0,
  } satisfies CSSProperties,
};

function BackArrowIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M15 6L9 12L15 18"
        stroke="#18181b"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StarIcon({ filled }: { filled: boolean }) {
  if (filled) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#f59e0b">
        <path d="M12 2l3 6.01L21 8.72l-4.5 4.38 1.06 6.18L12 16.27l-5.56 3.01L7.5 13.1 3 8.72l6-0.71L12 2z" />
      </svg>
    );
  }
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2l3 6.01L21 8.72l-4.5 4.38 1.06 6.18L12 16.27l-5.56 3.01L7.5 13.1 3 8.72l6-0.71L12 2z"
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
  idBadge?: string;
  actions?: ReactNode;
  onBack?: () => void;
}

export function PageTitle({ title, favoriteKey, badge, idBadge, actions, onBack }: PageTitleProps) {
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);
  const isFavorite = useFavoritesStore((s) => s.isFavorite);
  const starred = favoriteKey ? isFavorite(favoriteKey) : false;

  return (
    <div style={st.wrapper}>
      {onBack && (
        <div style={st.leadingFunction}>
          <button style={st.backBtn} onClick={onBack} title="뒤로 가기">
            <BackArrowIcon />
          </button>
        </div>
      )}

      <div style={st.titleArea}>
        {idBadge && (
          <span style={{ ...st.badgeBase, ...st.badgeId }}>{idBadge}</span>
        )}
        <span style={st.titleText}>{title}</span>
        {badge && (
          <span style={{ ...st.badgeBase, ...st.badgeStatus }}>{badge}</span>
        )}
        {favoriteKey && (
          <div style={st.functionWrap}>
            <button
              style={st.starBtn}
              onClick={() => toggleFavorite(favoriteKey)}
              title={starred ? "즐겨찾기 해제" : "즐겨찾기 추가"}
            >
              <StarIcon filled={starred} />
            </button>
          </div>
        )}
      </div>

      {actions && <div style={st.trailingActions}>{actions}</div>}
    </div>
  );
}
