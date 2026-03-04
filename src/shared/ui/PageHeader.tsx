import type { CSSProperties } from "react";
import { MdiTab } from "./MdiTab";
import { Breadcrumb } from "./Breadcrumb";
import { PageTitle } from "./PageTitle";
import { usePageHeaderStore } from "@/shared/model/pageHeader.store";

const siteHeaderStyle: CSSProperties = {
  width: "100%",
  fontFamily: "'Pretendard', sans-serif",
  flexShrink: 0,
  zIndex: 10,
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

  return (
    <div style={siteHeaderStyle}>
      <MdiTab />
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
    </div>
  );
}
