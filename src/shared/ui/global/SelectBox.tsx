import { useState, useRef, useEffect, type CSSProperties } from "react";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectBoxBaseProps {
  options: SelectOption[];
  placeholder?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  style?: CSSProperties;
  wrapperStyle?: CSSProperties;
}

interface SingleSelectBoxProps extends SelectBoxBaseProps {
  multiple?: false;
  value: string;
  onChange: (value: string) => void;
}

interface MultiSelectBoxProps extends SelectBoxBaseProps {
  multiple: true;
  value: string[];
  onChange: (value: string[]) => void;
}

type SelectBoxProps = SingleSelectBoxProps | MultiSelectBoxProps;

const FONT_FAMILY = "'Pretendard', sans-serif";

const COLORS = {
  label: "#a1a1aa",
  labelText: "#52525b",
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
  chipBg: "#fafaff",
  chipText: "#52525b",
  checkedBg: "#7a5af8",
  uncheckedBorder: "#e4e7ec",
  searchBorder: "#e4e7ec",
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

function ClearIcon({ size = 24, color = COLORS.iconColor }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" fill={color} opacity="0.15" />
      <path d="M9 9L15 15" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M15 9L9 15" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ChipCloseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M4 4L8 8" stroke={COLORS.chipText} strokeWidth="1" strokeLinecap="round" />
      <path d="M8 4L4 8" stroke={COLORS.chipText} strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z"
        stroke={COLORS.iconColor}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M16 16L12.1 12.1" stroke={COLORS.iconColor} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MiniCheckbox({ checked }: { checked: boolean }) {
  const boxStyle: CSSProperties = {
    width: 20,
    height: 20,
    borderRadius: 4,
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    ...(checked
      ? { backgroundColor: COLORS.checkedBg }
      : { backgroundColor: COLORS.background, border: `1px solid ${COLORS.uncheckedBorder}` }),
  };

  return (
    <div style={boxStyle}>
      {checked && (
        <svg width="12" height="9" viewBox="0 0 14 10" fill="none">
          <path d="M1 5L5 9L13 1" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  );
}

export function SelectBox(props: SelectBoxProps) {
  const {
    options,
    placeholder = "선택",
    label,
    required = false,
    disabled = false,
    error = false,
    helperText,
    searchable = false,
    searchPlaceholder = "검색",
    style,
    wrapperStyle,
    multiple = false,
  } = props;

  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearchText("");
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [open]);

  useEffect(() => {
    if (open && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [open, searchable]);

  const isMultiple = multiple === true;
  const singleValue = isMultiple ? "" : (props as SingleSelectBoxProps).value;
  const multiValue = isMultiple ? (props as MultiSelectBoxProps).value : [];

  const selectedOption = isMultiple ? null : options.find((o) => o.value === singleValue);
  const selectedOptions = isMultiple ? options.filter((o) => multiValue.includes(o.value)) : [];

  const filteredOptions = searchText
    ? options.filter((o) => o.label.toLowerCase().includes(searchText.toLowerCase()))
    : options;

  const borderColor = error
    ? COLORS.borderError
    : open
      ? COLORS.borderFocus
      : COLORS.borderDefault;

  const handleToggle = () => {
    if (!disabled) {
      setOpen((prev) => !prev);
      if (open) setSearchText("");
    }
  };

  const handleSingleSelect = (optionValue: string) => {
    if (!isMultiple) {
      (props as SingleSelectBoxProps).onChange(optionValue);
      setOpen(false);
      setSearchText("");
    }
  };

  const handleMultiToggle = (optionValue: string) => {
    if (isMultiple) {
      const current = (props as MultiSelectBoxProps).value;
      const onChange = (props as MultiSelectBoxProps).onChange;
      if (current.includes(optionValue)) {
        onChange(current.filter((v) => v !== optionValue));
      } else {
        onChange([...current, optionValue]);
      }
    }
  };

  const handleChipRemove = (optionValue: string) => {
    if (isMultiple) {
      const current = (props as MultiSelectBoxProps).value;
      const onChange = (props as MultiSelectBoxProps).onChange;
      onChange(current.filter((v) => v !== optionValue));
    }
  };

  const handleClearAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMultiple) {
      (props as MultiSelectBoxProps).onChange([]);
    } else {
      (props as SingleSelectBoxProps).onChange("");
    }
  };

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

  const labelStyle: CSSProperties = {
    fontFamily: FONT_FAMILY,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "18px",
    color: COLORS.labelText,
    whiteSpace: "nowrap",
  };

  const requiredMark: CSSProperties = {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.requiredMark,
    flexShrink: 0,
  };

  const hasChips = isMultiple && selectedOptions.length > 0;
  const hasClearable = isMultiple ? multiValue.length > 0 : !!singleValue;

  const fieldBase: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 4,
    padding: hasChips ? 6 : 8,
    minHeight: 40,
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
    flexWrap: hasChips ? "wrap" : undefined,
    ...style,
  };

  const chipsWrap: CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: 4,
    alignItems: "flex-start",
    flex: "1 0 0",
    paddingLeft: 4,
    minWidth: 0,
  };

  const chipStyle: CSSProperties = {
    display: "flex",
    gap: 4,
    alignItems: "center",
    justifyContent: "center",
    maxWidth: 130,
    paddingLeft: 6,
    paddingRight: 6,
    paddingTop: 3,
    paddingBottom: 3,
    borderRadius: 6,
    backgroundColor: COLORS.chipBg,
    flexShrink: 0,
  };

  const chipTextStyle: CSSProperties = {
    fontFamily: FONT_FAMILY,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "12px",
    color: COLORS.chipText,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: 103,
  };

  const chipCloseStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flexShrink: 0,
    width: 12,
    height: 12,
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

  const iconBtn: CSSProperties = {
    display: "flex",
    alignItems: "center",
    flexShrink: 0,
    width: 24,
    height: 24,
    justifyContent: "center",
    overflow: "hidden",
    cursor: "pointer",
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
    maxHeight: 296,
    overflowY: "auto",
    padding: "4px 0",
    boxSizing: "border-box",
  };

  const searchWrap: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 12px",
    borderBottom: `1px solid ${COLORS.searchBorder}`,
  };

  const searchInputStyle: CSSProperties = {
    flex: 1,
    border: "none",
    outline: "none",
    fontFamily: FONT_FAMILY,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "20px",
    color: COLORS.text,
    backgroundColor: "transparent",
    padding: 0,
  };

  const optionBase: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: isMultiple ? 10 : 0,
    padding: isMultiple ? "8px 16px" : "8px 16px",
    fontFamily: FONT_FAMILY,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "20px",
    color: COLORS.text,
    cursor: "pointer",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    height: 40,
    boxSizing: "border-box",
  };

  const helperStyle: CSSProperties = {
    fontFamily: FONT_FAMILY,
    fontSize: 12,
    fontWeight: 400,
    lineHeight: "18px",
    color: error ? COLORS.errorText : COLORS.label,
    paddingLeft: 4,
  };

  const isOptionSelected = (optionValue: string): boolean => {
    if (isMultiple) return multiValue.includes(optionValue);
    return singleValue === optionValue;
  };

  return (
    <div style={wrapper} ref={containerRef}>
      {label && (
        <div style={labelRow}>
          <div style={labelContainer}>
            <span style={labelStyle}>{label}</span>
            {required && <span style={requiredMark} />}
          </div>
        </div>
      )}
      <div style={fieldBase} onClick={handleToggle}>
        {hasChips ? (
          <div style={chipsWrap}>
            {selectedOptions.map((opt) => (
              <div key={opt.value} style={chipStyle}>
                <span style={chipTextStyle}>{opt.label}</span>
                <span
                  style={chipCloseStyle}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleChipRemove(opt.value);
                  }}
                >
                  <ChipCloseIcon />
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div style={textWrap}>
            <span style={textStyle}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
          </div>
        )}
        {hasClearable && (
          <span style={iconBtn} onClick={handleClearAll}>
            <ClearIcon />
          </span>
        )}
        <span style={iconBtn}>
          <ChevronDownIcon rotated={open} />
        </span>
        {open && (
          <div
            style={dropdown}
            onClick={(e) => e.stopPropagation()}
          >
            {searchable && (
              <div style={searchWrap}>
                <SearchIcon />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder={searchPlaceholder}
                  style={searchInputStyle}
                />
              </div>
            )}
            {filteredOptions.length === 0 ? (
              <div style={{ ...optionBase, color: COLORS.placeholder, cursor: "default" }}>
                검색 결과가 없습니다
              </div>
            ) : (
              filteredOptions.map((option) => {
                const selected = isOptionSelected(option.value);
                return (
                  <div
                    key={option.value}
                    style={{
                      ...optionBase,
                      backgroundColor: selected ? COLORS.activeBg : undefined,
                      fontWeight: selected ? 500 : 400,
                    }}
                    onMouseEnter={(e) => {
                      if (!selected) {
                        (e.currentTarget as HTMLDivElement).style.backgroundColor = COLORS.hoverBg;
                      }
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.backgroundColor =
                        selected ? COLORS.activeBg : "";
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isMultiple) {
                        handleMultiToggle(option.value);
                      } else {
                        handleSingleSelect(option.value);
                      }
                    }}
                  >
                    {isMultiple && <MiniCheckbox checked={selected} />}
                    <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                      {option.label}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
      {helperText && <span style={helperStyle}>{helperText}</span>}
    </div>
  );
}
