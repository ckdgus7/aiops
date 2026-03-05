import { useState, useEffect, type CSSProperties } from "react";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { SelectBox } from "@/shared/ui/SelectBox";
import { RadioGroup } from "@/shared/ui/RadioGroup";
import { TiptapEditor } from "@/shared/ui/TiptapEditor";
import { DOMAIN_MOCK_DATA } from "@/features/ssf/model/mock-data";
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
};

const DOMAIN_OPTIONS = DOMAIN_MOCK_DATA
  .filter((d) => d.useYn === "사용")
  .map((d) => ({ label: d.nameKo, value: d.nameKo }));

const USE_YN_OPTIONS = [
  { label: "사용", value: "사용" },
  { label: "미사용", value: "미사용" },
];

export function ComponentCreatePopup({ open, onClose, onSave }: ComponentCreatePopupProps) {
  const [domainNameKo, setDomainNameKo] = useState("");
  const [nameKo, setNameKo] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [planLeader, setPlanLeader] = useState("");
  const [designLeader, setDesignLeader] = useState("");
  const [description, setDescription] = useState("");
  const [useYn, setUseYn] = useState("사용");

  useEffect(() => {
    if (open) {
      setDomainNameKo("");
      setNameKo("");
      setNameEn("");
      setPlanLeader("");
      setDesignLeader("");
      setDescription("");
      setUseYn("사용");
    }
  }, [open]);

  if (!open) return null;

  const isValid = domainNameKo && nameKo.trim() && nameEn.trim() && planLeader.trim() && designLeader.trim();

  const handleSave = () => {
    if (!isValid) return;
    onSave?.({
      domainNameKo,
      nameKo: nameKo.trim(),
      nameEn: nameEn.trim(),
      planLeader: planLeader.trim(),
      designLeader: designLeader.trim(),
      description,
      useYn,
    });
    onClose();
  };

  return (
    <div style={s.overlay} onClick={onClose}>
      <div style={s.popup} onClick={(e) => e.stopPropagation()}>
        <div style={s.header}>
          <div style={s.titleRow}>
            <span style={s.titleText}>컴포넌트(L2) 신규 등록</span>
            <button style={s.closeBtn} onClick={onClose} type="button">
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
              label="도메인(한글) 명"
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
            <div style={s.inputWithBtn}>
              <Input
                value={planLeader}
                onChange={(e) => setPlanLeader(e.target.value)}
                placeholder="담당자를 선택하거나 검색하세요."
                style={{ flex: 1 }}
              />
              <Button
                size="l"
                variant="outlined"
                color="positive"
                disabled={!planLeader.trim()}
                leadingIcon={<AddIcon />}
              >
                추가
              </Button>
            </div>
          </div>

          <div style={s.fieldRow}>
            <div style={s.labelRow}>
              <span style={s.label}>L2설계리더</span>
              <div style={s.requiredMark} />
            </div>
            <div style={s.inputWithBtn}>
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

          <div style={s.fieldRow}>
            <span style={s.editorLabel}>컴포넌트(L2) 설명</span>
            <TiptapEditor
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
            <Button size="l" variant="outlined" color="info" onClick={onClose}>
              닫기
            </Button>
          </div>
          <div style={s.footerRight}>
            <Button size="l" variant="filled" color="positive" disabled={!isValid} onClick={handleSave}>
              저장
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
