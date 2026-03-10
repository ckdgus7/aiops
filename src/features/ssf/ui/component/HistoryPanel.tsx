import { type CSSProperties } from "react";
import { FONT } from "@/shared/ui/styles";

interface HistoryItemData {
  type: string;
  typeColor: string;
  typeBg: string;
  typeBorderColor: string;
  user: string;
  date: string;
  active: boolean;
}

const HISTORY_DATA: HistoryItemData[] = [
  {
    type: "수정",
    typeColor: "#f79009",
    typeBg: "#fffaeb",
    typeBorderColor: "#f79009",
    user: "전우치",
    date: "2025-11-28 15:24",
    active: true,
  },
  {
    type: "수정",
    typeColor: "#f79009",
    typeBg: "#fffaeb",
    typeBorderColor: "#f79009",
    user: "홍길동",
    date: "2025-11-20 09:15",
    active: false,
  },
  {
    type: "저장",
    typeColor: "#1ac057",
    typeBg: "#f2fdf5",
    typeBorderColor: "#1ac057",
    user: "이순신",
    date: "2025-11-15 14:30",
    active: false,
  },
];

function HistoryItem({
  type,
  typeColor,
  typeBg,
  typeBorderColor,
  user,
  date,
  isFirst,
  isLast,
  active,
}: {
  type: string;
  typeColor: string;
  typeBg: string;
  typeBorderColor: string;
  user: string;
  date: string;
  isFirst?: boolean;
  isLast?: boolean;
  active?: boolean;
}) {
  return (
    <div style={s.historyItem}>
      <div style={s.historyMark}>
        {!isFirst && <div style={s.historyLineTop} />}
        <div
          style={{
            ...s.historyDot,
            backgroundColor: active ? "#7a5af8" : "#d4d4d8",
          }}
        />
        {!isLast && <div style={s.historyLineBottom} />}
      </div>
      <div style={s.historyContent}>
        <span
          style={{
            ...s.historyBadge,
            color: typeColor,
            backgroundColor: typeBg,
            borderColor: typeBorderColor,
          }}
        >
          {type}
        </span>
        <span style={s.historyUser}>{user}</span>
        <span style={s.historyDate}>{date}</span>
      </div>
    </div>
  );
}

export function HistoryPanel() {
  return (
    <div style={s.historyPanel}>
      <div style={s.historyList}>
        {HISTORY_DATA.map((h, i) => (
          <HistoryItem
            key={i}
            type={h.type}
            typeColor={h.typeColor}
            typeBg={h.typeBg}
            typeBorderColor={h.typeBorderColor}
            user={h.user}
            date={h.date}
            isFirst={i === 0}
            isLast={i === HISTORY_DATA.length - 1}
            active={h.active}
          />
        ))}
      </div>
    </div>
  );
}

const s = {
  historyPanel: {
    width: 190,
    flexShrink: 0,
    backgroundColor: "#fafafa",
    borderLeft: "1px solid #e4e4e7",
    padding: 24,
  } satisfies CSSProperties,
  historyList: {
    display: "flex",
    flexDirection: "column",
  } satisfies CSSProperties,
  historyItem: {
    display: "flex",
    gap: 8,
    alignItems: "flex-start",
    minWidth: 142,
  } satisfies CSSProperties,
  historyMark: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "stretch",
    width: 20,
    flexShrink: 0,
    position: "relative",
  } satisfies CSSProperties,
  historyLineTop: {
    width: 1,
    height: 6,
    backgroundColor: "#e4e4e7",
    flexShrink: 0,
  } satisfies CSSProperties,
  historyDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    flexShrink: 0,
  } satisfies CSSProperties,
  historyLineBottom: {
    width: 1,
    flex: 1,
    backgroundColor: "#e4e4e7",
  } satisfies CSSProperties,
  historyContent: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    paddingBottom: 16,
    minWidth: 100,
  } satisfies CSSProperties,
  historyBadge: {
    fontFamily: FONT,
    fontSize: 10,
    fontWeight: 500,
    lineHeight: "12px",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 12,
    padding: "3px 10px",
    alignSelf: "flex-start",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  historyUser: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "20px",
    color: "#3f3f46",
  } satisfies CSSProperties,
  historyDate: {
    fontFamily: FONT,
    fontSize: 12,
    fontWeight: 400,
    lineHeight: "18px",
    color: "#3f3f46",
  } satisfies CSSProperties,
};
