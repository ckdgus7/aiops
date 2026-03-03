import { useState, type CSSProperties, type TextareaHTMLAttributes } from "react";

interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size" | "style"> {
  label?: string;
  required?: boolean;
  indicator?: boolean;
  maxLength?: number;
  error?: boolean;
  helperText?: string;
  readOnly?: boolean;
  style?: CSSProperties;
  wrapperStyle?: CSSProperties;
}

const FONT_FAMILY = "'Pretendard', sans-serif";

const COLORS = {
  label: "#a1a1aa",
  requiredMark: "#36bffa",
  borderDefault: "#e4e7ec",
  borderFocus: "#7a5af8",
  borderError: "#ee46bc",
  background: "#ffffff",
  backgroundReadonly: "#fafafa",
  backgroundDisabled: "#f4f4f5",
  placeholder: "#a1a1aa",
  text: "#3f3f46",
  indicator: "#a1a1aa",
  errorText: "#ee46bc",
};

export function Textarea({
  label,
  required,
  indicator = true,
  maxLength = 300,
  error,
  helperText,
  readOnly,
  disabled,
  style,
  wrapperStyle,
  value,
  defaultValue,
  onChange,
  ...rest
}: TextareaProps) {
  const [focused, setFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(
    (defaultValue as string) ?? ""
  );
  const isControlled = value !== undefined;
  const currentValue = isControlled ? (value as string) : internalValue;
  const charCount = currentValue.length;

  const getBorderColor = (): string => {
    if (error) return COLORS.borderError;
    if (focused && !disabled && !readOnly) return COLORS.borderFocus;
    return COLORS.borderDefault;
  };

  const getBackgroundColor = (): string => {
    if (disabled) return COLORS.backgroundDisabled;
    if (readOnly) return COLORS.backgroundReadonly;
    return COLORS.background;
  };

  const outerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    ...wrapperStyle,
  };

  const labelRowStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 4,
  };

  const labelStyle: CSSProperties = {
    fontFamily: FONT_FAMILY,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "18px",
    color: COLORS.label,
  };

  const requiredDotStyle: CSSProperties = {
    width: 6,
    height: 6,
    borderRadius: "50%",
    backgroundColor: COLORS.requiredMark,
    flexShrink: 0,
  };

  const containerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    minHeight: 120,
    padding: 8,
    borderRadius: 4,
    border: `1px solid ${getBorderColor()}`,
    backgroundColor: getBackgroundColor(),
    boxSizing: "border-box",
    ...style,
  };

  const textareaStyle: CSSProperties = {
    width: "100%",
    flex: 1,
    border: "none",
    outline: "none",
    resize: "none",
    padding: 0,
    fontFamily: FONT_FAMILY,
    fontSize: 16,
    fontWeight: 400,
    lineHeight: "24px",
    color: COLORS.text,
    backgroundColor: "transparent",
    boxSizing: "border-box",
  };

  const indicatorRowStyle: CSSProperties = {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    padding: 0,
    boxSizing: "border-box",
    flexShrink: 0,
  };

  const indicatorTextStyle: CSSProperties = {
    fontFamily: FONT_FAMILY,
    fontSize: 12,
    fontWeight: 400,
    lineHeight: "18px",
    color: COLORS.indicator,
  };

  const helperTextStyle: CSSProperties = {
    fontFamily: FONT_FAMILY,
    fontSize: 12,
    fontWeight: 400,
    lineHeight: "18px",
    color: error ? COLORS.errorText : COLORS.indicator,
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isControlled) {
      setInternalValue(e.target.value);
    }
    onChange?.(e);
  };

  return (
    <div style={outerStyle}>
      {(label || required) && (
        <div style={labelRowStyle}>
          {label && <span style={labelStyle}>{label}</span>}
          {required && <span style={requiredDotStyle} />}
        </div>
      )}
      <div style={containerStyle}>
        <textarea
          {...rest}
          value={currentValue}
          readOnly={readOnly}
          disabled={disabled}
          maxLength={maxLength}
          onChange={handleChange}
          onFocus={(e) => {
            setFocused(true);
            rest.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            rest.onBlur?.(e);
          }}
          style={textareaStyle}
        />
        {indicator && (
          <div style={indicatorRowStyle}>
            <span style={indicatorTextStyle}>
              {charCount}/{maxLength}
            </span>
          </div>
        )}
      </div>
      {helperText && <span style={helperTextStyle}>{helperText}</span>}
    </div>
  );
}
