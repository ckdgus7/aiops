import { useState, useEffect, type CSSProperties } from "react";
import { Button } from "@/shared/ui/global/Button";
import { Snackbar } from "@/shared/ui/global/Snackbar";
import { ComponentDeletePopup } from "@/features/ssf/ui/l2/ComponentDeletePopup";
import { ComponentEditPopup } from "@/features/ssf/ui/l2/ComponentEditPopup";
import { ComponentDetail } from "@/features/ssf/ui/l2/component/ComponentDetail";
import type { ComponentDetailData } from "@/features/ssf/ui/l2/component/ComponentDetail";
import type { ComponentItem } from "@/features/ssf/model/types";
import { useDomainListQuery } from "@/features/ssf/api/domain.queries";
import { popupStyles } from "@/shared/ui/styles";

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M6 6L18 18" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18 6L6 18" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const MOCK_L3_ITEMS = [
  { id: "BZ-PTYTMFC028-0022", name: "대리점정보관리", hasBpd: true },
  { id: "BZ-PTYTMFC028-0021", name: "파트너사정보관리", hasBpd: true },
  { id: "BZ-PTYTMFC028-0020", name: "제휴서비스관리", hasBpd: false },
  { id: "BZ-PTYTMFC028-0019", name: "마케팅분석관리", hasBpd: true },
  { id: "BZ-PTYTMFC028-0018", name: "고객세분화관리", hasBpd: false },
  { id: "BZ-PTYTMFC028-0017", name: "파트너계약관리", hasBpd: true },
  { id: "BZ-PTYTMFC028-0016", name: "대리점계약관리", hasBpd: false },
  { id: "BZ-PTYTMFC028-0015", name: "거래처정보관리", hasBpd: true },
  { id: "BZ-PTYTMFC028-0014", name: "협력업체관리", hasBpd: false },
  { id: "BZ-PTYTMFC028-0013", name: "위탁판매관리", hasBpd: true },
  { id: "BZ-PTYTMFC028-0012", name: "직영점관리", hasBpd: false },
  { id: "BZ-PTYTMFC028-0011", name: "온라인채널관리", hasBpd: true },
  { id: "BZ-PTYTMFC028-0010", name: "오프라인채널관리", hasBpd: false },
  { id: "BZ-PTYTMFC028-0009", name: "채널통합관리", hasBpd: true },
  { id: "BZ-PTYTMFC028-0008", name: "파트너수수료관리", hasBpd: true },
  { id: "BZ-PTYTMFC028-0007", name: "대리점수수료관리", hasBpd: false },
  { id: "BZ-PTYTMFC028-0006", name: "인센티브관리", hasBpd: true },
  { id: "BZ-PTYTMFC028-0005", name: "파트너교육관리", hasBpd: false },
  { id: "BZ-PTYTMFC028-0004", name: "자격인증관리", hasBpd: true },
  { id: "BZ-PTYTMFC028-0003", name: "실적평가관리", hasBpd: true },
];

const MOCK_HISTORY = [
  { name: "전상세", date: "2025-11-28 15:24", active: true },
  { name: "전상세", date: "2025-11-28 15:24", active: false },
  { name: "원본", date: "2025-11-28 15:24", active: false },
];

const st = {
  overlay: {
    ...popupStyles.overlay,
    zIndex: 1000,
  } satisfies CSSProperties,
  popup: {
    ...popupStyles.popup,
    boxShadow: "0 4px 24px rgba(0, 0, 0, 0.12)",
    fontFamily: undefined,
  } satisfies CSSProperties,
  header: {
    display: "flex",
    flexDirection: "column",
    padding: "32px 32px 16px 32px",
    flexShrink: 0,
  } satisfies CSSProperties,
  titleRow: {
    ...popupStyles.titleRow,
    marginBottom: undefined,
    width: "100%",
    gap: 10,
  } satisfies CSSProperties,
  titleText: {
    ...popupStyles.titleText,
    color: "#52525b",
    flex: 1,
  } satisfies CSSProperties,
  closeBtn: popupStyles.closeBtn,
  main: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
    padding: "24px 32px",
    overflowY: "auto",
    flex: 1,
  } satisfies CSSProperties,
  footer: {
    ...popupStyles.footer,
    padding: "16px 32px 32px 32px",
    borderTop: undefined,
  } satisfies CSSProperties,
  footerLeft: {
    display: "flex",
    alignItems: "center",
  } satisfies CSSProperties,
  footerRight: popupStyles.footerRight,
};

interface ComponentDetailPopupProps {
  open: boolean;
  onClose: () => void;
  item: ComponentItem | null;
  onDeleted?: () => void;
}

export function ComponentDetailPopup({ open, onClose, item, onDeleted }: ComponentDetailPopupProps) {
  const { data: domainList = [] } = useDomainListQuery();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editSaveSnackbarOpen, setEditSaveSnackbarOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      setEditOpen(false);
      setDeleteOpen(false);
    }
  }, [open]);

  if (!open || !item) return (
    <Snackbar
      open={editSaveSnackbarOpen}
      onClose={() => setEditSaveSnackbarOpen(false)}
      type="success"
      message="저장 되었습니다."
    />
  );

  const domain = domainList.find(
    (d) => d.nameKo === item.domainNameKo
  ) ?? domainList.find(
    (d) => item.domainNameKo.includes(d.nameKo) || d.nameKo.includes(item.domainNameKo)
  );

  const detailData: ComponentDetailData = {
    componentId: item.componentId,
    nameKo: item.nameKo,
    nameEn: item.nameEn,
    planLeader: item.planLeader,
    designLeader: item.designLeader,
    description: item.description,
    useYn: item.useYn,
    domain: domain ?? {
      no: 0,
      abbr: "-",
      nameKo: item.domainNameKo,
      nameEn: "-",
      description: "-",
      useYn: "-",
    },
    history: MOCK_HISTORY,
    l3Items: MOCK_L3_ITEMS,
  };

  return (
    <>
      <div style={st.overlay} onClick={onClose}>
        <div style={st.popup} onClick={(e) => e.stopPropagation()}>
          <div style={st.header}>
            <div style={st.titleRow}>
              <span style={st.titleText}>컴포넌트(L2) 조회</span>
              <button style={st.closeBtn} onClick={onClose} type="button">
                <CloseIcon />
              </button>
            </div>
          </div>

          <div style={st.main}>
            <ComponentDetail data={detailData} showUseYn showDomainBox />
          </div>

          <div style={st.footer}>
            <div style={st.footerLeft}>
              <Button size="l" variant="outlined" color="info" onClick={onClose}>
                닫기
              </Button>
            </div>
            <div style={st.footerRight}>
              <Button size="l" variant="filled" color="negative" onClick={() => setDeleteOpen(true)}>
                삭제
              </Button>
              <Button size="l" variant="filled" color="positive" onClick={() => setEditOpen(true)}>
                수정
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ComponentEditPopup
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onDetailClose={onClose}
        onSaveSuccess={() => setEditSaveSnackbarOpen(true)}
        item={item}
      />

      <ComponentDeletePopup
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirmDelete={() => {
          setDeleteOpen(false);
          onClose();
          onDeleted?.();
        }}
      />

      <Snackbar
        open={editSaveSnackbarOpen}
        onClose={() => setEditSaveSnackbarOpen(false)}
        type="success"
        message="저장 되었습니다."
      />
    </>
  );
}
