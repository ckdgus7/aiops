import { type CSSProperties } from "react";

type ToggleSize = "l" | "m" | "s";
type LabelPosition = "left" | "right";

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  labelPosition?: LabelPosition;
  size?: ToggleSize;
  disabled?: boolean;
  style?: CSSProperties;
}

const FONT_FAMILY = "'Pretendard', sans-serif";

const COLORS = {
  checkedTrack: "#7a5af8",
  uncheckedTrack: "#ffffff",
  uncheckedTrackBorder: "#e4e7ec",
  disabledCheckedTrack: "#71717a",
  disabledUncheckedTrack: "#fcfcfd",
  knobChecked: "#ffffff",
  knobUnchecked: "#71717a",
  knobDisabledUnchecked: "#e4e7ec",
  labelText: "#3f3f46",
};

const SIZE_CONFIG: Record<
  ToggleSize,
  {
    trackWidth: number;
    padding: number;
    knobSize: number;
    knobBorderRadius: number;
    trackBorderRadius: number;
    fontSize: number;
    lineHeight: string;
    gap: number;
  }
> = {
  l: { trackWidth: 40, padding: 4, knobSize: 16, knobBorderRadius: 10, trackBorderRadius: 12, fontSize: 16, lineHeight: "24px", gap: 8 },
  m: { trackWidth: 36, padding: 3, knobSize: 14, knobBorderRadius: 8, trackBorderRadius: 10, fontSize: 14, lineHeight: "20px", gap: 8 },
  s: { trackWidth: 32, padding: 3, knobSize: 12, knobBorderRadius: 8, trackBorderRadius: 10, fontSize: 12, lineHeight: "18px", gap: 8 },
};

export function Toggle({
  checked,
  onChange,
  label,
  labelPosition = "right",
  size = "m",
  disabled = false,
  style,
}: ToggleProps) {
  const config = SIZE_CONFIG[size];
  const trackHeight = config.knobSize + config.padding * 2;

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

  const trackStyle: CSSProperties = {
    width: config.trackWidth,
    height: trackHeight,
    borderRadius: config.trackBorderRadius,
    padding: config.padding,
    display: "flex",
    alignItems: "center",
    justifyContent: checked ? "flex-end" : "flex-start",
    overflow: "hidden",
    flexShrink: 0,
    boxSizing: "border-box",
    ...(checked
      ? disabled
        ? { backgroundColor: COLORS.disabledCheckedTrack, opacity: 0.6 }
        : { backgroundColor: COLORS.checkedTrack }
      : disabled
        ? {
            backgroundColor: COLORS.disabledUncheckedTrack,
            border: `1px solid ${COLORS.uncheckedTrackBorder}`,
          }
        : {
            backgroundColor: COLORS.uncheckedTrack,
            border: `1px solid ${COLORS.uncheckedTrackBorder}`,
          }),
  };

  const knobStyle: CSSProperties = {
    width: config.knobSize,
    height: config.knobSize,
    borderRadius: config.knobBorderRadius,
    flexShrink: 0,
    ...(checked
      ? { backgroundColor: COLORS.knobChecked }
      : disabled
        ? { backgroundColor: COLORS.knobDisabledUnchecked, opacity: 0.5 }
        : { backgroundColor: COLORS.knobUnchecked, opacity: 0.3 }),
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

  const labelElement = label ? <span style={labelStyle}>{label}</span> : null;

  return (
    <div style={containerStyle} onClick={handleClick}>
      {labelPosition === "left" && labelElement}
      <div style={trackStyle}>
        <div style={knobStyle} />
      </div>
      {labelPosition === "right" && labelElement}
    </div>
  );
}
