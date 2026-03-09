import { useState, useEffect, type CSSProperties } from "react";
import { Button } from "@/shared/ui/global/Button";
import { Input } from "@/shared/ui/global/Input";
import { SelectBox } from "@/shared/ui/global/SelectBox";
import { RadioGroup } from "@/shared/ui/global/RadioGroup";
import { ToastEditor } from "@/shared/ui/service/ToastEditor";
import type { ComponentItem } from "@/features/ssf/model/types";
import { DOMAIN_MOCK_DATA } from "@/features/ssf/model/mock-data";
import { FONT, popupStyles } from "@/shared/ui/styles";

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M6 6L18 18" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18 6L6 18" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" />
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
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="10" fill="#ede9fe" />
      <text x="10" y="14" textAnchor="middle" fill="#7a5af8" fontSize="9" fontWeight="700" fontFamily="Pretendard, sans-serif">L2</text>
    </svg>
  );
}

interface LeaderItem {
  name: string;
  org: string;
}

const BASE_DOMAIN_OPTIONS = DOMAIN_MOCK_DATA
  .filter((d) => d.useYn === "사용")
  .map((d) => ({ label: d.nameKo, value: d.nameKo }));

function getDomainOptions(currentValue?: string) {
  if (currentValue && !BASE_DOMAIN_OPTIONS.some((o) => o.value === currentValue)) {
    return [{ label: currentValue, value: currentValue }, ...BASE_DOMAIN_OPTIONS];
  }
  return BASE_DOMAIN_OPTIONS;
}

const USE_YN_OPTIONS = [
  { label: "사용", value: "사용" },
  { label: "미사용", value: "미사용" },
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
  headerWithMessage: {
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
    gap: 10,
  } satisfies CSSProperties,
  titleText: {
    ...popupStyles.titleText,
    color: "#52525b",
    flex: 1,
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
  editorLabel: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "18px",
    color: "#a1a1aa",
    marginBottom: 12,
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
  l3DeleteBtn: {
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

function LeaderListItemRow({ leader, onDelete }: { leader: LeaderItem; onDelete: () => void }) {
  return (
    <div style={st.leaderItem}>
      <div style={st.leaderItemContent}>
        <span style={st.leaderName}>{leader.name}</span>
        <L2RoleIcon />
        <div style={st.leaderOrg}>
          <div style={st.leaderOrgSep} />
          <span style={st.leaderOrgText}>{leader.org}</span>
        </div>
      </div>
      <button style={st.l3DeleteBtn} type="button" onClick={onDelete}>
        <DeleteIcon />
      </button>
    </div>
  );
}

interface ComponentEditPopupProps {
  open: boolean;
  onClose: () => void;
  item: ComponentItem | null;
}

export function ComponentEditPopup({ open, onClose, item }: ComponentEditPopupProps) {
  const [domainNameKo, setDomainNameKo] = useState("");
  const [nameKo, setNameKo] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [planLeaderInput, setPlanLeaderInput] = useState("");
  const [designLeaderInput, setDesignLeaderInput] = useState("");
  const [planLeaders, setPlanLeaders] = useState<LeaderItem[]>([]);
  const [designLeaders, setDesignLeaders] = useState<LeaderItem[]>([]);
  const [description, setDescription] = useState("");
  const [useYn, setUseYn] = useState("사용");

  useEffect(() => {
    if (open && item) {
      setDomainNameKo(item.domainNameKo);
      setNameKo(item.nameKo);
      setNameEn(item.nameEn);
      setPlanLeaderInput("");
      setDesignLeaderInput("");
      setPlanLeaders([{ name: item.planLeader, org: "Nova 추진팀" }]);
      setDesignLeaders([{ name: item.designLeader, org: "Nova 추진팀" }]);
      setDescription(item.description);
      setUseYn(item.useYn);
    }
  }, [open, item]);

  if (!open || !item) return null;

  const isValid = domainNameKo && nameKo.trim() && nameEn.trim() && planLeaders.length > 0 && designLeaders.length > 0;

  const handleAddPlanLeader = () => {
    if (!planLeaderInput.trim()) return;
    setPlanLeaders((prev) => [...prev, { name: planLeaderInput.trim(), org: "Nova 추진팀" }]);
    setPlanLeaderInput("");
  };

  const handleAddDesignLeader = () => {
    if (!designLeaderInput.trim()) return;
    setDesignLeaders((prev) => [...prev, { name: designLeaderInput.trim(), org: "Nova 추진팀" }]);
    setDesignLeaderInput("");
  };

  const handleSave = () => {
    if (!isValid) return;
    onClose();
  };

  return (
    <div style={st.overlay} onClick={onClose}>
      <div style={st.popup} onClick={(e) => e.stopPropagation()}>
        <div style={st.headerWithMessage}>
          <div style={st.titleRow}>
            <span style={st.titleText}>컴포넌트(L2) 수정</span>
            <button style={st.closeBtn} onClick={onClose} type="button">
              <CloseIcon />
            </button>
          </div>
          <div style={st.requiredRow}>
            <div style={st.requiredMark} />
            <span style={st.requiredText}>표시는 필수로 입력하세요.</span>
          </div>
        </div>

        <div style={st.main}>
          <div style={st.fieldRow}>
            <SelectBox
              label="도메인(한글) 명"
              required
              value={domainNameKo}
              onChange={setDomainNameKo}
              options={getDomainOptions(item.domainNameKo)}
              placeholder="도메인(L1) 명을 선택하세요."
              disabled
            />
          </div>

          <div style={st.fieldRow}>
            <Input
              label="컴포넌트(한글) 명"
              required
              value={nameKo}
              onChange={(e) => setNameKo(e.target.value)}
              placeholder="컴포넌트(한글) 명을 입력하세요."
              maxLength={70}
              indicator={`${nameKo.length}/70`}
              disabled
            />
          </div>

          <div style={st.fieldRow}>
            <Input
              label="컴포넌트(영문) 명"
              required
              value={nameEn}
              onChange={(e) => setNameEn(e.target.value)}
              placeholder="컴포넌트(영문) 명을 입력하세요."
              maxLength={70}
              indicator={`${nameEn.length}/70`}
              disabled
            />
          </div>

          <div style={st.fieldRow}>
            <div style={st.labelRow}>
              <span style={st.label}>L2기획리더</span>
              <div style={st.requiredMark} />
            </div>
            <div style={st.inputWithBtn}>
              <Input
                value={planLeaderInput}
                onChange={(e) => setPlanLeaderInput(e.target.value)}
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
            </div>
            {planLeaders.length > 0 && (
              <div style={st.leaderList}>
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

          <div style={st.fieldRow}>
            <div style={st.labelRow}>
              <span style={st.label}>L2설계리더</span>
              <div style={st.requiredMark} />
            </div>
            <div style={st.inputWithBtn}>
              <Input
                value={designLeaderInput}
                onChange={(e) => setDesignLeaderInput(e.target.value)}
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
            </div>
            {designLeaders.length > 0 && (
              <div style={st.leaderList}>
                {designLeaders.map((leader, idx) => (
                  <LeaderListItemRow
                    key={`${leader.name}-${idx}`}
                    leader={leader}
                    onDelete={() => setDesignLeaders((prev) => prev.filter((_, i) => i !== idx))}
                  />
                ))}
              </div>
            )}
          </div>

          <div style={st.fieldRow}>
            <span style={st.editorLabel}>컴포넌트(L2) 설명</span>
            <ToastEditor
              value={description}
              onChange={setDescription}
              placeholder="컴포넌트(L2) 설명을 입력하세요."
              minHeight={400}
            />
          </div>

          <div style={st.fieldRow}>
            <div style={st.labelRow}>
              <span style={st.label}>사용여부</span>
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

        <div style={st.footer}>
          <div style={st.footerLeft}>
            <Button size="l" variant="outlined" color="info" onClick={onClose}>
              닫기
            </Button>
          </div>
          <div style={st.footerRight}>
            <Button size="l" variant="filled" color="positive" disabled={!isValid} onClick={handleSave}>
              저장
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
