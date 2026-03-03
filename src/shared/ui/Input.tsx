import { useState, type CSSProperties, type InputHTMLAttributes, type ReactNode } from "react";

type InputSize = "m";
type InputPrefix = "search";

function SearchIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
        stroke="#a1a1aa"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 21L16.65 16.65"
        stroke="#a1a1aa"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const PREFIX_MAP: Record<InputPrefix, ReactNode> = {
  search: <SearchIcon />,
};

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "style" | "prefix"> {
  size?: InputSize;
  label?: string;
  required?: boolean;
  prefix?: InputPrefix;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  indicator?: string;
  error?: boolean;
  helperText?: string;
  style?: CSSProperties;
  wrapperStyle?: CSSProperties;
}

const FONT_FAMILY = "'Pretendard', sans-serif";

const COLORS = {
  label: "#a1a1aa",
  requiredMark: "#36bffa",
  borderDefault: "#e4e7ec",
  borderFocus: "#7a5af8",
  borderError: "#f04438",
  background: "#ffffff",
  placeholder: "#a1a1aa",
  text: "#18181b",
  indicator: "#a1a1aa",
  errorText: "#f04438",
  disabledBg: "#fafafa",
};

const SIZE_CONFIG: Record<
  InputSize,
  {
    height: number;
    padding: number;
    gap: number;
    iconSize: number;
    fontSize: number;
    fontWeight: number;
    lineHeight: string;
    inputPaddingX: number;
    indicatorFontSize: number;
    indicatorLineHeight: string;
    indicatorPaddingX: number;
    labelFontSize: number;
    labelFontWeight: number;
    labelLineHeight: string;
    labelGap: number;
    fieldGap: number;
    requiredMarkSize: number;
  }
> = {
  m: {
    height: 40,
    padding: 8,
    gap: 8,
    iconSize: 24,
    fontSize: 16,
    fontWeight: 400,
    lineHeight: "24px",
    inputPaddingX: 8,
    indicatorFontSize: 12,
    indicatorLineHeight: "18px",
    indicatorPaddingX: 4,
    labelFontSize: 14,
    labelFontWeight: 500,
    labelLineHeight: "18px",
    labelGap: 4,
    fieldGap: 8,
    requiredMarkSize: 6,
  },
};

export function Input({
  size = "m",
  label,
  required = false,
  prefix,
  leftIcon,
  rightIcon,
  indicator,
  error = false,
  helperText,
  disabled = false,
  style,
  wrapperStyle,
  onFocus,
  onBlur,
  ...rest
}: InputProps) {
  const [focused, setFocused] = useState(false);
  const config = SIZE_CONFIG[size];

  const resolvedLeftIcon = leftIcon ?? (prefix ? PREFIX_MAP[prefix] : undefined);

  const borderColor = error
    ? COLORS.borderError
    : focused
      ? COLORS.borderFocus
      : COLORS.borderDefault;

  const wrapperBaseStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: config.fieldGap,
    alignItems: "flex-start",
    width: "100%",
    ...wrapperStyle,
  };

  const labelRowStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
  };

  const labelContainerStyle: CSSProperties = {
    display: "flex",
    gap: config.labelGap,
    alignItems: "center",
    justifyContent: "center",
  };

  const labelTextStyle: CSSProperties = {
    fontFamily: FONT_FAMILY,
    fontSize: config.labelFontSize,
    fontWeight: config.labelFontWeight,
    lineHeight: config.labelLineHeight,
    color: COLORS.label,
    whiteSpace: "nowrap",
  };

  const requiredMarkStyle: CSSProperties = {
    width: config.requiredMarkSize,
    height: config.requiredMarkSize,
    borderRadius: 3,
    backgroundColor: COLORS.requiredMark,
    flexShrink: 0,
  };

  const fieldBaseStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: config.gap,
    padding: config.padding,
    height: config.height,
    backgroundColor: disabled ? COLORS.disabledBg : COLORS.background,
    border: `1px solid ${borderColor}`,
    borderRadius: 4,
    boxSizing: "border-box",
    width: "100%",
    opacity: disabled ? 0.6 : 1,
    transition: "border-color 0.15s ease",
    ...style,
  };

  const leftAreaStyle: CSSProperties = {
    display: "flex",
    flex: "1 0 0",
    alignItems: "center",
    minWidth: 0,
    minHeight: 0,
  };

  const iconStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    flexShrink: 0,
    width: config.iconSize,
    height: config.iconSize,
    overflow: "hidden",
  };

  const inputTextWrapStyle: CSSProperties = {
    display: "flex",
    flex: "1 0 0",
    alignItems: "center",
    minWidth: 0,
    minHeight: 0,
    paddingLeft: config.inputPaddingX,
    paddingRight: config.inputPaddingX,
  };

  const inputStyle: CSSProperties = {
    fontFamily: FONT_FAMILY,
    fontSize: config.fontSize,
    fontWeight: config.fontWeight,
    lineHeight: config.lineHeight,
    color: COLORS.text,
    border: "none",
    outline: "none",
    background: "transparent",
    width: "100%",
    padding: 0,
    margin: 0,
    boxSizing: "border-box",
  };

  const indicatorStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingLeft: config.indicatorPaddingX,
    paddingRight: config.indicatorPaddingX,
    flexShrink: 0,
    fontFamily: FONT_FAMILY,
    fontSize: config.indicatorFontSize,
    fontWeight: 400,
    lineHeight: config.indicatorLineHeight,
    color: COLORS.indicator,
    whiteSpace: "nowrap",
  };

  const helperTextStyle: CSSProperties = {
    fontFamily: FONT_FAMILY,
    fontSize: 12,
    fontWeight: 400,
    lineHeight: "18px",
    color: error ? COLORS.errorText : COLORS.indicator,
    paddingLeft: 4,
  };

  return (
    <div style={wrapperBaseStyle}>
      {label && (
        <div style={labelRowStyle}>
          <div style={labelContainerStyle}>
            <span style={labelTextStyle}>{label}</span>
            {required && <span style={requiredMarkStyle} />}
          </div>
        </div>
      )}
      <div style={fieldBaseStyle}>
        <div style={leftAreaStyle}>
          {resolvedLeftIcon && <span style={iconStyle}>{resolvedLeftIcon}</span>}
          <div style={inputTextWrapStyle}>
            <input
              disabled={disabled}
              style={inputStyle}
              onFocus={(e) => {
                setFocused(true);
                onFocus?.(e);
              }}
              onBlur={(e) => {
                setFocused(false);
                onBlur?.(e);
              }}
              {...rest}
            />
          </div>
        </div>
        {indicator != null && <span style={indicatorStyle}>{indicator}</span>}
        {rightIcon && <span style={iconStyle}>{rightIcon}</span>}
      </div>
      {helperText && <span style={helperTextStyle}>{helperText}</span>}
    </div>
  );
}
