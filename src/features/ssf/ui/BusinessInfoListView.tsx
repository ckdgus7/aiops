import { useState, useEffect, useMemo, type CSSProperties } from "react";
import { useNavigate } from "react-router";
import { SelectBox } from "@/shared/ui/SelectBox";
import { Input } from "@/shared/ui/Input";
import { Button } from "@/shared/ui/Button";
import { TiptapEditor } from "@/shared/ui/TiptapEditor";
import { useMdiStore } from "@/shared/model/mdi.store";
import { usePageHeader } from "@/shared/hooks/usePageHeader";
import type { BusinessSortKey, SortDir, BusinessItem } from "@/features/ssf/model/types";
import { BUSINESS_MOCK_DATA, DOMAIN_MOCK_DATA, COMPONENT_MOCK_DATA } from "@/features/ssf/model/mock-data";

const FONT = "'Pretendard', sans-serif";

function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0, cursor: "pointer" }}>
      <path d="M6 7L9 4L12 7" stroke={active && dir === "asc" ? "#7a5af8" : "#a1a1aa"} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 11L9 14L12 11" stroke={active && dir === "desc" ? "#7a5af8" : "#a1a1aa"} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronLeftIcon({ disabled }: { disabled?: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ opacity: disabled ? 0.4 : 1 }}>
      <path d="M12 5L7 10L12 15" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRightIcon({ disabled }: { disabled?: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ opacity: disabled ? 0.4 : 1 }}>
      <path d="M8 5L13 10L8 15" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronDoubleLeftIcon({ disabled }: { disabled?: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ opacity: disabled ? 0.4 : 1 }}>
      <path d="M11 5L6 10L11 15" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 5L10 10L15 15" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronDoubleRightIcon({ disabled }: { disabled?: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ opacity: disabled ? 0.4 : 1 }}>
      <path d="M5 5L10 10L5 15" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 5L14 10L9 15" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 3V13M10 13L6 9M10 13L14 9" stroke="#71717a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 15V16C3 16.5523 3.44772 17 4 17H16C16.5523 17 17 16.5523 17 16V15" stroke="#71717a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckboxIcon({ checked }: { checked: boolean }) {
  if (checked) {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="0.5" y="0.5" width="17" height="17" rx="3.5" fill="#7a5af8" stroke="#7a5af8" />
        <path d="M5 9L8 12L13 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="0.5" y="0.5" width="17" height="17" rx="3.5" fill="white" stroke="#d4d4d8" />
    </svg>
  );
}

const SEARCH_KEY_OPTIONS = [
  { label: "업무(L3)명", value: "업무(L3)명" },
  { label: "업무ID", value: "업무ID" },
  { label: "담당자명", value: "담당자명" },
];

const s = {
  outer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minHeight: "100%",
    fontFamily: FONT,
  } satisfies CSSProperties,
  main: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    padding: 32,
    flex: 1,
  } satisfies CSSProperties,
  filterWrap: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    rowGap: 16,
    padding: "16px 24px",
    backgroundColor: "#f8f9fc",
    borderRadius: 8,
  } satisfies CSSProperties,
  filterLeft: {
    display: "flex",
    alignItems: "center",
    gap: 32,
  } satisfies CSSProperties,
  filterRight: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    width: 554,
  } satisfies CSSProperties,
  searchWrap: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    width: 384,
  } satisfies CSSProperties,
  listWrap: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  } satisfies CSSProperties,
  tableFunction: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  } satisfies CSSProperties,
  tableFuncLeft: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  } satisfies CSSProperties,
  badge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "4px 12px",
    borderRadius: 12,
    border: "1px solid #71717a",
    backgroundColor: "#fafafa",
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "16px",
    color: "#71717a",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  selectAllWrap: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    cursor: "pointer",
    userSelect: "none",
  } satisfies CSSProperties,
  selectAllLabel: {
    fontFamily: FONT,
    fontSize: 12,
    fontWeight: 400,
    lineHeight: "18px",
    color: "#3f3f46",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  listAction: {
    display: "flex",
    alignItems: "center",
    gap: 24,
    paddingBottom: 8,
  } satisfies CSSProperties,
  paginationField: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  } satisfies CSSProperties,
  paginationLabel: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "18px",
    color: "#a1a1aa",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  itemsSelect: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    height: 40,
    padding: "3px 4px",
    border: "1px solid #e4e7ec",
    borderRadius: 4,
    backgroundColor: "white",
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "20px",
    color: "#3f3f46",
    cursor: "pointer",
    boxSizing: "border-box",
    outline: "none",
  } satisfies CSSProperties,
  indicator: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "20px",
    color: "#71717a",
    textAlign: "center",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  paginationWrap: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  } satisfies CSSProperties,
  pageBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    padding: 0,
    borderRadius: 4,
  } satisfies CSSProperties,
  pageBtnActive: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "20px",
    color: "#71717a",
    padding: "0 6px",
    opacity: 1,
  } satisfies CSSProperties,
  pageBtnInactive: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "20px",
    color: "#71717a",
    padding: "0 6px",
    opacity: 0.4,
  } satisfies CSSProperties,
  downloadBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    padding: 0,
    borderRadius: 4,
  } satisfies CSSProperties,
  table: {
    width: "100%",
    borderCollapse: "collapse",
    border: "1px solid #e4e4e7",
    borderRadius: 4,
    overflow: "hidden",
    tableLayout: "fixed",
  } satisfies CSSProperties,
  th: {
    backgroundColor: "#f4f4f5",
    border: "1px solid #e4e4e7",
    padding: 8,
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "20px",
    color: "black",
    textAlign: "center",
    whiteSpace: "nowrap",
    minHeight: 36,
    boxSizing: "border-box",
  } satisfies CSSProperties,
  thInner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    width: "100%",
  } satisfies CSSProperties,
  td: {
    backgroundColor: "white",
    border: "1px solid #e4e4e7",
    padding: 8,
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "20px",
    color: "black",
    textAlign: "center",
    minHeight: 40,
    boxSizing: "border-box",
    verticalAlign: "middle",
  } satisfies CSSProperties,
  tdLeft: {
    textAlign: "left",
  } satisfies CSSProperties,
  useBadge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "4px 12px",
    borderRadius: 12,
    border: "1px solid #7a5af8",
    backgroundColor: "#fafaff",
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "16px",
    color: "#7a5af8",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  unuseBadge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "4px 12px",
    borderRadius: 12,
    border: "1px solid #a1a1aa",
    backgroundColor: "#fafafa",
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "16px",
    color: "#a1a1aa",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  checkboxCell: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  } satisfies CSSProperties,
};

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M6 6L18 18" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18 6L6 18" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function AddIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M6 1V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M1 6H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const ps = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  } satisfies CSSProperties,
  popup: {
    width: 880,
    maxHeight: "90vh",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    boxShadow: "0 4px 24px rgba(0, 0, 0, 0.12)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  } satisfies CSSProperties,
  header: {
    display: "flex",
    flexDirection: "column",
    padding: "32px 32px 16px 32px",
    gap: 12,
    flexShrink: 0,
  } satisfies CSSProperties,
  titleRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  } satisfies CSSProperties,
  titleText: {
    fontFamily: FONT,
    fontSize: 24,
    fontWeight: 700,
    lineHeight: "32px",
    color: "#52525b",
  } satisfies CSSProperties,
  closeBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 32,
    height: 32,
    border: "none",
    background: "transparent",
    cursor: "pointer",
    borderRadius: 4,
    padding: 0,
  } satisfies CSSProperties,
  requiredRow: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  } satisfies CSSProperties,
  requiredMark: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#36bffa",
    flexShrink: 0,
  } satisfies CSSProperties,
  requiredText: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "18px",
    color: "#52525b",
  } satisfies CSSProperties,
  main: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
    padding: "24px 32px",
    overflowY: "auto",
    flex: 1,
  } satisfies CSSProperties,
  fieldRow: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    width: "100%",
  } satisfies CSSProperties,
  labelRow: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  } satisfies CSSProperties,
  label: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "18px",
    color: "#a1a1aa",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  inputWithBtn: {
    display: "flex",
    gap: 10,
    alignItems: "flex-start",
    width: "100%",
  } satisfies CSSProperties,
  disabledInput: {
    fontFamily: FONT,
    fontSize: 16,
    fontWeight: 400,
    lineHeight: "24px",
    color: "#a1a1aa",
    backgroundColor: "#f4f4f5",
    border: "1px solid #e4e7ec",
    borderRadius: 4,
    padding: "8px 16px",
    height: 40,
    width: "100%",
    boxSizing: "border-box",
  } satisfies CSSProperties,
  editorLabel: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "18px",
    color: "#a1a1aa",
    marginBottom: 12,
  } satisfies CSSProperties,
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 32px 32px 32px",
    flexShrink: 0,
  } satisfies CSSProperties,
  footerLeft: {
    display: "flex",
    alignItems: "center",
  } satisfies CSSProperties,
  footerRight: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  } satisfies CSSProperties,
  charCount: {
    fontFamily: FONT,
    fontSize: 12,
    fontWeight: 400,
    lineHeight: "16px",
    color: "#a1a1aa",
    textAlign: "right",
    marginTop: 4,
  } satisfies CSSProperties,
};

interface BusinessCreatePopupProps {
  open: boolean;
  onClose: () => void;
  onSave?: () => void;
}

function BusinessCreatePopup({ open, onClose, onSave }: BusinessCreatePopupProps) {
  const [domainNameKo, setDomainNameKo] = useState("");
  const [componentNameKo, setComponentNameKo] = useState("");
  const [nameKo, setNameKo] = useState("");
  const [designLeader, setDesignLeader] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (open) {
      setDomainNameKo("");
      setComponentNameKo("");
      setNameKo("");
      setDesignLeader("");
      setDescription("");
    }
  }, [open]);

  const domainOptions = useMemo(
    () =>
      DOMAIN_MOCK_DATA.filter((d) => d.useYn === "사용").map((d) => ({
        label: d.nameKo,
        value: d.nameKo,
      })),
    [],
  );

  const componentOptions = useMemo(() => {
    if (!domainNameKo) return [];
    return COMPONENT_MOCK_DATA.filter(
      (c) => c.domainNameKo === domainNameKo && c.useYn === "사용",
    ).map((c) => ({ label: c.nameKo, value: c.nameKo }));
  }, [domainNameKo]);

  const l2PlanLeader = useMemo(() => {
    if (!componentNameKo) return "";
    const comp = COMPONENT_MOCK_DATA.find(
      (c) => c.nameKo === componentNameKo && c.domainNameKo === domainNameKo,
    );
    return comp?.planLeader ?? "";
  }, [componentNameKo, domainNameKo]);

  useEffect(() => {
    if (domainNameKo) {
      const available = COMPONENT_MOCK_DATA.filter(
        (c) => c.domainNameKo === domainNameKo && c.useYn === "사용",
      );
      if (!available.some((c) => c.nameKo === componentNameKo)) {
        setComponentNameKo("");
      }
    } else {
      setComponentNameKo("");
    }
  }, [domainNameKo]);

  if (!open) return null;

  const descPlainLength = description.replace(/<[^>]*>/g, "").length;

  const isValid =
    domainNameKo &&
    componentNameKo &&
    nameKo.trim() &&
    l2PlanLeader &&
    designLeader.trim() &&
    descPlainLength > 0 &&
    descPlainLength <= 3000;

  const handleDescChange = (val: string) => {
    const plainLen = val.replace(/<[^>]*>/g, "").length;
    if (plainLen <= 3000) {
      setDescription(val);
    }
  };

  const handleSave = () => {
    if (!isValid) return;
    onSave?.();
    onClose();
  };

  return (
    <div style={ps.overlay} onClick={onClose}>
      <div style={ps.popup} onClick={(e) => e.stopPropagation()}>
        <div style={ps.header}>
          <div style={ps.titleRow}>
            <span style={ps.titleText}>업무(L3) 신규 등록</span>
            <button style={ps.closeBtn} onClick={onClose} type="button">
              <CloseIcon />
            </button>
          </div>
          <div style={ps.requiredRow}>
            <div style={ps.requiredMark} />
            <span style={ps.requiredText}>표시는 필수로 입력하세요.</span>
          </div>
        </div>

        <div style={ps.main}>
          <div style={ps.fieldRow}>
            <SelectBox
              label="도메인(L1) 명(한글)"
              required
              value={domainNameKo}
              onChange={setDomainNameKo}
              options={domainOptions}
              placeholder="도메인(L1) 명(한글)을 선택하세요."
            />
          </div>

          <div style={ps.fieldRow}>
            <SelectBox
              label="컴포넌트(L2) 명(한글)"
              required
              value={componentNameKo}
              onChange={setComponentNameKo}
              options={componentOptions}
              placeholder="컴포넌트(L2) 명(한글)을 선택하세요."
              disabled={!domainNameKo}
            />
          </div>

          <div style={ps.fieldRow}>
            <Input
              label="업무(L3) 명"
              required
              value={nameKo}
              onChange={(e) => setNameKo(e.target.value)}
              placeholder="업무(L3) 명을 입력하세요."
              maxLength={70}
              indicator={`${nameKo.length}/70`}
            />
          </div>

          <div style={ps.fieldRow}>
            <div style={ps.labelRow}>
              <span style={ps.label}>L2기획리더</span>
              <div style={ps.requiredMark} />
            </div>
            <div style={ps.disabledInput}>
              {l2PlanLeader || "컴포넌트(L2) 선택 시 출력됩니다."}
            </div>
          </div>

          <div style={ps.fieldRow}>
            <div style={ps.labelRow}>
              <span style={ps.label}>L3설계리더</span>
              <div style={ps.requiredMark} />
            </div>
            <div style={ps.inputWithBtn}>
              <Input
                value={designLeader}
                onChange={(e) => setDesignLeader(e.target.value)}
                placeholder="담당자를 선택하거나 검색하세요."
                style={{ flex: 1 }}
              />
              <Button
                size="l"
                variant="outlined"
                color="positive"
                disabled={!designLeader.trim()}
                leadingIcon={<AddIcon />}
              >
                추가
              </Button>
            </div>
          </div>

          <div style={ps.fieldRow}>
            <div style={ps.labelRow}>
              <span style={ps.label}>업무 설명</span>
              <div style={ps.requiredMark} />
            </div>
            <TiptapEditor
              value={description}
              onChange={handleDescChange}
              placeholder="과제 개요를 입력하세요."
              minHeight={300}
            />
            <div style={ps.charCount}>{descPlainLength}/3000</div>
          </div>
        </div>

        <div style={ps.footer}>
          <div style={ps.footerLeft}>
            <Button size="l" variant="outlined" color="info" onClick={onClose}>
              닫기
            </Button>
          </div>
          <div style={ps.footerRight}>
            <Button
              size="l"
              variant="filled"
              color="positive"
              disabled={!isValid}
              onClick={handleSave}
            >
              저장
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

type ColumnDef = { key: BusinessSortKey | "_checkbox"; label: string; width: number | string; align?: "left" | "center"; sortable?: boolean };

const COLUMNS: ColumnDef[] = [
  { key: "_checkbox", label: "", width: 36, align: "center", sortable: false },
  { key: "no", label: "No", width: 46, align: "center" },
  { key: "businessId", label: "업무 ID", width: 140, align: "center" },
  { key: "nameKo", label: "업무명", width: 115, align: "center" },
  { key: "description", label: "업무 설명", width: "auto", align: "left" },
  { key: "domainNameKo", label: "컴포넌트(L2) ID", width: 105, align: "center" },
  { key: "componentNameKo", label: "컴포넌트명", width: 115, align: "center" },
  { key: "planLeader", label: "L2기획리더", width: 90, align: "center" },
  { key: "designLeader", label: "L3설계리더", width: 90, align: "center" },
  { key: "useYn", label: "사용여부", width: 80, align: "center" },
];

export function BusinessInfoListView() {
  const addTab = useMdiStore((st) => st.addTab);
  const navigate = useNavigate();
  useEffect(() => {
    addTab({ id: "/ssf/business", label: "업무(L3)정보 관리", path: "/ssf/business" });
  }, [addTab]);

  const [domainFilter, setDomainFilter] = useState("");
  const [componentFilter, setComponentFilter] = useState("");
  const [searchKey, setSearchKey] = useState("업무(L3)명");
  const [searchKeywordDraft, setSearchKeywordDraft] = useState("");
  const [appliedKeyword, setAppliedKeyword] = useState("");
  const [appliedSearchKey, setAppliedSearchKey] = useState("업무(L3)명");
  const [sortKey, setSortKey] = useState<BusinessSortKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  const domainOptions = useMemo(() => {
    const names = DOMAIN_MOCK_DATA.map((d) => d.nameKo);
    return [{ label: "전체", value: "" }, ...names.map((n) => ({ label: n, value: n }))];
  }, []);

  const componentOptions = useMemo(() => {
    const names = [...new Set(COMPONENT_MOCK_DATA.map((c) => c.nameKo))];
    return [{ label: "전체", value: "" }, ...names.map((n) => ({ label: n, value: n }))];
  }, []);

  const handleSort = (key: BusinessSortKey) => {
    if (sortKey === key) {
      if (sortDir === "asc") setSortDir("desc");
      else if (sortDir === "desc") { setSortKey(null); setSortDir(null); }
      else setSortDir("asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const handleSearch = () => {
    setAppliedKeyword(searchKeywordDraft);
    setAppliedSearchKey(searchKey);
    setPage(1);
  };

  const filtered = BUSINESS_MOCK_DATA.filter((item) => {
    if (domainFilter && item.domainNameKo !== domainFilter) return false;
    if (componentFilter && item.componentNameKo !== componentFilter) return false;
    if (appliedKeyword) {
      const kw = appliedKeyword.toLowerCase();
      if (appliedSearchKey === "업무(L3)명") {
        return item.nameKo.toLowerCase().includes(kw) || item.nameEn.toLowerCase().includes(kw);
      }
      if (appliedSearchKey === "업무ID") {
        return item.businessId.toLowerCase().includes(kw);
      }
      if (appliedSearchKey === "담당자명") {
        return item.planLeader.toLowerCase().includes(kw) || item.designLeader.toLowerCase().includes(kw);
      }
    }
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (!sortKey || !sortDir) return 0;
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    if (typeof aVal === "number" && typeof bVal === "number") {
      return sortDir === "asc" ? aVal - bVal : bVal - aVal;
    }
    return sortDir === "asc"
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal));
  });

  const totalCount = sorted.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / itemsPerPage));
  const safePage = Math.min(page, totalPages);
  const startIdx = (safePage - 1) * itemsPerPage;
  const pageItems = sorted.slice(startIdx, startIdx + itemsPerPage);

  const pageNumbers: (number | string)[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
  } else {
    pageNumbers.push(1, 2, 3, 4, 5, "...", totalPages);
  }

  const handleToggleRow = (no: number) => {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      if (next.has(no)) next.delete(no);
      else next.add(no);
      return next;
    });
  };

  const handleToggleSelectAll = () => {
    if (selectAll) {
      setSelectedRows(new Set());
      setSelectAll(false);
    } else {
      setSelectedRows(new Set(pageItems.map((item) => item.no)));
      setSelectAll(true);
    }
  };

  useEffect(() => {
    const allSelected = pageItems.length > 0 && pageItems.every((item) => selectedRows.has(item.no));
    setSelectAll(allSelected);
  }, [selectedRows, pageItems]);

  usePageHeader({
    breadcrumbItems: [{ label: "SSF관리" }, { label: "업무(L3)정보 관리" }],
    title: "업무(L3)정보 관리",
    favoriteKey: "업무(L3)정보 관리",
  });

  return (
    <div style={s.outer}>
      <div style={s.main}>
        <div style={s.filterWrap}>
          <div style={s.filterLeft}>
            <SelectBox
              value={domainFilter}
              onChange={(v) => { setDomainFilter(v); setPage(1); }}
              options={domainOptions}
              placeholder="도메인(L1)"
              wrapperStyle={{ width: 180 }}
            />
            <SelectBox
              value={componentFilter}
              onChange={(v) => { setComponentFilter(v); setPage(1); }}
              options={componentOptions}
              placeholder="컴포넌트(L2)"
              wrapperStyle={{ width: 180 }}
            />
          </div>
          <div style={s.filterRight}>
            <SelectBox
              value={searchKey}
              onChange={setSearchKey}
              options={SEARCH_KEY_OPTIONS}
              placeholder="검색범위"
              wrapperStyle={{ width: 180, flexShrink: 0 }}
            />
            <div style={s.searchWrap}>
              <Input
                value={searchKeywordDraft}
                onChange={(e) => setSearchKeywordDraft(e.target.value)}
                placeholder="검색어를 입력하세요."
                prefix="search"
                indicator={`${searchKeywordDraft.length}/20`}
                maxLength={20}
                style={{ flex: 1 }}
                onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
              />
              <Button
                size="l"
                variant="outlined"
                color="positive"
                onClick={handleSearch}
              >
                검색
              </Button>
            </div>
          </div>
        </div>

        <div style={s.listWrap}>
          <div style={s.tableFunction}>
            <div style={s.tableFuncLeft}>
              <span style={s.badge}>총 {totalCount}개</span>
              <div style={s.selectAllWrap} onClick={handleToggleSelectAll}>
                <CheckboxIcon checked={selectAll} />
                <span style={s.selectAllLabel}>전체 선택</span>
              </div>
            </div>
            <div style={s.listAction}>
              <div style={s.paginationField}>
                <span style={s.paginationLabel}>Items per page:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => { setItemsPerPage(Number(e.target.value)); setPage(1); }}
                  style={s.itemsSelect}
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>
              <span style={s.indicator}>
                {totalCount === 0 ? "0" : `${startIdx + 1}-${Math.min(startIdx + itemsPerPage, totalCount)}`} of {totalCount}
              </span>
              <div style={s.paginationWrap}>
                <button
                  style={{ ...s.pageBtn, opacity: safePage === 1 ? 0.4 : 1 }}
                  disabled={safePage === 1}
                  onClick={() => setPage(1)}
                >
                  <ChevronDoubleLeftIcon disabled={safePage === 1} />
                </button>
                <button
                  style={{ ...s.pageBtn, opacity: safePage === 1 ? 0.4 : 1 }}
                  disabled={safePage === 1}
                  onClick={() => setPage(Math.max(1, safePage - 1))}
                >
                  <ChevronLeftIcon disabled={safePage === 1} />
                </button>
                {pageNumbers.map((pn, idx) => (
                  <button
                    key={idx}
                    style={{
                      ...s.pageBtn,
                      ...(pn === safePage ? s.pageBtnActive : s.pageBtnInactive),
                    }}
                    disabled={pn === "..."}
                    onClick={() => { if (typeof pn === "number") setPage(pn); }}
                  >
                    {pn}
                  </button>
                ))}
                <button
                  style={{ ...s.pageBtn, opacity: safePage === totalPages ? 0.4 : 1 }}
                  disabled={safePage === totalPages}
                  onClick={() => setPage(Math.min(totalPages, safePage + 1))}
                >
                  <ChevronRightIcon disabled={safePage === totalPages} />
                </button>
                <button
                  style={{ ...s.pageBtn, opacity: safePage === totalPages ? 0.4 : 1 }}
                  disabled={safePage === totalPages}
                  onClick={() => setPage(totalPages)}
                >
                  <ChevronDoubleRightIcon disabled={safePage === totalPages} />
                </button>
              </div>
              <button style={s.downloadBtn} title="다운로드">
                <DownloadIcon />
              </button>
              <Button
                size="m"
                variant="filled"
                color="positive"
                onClick={() => setCreateOpen(true)}
              >
                등록
              </Button>
            </div>
          </div>

          <table style={s.table}>
            <colgroup>
              {COLUMNS.map((col, idx) => (
                <col
                  key={idx}
                  style={{ width: typeof col.width === "number" ? col.width : undefined }}
                />
              ))}
            </colgroup>
            <thead>
              <tr>
                {COLUMNS.map((col, idx) => {
                  if (col.key === "_checkbox") {
                    return (
                      <th key="checkbox" style={s.th}>
                        <div style={s.thInner}>
                          <div style={s.checkboxCell} onClick={handleToggleSelectAll}>
                            <CheckboxIcon checked={selectAll} />
                          </div>
                        </div>
                      </th>
                    );
                  }
                  const sortable = col.sortable !== false;
                  return (
                    <th
                      key={idx}
                      style={s.th}
                      onClick={() => sortable && handleSort(col.key as BusinessSortKey)}
                    >
                      <div style={s.thInner}>
                        <span>{col.label}</span>
                        {sortable && (
                          <SortIcon active={sortKey === col.key} dir={sortKey === col.key ? sortDir : null} />
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {pageItems.length === 0 ? (
                <tr>
                  <td colSpan={COLUMNS.length} style={{ ...s.td, padding: 40, color: "#a1a1aa" }}>
                    데이터가 없습니다.
                  </td>
                </tr>
              ) : (
                pageItems.map((item) => (
                  <tr
                    key={item.no}
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/ssf/business/${item.businessId}`)}
                  >
                    <td style={s.td}>
                      <div
                        style={s.checkboxCell}
                        onClick={(e) => { e.stopPropagation(); handleToggleRow(item.no); }}
                      >
                        <CheckboxIcon checked={selectedRows.has(item.no)} />
                      </div>
                    </td>
                    <td style={s.td}>{item.no}</td>
                    <td style={s.td}>{item.businessId}</td>
                    <td style={s.td}>{item.nameKo}</td>
                    <td style={{ ...s.td, ...s.tdLeft }}>{item.description}</td>
                    <td style={s.td}>{item.domainNameKo}</td>
                    <td style={s.td}>{item.componentNameKo}</td>
                    <td style={s.td}>{item.planLeader}</td>
                    <td style={s.td}>{item.designLeader}</td>
                    <td style={s.td}>
                      <span style={item.useYn === "사용" ? s.useBadge : s.unuseBadge}>
                        {item.useYn}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <BusinessCreatePopup
        open={createOpen}
        onClose={() => setCreateOpen(false)}
      />
    </div>
  );
}
