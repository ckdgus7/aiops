import { useState, useEffect, type CSSProperties } from "react";
import { useParams } from "react-router";
import { useMdiStore } from "@/shared/model/mdi.store";
import { usePageHeader } from "@/shared/hooks/usePageHeader";
import {
  BUSINESS_MOCK_DATA,
  COMPONENT_MOCK_DATA,
  DOMAIN_MOCK_DATA,
} from "@/features/ssf/model/mock-data";
import { Button } from "@/shared/ui/global/Button";
import { BusinessEditPopup } from "@/features/ssf/ui/l3/BusinessEditPopup";
import { BusinessReference } from "@/features/ssf/ui/component/BusinessReference";
import { HistoryPanel } from "@/features/ssf/ui/component/HistoryPanel";
import { BpmnManagement } from "@/features/ssf/ui/component/BpmnManagement";
import { RelatedInfo } from "@/features/ssf/ui/component/RelatedInfo";
import { FONT } from "@/shared/ui/styles";

function NoDataIcon() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <circle cx="26" cy="22" r="10" stroke="#d4d4d8" strokeWidth="1.5" />
      <path
        d="M20 36C20 32.6863 22.6863 30 26 30C29.3137 30 32 32.6863 32 36"
        stroke="#d4d4d8"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="34"
        y1="18"
        x2="38"
        y2="14"
        stroke="#d4d4d8"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function NoDataArea() {
  return (
    <div style={s.noData}>
      <NoDataIcon />
      <span style={s.noDataText}>등록된 정보가 없습니다.</span>
    </div>
  );
}

export function BusinessDetailView() {
  const { id } = useParams<{ id: string }>();
  const addTab = useMdiStore((st) => st.addTab);
  const [historyOpen, setHistoryOpen] = useState(true);
  const [editOpen, setEditOpen] = useState(false);

  const item = BUSINESS_MOCK_DATA.find((b) => b.businessId === id);

  useEffect(() => {
    addTab({
      id: `/ssf/business/${id}`,
      label: "업무(L3)정보 상세",
      path: `/ssf/business/${id}`,
    });
  }, [id, addTab]);

  usePageHeader({
    breadcrumbItems: [
      { label: "SSF관리" },
      { label: "업무(L3)정보 관리" },
      { label: "업무(L3)정보 상세" },
    ],
    title: "업무(L3)정보 상세",
    actions: (
      <div style={{ display: "flex", gap: 8 }}>
        <Button size="m" variant="outlined" color="negative" onClick={() => {}}>
          삭제
        </Button>
        <Button size="m" variant="filled" color="positive" onClick={() => setEditOpen(true)}>
          수정
        </Button>
      </div>
    ),
  });

  if (!item) {
    return (
      <div style={s.outer}>
        <NoDataArea />
      </div>
    );
  }

  const comp = COMPONENT_MOCK_DATA.find(
    (c) =>
      c.nameKo === item.componentNameKo && c.domainNameKo === item.domainNameKo,
  );

  const domain = DOMAIN_MOCK_DATA.find((d) => d.nameKo === item.domainNameKo);

  return (
    <div style={s.outer}>
      <div style={s.row}>
        <div style={s.leftCol}>
          <div style={s.historyWrap}>
            <BusinessReference
              item={item}
              domain={domain}
              comp={comp}
              onHistoryToggle={() => setHistoryOpen(!historyOpen)}
            />
            {historyOpen && <HistoryPanel />}
          </div>
          <BpmnManagement />
        </div>
        <RelatedInfo />
      </div>
      <BusinessEditPopup
        open={editOpen}
        onClose={() => setEditOpen(false)}
        item={item}
      />
    </div>
  );
}

const s = {
  outer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    overflow: "auto",
  } satisfies CSSProperties,
  row: {
    display: "flex",
    width: "100%",
    minHeight: "100%",
  } satisfies CSSProperties,
  leftCol: {
    width: "62%",
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
  } satisfies CSSProperties,
  historyWrap: {
    display: "flex",
    flexDirection: "row",
  } satisfies CSSProperties,
  noData: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 24,
    backgroundColor: "#fafafa",
    borderRadius: 4,
    minHeight: 160,
  } satisfies CSSProperties,
  noDataText: {
    fontFamily: FONT,
    fontSize: 16,
    fontWeight: 400,
    lineHeight: "24px",
    color: "#71717a",
    textAlign: "center",
  } satisfies CSSProperties,
};
