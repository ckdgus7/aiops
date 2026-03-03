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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    flexShrink: 0,
  } satisfies CSSProperties,
  logoInner: {
    display: "flex",
    alignItems: "flex-start",
    gap: 8,
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
    display: "flex",
    flexDirection: "column",
    gap: 4,
    width: 164,
    color: "#71717a",
  } satisfies CSSProperties,
  logoNova: {
    fontSize: 16,
    fontWeight: 600,
    lineHeight: "20px",
  } satisfies CSSProperties,
  logoDevops: {
    fontSize: 28,
    fontWeight: 900,
    lineHeight: "32px",
  } satisfies CSSProperties,
  navWrap: {
    flex: 1,
    overflowY: "auto",
    overflowX: "hidden",
    display: "flex",
    flexDirection: "column",
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
  depthTitle1Active: {
    flex: 1,
    fontSize: 14,
    fontWeight: 700,
    color: "#18181b",
    lineHeight: "20px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
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
    display: "flex",
    flexDirection: "column",
    gap: 8,
    padding: "24px 16px",
    flexShrink: 0,
    borderTop: "1px solid #e4e4e7",
  } satisfies CSSProperties,
  favHeader: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  } satisfies CSSProperties,
  favLabel: {
    fontSize: 12,
    fontWeight: 700,
    color: "#3f3f46",
    lineHeight: "18px",
  } satisfies CSSProperties,
  favEmpty: {
    fontSize: 12,
    fontWeight: 400,
    color: "#71717a",
    textAlign: "center",
    padding: 16,
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
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 16,
    flexShrink: 0,
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
    padding: 0,
    borderRadius: 4,
  } satisfies CSSProperties,
};

const GNB_ICONS: Record<string, string> = {
  "요구관리": "📋",
  "UI 관리": "🎨",
  "기능관리": "⚙️",
  "게시판": "📌",
};

const LNB_ICONS: Record<string, string> = {
  "요구사항": "📄",
  "요구사항 명세 작성": "📝",
  "요구사항 검토자 배정": "👤",
  "요구사항 검토": "🔍",
  "요구상세": "📑",
  "요구상세 승인": "✅",
  "요구사항 반려 검토": "🔄",
  "업무 Flow 설계": "🔀",
  "애플리케이션 설계": "🏗️",
  "SB기획": "📐",
  "UI디자인": "🖌️",
  "퍼블리싱": "🌐",
  "기능설계": "📊",
  "상세기능 설계": "📈",
  "공지사항": "📢",
  "Q&A": "❓",
};

function HeartIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.5, flexShrink: 0 }}>
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        stroke="#3f3f46"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}

function CollapseSidebarIcon({ direction = "left" }: { direction?: "left" | "right" }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      {direction === "left" ? (
        <>
          <path d="M15 6L9 12L15 18" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="4" y1="4" x2="4" y2="20" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" />
        </>
      ) : (
        <>
          <path d="M9 6L15 12L9 18" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="20" y1="4" x2="20" y2="20" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

interface LNBProps {
  activeItem?: string;
  activeGnb?: string;
  onItemClick?: (item: string) => void;
}

export function LNB({ activeItem = "Q&A", activeGnb = "게시판", onItemClick }: LNBProps) {
  const navigate = useNavigate();
  const fetchMenu = useMenuStore((st) => st.fetchMenu);
  const menuItems = useMenuStore((st) => st.menuItems);
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
        <div style={{ ...s.logoWrap, padding: "16px 10px" }}>
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
            <CollapseSidebarIcon direction="right" />
          </button>
        </div>
      </aside>
    );
  }

  return (
    <aside style={s.sidebar}>
      <div style={s.logoWrap}>
        <div style={s.logoInner}>
          <div style={s.logoIcon}>
            <span style={s.logoIconText}>N</span>
          </div>
          <div style={s.logoTitle}>
            <span style={s.logoNova}>NOVA</span>
            <span style={s.logoDevops}>AI DevOps</span>
          </div>
        </div>
      </div>

      <div style={s.navWrap}>
        {menuItems.map((gnb) => {
          const isExpanded = !!expandedSections[gnb.gnbName];
          const isGnbActive = gnb.gnbName === activeGnb;
          return (
            <div key={gnb.id} style={s.depthWrap}>
              <div
                style={s.depthRow1}
                onClick={() => toggleSection(gnb.gnbName)}
              >
                <span style={s.depthIcon1}>{GNB_ICONS[gnb.gnbName] || "📁"}</span>
                <span style={isGnbActive ? s.depthTitle1Active : s.depthTitle1}>{gnb.gnbName}</span>
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
          <HeartIcon />
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
          <CollapseSidebarIcon direction="left" />
        </button>
      </div>
    </aside>
  );
}
