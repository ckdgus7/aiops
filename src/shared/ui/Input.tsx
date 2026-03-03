import type { CSSProperties, InputHTMLAttributes } from "react";

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
  width: "100%",
};

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input(props: InputProps) {
  return <input style={inputStyle} {...props} />;
}
