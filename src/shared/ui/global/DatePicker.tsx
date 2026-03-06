import { useState, useRef, useEffect, type CSSProperties } from "react";

const DATEPICKER_STYLE_ID = "datepicker-native-hide";
function ensureNativePickerHidden() {
  if (typeof document === "undefined") return;
  if (document.getElementById(DATEPICKER_STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = DATEPICKER_STYLE_ID;
  style.textContent = `
    input[type="date"]::-webkit-calendar-picker-indicator { display: none; -webkit-appearance: none; }
    input[type="date"]::-webkit-inner-spin-button { display: none; }
  `;
  document.head.appendChild(style);
}

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
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
  iconColor: "#71717a",
  errorText: "#f04438",
  disabledBg: "#fafafa",
};

function CalendarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="2.5" y="3.5" width="15" height="14" rx="2" stroke={COLORS.iconColor} strokeWidth="1.5" />
      <path d="M2.5 7.5H17.5" stroke={COLORS.iconColor} strokeWidth="1.5" />
      <path d="M6.5 2V5" stroke={COLORS.iconColor} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M13.5 2V5" stroke={COLORS.iconColor} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function DatePicker({
  value,
  onChange,
  placeholder = "YYYY-MM-DD",
  label,
  required = false,
  disabled = false,
  error = false,
  helperText,
  style,
  wrapperStyle,
}: DatePickerProps) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ensureNativePickerHidden();
  }, []);

  const borderColor = error
    ? COLORS.borderError
    : focused
      ? COLORS.borderFocus
      : COLORS.borderDefault;

  const wrapper: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    alignItems: "flex-start",
    width: "100%",
    ...wrapperStyle,
  };

  const labelRow: CSSProperties = {
    display: "flex",
    alignItems: "center",
  };

  const labelContainer: CSSProperties = {
    display: "flex",
    gap: 4,
    alignItems: "center",
    justifyContent: "center",
  };

  const labelText: CSSProperties = {
    fontFamily: FONT_FAMILY,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "18px",
    color: COLORS.label,
    whiteSpace: "nowrap",
  };

  const requiredMark: CSSProperties = {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.requiredMark,
    flexShrink: 0,
  };

  const fieldBase: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: 8,
    height: 40,
    backgroundColor: disabled ? COLORS.disabledBg : COLORS.background,
    border: `1px solid ${borderColor}`,
    borderRadius: 4,
    boxSizing: "border-box",
    width: "100%",
    opacity: disabled ? 0.6 : 1,
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "border-color 0.15s ease",
    ...style,
  };

  const leftArea: CSSProperties = {
    display: "flex",
    flex: "1 0 0",
    alignItems: "center",
    minWidth: 0,
    minHeight: 0,
  };

  const inputWrap: CSSProperties = {
    display: "flex",
    flex: "1 0 0",
    alignItems: "center",
    minWidth: 0,
    minHeight: 0,
    paddingLeft: 8,
    paddingRight: 8,
    position: "relative",
  };

  const inputEl: CSSProperties = {
    fontFamily: FONT_FAMILY,
    fontSize: 16,
    fontWeight: 400,
    lineHeight: "24px",
    color: value ? COLORS.text : COLORS.placeholder,
    border: "none",
    outline: "none",
    background: "transparent",
    width: "100%",
    padding: 0,
    margin: 0,
    boxSizing: "border-box",
    cursor: disabled ? "not-allowed" : "pointer",
  };

  const rightIcon: CSSProperties = {
    display: "flex",
    alignItems: "center",
    flexShrink: 0,
    width: 24,
    height: 24,
    justifyContent: "center",
    overflow: "hidden",
    cursor: disabled ? "not-allowed" : "pointer",
  };

  const helperStyle: CSSProperties = {
    fontFamily: FONT_FAMILY,
    fontSize: 12,
    fontWeight: 400,
    lineHeight: "18px",
    color: error ? COLORS.errorText : COLORS.label,
    paddingLeft: 4,
  };

  const handleFieldClick = () => {
    if (!disabled && inputRef.current) {
      inputRef.current.showPicker?.();
      inputRef.current.focus();
    }
  };

  return (
    <div style={wrapper}>
      {label && (
        <div style={labelRow}>
          <div style={labelContainer}>
            <span style={labelText}>{label}</span>
            {required && <span style={requiredMark} />}
          </div>
        </div>
      )}
      <div style={fieldBase} onClick={handleFieldClick}>
        <div style={leftArea}>
          <div style={inputWrap}>
            <input
              ref={inputRef}
              type="date"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              disabled={disabled}
              placeholder={placeholder}
              style={inputEl}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
            />
          </div>
        </div>
        <span style={rightIcon}>
          <CalendarIcon />
        </span>
      </div>
      {helperText && <span style={helperStyle}>{helperText}</span>}
    </div>
  );
}
