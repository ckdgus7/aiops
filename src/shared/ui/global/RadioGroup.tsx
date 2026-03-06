import type { CSSProperties } from "react";

type RadioSize = "l" | "m" | "s";

interface RadioOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  value: string;
  onChange: (value: string) => void;
  options: RadioOption[];
  size?: RadioSize;
  disabled?: boolean;
  direction?: "horizontal" | "vertical";
  gap?: number;
  name?: string;
  style?: CSSProperties;
}

const FONT_FAMILY = "'Pretendard', sans-serif";

const COLORS = {
  checkedBg: "#7a5af8",
  uncheckedBg: "#ffffff",
  uncheckedBorder: "#e4e7ec",
  innerDot: "#ffffff",
  innerDotUnchecked: "#71717a",
  disabledBg: "#71717a",
  labelText: "#3f3f46",
};

const SIZE_CONFIG: Record<
  RadioSize,
  {
    circle: number;
    borderRadius: number;
    innerDot: number;
    innerDotRadius: number;
    fontSize: number;
    lineHeight: string;
    gap: number;
  }
> = {
  l: { circle: 24, borderRadius: 12, innerDot: 8, innerDotRadius: 4, fontSize: 16, lineHeight: "24px", gap: 8 },
  m: { circle: 20, borderRadius: 10, innerDot: 8, innerDotRadius: 4, fontSize: 14, lineHeight: "20px", gap: 8 },
  s: { circle: 18, borderRadius: 9, innerDot: 6, innerDotRadius: 3, fontSize: 12, lineHeight: "18px", gap: 8 },
};

function RadioItem({
  option,
  selected,
  size,
  globalDisabled,
  onChange,
}: {
  option: RadioOption;
  selected: boolean;
  size: RadioSize;
  globalDisabled: boolean;
  onChange: (value: string) => void;
}) {
  const config = SIZE_CONFIG[size];
  const isDisabled = globalDisabled || option.disabled;

  const itemStyle: CSSProperties = {
    display: "flex",
    gap: config.gap,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    cursor: isDisabled ? "not-allowed" : "pointer",
    userSelect: "none",
  };

  const circleStyle: CSSProperties = {
    width: config.circle,
    height: config.circle,
    borderRadius: config.borderRadius,
    overflow: "hidden",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    boxSizing: "border-box",
    ...(selected
      ? {
          backgroundColor: isDisabled ? COLORS.disabledBg : COLORS.checkedBg,
          opacity: isDisabled ? 0.6 : 1,
        }
      : {
          backgroundColor: COLORS.uncheckedBg,
          border: `1px solid ${COLORS.uncheckedBorder}`,
          opacity: isDisabled ? 0.6 : 1,
        }),
  };

  const innerDotStyle: CSSProperties = {
    width: config.innerDot,
    height: config.innerDot,
    borderRadius: config.innerDotRadius,
    backgroundColor: selected ? COLORS.innerDot : COLORS.innerDotUnchecked,
    opacity: selected ? 1 : 0.3,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
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
    if (!isDisabled) {
      onChange(option.value);
    }
  };

  return (
    <div style={itemStyle} onClick={handleClick}>
      <div style={circleStyle}>
        <div style={innerDotStyle} />
      </div>
      <span style={labelStyle}>{option.label}</span>
    </div>
  );
}

export function RadioGroup({
  value,
  onChange,
  options,
  size = "m",
  disabled = false,
  direction = "horizontal",
  gap = 16,
  style,
}: RadioGroupProps) {
  const groupStyle: CSSProperties = {
    display: "flex",
    flexDirection: direction === "horizontal" ? "row" : "column",
    gap,
    alignItems: direction === "horizontal" ? "center" : "flex-start",
    ...style,
  };

  return (
    <div style={groupStyle}>
      {options.map((option) => (
        <RadioItem
          key={option.value}
          option={option}
          selected={value === option.value}
          size={size}
          globalDisabled={disabled}
          onChange={onChange}
        />
      ))}
    </div>
  );
}
