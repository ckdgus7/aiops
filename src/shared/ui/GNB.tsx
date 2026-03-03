import { useEffect } from "react";
import type { CSSProperties } from "react";
import { useNavigate } from "react-router";
import { useMenuStore } from "@/shared/model/menu.store";

const styles = {
  wrapper: {
    width: "100%",
    height: 64,
    background: "#fff",
    borderBottom: "1px solid #dde2e8",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 16,
    paddingRight: 30,
    boxSizing: "border-box",
    fontFamily: "'Pretendard', sans-serif",
    position: "sticky",
    top: 0,
    zIndex: 100,
  } satisfies CSSProperties,
  left: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  } satisfies CSSProperties,
  logo: {
    fontSize: 24,
    fontWeight: 700,
    color: "#000",
    whiteSpace: "nowrap",
    cursor: "pointer",
  } satisfies CSSProperties,
  navList: {
    display: "flex",
    alignItems: "center",
    gap: 70,
    listStyle: "none",
    margin: 0,
    padding: 0,
  } satisfies CSSProperties,
  navItem: {
    fontSize: 16,
    fontWeight: 600,
    color: "#333",
    cursor: "pointer",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  navItemActive: {
    fontSize: 16,
    fontWeight: 600,
    color: "#000",
    cursor: "pointer",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  right: {
    display: "flex",
    alignItems: "center",
    gap: 20,
  } satisfies CSSProperties,
  bellIcon: {
    width: 24,
    height: 24,
    position: "relative",
    cursor: "pointer",
  } satisfies CSSProperties,
  bellSvg: {
    width: 18,
    height: 20,
  } satisfies CSSProperties,
  bellDot: {
    position: "absolute",
    top: 2,
    right: 2,
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: "#f44",
  } satisfies CSSProperties,
  divider: {
    width: 1,
    height: 24,
    background: "rgba(221,221,221,0.87)",
  } satisfies CSSProperties,
  userArea: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  } satisfies CSSProperties,
  avatar: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    background: "#e0e0e0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 14,
    color: "#666",
    fontWeight: 600,
  } satisfies CSSProperties,
  userInfo: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  } satisfies CSSProperties,
  userName: {
    fontSize: 14,
    color: "#666",
  } satisfies CSSProperties,
  userTeam: {
    fontSize: 13,
    color: "#999",
  } satisfies CSSProperties,
};

interface GNBProps {
  activeMenu?: string;
}

export function GNB({ activeMenu = "게시판" }: GNBProps) {
  const navigate = useNavigate();
  const menuItems = useMenuStore((s) => s.menuItems);
  const fetchMenu = useMenuStore((s) => s.fetchMenu);

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);

  return (
    <header style={styles.wrapper}>
      <div style={styles.left}>
        <span style={styles.logo}>NOVA AI DevOps</span>
        <nav>
          <ul style={styles.navList}>
            {menuItems.map((m) => (
              <li
                key={m.id}
                style={m.gnbName === activeMenu ? styles.navItemActive : styles.navItem}
                onClick={() => {
                  if (m.lnb.length > 0) {
                    navigate(m.lnb[0].path);
                  }
                }}
              >
                {m.gnbName}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div style={styles.right}>
        <div style={styles.bellIcon}>
          <svg
            style={styles.bellSvg}
            viewBox="0 0 18 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 7A5 5 0 0 0 4 7c0 5.25-2 6.75-2 6.75h16S16 12.25 16 7"
              stroke="#333"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="translate(-1, 0)"
            />
            <path
              d="M7.29 17.29a2 2 0 0 0 3.42 0"
              stroke="#333"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div style={styles.bellDot} />
        </div>
        <div style={styles.divider} />
        <div style={styles.userArea}>
          <div style={styles.avatar}>홍</div>
          <div style={styles.userInfo}>
            <span style={styles.userName}>홍길동(p123456)</span>
            <span style={styles.userTeam}>NOVA추진팀</span>
          </div>
        </div>
      </div>
    </header>
  );
}
