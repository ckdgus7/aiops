import { useState, useEffect, useRef, useCallback, type CSSProperties } from "react";
import { Button } from "@/shared/ui/global/Button";
import { Input } from "@/shared/ui/global/Input";
import { SelectBox } from "@/shared/ui/global/SelectBox";
import { RadioGroup } from "@/shared/ui/global/RadioGroup";
import { ToastEditor } from "@/shared/ui/service/ToastEditor";
import { AlertModal } from "@/shared/ui/global/AlertModal";
import { Snackbar } from "@/shared/ui/global/Snackbar";
import { FONT, popupStyles } from "@/shared/ui/styles";

interface ComponentCreatePopupProps {
  open: boolean;
  onClose: () => void;
  onSave?: (data: ComponentFormData) => void;
}

export interface ComponentFormData {
  domainNameKo: string;
  nameKo: string;
  nameEn: string;
  planLeader: string;
  designLeader: string;
  description: string;
  useYn: string;
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

function L2RoleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect width="16" height="16" rx="4" fill="#7a5af8" />
      <text x="8" y="12" textAnchor="middle" fill="white" fontSize="9" fontWeight="700" fontFamily="Pretendard">L2</text>
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

const s = {
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
    gap: 12,
    flexShrink: 0,
  } satisfies CSSProperties,
  titleRow: {
    ...popupStyles.titleRow,
    marginBottom: undefined,
    width: "100%",
  } satisfies CSSProperties,
  titleText: {
    ...popupStyles.titleText,
    color: "#52525b",
  } satisfies CSSProperties,
  closeBtn: popupStyles.closeBtn,
  requiredRow: {
    ...popupStyles.requiredRow,
    gap: 4,
  } satisfies CSSProperties,
  requiredMark: {
    ...popupStyles.requiredDot,
    borderRadius: 3,
  } satisfies CSSProperties,
  requiredText: {
    ...popupStyles.requiredText,
    fontSize: 14,
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
  labelRow: popupStyles.fieldLabel,
  label: {
    ...popupStyles.labelText,
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
  editorLabel: {
    ...popupStyles.labelText,
    color: "#a1a1aa",
    marginBottom: 12,
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

const DOMAIN_OPTIONS = [
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
];

const USE_YN_OPTIONS = [
  { label: "사용", value: "사용" },
  { label: "미사용", value: "미사용" },
];

function LeaderListItemRow({ leader, onDelete }: { leader: LeaderItem; onDelete: () => void }) {
  return (
    <div style={s.leaderItem}>
      <div style={s.leaderItemContent}>
        <span style={s.leaderName}>{leader.name}</span>
        <L2RoleIcon />
        <div style={s.leaderOrg}>
          <div style={s.leaderOrgSep} />
          <span style={s.leaderOrgText}>{leader.org}</span>
        </div>
      </div>
      <button style={s.deleteBtn} type="button" onClick={onDelete}>
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
      <div style={s.dropdown}>
        <div style={s.dropdownEmpty}>검색 결과가 없습니다.</div>
      </div>
    );
  }
  return (
    <div style={s.dropdown}>
      {suggestions.map((item, idx) => (
        <div
          key={item.id}
          style={idx === hoveredIndex ? { ...s.dropdownItem, ...s.dropdownItemHover } : s.dropdownItem}
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(-1)}
          onClick={() => onSelect(item)}
        >
          <span style={s.dropdownName}>{item.name}</span>
          <span style={s.dropdownOrg}>{item.org}</span>
          <span style={s.dropdownId}>{item.id}</span>
        </div>
      ))}
    </div>
  );
}

export function ComponentCreatePopup({ open, onClose, onSave }: ComponentCreatePopupProps) {
  const [domainNameKo, setDomainNameKo] = useState("");
  const [nameKo, setNameKo] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [planLeaderInput, setPlanLeaderInput] = useState("");
  const [designLeaderInput, setDesignLeaderInput] = useState("");
  const [planLeaders, setPlanLeaders] = useState<LeaderItem[]>([]);
  const [designLeaders, setDesignLeaders] = useState<LeaderItem[]>([]);
  const [description, setDescription] = useState("");
  const [useYn, setUseYn] = useState("사용");
  const [closeAlertOpen, setCloseAlertOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [showPlanSuggestions, setShowPlanSuggestions] = useState(false);
  const [planSuggestions, setPlanSuggestions] = useState<SuggestItem[]>([]);
  const [planHoveredIndex, setPlanHoveredIndex] = useState(-1);
  const planTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const planInputWrapRef = useRef<HTMLDivElement>(null);

  const [showDesignSuggestions, setShowDesignSuggestions] = useState(false);
  const [designSuggestions, setDesignSuggestions] = useState<SuggestItem[]>([]);
  const [designHoveredIndex, setDesignHoveredIndex] = useState(-1);
  const designTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const designInputWrapRef = useRef<HTMLDivElement>(null);

  const filterPlanSuggestions = useCallback((query: string): SuggestItem[] => {
    if (!query.trim()) return [];
    const q = query.trim().toLowerCase();
    return MOCK_SUGGESTIONS.filter(
      (item) =>
        item.name.toLowerCase().includes(q) &&
        !planLeaders.some((l) => l.name === item.name && l.org === item.org)
    );
  }, [planLeaders]);

  const filterDesignSuggestions = useCallback((query: string): SuggestItem[] => {
    if (!query.trim()) return [];
    const q = query.trim().toLowerCase();
    return MOCK_SUGGESTIONS.filter(
      (item) =>
        item.name.toLowerCase().includes(q) &&
        !designLeaders.some((l) => l.name === item.name && l.org === item.org)
    );
  }, [designLeaders]);

  const handlePlanLeaderInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPlanLeaderInput(val);

    if (planTimerRef.current) {
      clearTimeout(planTimerRef.current);
    }

    if (!val.trim()) {
      setShowPlanSuggestions(false);
      setPlanSuggestions([]);
      return;
    }

    planTimerRef.current = setTimeout(() => {
      const filtered = filterPlanSuggestions(val);
      setPlanSuggestions(filtered);
      setShowPlanSuggestions(true);
      setPlanHoveredIndex(-1);
    }, 1000);
  };

  const handlePlanSuggestSelect = (item: SuggestItem) => {
    setPlanLeaders((prev) => [...prev, { name: item.name, org: item.org }]);
    setPlanLeaderInput("");
    setShowPlanSuggestions(false);
    setPlanSuggestions([]);
  };

  const handleAddPlanLeader = () => {
    if (!planLeaderInput.trim()) return;
    setPlanLeaders((prev) => [...prev, { name: planLeaderInput.trim(), org: "Nova 추진팀" }]);
    setPlanLeaderInput("");
    setShowPlanSuggestions(false);
    setPlanSuggestions([]);
  };

  const handleDesignLeaderInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setDesignLeaderInput(val);

    if (designTimerRef.current) {
      clearTimeout(designTimerRef.current);
    }

    if (!val.trim()) {
      setShowDesignSuggestions(false);
      setDesignSuggestions([]);
      return;
    }

    designTimerRef.current = setTimeout(() => {
      const filtered = filterDesignSuggestions(val);
      setDesignSuggestions(filtered);
      setShowDesignSuggestions(true);
      setDesignHoveredIndex(-1);
    }, 1000);
  };

  const handleDesignSuggestSelect = (item: SuggestItem) => {
    setDesignLeaders((prev) => [...prev, { name: item.name, org: item.org }]);
    setDesignLeaderInput("");
    setShowDesignSuggestions(false);
    setDesignSuggestions([]);
  };

  const handleAddDesignLeader = () => {
    if (!designLeaderInput.trim()) return;
    setDesignLeaders((prev) => [...prev, { name: designLeaderInput.trim(), org: "Nova 추진팀" }]);
    setDesignLeaderInput("");
    setShowDesignSuggestions(false);
    setDesignSuggestions([]);
  };

  useEffect(() => {
    if (!showPlanSuggestions && !showDesignSuggestions) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (showPlanSuggestions && planInputWrapRef.current && !planInputWrapRef.current.contains(e.target as Node)) {
        setShowPlanSuggestions(false);
      }
      if (showDesignSuggestions && designInputWrapRef.current && !designInputWrapRef.current.contains(e.target as Node)) {
        setShowDesignSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showPlanSuggestions, showDesignSuggestions]);

  useEffect(() => {
    if (open) {
      setDomainNameKo("");
      setNameKo("");
      setNameEn("");
      setPlanLeaderInput("");
      setDesignLeaderInput("");
      setPlanLeaders([]);
      setDesignLeaders([]);
      setDescription("");
      setUseYn("사용");
      setShowPlanSuggestions(false);
      setPlanSuggestions([]);
      setPlanHoveredIndex(-1);
      setShowDesignSuggestions(false);
      setDesignSuggestions([]);
      setDesignHoveredIndex(-1);
    }
    return () => {
      if (planTimerRef.current) clearTimeout(planTimerRef.current);
      if (designTimerRef.current) clearTimeout(designTimerRef.current);
    };
  }, [open]);

  if (!open) return null;

  const isValid = domainNameKo && nameKo.trim() && nameEn.trim() && planLeaders.length > 0 && designLeaders.length > 0;

  const handleCloseClick = () => {
    setCloseAlertOpen(true);
  };

  const handleCloseConfirm = () => {
    setCloseAlertOpen(false);
    onClose();
  };

  const handleSave = () => {
    if (!isValid) return;
    onSave?.({
      domainNameKo,
      nameKo: nameKo.trim(),
      nameEn: nameEn.trim(),
      planLeader: planLeaders.map((l) => l.name).join(", "),
      designLeader: designLeaders.map((l) => l.name).join(", "),
      description,
      useYn,
    });
    setSnackbarOpen(true);
    onClose();
  };

  return (
    <div style={s.overlay} onClick={handleCloseClick}>
      <div style={s.popup} onClick={(e) => e.stopPropagation()}>
        <div style={s.header}>
          <div style={s.titleRow}>
            <span style={s.titleText}>컴포넌트(L2) 신규 등록</span>
            <button style={s.closeBtn} onClick={handleCloseClick} type="button">
              <CloseIcon />
            </button>
          </div>
          <div style={s.requiredRow}>
            <div style={s.requiredMark} />
            <span style={s.requiredText}>표시는 필수로 입력하세요.</span>
          </div>
        </div>

        <div style={s.main}>
          <div style={s.fieldRow}>
            <SelectBox
              label="도메인(L1) 명을 선택하세요."
              required
              value={domainNameKo}
              onChange={setDomainNameKo}
              options={DOMAIN_OPTIONS}
              placeholder="도메인(L1) 명을 선택하세요."
            />
          </div>

          <div style={s.fieldRow}>
            <Input
              label="컴포넌트(한글) 명"
              required
              value={nameKo}
              onChange={(e) => setNameKo(e.target.value)}
              placeholder="컴포넌트(한글) 명을 입력하세요."
              maxLength={70}
              indicator={`${nameKo.length}/70`}
            />
          </div>

          <div style={s.fieldRow}>
            <Input
              label="컴포넌트(영문) 명"
              required
              value={nameEn}
              onChange={(e) => setNameEn(e.target.value)}
              placeholder="컴포넌트(영문) 명을 입력하세요."
              maxLength={70}
              indicator={`${nameEn.length}/70`}
            />
          </div>

          <div style={s.fieldRow}>
            <div style={s.labelRow}>
              <span style={s.label}>L2기획리더</span>
              <div style={s.requiredMark} />
            </div>
            <div style={s.inputWithBtn} ref={planInputWrapRef}>
              <Input
                value={planLeaderInput}
                onChange={handlePlanLeaderInputChange}
                placeholder="담당자를 선택하거나 검색하세요."
                style={{ flex: 1 }}
              />
              <Button
                size="l"
                variant="outlined"
                color="positive"
                disabled={!planLeaderInput.trim()}
                leadingIcon={<AddIcon />}
                onClick={handleAddPlanLeader}
              >
                추가
              </Button>
              {showPlanSuggestions && (
                <LeaderAutocompleteDropdown
                  suggestions={planSuggestions}
                  onSelect={handlePlanSuggestSelect}
                  hoveredIndex={planHoveredIndex}
                  setHoveredIndex={setPlanHoveredIndex}
                />
              )}
            </div>
            {planLeaders.length > 0 && (
              <div style={s.leaderList}>
                {planLeaders.map((leader, idx) => (
                  <LeaderListItemRow
                    key={`${leader.name}-${idx}`}
                    leader={leader}
                    onDelete={() => setPlanLeaders((prev) => prev.filter((_, i) => i !== idx))}
                  />
                ))}
              </div>
            )}
          </div>

          <div style={s.fieldRow}>
            <div style={s.labelRow}>
              <span style={s.label}>L2설계리더</span>
              <div style={s.requiredMark} />
            </div>
            <div style={s.inputWithBtn} ref={designInputWrapRef}>
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
              <div style={s.leaderList}>
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

          <div style={s.fieldRow}>
            <span style={s.editorLabel}>컴포넌트(L2) 설명</span>
            <ToastEditor
              value={description}
              onChange={setDescription}
              placeholder="컴포넌트(L2) 설명을 입력하세요."
              minHeight={400}
            />
          </div>

          <div style={s.fieldRow}>
            <div style={s.labelRow}>
              <span style={s.label}>사용여부</span>
            </div>
            <RadioGroup
              value={useYn}
              onChange={setUseYn}
              options={USE_YN_OPTIONS}
              size="l"
              direction="horizontal"
              gap={32}
            />
          </div>
        </div>

        <div style={s.footer}>
          <div style={s.footerLeft}>
            <Button size="l" variant="outlined" color="info" onClick={handleCloseClick}>
              닫기
            </Button>
          </div>
          <div style={s.footerRight}>
            <Button size="l" variant="filled" color="positive" disabled={!isValid} onClick={handleSave}>
              저장
            </Button>
          </div>
        </div>

        <AlertModal
          open={closeAlertOpen}
          onClose={() => setCloseAlertOpen(false)}
          type="warning"
          message="입력한 값을 초기화하고 창을 닫습니다."
          showCancel
          cancelLabel="취소"
          confirmLabel="확인"
          onCancel={() => setCloseAlertOpen(false)}
          onConfirm={handleCloseConfirm}
        />
      </div>

      <Snackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        type="success"
        message="저장 되었습니다."
      />
    </div>
  );
}
