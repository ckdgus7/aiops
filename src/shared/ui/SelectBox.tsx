import { useState, useRef, useEffect, type CSSProperties } from "react";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectBoxProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
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
  dropdownShadow: "0 4px 16px rgba(0,0,0,0.10)",
  hoverBg: "#f4f4f5",
  activeBg: "#ede9fe",
};

function ChevronDownIcon({ rotated }: { rotated?: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      style={{
        transition: "transform 0.15s ease",
        transform: rotated ? "rotate(180deg)" : "rotate(0deg)",
      }}
    >
      <path
        d="M6 9L12 15L18 9"
        stroke={COLORS.iconColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SelectBox({
  value,
  onChange,
  options,
  placeholder = "선택",
  label,
  required = false,
  disabled = false,
  error = false,
  helperText,
  style,
  wrapperStyle,
}: SelectBoxProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [open]);

  const selectedOption = options.find((o) => o.value === value);

  const borderColor = error
    ? COLORS.borderError
    : open
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
    position: "relative",
    userSelect: "none",
    ...style,
  };

  const leftArea: CSSProperties = {
    display: "flex",
    flex: "1 0 0",
    alignItems: "center",
    minWidth: 0,
    minHeight: 0,
  };

  const textWrap: CSSProperties = {
    display: "flex",
    flex: "1 0 0",
    alignItems: "center",
    minWidth: 0,
    minHeight: 0,
    paddingLeft: 8,
    paddingRight: 8,
  };

  const textStyle: CSSProperties = {
    fontFamily: FONT_FAMILY,
    fontSize: 16,
    fontWeight: 400,
    lineHeight: "24px",
    color: selectedOption ? COLORS.text : COLORS.placeholder,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  const rightIcon: CSSProperties = {
    display: "flex",
    alignItems: "center",
    flexShrink: 0,
    width: 24,
    height: 24,
    justifyContent: "center",
    overflow: "hidden",
  };

  const dropdown: CSSProperties = {
    position: "absolute",
    top: "calc(100% + 4px)",
    left: 0,
    right: 0,
    backgroundColor: COLORS.background,
    border: `1px solid ${COLORS.borderDefault}`,
    borderRadius: 4,
    boxShadow: COLORS.dropdownShadow,
    zIndex: 1000,
    maxHeight: 240,
    overflowY: "auto",
    padding: "4px 0",
    boxSizing: "border-box",
  };

  const optionBase: CSSProperties = {
    display: "flex",
    alignItems: "center",
    padding: "8px 16px",
    fontFamily: FONT_FAMILY,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "20px",
    color: COLORS.text,
    cursor: "pointer",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  const helperStyle: CSSProperties = {
    fontFamily: FONT_FAMILY,
    fontSize: 12,
    fontWeight: 400,
    lineHeight: "18px",
    color: error ? COLORS.errorText : COLORS.label,
    paddingLeft: 4,
  };

  const handleToggle = () => {
    if (!disabled) setOpen((prev) => !prev);
  };

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setOpen(false);
  };

  return (
    <div style={wrapper} ref={containerRef}>
      {label && (
        <div style={labelRow}>
          <div style={labelContainer}>
            <span style={labelText}>{label}</span>
            {required && <span style={requiredMark} />}
          </div>
        </div>
      )}
      <div style={fieldBase} onClick={handleToggle}>
        <div style={leftArea}>
          <div style={textWrap}>
            <span style={textStyle}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
          </div>
        </div>
        <span style={rightIcon}>
          <ChevronDownIcon rotated={open} />
        </span>
        {open && (
          <div style={dropdown}>
            {options.map((option) => (
              <div
                key={option.value}
                style={{
                  ...optionBase,
                  backgroundColor: option.value === value ? COLORS.activeBg : undefined,
                  fontWeight: option.value === value ? 500 : 400,
                }}
                onMouseEnter={(e) => {
                  if (option.value !== value) {
                    (e.currentTarget as HTMLDivElement).style.backgroundColor = COLORS.hoverBg;
                  }
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.backgroundColor =
                    option.value === value ? COLORS.activeBg : "";
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(option.value);
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
      {helperText && <span style={helperStyle}>{helperText}</span>}
    </div>
  );
}
