import type { CSSProperties } from "react";

interface ChooseButtonOption {
  label: string;
  value: string;
}

interface ChooseButtonProps {
  value: string;
  onChange: (value: string) => void;
  options: ChooseButtonOption[];
  style?: CSSProperties;
}

const FONT_FAMILY = "'Pretendard', sans-serif";

const COLORS = {
  active: "#7a5af8",
  default: "#bdb4fe",
  text: "#fafaff",
};

export function ChooseButton({
  value,
  onChange,
  options,
  style,
}: ChooseButtonProps) {
  const containerStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 6,
    ...style,
  };

  const buttonStyle = (isActive: boolean): CSSProperties => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: isActive ? COLORS.active : COLORS.default,
    cursor: "pointer",
    userSelect: "none",
    flexShrink: 0,
    border: "none",
    outline: "none",
  });

  const labelStyle: CSSProperties = {
    fontFamily: FONT_FAMILY,
    fontSize: 16,
    fontWeight: 400,
    lineHeight: "24px",
    color: COLORS.text,
    whiteSpace: "nowrap",
  };

  const handleKeyDown = (e: React.KeyboardEvent, optionValue: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onChange(optionValue);
    }
  };

  return (
    <div style={containerStyle} role="radiogroup">
      {options.map((option) => {
        const isActive = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            style={buttonStyle(isActive)}
            onClick={() => onChange(option.value)}
            onKeyDown={(e) => handleKeyDown(e, option.value)}
          >
            <span style={labelStyle}>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
