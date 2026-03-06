import { Outlet, useLocation } from "react-router";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { LNB } from "./service/LNB";
import { PageHeader } from "./service/PageHeader";
import { PageFooter } from "./service/PageFooter";
import { MyInfo } from "./service/MyInfo";
import { useMenuStore } from "@/shared/model/menu.store";
import { useMyInfoStore } from "@/shared/model/myInfo.store";

const MOCK_USER_INFO = {
  employeeId: "P12345678",
  name: "김선경",
  company: "SK텔레콤",
  department: "BSS Architect팀",
  email: "skkim@sktelecom.com",
  phone: "010-1234-5678",
};

const MOCK_ROLE_GROUPS = [
  { id: "1", level: "L3" as const, name: "L3 기획 리더", status: "신청" as const, appliedAt: "2025-12-19 10:45" },
  { id: "2", level: "L3" as const, name: "L3 Application 설계 리더" },
  { id: "3", level: "L4" as const, name: "L4 Application 설계 리더", status: "승인" as const, appliedAt: "2025-12-19 10:45", approvedAt: "2025-12-19 17:21" },
];

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    width: "100%",
    fontFamily: "'Pretendard', sans-serif",
  } satisfies CSSProperties,
  rightColumn: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    minWidth: 0,
    transition: "flex 0.3s ease",
  } satisfies CSSProperties,
  scrollArea: {
    flex: 1,
    overflow: "auto",
    background: "#ffffff",
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

  const myInfoOpen = useMyInfoStore((s) => s.isOpen);
  const closeMyInfo = useMyInfoStore((s) => s.close);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);

  useEffect(() => {
    const path = location.pathname;
    let bestMatch: {
      gnbName: string;
      lnbName: string;
      pathLen: number;
    } | null = null;
    for (const gnb of menuItems) {
      for (const lnb of gnb.lnb) {
        if (path === lnb.path || path.startsWith(lnb.path + "/")) {
          if (!bestMatch || lnb.path.length > bestMatch.pathLen) {
            bestMatch = {
              gnbName: gnb.gnbName,
              lnbName: lnb.name,
              pathLen: lnb.path.length,
            };
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
      <div style={styles.rightColumn}>
        <PageHeader />
        <div style={styles.scrollArea}>
          <Outlet />
        </div>
        <PageFooter />
      </div>
      <MyInfo
        open={myInfoOpen}
        userInfo={MOCK_USER_INFO}
        roleGroups={MOCK_ROLE_GROUPS}
        lastLogin="2025-11-28 15:24"
        language={language}
        onClose={closeMyInfo}
        onLanguageChange={setLanguage}
      />
    </div>
  );
}
