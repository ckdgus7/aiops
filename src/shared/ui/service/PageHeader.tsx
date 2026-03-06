import { useState } from "react";
import type { CSSProperties } from "react";
import { MdiTab } from "./MdiTab";
import { TopUtil } from "./TopUtil";
import { MyInfo } from "./MyInfo";
import { Breadcrumb } from "./Breadcrumb";
import { PageTitle } from "./PageTitle";
import { usePageHeaderStore } from "@/shared/model/pageHeader.store";

const siteHeaderStyle: CSSProperties = {
  width: "100%",
  fontFamily: "'Pretendard', sans-serif",
  flexShrink: 0,
  zIndex: 10,
  borderBottom: "1px solid #e4e4e7",
};

const topBarStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  width: "100%",
  background: "#fafafa",
  borderBottom: "1px solid #e4e4e7",
  boxSizing: "border-box",
};

const pageTitleWrapStyle: CSSProperties = {
  width: "100%",
  background: "#ffffff",
  display: "flex",
  alignItems: "flex-start",
  boxSizing: "border-box",
};

const pageTitleInnerStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 16,
  width: "100%",
  padding: "24px 32px",
  boxSizing: "border-box",
};

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

export function PageHeader() {
  const breadcrumbItems = usePageHeaderStore((s) => s.breadcrumbItems);
  const title = usePageHeaderStore((s) => s.title);
  const favoriteKey = usePageHeaderStore((s) => s.favoriteKey);
  const badge = usePageHeaderStore((s) => s.badge);
  const idBadge = usePageHeaderStore((s) => s.idBadge);
  const actions = usePageHeaderStore((s) => s.actions);
  const onBack = usePageHeaderStore((s) => s.onBack);
  const showRefresh = usePageHeaderStore((s) => s.showRefresh);
  const onRefresh = usePageHeaderStore((s) => s.onRefresh);

  const [myInfoOpen, setMyInfoOpen] = useState(false);
  const [language, setLanguage] = useState("en");

  return (
    <div style={siteHeaderStyle}>
      <div style={topBarStyle}>
        <MdiTab />
        <TopUtil
          bellNotification
          chatNotification
          onUserClick={() => setMyInfoOpen((prev) => !prev)}
        />
      </div>
      {title && (
        <div style={pageTitleWrapStyle}>
          <div style={pageTitleInnerStyle}>
            {breadcrumbItems.length > 0 && <Breadcrumb items={breadcrumbItems} />}
            <PageTitle
              title={title}
              favoriteKey={favoriteKey}
              badge={badge}
              idBadge={idBadge}
              actions={actions}
              onBack={onBack}
              showRefresh={showRefresh}
              onRefresh={onRefresh}
            />
          </div>
        </div>
      )}
      <MyInfo
        open={myInfoOpen}
        userInfo={MOCK_USER_INFO}
        roleGroups={MOCK_ROLE_GROUPS}
        lastLogin="2025-11-28 15:24"
        language={language}
        onClose={() => setMyInfoOpen(false)}
        onLanguageChange={setLanguage}
      />
    </div>
  );
}
