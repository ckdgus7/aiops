import { useState, useEffect } from "react";
import type { CSSProperties } from "react";
import { useNavigate } from "react-router";
import { useFavoritesStore } from "@/shared/model/favorites.store";
import { useMenuStore } from "@/shared/model/menu.store";
import type { LnbItem } from "@/shared/model/menu.store";
import { useRecentMenusStore } from "@/shared/model/recentMenus.store";

const styles = {
  wrapper: {
    width: 240,
    minWidth: 240,
    height: "100%",
    background: "#fff",
    borderRight: "1px solid #dde2e8",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 16,
    boxSizing: "border-box",
    fontFamily: "'Pretendard', sans-serif",
    overflowY: "auto",
  } satisfies CSSProperties,
  searchInput: {
    width: "100%",
    height: 32,
    border: "1px solid #ddd",
    borderRadius: 6,
    padding: "0 8px",
    fontSize: 14,
    color: "#222",
    boxSizing: "border-box",
    outline: "none",
  } satisfies CSSProperties,
  tabBar: {
    display: "flex",
    borderBottom: "1px solid #d9d7e7",
    marginTop: 10,
  } satisfies CSSProperties,
  tab: {
    flex: 1,
    textAlign: "center",
    padding: "8px 0 5px",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    color: "#999",
    borderBottom: "3px solid transparent",
  } satisfies CSSProperties,
  tabActive: {
    flex: 1,
    textAlign: "center",
    padding: "8px 0 5px",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    color: "#000",
    borderBottom: "3px solid #000",
  } satisfies CSSProperties,
  menuContent: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    marginTop: 12,
    flex: 1,
  } satisfies CSSProperties,
  menuItem: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    height: 36,
    padding: "0 10px",
    borderRadius: 6,
    fontSize: 14,
    fontWeight: 600,
    color: "#222",
    cursor: "pointer",
  } satisfies CSSProperties,
  menuItemActive: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    height: 36,
    padding: "0 10px",
    borderRadius: 5,
    fontSize: 14,
    fontWeight: 600,
    color: "#fff",
    background: "#666",
    cursor: "pointer",
  } satisfies CSSProperties,
  recentSection: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    marginTop: 12,
  } satisfies CSSProperties,
  recentHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  } satisfies CSSProperties,
  recentLabel: {
    fontSize: 12,
    fontWeight: 600,
    color: "#666",
  } satisfies CSSProperties,
  recentTag: {
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
    background: "#eee",
    borderRadius: 50,
    padding: "6px 12px",
    fontSize: 13,
    color: "#666",
    fontWeight: 500,
    maxWidth: 280,
  } satisfies CSSProperties,
  recentX: {
    fontSize: 12,
    cursor: "pointer",
    color: "#999",
    lineHeight: 1,
  } satisfies CSSProperties,
};

interface LNBProps {
  activeItem?: string;
  activeGnb?: string;
  onItemClick?: (item: string) => void;
}

export function LNB({ activeItem = "Q&A", activeGnb = "게시판", onItemClick }: LNBProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const fetchMenu = useMenuStore((s) => s.fetchMenu);
  const lnbItems = useMenuStore((s) => s.getLnbItems(activeGnb));
  const favorites = useFavoritesStore((st) => st.favorites);
  const removeFavorite = useFavoritesStore((st) => st.removeFavorite);
  const recentMenus = useRecentMenusStore((s) => s.recentMenus);
  const addRecentMenu = useRecentMenusStore((s) => s.addRecentMenu);
  const removeRecentMenu = useRecentMenusStore((s) => s.removeRecentMenu);
  const clearAllRecentMenus = useRecentMenusStore((s) => s.clearAllRecentMenus);

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);

  const handleItemClick = (menuItem: LnbItem) => {
    addRecentMenu(menuItem.name);
    navigate(menuItem.path);
    onItemClick?.(menuItem.name);
  };

  return (
    <aside style={styles.wrapper}>
      <div>
        <input style={styles.searchInput} placeholder="메뉴 검색" />
        <div style={styles.tabBar}>
          {["메뉴", "즐겨찾기"].map((tab, idx) => (
            <div
              key={tab}
              style={idx === activeTab ? styles.tabActive : styles.tab}
              onClick={() => setActiveTab(idx)}
            >
              {tab}
            </div>
          ))}
        </div>
        {activeTab === 0 && (
          <div style={styles.menuContent}>
            <div style={{ display: "flex", flexDirection: "column", marginTop: 4 }}>
              {lnbItems.map((menuItem) => (
                <div
                  key={menuItem.path}
                  style={menuItem.name === activeItem ? styles.menuItemActive : styles.menuItem}
                  onClick={() => handleItemClick(menuItem)}
                >
                  {menuItem.name}
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === 1 && (
          <div style={styles.menuContent}>
            {favorites.length === 0 ? (
              <p style={{ fontSize: 13, color: "#999", textAlign: "center", marginTop: 24 }}>
                즐겨찾기한 메뉴가 없습니다.
              </p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", marginTop: 4 }}>
                {favorites.map((item) => (
                  <div
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      height: 36,
                      padding: "0 10px",
                      borderRadius: 6,
                      fontSize: 14,
                      fontWeight: 600,
                      color: item === activeItem ? "#fff" : "#222",
                      background: item === activeItem ? "#666" : "transparent",
                      cursor: "pointer",
                    }}
                  >
                    <span style={{ flex: 1 }}>{item}</span>
                    <span
                      style={{ fontSize: 12, color: item === activeItem ? "#ddd" : "#999", cursor: "pointer" }}
                      onClick={() => removeFavorite(item)}
                    >
                      ✕
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <div style={styles.recentSection}>
        <div style={styles.recentHeader}>
          <span style={styles.recentLabel}>최근 사용 메뉴</span>
          {recentMenus.length > 0 && (
            <span
              style={{ ...styles.recentX, fontSize: 14 }}
              onClick={clearAllRecentMenus}
            >
              ✕
            </span>
          )}
        </div>
        {recentMenus.map((item) => (
          <div key={item} style={styles.recentTag}>
            <span style={{ flex: 1 }}>{item}</span>
            <span style={styles.recentX} onClick={() => removeRecentMenu(item)}>
              ✕
            </span>
          </div>
        ))}
      </div>
    </aside>
  );
}
