import { type CSSProperties } from "react";

type CheckboxSize = "l" | "m" | "s";

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  size?: CheckboxSize;
  disabled?: boolean;
  style?: CSSProperties;
}

const FONT_FAMILY = "'Pretendard', sans-serif";

const COLORS = {
  checkedBg: "#7a5af8",
  uncheckedBg: "#ffffff",
  uncheckedBorder: "#e4e7ec",
  disabledBg: "#71717a",
  checkmark: "#ffffff",
  labelText: "#3f3f46",
};

const SIZE_CONFIG: Record<
  CheckboxSize,
  {
    box: number;
    borderRadius: number;
    checkmarkWidth: number;
    checkmarkHeight: number;
    strokeWidth: number;
    fontSize: number;
    lineHeight: string;
    gap: number;
  }
> = {
  l: { box: 24, borderRadius: 4, checkmarkWidth: 14, checkmarkHeight: 10, strokeWidth: 2, fontSize: 16, lineHeight: "24px", gap: 8 },
  m: { box: 20, borderRadius: 4, checkmarkWidth: 12, checkmarkHeight: 9, strokeWidth: 2, fontSize: 14, lineHeight: "20px", gap: 8 },
  s: { box: 18, borderRadius: 3, checkmarkWidth: 10, checkmarkHeight: 8, strokeWidth: 1.5, fontSize: 12, lineHeight: "18px", gap: 8 },
};

function CheckmarkIcon({ size, color }: { size: CheckboxSize; color: string }) {
  const config = SIZE_CONFIG[size];
  return (
    <svg
      width={config.checkmarkWidth}
      height={config.checkmarkHeight}
      viewBox="0 0 14 10"
      fill="none"
      style={{ display: "block" }}
    >
      <path
        d="M1 5L5 9L13 1"
        stroke={color}
        strokeWidth={config.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Checkbox({
  checked,
  onChange,
  label,
  size = "m",
  disabled = false,
  style,
}: CheckboxProps) {
  const config = SIZE_CONFIG[size];

  const containerStyle: CSSProperties = {
    display: "flex",
    gap: config.gap,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    cursor: disabled ? "not-allowed" : "pointer",
    userSelect: "none",
    ...style,
  };

  const boxStyle: CSSProperties = {
    width: config.box,
    height: config.box,
    borderRadius: config.borderRadius,
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    ...(checked
      ? {
          backgroundColor: disabled ? COLORS.disabledBg : COLORS.checkedBg,
          opacity: disabled ? 0.6 : 1,
        }
      : {
          backgroundColor: COLORS.uncheckedBg,
          border: `1px solid ${COLORS.uncheckedBorder}`,
          opacity: disabled ? 0.6 : 1,
        }),
  };

  const labelStyle: CSSProperties = {
    fontFamily: FONT_FAMILY,
    fontSize: config.fontSize,
    fontWeight: 400,
    lineHeight: config.lineHeight,
    color: COLORS.labelText,
    whiteSpace: "nowrap",
  };

  const handleClick = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  return (
    <div style={containerStyle} onClick={handleClick}>
      <div style={boxStyle}>
        {checked && <CheckmarkIcon size={size} color={COLORS.checkmark} />}
      </div>
      {label && <span style={labelStyle}>{label}</span>}
    </div>
  );
}
