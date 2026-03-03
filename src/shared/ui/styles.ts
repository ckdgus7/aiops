import type { CSSProperties } from "react";

const FONT_FAMILY = "'Pretendard', sans-serif";

export const typography = {
  title: {
    page: {
      fontFamily: FONT_FAMILY,
      fontSize: 32,
      fontWeight: 700,
      lineHeight: "40px",
      fontStyle: "normal",
    } satisfies CSSProperties,
    popup: {
      fontFamily: FONT_FAMILY,
      fontSize: 24,
      fontWeight: 700,
      lineHeight: "32px",
      fontStyle: "normal",
    } satisfies CSSProperties,
  },

  paragraphTitle: {
    xl: {
      fontFamily: FONT_FAMILY,
      fontSize: 20,
      fontWeight: 500,
      lineHeight: "32px",
      fontStyle: "normal",
    } satisfies CSSProperties,
    l: {
      fontFamily: FONT_FAMILY,
      fontSize: 18,
      fontWeight: 700,
      lineHeight: "28px",
      fontStyle: "normal",
    } satisfies CSSProperties,
    m: {
      fontFamily: FONT_FAMILY,
      fontSize: 16,
      fontWeight: 700,
      lineHeight: "24px",
      fontStyle: "normal",
    } satisfies CSSProperties,
    s: {
      fontFamily: FONT_FAMILY,
      fontSize: 14,
      fontWeight: 700,
      lineHeight: "20px",
      fontStyle: "normal",
    } satisfies CSSProperties,
    xs: {
      fontFamily: FONT_FAMILY,
      fontSize: 12,
      fontWeight: 700,
      lineHeight: "18px",
      fontStyle: "normal",
    } satisfies CSSProperties,
  },

  paragraph: {
    xl: {
      fontFamily: FONT_FAMILY,
      fontSize: 20,
      fontWeight: 400,
      lineHeight: "32px",
      fontStyle: "normal",
    } satisfies CSSProperties,
    l: {
      fontFamily: FONT_FAMILY,
      fontSize: 16,
      fontWeight: 400,
      lineHeight: "24px",
      fontStyle: "normal",
    } satisfies CSSProperties,
    m: {
      fontFamily: FONT_FAMILY,
      fontSize: 14,
      fontWeight: 400,
      lineHeight: "20px",
      fontStyle: "normal",
    } satisfies CSSProperties,
    s: {
      fontFamily: FONT_FAMILY,
      fontSize: 12,
      fontWeight: 400,
      lineHeight: "18px",
      fontStyle: "normal",
    } satisfies CSSProperties,
    xs: {
      fontFamily: FONT_FAMILY,
      fontSize: 10,
      fontWeight: 400,
      lineHeight: "16px",
      fontStyle: "normal",
    } satisfies CSSProperties,
  },

  field: {
    labelM: {
      fontFamily: FONT_FAMILY,
      fontSize: 14,
      fontWeight: 500,
      lineHeight: "18px",
      fontStyle: "normal",
    } satisfies CSSProperties,
    labelS: {
      fontFamily: FONT_FAMILY,
      fontSize: 12,
      fontWeight: 500,
      lineHeight: "16px",
      fontStyle: "normal",
    } satisfies CSSProperties,
    valueL: {
      fontFamily: FONT_FAMILY,
      fontSize: 16,
      fontWeight: 400,
      lineHeight: "24px",
      fontStyle: "normal",
    } satisfies CSSProperties,
    valueM: {
      fontFamily: FONT_FAMILY,
      fontSize: 14,
      fontWeight: 500,
      lineHeight: "20px",
      fontStyle: "normal",
    } satisfies CSSProperties,
    indicator: {
      fontFamily: FONT_FAMILY,
      fontSize: 12,
      fontWeight: 400,
      lineHeight: "18px",
      fontStyle: "normal",
    } satisfies CSSProperties,
    placeholderL: {
      fontFamily: FONT_FAMILY,
      fontSize: 16,
      fontWeight: 400,
      lineHeight: "24px",
      fontStyle: "normal",
    } satisfies CSSProperties,
  },
};

export const FONT = FONT_FAMILY;
