import { Outlet, useLocation } from "react-router";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { LNB } from "./LNB";
import { PageFooter } from "./PageFooter";
import { useMenuStore } from "@/shared/model/menu.store";

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    width: "100%",
    fontFamily: "'Pretendard', sans-serif",
  } satisfies CSSProperties,
  content: {
    flex: 1,
    overflow: "auto",
    background: "#f5f5f5",
    position: "relative",
    display: "flex",
    flexDirection: "column",
  } satisfies CSSProperties,
};

export function LayoutRoute() {
  const location = useLocation();
  const menuItems = useMenuStore((s) => s.menuItems);
  const fetchMenu = useMenuStore((s) => s.fetchMenu);
  const [activeGnb, setActiveGnb] = useState("기획");
  const [activeLnb, setActiveLnb] = useState("요구사항");

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);

  useEffect(() => {
    const path = location.pathname;
    let bestMatch: { gnbName: string; lnbName: string; pathLen: number } | null = null;
    for (const gnb of menuItems) {
      for (const lnb of gnb.lnb) {
        if (path === lnb.path || path.startsWith(lnb.path + "/")) {
          if (!bestMatch || lnb.path.length > bestMatch.pathLen) {
            bestMatch = { gnbName: gnb.gnbName, lnbName: lnb.name, pathLen: lnb.path.length };
          }
        }
      }
    }
    if (bestMatch) {
      setActiveGnb(bestMatch.gnbName);
      setActiveLnb(bestMatch.lnbName);
    }
  }, [location.pathname, menuItems]);

  return (
    <div style={styles.container}>
      <LNB activeItem={activeLnb} activeGnb={activeGnb} />
      <main style={styles.content}>
        <Outlet />
        <PageFooter />
      </main>
    </div>
  );
}
