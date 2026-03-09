import { useRef, useState, useEffect, useCallback } from "react";
import type { CSSProperties } from "react";
import { useNavigate } from "react-router";
import { useMdiStore } from "@/shared/model/mdi.store";
import type { MdiTabItem } from "@/shared/model/mdi.store";

const styles = {
  wrapper: {
    display: "flex",
    alignItems: "center",
    flex: 1,
    minWidth: 0,
    height: 36,
    background: "#fafafa",
    fontFamily: "'Pretendard', sans-serif",
    boxSizing: "border-box",
  } satisfies CSSProperties,
  tabListWrap: {
    display: "flex",
    alignItems: "center",
    flex: 1,
    minWidth: 0,
    overflow: "hidden",
  } satisfies CSSProperties,
  tabList: {
    display: "flex",
    alignItems: "flex-start",
    overflow: "hidden",
  } satisfies CSSProperties,
  tab: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    maxWidth: 240,
    padding: "8px 16px",
    background: "#ffffff",
    borderRight: "1px solid #e4e4e7",
    borderBottom: "1px solid #e4e4e7",
    cursor: "pointer",
    boxSizing: "border-box",
    height: 36,
    flexShrink: 0,
  } satisfies CSSProperties,
  tabActive: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    maxWidth: 240,
    padding: "8px 16px",
    background: "#ffffff",
    borderRight: "1px solid #e4e4e7",
    borderBottom: "2px solid #18181b",
    cursor: "pointer",
    boxSizing: "border-box",
    height: 36,
    flexShrink: 0,
  } satisfies CSSProperties,
  tabLabel: {
    fontSize: 14,
    fontWeight: 400,
    color: "#a1a1aa",
    lineHeight: "20px",
    maxWidth: 156,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontFamily: "'Pretendard', sans-serif",
  } satisfies CSSProperties,
  tabLabelActive: {
    fontSize: 14,
    fontWeight: 400,
    color: "#18181b",
    lineHeight: "20px",
    maxWidth: 156,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontFamily: "'Pretendard', sans-serif",
  } satisfies CSSProperties,
  closeBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 16,
    height: 16,
    padding: 0,
    border: "none",
    background: "transparent",
    cursor: "pointer",
    flexShrink: 0,
  } satisfies CSSProperties,
  btnWrap: {
    display: "flex",
    alignItems: "center",
    gap: 0,
    flexShrink: 0,
    marginLeft: "auto",
  } satisfies CSSProperties,
  separator: {
    width: 1,
    height: 20,
    background: "#e4e4e7",
    marginLeft: 8,
    marginRight: 4,
  } satisfies CSSProperties,
  navBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 28,
    height: 28,
    border: "none",
    background: "transparent",
    cursor: "pointer",
    padding: 0,
    borderRadius: 4,
  } satisfies CSSProperties,
  emptyMessage: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: 16,
    fontSize: 12,
    color: "#a1a1aa",
    fontFamily: "'Pretendard', sans-serif",
  } satisfies CSSProperties,
};

function CloseIcon({ color = "#a1a1aa" }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M4.5 4.5L11.5 11.5M11.5 4.5L4.5 11.5"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M10 4L6 8L10 12" stroke="#71717a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M6 4L10 8L6 12" stroke="#71717a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface MdiTabProps {
  className?: string;
}

export function MdiTab({ className }: MdiTabProps) {
  const tabs = useMdiStore((s) => s.tabs);
  const activeTabId = useMdiStore((s) => s.activeTabId);
  const setActiveTab = useMdiStore((s) => s.setActiveTab);
  const removeTab = useMdiStore((s) => s.removeTab);
  const navigate = useNavigate();
  const tabListRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    const el = tabListRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    checkScroll();
  }, [tabs, checkScroll]);

  const scrollTabs = (dir: "left" | "right") => {
    const el = tabListRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -200 : 200, behavior: "smooth" });
    setTimeout(checkScroll, 300);
  };

  const handleTabClick = (tab: MdiTabItem) => {
    setActiveTab(tab.id);
    navigate(tab.path);
  };

  const handleClose = (e: React.MouseEvent, tabId: string) => {
    e.stopPropagation();
    const wasActive = activeTabId === tabId;
    removeTab(tabId);
    if (wasActive) {
      const state = useMdiStore.getState();
      if (state.activeTabId) {
        const nextTab = state.tabs.find((t) => t.id === state.activeTabId);
        if (nextTab) {
          navigate(nextTab.path);
        }
      }
    }
  };

  if (tabs.length === 0) {
    return (
      <div style={styles.wrapper} className={className}>
        <div style={styles.emptyMessage}>열린 탭이 없습니다.</div>
      </div>
    );
  }

  return (
    <div style={styles.wrapper} className={className}>
      <div style={styles.tabListWrap}>
        <div
          ref={tabListRef}
          style={styles.tabList}
          onScroll={checkScroll}
        >
          {tabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <div
                key={tab.id}
                style={isActive ? styles.tabActive : styles.tab}
                onClick={() => handleTabClick(tab)}
              >
                <span style={isActive ? styles.tabLabelActive : styles.tabLabel}>
                  {tab.label}
                </span>
                <button
                  style={styles.closeBtn}
                  onClick={(e) => handleClose(e, tab.id)}
                  title="닫기"
                >
                  <CloseIcon color={isActive ? "#71717a" : "#a1a1aa"} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
      {(canScrollLeft || canScrollRight) && (
        <div style={styles.btnWrap}>
          <div style={styles.separator} />
          <button
            style={{
              ...styles.navBtn,
              opacity: canScrollLeft ? 1 : 0.3,
            }}
            onClick={() => scrollTabs("left")}
            disabled={!canScrollLeft}
            title="이전"
          >
            <ChevronLeftIcon />
          </button>
          <button
            style={{
              ...styles.navBtn,
              opacity: canScrollRight ? 1 : 0.3,
            }}
            onClick={() => scrollTabs("right")}
            disabled={!canScrollRight}
            title="다음"
          >
            <ChevronRightIcon />
          </button>
        </div>
      )}
    </div>
  );
}
