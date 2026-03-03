import { Outlet, useLocation } from "react-router";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { GNB } from "./GNB";
import { LNB } from "./LNB";
import { useMenuStore } from "@/shared/model/menu.store";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    width: "100%",
    fontFamily: "'Pretendard', sans-serif",
  } satisfies CSSProperties,
  body: {
    display: "flex",
    flex: 1,
    overflow: "hidden",
  } satisfies CSSProperties,
  content: {
    flex: 1,
    overflow: "auto",
    background: "#f5f5f5",
    position: "relative",
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
    for (const gnb of menuItems) {
      for (const lnb of gnb.lnb) {
        if (path === lnb.path || path.startsWith(lnb.path + "/")) {
          setActiveGnb(gnb.gnbName);
          setActiveLnb(lnb.name);
          return;
        }
      }
    }
  }, [location.pathname, menuItems]);

  return (
    <div style={styles.container}>
      <GNB activeMenu={activeGnb} />
      <div style={styles.body}>
        <LNB activeItem={activeLnb} activeGnb={activeGnb} />
        <main style={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
