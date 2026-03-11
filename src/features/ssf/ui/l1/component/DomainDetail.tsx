import type { CSSProperties } from "react";
import { useDomainDetailQuery } from "@/features/ssf/api/domain.queries";
import { FONT } from "@/shared/ui/styles";

interface DomainDetailProps {
  domainId: string;
  showUseYn?: boolean;
}

const s = {
  content: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  } satisfies CSSProperties,
  fieldRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "16px 32px",
    alignItems: "flex-start",
  } satisfies CSSProperties,
  fieldItem: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  } satisfies CSSProperties,
  fieldItemFull: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    width: "100%",
  } satisfies CSSProperties,
  label: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "20px",
    color: "#a1a1aa",
  } satisfies CSSProperties,
  value: {
    fontFamily: FONT,
    fontSize: 16,
    fontWeight: 400,
    lineHeight: "24px",
    color: "#3f3f46",
  } satisfies CSSProperties,
  valueSmall: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "20px",
    color: "#3f3f46",
  } satisfies CSSProperties,
  loading: {
    fontFamily: FONT,
    fontSize: 14,
    color: "#a1a1aa",
    padding: 16,
  } satisfies CSSProperties,
};

export function DomainDetail({ domainId, showUseYn = true }: DomainDetailProps) {
  const { data, isLoading } = useDomainDetailQuery(domainId);

  if (isLoading) {
    return <div style={s.loading}>로딩 중...</div>;
  }

  if (!data) {
    return <div style={s.loading}>데이터를 찾을 수 없습니다.</div>;
  }

  return (
    <div style={s.content}>
      <div style={s.fieldRow}>
        <div style={s.fieldItem}>
          <span style={s.label}>도메인(약어)</span>
          <span style={s.value}>{data.abbr}</span>
        </div>
        <div style={s.fieldItem}>
          <span style={s.label}>도메인(한글)</span>
          <span style={s.value}>{data.nameKo}</span>
        </div>
        <div style={s.fieldItem}>
          <span style={s.label}>도메인(영문)</span>
          <span style={s.value}>{data.nameEn}</span>
        </div>
      </div>

      <div style={s.fieldItemFull}>
        <span style={s.label}>도메인(L1) 설명</span>
        <span style={s.value}>{data.description}</span>
      </div>

      {showUseYn && (
        <div style={s.fieldRow}>
          <div style={s.fieldItem}>
            <span style={s.label}>사용여부</span>
            <span style={s.valueSmall}>{data.useYn}</span>
          </div>
        </div>
      )}
    </div>
  );
}
