import { useState, useEffect, useRef, useCallback, useMemo, type CSSProperties } from "react";
import { SelectBox } from "@/shared/ui/global/SelectBox";
import { Input } from "@/shared/ui/global/Input";
import { Button } from "@/shared/ui/global/Button";
import { RadioGroup } from "@/shared/ui/global/RadioGroup";
import { ToastEditor } from "@/shared/ui/service/ToastEditor";
import { AlertModal } from "@/shared/ui/global/AlertModal";
import { Snackbar } from "@/shared/ui/global/Snackbar";
import { useComponentListQuery } from "@/features/ssf/api/component.queries";
import type { BusinessItem } from "@/features/ssf/model/types";
import { FONT } from "@/shared/ui/styles";

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

function L3RoleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect width="16" height="16" rx="4" fill="#7a5af8" />
      <text x="8" y="12" textAnchor="middle" fill="white" fontSize="9" fontWeight="700" fontFamily="Pretendard">L3</text>
    </svg>
  );
}

function DeleteIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M4.5 9H13.5" stroke="#f04438" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

interface LeaderItem {
  name: string;
  org: string;
}

interface SuggestItem {
  name: string;
  org: string;
  id: string;
}

const MOCK_SUGGESTIONS: SuggestItem[] = [
  { name: "김선경", org: "Nova 추진팀", id: "P12345678" },
  { name: "김영수", org: "AI플랫폼팀", id: "P12345679" },
  { name: "김지현", org: "DevOps팀", id: "P12345680" },
  { name: "이택규", org: "Nova 추진팀", id: "P12345681" },
  { name: "이상민", org: "클라우드팀", id: "P12345682" },
  { name: "박관리", org: "Nova 추진팀", id: "P12345683" },
  { name: "조우찬", org: "Nova 추진팀", id: "P12345684" },
  { name: "최설계", org: "DevOps팀", id: "P12345685" },
  { name: "홍길동", org: "AI플랫폼팀", id: "P12345686" },
  { name: "전상세", org: "Nova 추진팀", id: "P12345687" },
];

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
    position: "relative",
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
  dropdown: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    marginTop: 4,
    backgroundColor: "#ffffff",
    border: "1px solid #e4e4e7",
    borderRadius: 8,
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
    zIndex: 10,
    maxHeight: 240,
    overflowY: "auto",
  } satisfies CSSProperties,
  dropdownItem: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "10px 16px",
    cursor: "pointer",
    borderBottom: "1px solid #f4f4f5",
  } satisfies CSSProperties,
  dropdownItemHover: {
    backgroundColor: "#f4f3ff",
  } satisfies CSSProperties,
  dropdownName: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "20px",
    color: "#3f3f46",
  } satisfies CSSProperties,
  dropdownOrg: {
    fontFamily: FONT,
    fontSize: 12,
    fontWeight: 400,
    lineHeight: "18px",
    color: "#a1a1aa",
  } satisfies CSSProperties,
  dropdownId: {
    fontFamily: FONT,
    fontSize: 12,
    fontWeight: 400,
    lineHeight: "18px",
    color: "#a1a1aa",
    marginLeft: "auto",
  } satisfies CSSProperties,
  dropdownEmpty: {
    padding: "16px",
    textAlign: "center",
    fontFamily: FONT,
    fontSize: 13,
    color: "#a1a1aa",
  } satisfies CSSProperties,
  leaderList: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    width: "100%",
  } satisfies CSSProperties,
  leaderItem: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    minHeight: 40,
    padding: "8px 12px 8px 8px",
    border: "1px solid #e4e4e7",
    borderRadius: 4,
    backgroundColor: "#ffffff",
    boxSizing: "border-box",
    width: "100%",
  } satisfies CSSProperties,
  leaderItemContent: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    gap: 4,
    minWidth: 0,
  } satisfies CSSProperties,
  leaderName: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "20px",
    color: "#3f3f46",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  leaderOrg: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    opacity: 0.3,
  } satisfies CSSProperties,
  leaderOrgSep: {
    width: 1,
    height: 10,
    backgroundColor: "black",
  } satisfies CSSProperties,
  leaderOrgText: {
    fontFamily: FONT,
    fontSize: 12,
    fontWeight: 400,
    lineHeight: "18px",
    color: "black",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  deleteBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
    border: "1px solid #f04438",
    borderRadius: 4,
    backgroundColor: "#ffffff",
    cursor: "pointer",
    flexShrink: 0,
  } satisfies CSSProperties,
};

const USE_YN_OPTIONS = [
  { label: "사용", value: "사용" },
  { label: "미사용", value: "미사용" },
];

function LeaderListItemRow({ leader, onDelete }: { leader: LeaderItem; onDelete: () => void }) {
  return (
    <div style={ps.leaderItem}>
      <div style={ps.leaderItemContent}>
        <span style={ps.leaderName}>{leader.name}</span>
        <L3RoleIcon />
        <div style={ps.leaderOrg}>
          <div style={ps.leaderOrgSep} />
          <span style={ps.leaderOrgText}>{leader.org}</span>
        </div>
      </div>
      <button style={ps.deleteBtn} type="button" onClick={onDelete}>
        <DeleteIcon />
      </button>
    </div>
  );
}

function LeaderAutocompleteDropdown({
  suggestions,
  onSelect,
  hoveredIndex,
  setHoveredIndex,
}: {
  suggestions: SuggestItem[];
  onSelect: (item: SuggestItem) => void;
  hoveredIndex: number;
  setHoveredIndex: (i: number) => void;
}) {
  if (suggestions.length === 0) {
    return (
      <div style={ps.dropdown}>
        <div style={ps.dropdownEmpty}>검색 결과가 없습니다.</div>
      </div>
    );
  }
  return (
    <div style={ps.dropdown}>
      {suggestions.map((item, idx) => (
        <div
          key={item.id}
          style={idx === hoveredIndex ? { ...ps.dropdownItem, ...ps.dropdownItemHover } : ps.dropdownItem}
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(-1)}
          onClick={() => onSelect(item)}
        >
          <span style={ps.dropdownName}>{item.name}</span>
          <span style={ps.dropdownOrg}>{item.org}</span>
          <span style={ps.dropdownId}>{item.id}</span>
        </div>
      ))}
    </div>
  );
}

interface BusinessEditPopupProps {
  open: boolean;
  onClose: () => void;
  onSave?: () => void;
  item: BusinessItem | null;
}

export function BusinessEditPopup({ open, onClose, onSave, item }: BusinessEditPopupProps) {
  const { data: componentListData = [] } = useComponentListQuery();
  const [domainNameKo, setDomainNameKo] = useState("");
  const [componentNameKo, setComponentNameKo] = useState("");
  const [nameKo, setNameKo] = useState("");
  const [designLeaderInput, setDesignLeaderInput] = useState("");
  const [designLeaders, setDesignLeaders] = useState<LeaderItem[]>([]);
  const [description, setDescription] = useState("");
  const [useYn, setUseYn] = useState("사용");
  const [closeAlertOpen, setCloseAlertOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [showDesignSuggestions, setShowDesignSuggestions] = useState(false);
  const [designSuggestions, setDesignSuggestions] = useState<SuggestItem[]>([]);
  const [designHoveredIndex, setDesignHoveredIndex] = useState(-1);
  const designTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const designInputWrapRef = useRef<HTMLDivElement>(null);

  const filterDesignSuggestions = useCallback((query: string): SuggestItem[] => {
    if (!query.trim()) return [];
    const q = query.trim().toLowerCase();
    return MOCK_SUGGESTIONS.filter(
      (item) =>
        item.name.toLowerCase().includes(q) &&
        !designLeaders.some((l) => l.name === item.name && l.org === item.org)
    );
  }, [designLeaders]);

  const handleDesignLeaderInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setDesignLeaderInput(val);
    if (designTimerRef.current) clearTimeout(designTimerRef.current);
    if (!val.trim()) {
      setShowDesignSuggestions(false);
      setDesignSuggestions([]);
      return;
    }
    designTimerRef.current = setTimeout(() => {
      setDesignSuggestions(filterDesignSuggestions(val));
      setShowDesignSuggestions(true);
      setDesignHoveredIndex(-1);
    }, 1000);
  };

  const handleDesignSuggestSelect = (item: SuggestItem) => {
    if (designTimerRef.current) { clearTimeout(designTimerRef.current); designTimerRef.current = null; }
    setDesignLeaders((prev) => [...prev, { name: item.name, org: item.org }]);
    setDesignLeaderInput("");
    setShowDesignSuggestions(false);
    setDesignSuggestions([]);
    setDesignHoveredIndex(-1);
  };

  const handleAddDesignLeader = () => {
    if (!designLeaderInput.trim()) return;
    if (designTimerRef.current) { clearTimeout(designTimerRef.current); designTimerRef.current = null; }
    setDesignLeaders((prev) => [...prev, { name: designLeaderInput.trim(), org: "Nova 추진팀" }]);
    setDesignLeaderInput("");
    setShowDesignSuggestions(false);
    setDesignSuggestions([]);
    setDesignHoveredIndex(-1);
  };

  useEffect(() => {
    if (!showDesignSuggestions) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (designInputWrapRef.current && !designInputWrapRef.current.contains(e.target as Node)) {
        if (designTimerRef.current) { clearTimeout(designTimerRef.current); designTimerRef.current = null; }
        setShowDesignSuggestions(false);
        setDesignHoveredIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDesignSuggestions]);

  useEffect(() => {
    if (open && item) {
      setDomainNameKo(item.domainNameKo);
      setComponentNameKo(item.componentNameKo);
      setNameKo(item.nameKo);
      setDesignLeaderInput("");
      setDesignLeaders([{ name: item.designLeader, org: "Nova 추진팀" }]);
      setDescription(item.description || "");
      setUseYn(item.useYn);
      setShowDesignSuggestions(false);
      setDesignSuggestions([]);
      setDesignHoveredIndex(-1);
    }
    return () => {
      if (designTimerRef.current) clearTimeout(designTimerRef.current);
    };
  }, [open, item]);

  const domainOptions = useMemo(() => [
    { label: "마케팅 & 오퍼링", value: "마케팅 & 오퍼링" },
    { label: "CRM", value: "CRM" },
    { label: "파티", value: "파티" },
    { label: "파트너", value: "파트너" },
    { label: "엔터프라이즈 상품 카탈로그", value: "엔터프라이즈 상품 카탈로그" },
    { label: "상품 주문", value: "상품 주문" },
    { label: "서비스 주문", value: "서비스 주문" },
    { label: "리소스 주문 & 풀필먼트", value: "리소스 주문 & 풀필먼트" },
    { label: "통합 과금", value: "통합 과금" },
    { label: "빌링", value: "빌링" },
    { label: "AI & 데이터", value: "AI & 데이터" },
    { label: "공통 비즈니스 서비스", value: "공통 비즈니스 서비스" },
    { label: "엔터프라이즈 통합", value: "엔터프라이즈 통합" },
  ], []);

  const componentOptions = useMemo(() => {
    const names = [...new Set(componentListData.map((c) => c.nameKo))];
    return names.map((n) => ({ label: n, value: n }));
  }, [componentListData]);

  const l2PlanLeader = useMemo(() => {
    if (!componentNameKo) return "";
    const comp = componentListData.find(
      (c) => c.nameKo === componentNameKo,
    );
    return comp?.planLeader ?? "";
  }, [componentNameKo, componentListData]);

  if (!open || !item) return null;

  const descPlainLength = description.replace(/<[^>]*>/g, "").length;

  const isValid =
    domainNameKo &&
    componentNameKo &&
    nameKo.trim() &&
    l2PlanLeader &&
    designLeaders.length > 0 &&
    descPlainLength > 0 &&
    descPlainLength <= 3000;


  const handleSave = () => {
    if (!isValid) return;
    onSave?.();
    setSnackbarOpen(true);
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div style={ps.overlay} onClick={() => setCloseAlertOpen(true)}>
      <div style={ps.popup} onClick={(e) => e.stopPropagation()}>
        <div style={ps.header}>
          <div style={ps.titleRow}>
            <span style={ps.titleText}>업무(L3) 수정</span>
            <button style={ps.closeBtn} onClick={() => setCloseAlertOpen(true)} type="button">
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
              label="도메인(한글) 명"
              required
              value={domainNameKo}
              onChange={setDomainNameKo}
              options={domainOptions}
              placeholder="도메인(L1) 명(한글)을 선택하세요."
              disabled
            />
          </div>

          <div style={ps.fieldRow}>
            <SelectBox
              label="컴포넌트(한글) 명"
              required
              value={componentNameKo}
              onChange={setComponentNameKo}
              options={componentOptions}
              placeholder="컴포넌트(L2) 명(한글)을 선택하세요."
              disabled
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
            <div style={ps.inputWithBtn} ref={designInputWrapRef}>
              <Input
                value={designLeaderInput}
                onChange={handleDesignLeaderInputChange}
                placeholder="담당자를 선택하거나 검색하세요."
                style={{ flex: 1 }}
              />
              <Button
                size="l"
                variant="outlined"
                color="positive"
                disabled={!designLeaderInput.trim()}
                leadingIcon={<AddIcon />}
                onClick={handleAddDesignLeader}
              >
                추가
              </Button>
              {showDesignSuggestions && (
                <LeaderAutocompleteDropdown
                  suggestions={designSuggestions}
                  onSelect={handleDesignSuggestSelect}
                  hoveredIndex={designHoveredIndex}
                  setHoveredIndex={setDesignHoveredIndex}
                />
              )}
            </div>
            {designLeaders.length > 0 && (
              <div style={ps.leaderList}>
                {designLeaders.map((leader, idx) => (
                  <LeaderListItemRow
                    key={`design-${leader.name}-${idx}`}
                    leader={leader}
                    onDelete={() => setDesignLeaders((prev) => prev.filter((_, i) => i !== idx))}
                  />
                ))}
              </div>
            )}
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
              <span style={ps.label}>업무 설명</span>
              <div style={ps.requiredMark} />
            </div>
            <ToastEditor
              value={description}
              onChange={setDescription}
              placeholder="과제 개요를 입력하세요."
              minHeight={300}
              maxLength={3000}
            />
            <div style={ps.charCount}>{descPlainLength}/3000</div>
          </div>

          <div style={ps.fieldRow}>
            <div style={ps.labelRow}>
              <span style={ps.label}>사용여부</span>
            </div>
            <RadioGroup
              options={USE_YN_OPTIONS}
              value={useYn}
              onChange={setUseYn}
            />
          </div>
        </div>

        <div style={ps.footer}>
          <div style={ps.footerLeft}>
            <Button size="l" variant="outlined" color="info" onClick={() => setCloseAlertOpen(true)}>
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
      <Snackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        type="success"
        message="저장 되었습니다."
      />
      <AlertModal
        open={closeAlertOpen}
        onClose={() => setCloseAlertOpen(false)}
        type="warning"
        message="입력값을 초기화 하고 창을 닫습니다."
        showCancel
        cancelLabel="취소"
        confirmLabel="확인"
        onCancel={() => setCloseAlertOpen(false)}
        onConfirm={() => {
          setCloseAlertOpen(false);
          onClose();
        }}
      />
    </div>
  );
}
