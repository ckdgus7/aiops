import type { CSSProperties, ReactNode, ButtonHTMLAttributes } from "react";

const FONT_FAMILY = "'Pretendard', sans-serif";

type ButtonSize = "l" | "m" | "s";
type ButtonVariant = "filled" | "outlined" | "text";
type ButtonColor = "positive" | "negative" | "warning" | "success" | "info";

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "style"> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  color?: ButtonColor;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  children?: ReactNode;
  style?: CSSProperties;
}

const COLOR_MAP: Record<ButtonColor, string> = {
  positive: "#7a5af8",
  negative: "#f04438",
  warning: "#f79009",
  success: "#1ac057",
  info: "#71717a",
};

const SIZE_CONFIG: Record<
  ButtonSize,
  {
    height: number;
    padding: number;
    iconSize: number;
    fontSize: number;
    fontWeight: number;
    lineHeight: string;
    textPaddingX: number;
    borderWidth: number;
  }
> = {
  l: {
    height: 40,
    padding: 8,
    iconSize: 24,
    fontSize: 16,
    fontWeight: 700,
    lineHeight: "24px",
    textPaddingX: 6,
    borderWidth: 1,
  },
  m: {
    height: 32,
    padding: 6,
    iconSize: 20,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "20px",
    textPaddingX: 6,
    borderWidth: 1,
  },
  s: {
    height: 24,
    padding: 4,
    iconSize: 18,
    fontSize: 12,
    fontWeight: 400,
    lineHeight: "18px",
    textPaddingX: 6,
    borderWidth: 1,
  },
};

function getButtonStyles(
  size: ButtonSize,
  variant: ButtonVariant,
  color: ButtonColor,
  disabled: boolean
): { base: CSSProperties; text: CSSProperties; icon: CSSProperties } {
  const sizeConfig = SIZE_CONFIG[size];
  const colorValue = COLOR_MAP[color];

  const baseStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: sizeConfig.padding,
    borderRadius: 4,
    border: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.4 : 1,
    boxSizing: "border-box",
    height: sizeConfig.height,
    outline: "none",
    fontFamily: FONT_FAMILY,
    transition: "opacity 0.15s ease",
  };

  const textStyle: CSSProperties = {
    fontFamily: FONT_FAMILY,
    fontSize: sizeConfig.fontSize,
    fontWeight: sizeConfig.fontWeight,
    lineHeight: sizeConfig.lineHeight,
    textAlign: "center",
    whiteSpace: "nowrap",
    paddingLeft: sizeConfig.textPaddingX,
    paddingRight: sizeConfig.textPaddingX,
  };

  const iconStyle: CSSProperties = {
    width: sizeConfig.iconSize,
    height: sizeConfig.iconSize,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    overflow: "hidden",
  };

  if (variant === "filled") {
    baseStyle.backgroundColor = colorValue;
    baseStyle.color = "#ffffff";
    textStyle.color = "#ffffff";
  } else if (variant === "outlined") {
    baseStyle.backgroundColor = "#ffffff";
    baseStyle.border = `${sizeConfig.borderWidth}px solid ${colorValue}`;
    baseStyle.color = colorValue;
    textStyle.color = colorValue;
  } else {
    baseStyle.backgroundColor = "transparent";
    baseStyle.color = colorValue;
    textStyle.color = colorValue;
  }

  return { base: baseStyle, text: textStyle, icon: iconStyle };
}

export function Button({
  size = "l",
  variant = "filled",
  color = "positive",
  leadingIcon,
  trailingIcon,
  children,
  disabled = false,
  style,
  ...rest
}: ButtonProps) {
  const styles = getButtonStyles(size, variant, color, disabled);

  return (
    <button
      disabled={disabled}
      style={{ ...styles.base, ...style }}
      {...rest}
    >
      {leadingIcon && <span style={styles.icon}>{leadingIcon}</span>}
      {children != null && <span style={styles.text}>{children}</span>}
      {trailingIcon && <span style={styles.icon}>{trailingIcon}</span>}
    </button>
  );
}
