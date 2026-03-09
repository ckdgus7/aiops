import { useState, useEffect, useMemo, type CSSProperties } from "react";
import { SelectBox } from "@/shared/ui/global/SelectBox";
import { Input } from "@/shared/ui/global/Input";
import { Button } from "@/shared/ui/global/Button";
import { TiptapEditor } from "@/shared/ui/service/TiptapEditor";
import { COMPONENT_MOCK_DATA } from "@/features/ssf/model/mock-data";
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

export function BusinessCreatePopup({ open, onClose, onSave }: BusinessCreatePopupProps) {
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
              label="도메인(L1) 명(한글)을 선택하세요."
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
