import type { CSSProperties } from "react";

const inputStyle: CSSProperties = {
  flex: 1,
  height: 36,
  border: "1px solid #ddd",
  borderRadius: 6,
  padding: "0 10px",
  fontSize: 14,
  color: "#222",
  background: "#fff",
  outline: "none",
  boxSizing: "border-box",
  cursor: "pointer",
};

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function DatePicker({ value, onChange, placeholder = "YYYY-MM-DD" }: DatePickerProps) {
  return (
    <input
      type="date"
      style={inputStyle}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
}
