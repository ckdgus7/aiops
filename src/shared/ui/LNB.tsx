import { useState, useEffect, useCallback } from "react";
import type { CSSProperties } from "react";
import { useNavigate } from "react-router";
import { useFavoritesStore } from "@/shared/model/favorites.store";
import { useMenuStore } from "@/shared/model/menu.store";
import type { LnbItem } from "@/shared/model/menu.store";

const SIDEBAR_WIDTH = 240;
const SIDEBAR_COLLAPSED_WIDTH = 44;

const s = {
  sidebar: {
    width: SIDEBAR_WIDTH,
    minWidth: SIDEBAR_WIDTH,
    height: "100%",
    background: "#fff",
    borderRight: "1px solid #e4e4e7",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    fontFamily: "'Pretendard', sans-serif",
    position: "relative",
    transition: "width 0.2s ease, min-width 0.2s ease",
  } satisfies CSSProperties,
  sidebarCollapsed: {
    width: SIDEBAR_COLLAPSED_WIDTH,
    minWidth: SIDEBAR_COLLAPSED_WIDTH,
    height: "100%",
    background: "#fff",
    borderRight: "1px solid #e4e4e7",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    fontFamily: "'Pretendard', sans-serif",
    position: "relative",
    transition: "width 0.2s ease, min-width 0.2s ease",
    overflow: "hidden",
  } satisfies CSSProperties,
  logoWrap: {
    height: 88,
    display: "flex",
    alignItems: "center",
    padding: "16px 22px",
    boxSizing: "border-box",
    flexShrink: 0,
  } satisfies CSSProperties,
  logoIcon: {
    width: 24,
    height: 24,
    borderRadius: 4,
    background: "#18181b",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  } satisfies CSSProperties,
  logoIconText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: 700,
    lineHeight: 1,
  } satisfies CSSProperties,
  logoTitle: {
    marginLeft: 8,
    display: "flex",
    flexDirection: "column",
  } satisfies CSSProperties,
  logoNova: {
    fontSize: 12,
    fontWeight: 600,
    color: "#3f3f46",
    lineHeight: "20px",
    letterSpacing: 1,
  } satisfies CSSProperties,
  logoDevops: {
    fontSize: 18,
    fontWeight: 700,
    color: "#18181b",
    lineHeight: "28px",
    letterSpacing: 0.5,
  } satisfies CSSProperties,
  navWrap: {
    flex: 1,
    overflowY: "auto",
    overflowX: "hidden",
  } satisfies CSSProperties,
  depthWrap: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    padding: "8px 2px",
    borderTop: "1px solid #e4e4e7",
  } satisfies CSSProperties,
  depthRow1: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "12px 8px",
    cursor: "pointer",
    borderRadius: 4,
    userSelect: "none",
  } satisfies CSSProperties,
  depthIcon1: {
    width: 24,
    height: 24,
    opacity: 0.5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    fontSize: 16,
  } satisfies CSSProperties,
  depthTitle1: {
    flex: 1,
    fontSize: 14,
    fontWeight: 400,
    color: "#3f3f46",
    lineHeight: "20px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  } satisfies CSSProperties,
  depthArrow: {
    fontSize: 10,
    color: "#a1a1aa",
    flexShrink: 0,
    transition: "transform 0.2s ease",
  } satisfies CSSProperties,
  depth2Wrap: {
    display: "flex",
    flexDirection: "column",
    gap: 1,
  } satisfies CSSProperties,
  depthRow2: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "8px 8px 8px 14px",
    cursor: "pointer",
    borderRadius: 4,
  } satisfies CSSProperties,
  depthRow2Active: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "8px 8px 8px 14px",
    cursor: "pointer",
    borderRadius: 4,
    background: "#f4f4f5",
  } satisfies CSSProperties,
  depthIcon2: {
    width: 20,
    height: 20,
    opacity: 0.5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    fontSize: 13,
  } satisfies CSSProperties,
  depthTitle2: {
    flex: 1,
    fontSize: 12,
    fontWeight: 400,
    color: "#3f3f46",
    lineHeight: "18px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  } satisfies CSSProperties,
  depthTitle2Active: {
    flex: 1,
    fontSize: 12,
    fontWeight: 600,
    color: "#18181b",
    lineHeight: "18px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  } satisfies CSSProperties,
  favWrap: {
    padding: "24px 16px",
    flexShrink: 0,
    borderTop: "1px solid #e4e4e7",
  } satisfies CSSProperties,
  favHeader: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  } satisfies CSSProperties,
  favIcon: {
    fontSize: 16,
    color: "#a1a1aa",
  } satisfies CSSProperties,
  favLabel: {
    fontSize: 12,
    fontWeight: 400,
    color: "#3f3f46",
    lineHeight: "18px",
  } satisfies CSSProperties,
  favEmpty: {
    fontSize: 12,
    color: "#a1a1aa",
    textAlign: "center",
    padding: "16px 20px",
    lineHeight: "18px",
    background: "#fafafa",
    borderRadius: 4,
  } satisfies CSSProperties,
  favItem: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    padding: "4px 10px",
    fontSize: 12,
    color: "#3f3f46",
    background: "#f4f4f5",
    borderRadius: 4,
    marginRight: 4,
    marginBottom: 4,
    cursor: "pointer",
  } satisfies CSSProperties,
  favRemove: {
    fontSize: 10,
    color: "#a1a1aa",
    cursor: "pointer",
    lineHeight: 1,
  } satisfies CSSProperties,
  functionWrap: {
    height: 56,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 16px",
    flexShrink: 0,
    borderTop: "1px solid #e4e4e7",
  } satisfies CSSProperties,
  collapseBtn: {
    width: 24,
    height: 24,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    border: "none",
    background: "transparent",
    color: "#71717a",
    fontSize: 14,
    padding: 0,
    borderRadius: 4,
  } satisfies CSSProperties,
};

const GNB_ICONS: Record<string, string> = {
  "기획": "📋",
  "분석/설계": "📐",
  "개발": "💻",
  "테스트": "🧪",
  "빌드/배포": "🚀",
  "게시판": "📌",
};

const LNB_ICONS: Record<string, string> = {
  "요구사항": "📄",
  "요구사항상세": "📝",
  "공지사항": "📢",
  "Q&A": "❓",
};

interface LNBProps {
  activeItem?: string;
  activeGnb?: string;
  onItemClick?: (item: string) => void;
}

export function LNB({ activeItem = "Q&A", activeGnb = "게시판", onItemClick }: LNBProps) {
  const navigate = useNavigate();
  const fetchMenu = useMenuStore((s) => s.fetchMenu);
  const menuItems = useMenuStore((s) => s.menuItems);
  const favorites = useFavoritesStore((st) => st.favorites);
  const removeFavorite = useFavoritesStore((st) => st.removeFavorite);

  const [collapsed, setCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);

  useEffect(() => {
    if (activeGnb) {
      setExpandedSections((prev) => ({ ...prev, [activeGnb]: true }));
    }
  }, [activeGnb]);

  const toggleSection = useCallback((gnbName: string) => {
    setExpandedSections((prev) => ({ ...prev, [gnbName]: !prev[gnbName] }));
  }, []);

  const handleItemClick = useCallback((menuItem: LnbItem) => {
    navigate(menuItem.path);
    onItemClick?.(menuItem.name);
  }, [navigate, onItemClick]);

  const handleFavoriteClick = useCallback((name: string) => {
    for (const gnb of menuItems) {
      const found = gnb.lnb.find((item) => item.name === name);
      if (found) {
        navigate(found.path);
        onItemClick?.(found.name);
        return;
      }
    }
  }, [menuItems, navigate, onItemClick]);

  if (collapsed) {
    return (
      <aside style={s.sidebarCollapsed}>
        <div style={{ ...s.logoWrap, padding: "16px 10px", justifyContent: "center" }}>
          <div style={s.logoIcon}>
            <span style={s.logoIconText}>N</span>
          </div>
        </div>
        <div style={s.navWrap}>
          {menuItems.map((gnb) => (
            <div key={gnb.id} style={{ ...s.depthWrap, padding: "8px 0" }}>
              <div
                style={{ ...s.depthRow1, justifyContent: "center", padding: "12px 0" }}
                onClick={() => {
                  setCollapsed(false);
                  setExpandedSections((prev) => ({ ...prev, [gnb.gnbName]: true }));
                }}
                title={gnb.gnbName}
              >
                <span style={s.depthIcon1}>{GNB_ICONS[gnb.gnbName] || "📁"}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ ...s.functionWrap, justifyContent: "center" }}>
          <button
            style={s.collapseBtn}
            onClick={() => setCollapsed(false)}
            title="사이드바 펼치기"
          >
            ▶
          </button>
        </div>
      </aside>
    );
  }

  return (
    <aside style={s.sidebar}>
      <div style={s.logoWrap}>
        <div style={s.logoIcon}>
          <span style={s.logoIconText}>N</span>
        </div>
        <div style={s.logoTitle}>
          <span style={s.logoNova}>NOVA</span>
          <span style={s.logoDevops}>AI DevOps</span>
        </div>
      </div>

      <div style={s.navWrap}>
        {menuItems.map((gnb) => {
          const isExpanded = !!expandedSections[gnb.gnbName];
          return (
            <div key={gnb.id} style={s.depthWrap}>
              <div
                style={s.depthRow1}
                onClick={() => toggleSection(gnb.gnbName)}
              >
                <span style={s.depthIcon1}>{GNB_ICONS[gnb.gnbName] || "📁"}</span>
                <span style={s.depthTitle1}>{gnb.gnbName}</span>
                <span
                  style={{
                    ...s.depthArrow,
                    transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
                  }}
                >
                  ▶
                </span>
              </div>
              {isExpanded && (
                <div style={s.depth2Wrap}>
                  {gnb.lnb.map((item) => {
                    const isActive = item.name === activeItem;
                    return (
                      <div
                        key={item.path}
                        style={isActive ? s.depthRow2Active : s.depthRow2}
                        onClick={() => handleItemClick(item)}
                      >
                        <span style={s.depthIcon2}>{LNB_ICONS[item.name] || "•"}</span>
                        <span style={isActive ? s.depthTitle2Active : s.depthTitle2}>
                          {item.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={s.favWrap}>
        <div style={s.favHeader}>
          <span style={s.favIcon}>☆</span>
          <span style={s.favLabel}>즐겨찾기</span>
        </div>
        {favorites.length === 0 ? (
          <div style={s.favEmpty}>
            즐겨찾기에 등록한 화면이 없습니다.
          </div>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {favorites.map((item) => (
              <div
                key={item}
                style={s.favItem}
                onClick={() => handleFavoriteClick(item)}
              >
                <span>{item}</span>
                <span
                  style={s.favRemove}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFavorite(item);
                  }}
                >
                  ✕
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={s.functionWrap}>
        <button
          style={s.collapseBtn}
          onClick={() => setCollapsed(true)}
          title="사이드바 접기"
        >
          ◀
        </button>
      </div>
    </aside>
  );
}
