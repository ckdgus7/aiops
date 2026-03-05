import { useState, useEffect, type CSSProperties } from "react";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { Textarea } from "@/shared/ui/Textarea";
import { RadioGroup } from "@/shared/ui/RadioGroup";
import type { DomainItem } from "@/features/ssf/model/types";
import { FONT, popupStyles } from "@/shared/ui/styles";

interface DomainFormPopupProps {
  open: boolean;
  onClose: () => void;
  onSave?: (data: DomainFormData) => void;
  onDelete?: () => void;
  mode: "create" | "edit";
  initialData?: DomainItem | null;
}

export interface DomainFormData {
  abbr: string;
  nameKo: string;
  nameEn: string;
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

const s = {
  overlay: {
    ...popupStyles.overlay,
    zIndex: 1000,
  } satisfies CSSProperties,
  popup: {
    ...popupStyles.popup,
    borderRadius: 8,
    boxShadow: "0 4px 24px rgba(0, 0, 0, 0.12)",
    fontFamily: undefined,
  } satisfies CSSProperties,
  header: {
    display: "flex",
    flexDirection: "column",
    padding: "32px 32px 16px 32px",
    gap: 12,
    borderBottom: "1px solid #e4e4e7",
  } satisfies CSSProperties,
  titleRow: {
    ...popupStyles.titleRow,
    width: "100%",
  } satisfies CSSProperties,
  titleText: {
    ...popupStyles.titleText,
    fontSize: 20,
  } satisfies CSSProperties,
  closeBtn: popupStyles.closeBtn,
  requiredRow: popupStyles.requiredRow,
  requiredMark: {
    ...popupStyles.requiredDot,
    borderRadius: 3,
  } satisfies CSSProperties,
  requiredText: {
    ...popupStyles.requiredText,
    fontSize: 14,
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
  footer: {
    ...popupStyles.footer,
    padding: "16px 32px 32px 32px",
    borderTop: "1px solid #e4e4e7",
  } satisfies CSSProperties,
  footerLeft: {
    display: "flex",
    alignItems: "center",
  } satisfies CSSProperties,
  footerRight: {
    display: "flex",
    alignItems: "center",
  } satisfies CSSProperties,
};

const TITLE_MAP = {
  create: "도메인(L1) 신규 등록",
  edit: "도메인(L1) 수정",
};

export function DomainFormPopup({ open, onClose, onSave, onDelete, mode, initialData }: DomainFormPopupProps) {
  const [abbr, setAbbr] = useState("");
  const [nameKo, setNameKo] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [description, setDescription] = useState("");
  const [useYn, setUseYn] = useState("사용");

  useEffect(() => {
    if (open && initialData) {
      setAbbr(initialData.abbr);
      setNameKo(initialData.nameKo);
      setNameEn(initialData.nameEn);
      setDescription(initialData.description);
      setUseYn(initialData.useYn);
    } else if (open && !initialData) {
      setAbbr("");
      setNameKo("");
      setNameEn("");
      setDescription("");
      setUseYn("사용");
    }
  }, [open, initialData]);

  const handleSave = () => {
    onSave?.({ abbr, nameKo, nameEn, description, useYn });
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  if (!open) return null;

  return (
    <div style={s.overlay} onClick={handleClose}>
      <div style={s.popup} onClick={(e) => e.stopPropagation()}>
        <div style={s.header}>
          <div style={s.titleRow}>
            <span style={s.titleText}>{TITLE_MAP[mode]}</span>
            <button style={s.closeBtn} onClick={handleClose}>
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
            <Input
              label="도메인(약어) 명"
              required
              value={abbr}
              onChange={(e) => setAbbr(e.target.value)}
              placeholder="도메인"
              maxLength={70}
              indicator={`${abbr.length}/70`}
            />
          </div>

          <div style={s.fieldRow}>
            <Input
              label="도메인(한글) 명"
              required
              value={nameKo}
              onChange={(e) => setNameKo(e.target.value)}
              placeholder="도메인"
              maxLength={70}
              indicator={`${nameKo.length}/70`}
            />
          </div>

          <div style={s.fieldRow}>
            <Input
              label="도메인(영문) 명"
              required
              value={nameEn}
              onChange={(e) => setNameEn(e.target.value)}
              maxLength={70}
              indicator={`${nameEn.length}/70`}
            />
          </div>

          <Textarea
            label="도메인(L1) 설명"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="설명을 입력하세요."
            maxLength={500}
            indicator
            wrapperStyle={{ minHeight: 400 }}
            style={{ minHeight: 350 }}
          />

          <div style={s.fieldRow}>
            <div style={s.labelRow}>
              <span style={s.label}>사용여부</span>
            </div>
            <RadioGroup
              value={useYn}
              onChange={setUseYn}
              options={[
                { label: "사용", value: "사용" },
                { label: "미사용", value: "미사용" },
              ]}
              size="m"
              direction="horizontal"
              gap={32}
            />
          </div>
        </div>

        <div style={s.footer}>
          <div style={s.footerLeft}>
            <Button
              size="l"
              variant="outlined"
              color="info"
              onClick={handleClose}
            >
              닫기
            </Button>
          </div>
          <div style={s.footerRight}>
            {mode === "edit" && onDelete && (
              <Button
                size="l"
                variant="filled"
                color="negative"
                onClick={() => { onClose(); onDelete(); }}
              >
                삭제
              </Button>
            )}
            <Button
              size="l"
              variant="filled"
              color="positive"
              onClick={handleSave}
              style={mode === "edit" && onDelete ? { marginLeft: 8 } : undefined}
            >
              저장
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
