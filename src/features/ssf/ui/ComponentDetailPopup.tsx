import { useState, useEffect, type CSSProperties } from "react";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { SelectBox } from "@/shared/ui/SelectBox";
import { RadioGroup } from "@/shared/ui/RadioGroup";
import { TiptapEditor } from "@/shared/ui/TiptapEditor";
import { AlertModal } from "@/shared/ui/AlertModal";
import type { ComponentItem } from "@/features/ssf/model/types";
import { DOMAIN_MOCK_DATA } from "@/features/ssf/model/mock-data";

const FONT = "'Pretendard', sans-serif";

interface ComponentDetailPopupProps {
  open: boolean;
  onClose: () => void;
  item: ComponentItem | null;
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M6 6L18 18" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18 6L6 18" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function HistoryIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 4V9L12 11" stroke="#7a5af8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 1.5C4.86 1.5 1.5 4.86 1.5 9C1.5 13.14 4.86 16.5 9 16.5C13.14 16.5 16.5 13.14 16.5 9C16.5 4.86 13.14 1.5 9 1.5Z" stroke="#7a5af8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M7 11L11 7" stroke="#71717a" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M10.5 11.5L8.5 13.5C7.39543 14.6046 5.60457 14.6046 4.5 13.5V13.5C3.39543 12.3954 3.39543 10.6046 4.5 9.5L6.5 7.5" stroke="#71717a" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M7.5 6.5L9.5 4.5C10.6046 3.39543 12.3954 3.39543 13.5 4.5V4.5C14.6046 5.60457 14.6046 7.39543 13.5 8.5L11.5 10.5" stroke="#71717a" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function BpdIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="1" y="1" width="18" height="18" rx="4" fill="#7a5af8" />
      <path d="M6 7H14M6 10H14M6 13H10" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function DeleteIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M4.5 9H13.5" stroke="#f04438" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function AddIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M6 1V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M1 6H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function L2RoleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="10" fill="#ede9fe" />
      <text x="10" y="14" textAnchor="middle" fill="#7a5af8" fontSize="9" fontWeight="700" fontFamily="Pretendard, sans-serif">L2</text>
    </svg>
  );
}

interface L3Item {
  id: string;
  name: string;
  hasBpd: boolean;
}

const MOCK_L3_ITEMS: L3Item[] = [
  { id: "BZ-PTYTMFC028-0022", name: "대리점정보관리", hasBpd: true },
  { id: "BZ-PTYTMFC028-0021", name: "파트너사정보관리", hasBpd: true },
  { id: "BZ-PTYTMFC028-0020", name: "제휴서비스관리", hasBpd: false },
  { id: "BZ-PTYTMFC028-0019", name: "마케팅분석관리", hasBpd: true },
  { id: "BZ-PTYTMFC028-0018", name: "고객세분화관리", hasBpd: false },
];

interface HistoryEntry {
  name: string;
  date: string;
  active: boolean;
}

const MOCK_HISTORY: HistoryEntry[] = [
  { name: "전상세", date: "2025-11-28 15:24", active: true },
  { name: "전상세", date: "2025-11-28 15:24", active: false },
  { name: "원본", date: "2025-11-28 15:24", active: false },
];

interface LeaderItem {
  name: string;
  org: string;
}

const st = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  } satisfies CSSProperties,
  popup: {
    width: 880,
    maxHeight: "90vh",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    boxShadow: "0 4px 24px rgba(0, 0, 0, 0.12)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  } satisfies CSSProperties,
  header: {
    display: "flex",
    flexDirection: "column",
    padding: "32px 32px 16px 32px",
    flexShrink: 0,
  } satisfies CSSProperties,
  headerWithMessage: {
    display: "flex",
    flexDirection: "column",
    padding: "32px 32px 16px 32px",
    gap: 12,
    flexShrink: 0,
  } satisfies CSSProperties,
  titleRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    gap: 10,
  } satisfies CSSProperties,
  titleText: {
    fontFamily: FONT,
    fontSize: 24,
    fontWeight: 700,
    lineHeight: "32px",
    color: "#52525b",
    flex: 1,
  } satisfies CSSProperties,
  closeBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 32,
    height: 32,
    border: "none",
    background: "transparent",
    cursor: "pointer",
    borderRadius: 4,
    padding: 0,
  } satisfies CSSProperties,
  requiredRow: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  } satisfies CSSProperties,
  requiredMark: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#36bffa",
    flexShrink: 0,
  } satisfies CSSProperties,
  requiredText: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "18px",
    color: "#52525b",
  } satisfies CSSProperties,
  main: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
    padding: "24px 32px",
    overflowY: "auto",
    flex: 1,
  } satisfies CSSProperties,
  topArea: {
    display: "flex",
    gap: 24,
    alignItems: "flex-start",
    width: "100%",
  } satisfies CSSProperties,
  leftCol: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
    flex: 1,
    minWidth: 0,
  } satisfies CSSProperties,
  rightCol: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    width: 150,
    flexShrink: 0,
    paddingLeft: 8,
  } satisfies CSSProperties,
  infoRow: {
    display: "flex",
    gap: 32,
    alignItems: "flex-start",
    width: "100%",
  } satisfies CSSProperties,
  infoRowWithHistory: {
    display: "flex",
    gap: 32,
    alignItems: "flex-start",
    width: "100%",
    justifyContent: "space-between",
  } satisfies CSSProperties,
  labelControl: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    flexShrink: 0,
  } satisfies CSSProperties,
  labelControlFull: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    width: "100%",
  } satisfies CSSProperties,
  label: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "18px",
    color: "#a1a1aa",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  value: {
    fontFamily: FONT,
    fontSize: 16,
    fontWeight: 400,
    lineHeight: "24px",
    color: "#3f3f46",
  } satisfies CSSProperties,
  historyBtn: {
    display: "flex",
    alignItems: "center",
    gap: 3,
    padding: "0 4px",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    borderRadius: 36,
    flexShrink: 0,
  } satisfies CSSProperties,
  historyBtnText: {
    fontFamily: FONT,
    fontSize: 12,
    fontWeight: 400,
    lineHeight: "18px",
    color: "#7a5af8",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  domainBox: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
    padding: 16,
    border: "1px solid #e4e4e7",
    borderRadius: 8,
    width: "100%",
    boxSizing: "border-box",
  } satisfies CSSProperties,
  domainRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px 32px",
    alignItems: "flex-start",
    width: "100%",
  } satisfies CSSProperties,
  l3Header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  } satisfies CSSProperties,
  l3Label: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "18px",
    color: "#a1a1aa",
  } satisfies CSSProperties,
  l3Actions: {
    display: "flex",
    gap: 24,
    alignItems: "center",
    paddingBottom: 8,
  } satisfies CSSProperties,
  l3List: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    width: "100%",
  } satisfies CSSProperties,
  l3Item: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    minHeight: 40,
    padding: "8px 12px 8px 8px",
    border: "1px solid #e4e4e7",
    borderRadius: 4,
    backgroundColor: "#ffffff",
    boxSizing: "border-box",
    width: "100%",
  } satisfies CSSProperties,
  l3ItemContent: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    minWidth: 0,
    justifyContent: "center",
  } satisfies CSSProperties,
  l3ItemRow: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    width: "100%",
  } satisfies CSSProperties,
  l3Badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 2,
    padding: "3px 10px 3px 3px",
    border: "1px solid #7a5af8",
    borderRadius: 12,
    flexShrink: 0,
  } satisfies CSSProperties,
  l3BadgeDot: {
    width: 12,
    height: 12,
    borderRadius: 8,
    backgroundColor: "#7a5af8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  } satisfies CSSProperties,
  l3BadgeDotText: {
    fontFamily: FONT,
    fontSize: 8,
    fontWeight: 700,
    lineHeight: "0",
    color: "#ffffff",
    textAlign: "center",
  } satisfies CSSProperties,
  l3BadgeText: {
    fontFamily: FONT,
    fontSize: 10,
    fontWeight: 500,
    lineHeight: "12px",
    color: "#7a5af8",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  l3Name: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "20px",
    color: "#3f3f46",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    flex: 1,
    minWidth: 0,
  } satisfies CSSProperties,
  l3IconBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
    border: "1px solid #71717a",
    borderRadius: 4,
    backgroundColor: "#ffffff",
    cursor: "pointer",
    flexShrink: 0,
  } satisfies CSSProperties,
  l3DeleteBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
    border: "1px solid #f04438",
    borderRadius: 4,
    backgroundColor: "#ffffff",
    cursor: "pointer",
    flexShrink: 0,
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
  } satisfies CSSProperties,
  historyDotRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 20,
    height: 20,
    position: "relative",
  } satisfies CSSProperties,
  historyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  } satisfies CSSProperties,
  historyLine: {
    width: 1,
    flex: 1,
    backgroundColor: "#e4e4e7",
  } satisfies CSSProperties,
  historyCol: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    minWidth: 100,
    paddingBottom: 16,
  } satisfies CSSProperties,
  historyName: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "20px",
    color: "#3f3f46",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  historyDate: {
    fontFamily: FONT,
    fontSize: 12,
    fontWeight: 400,
    lineHeight: "18px",
    color: "#3f3f46",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 32px 32px 32px",
    flexShrink: 0,
  } satisfies CSSProperties,
  footerLeft: {
    display: "flex",
    alignItems: "center",
  } satisfies CSSProperties,
  footerRight: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  } satisfies CSSProperties,
  fieldRow: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    width: "100%",
  } satisfies CSSProperties,
  labelRow: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  } satisfies CSSProperties,
  inputWithBtn: {
    display: "flex",
    gap: 10,
    alignItems: "flex-start",
    width: "100%",
  } satisfies CSSProperties,
  editorLabel: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "18px",
    color: "#a1a1aa",
    marginBottom: 12,
  } satisfies CSSProperties,
  leaderList: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    width: "100%",
  } satisfies CSSProperties,
  leaderItem: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    minHeight: 40,
    padding: "8px 12px 8px 8px",
    border: "1px solid #e4e4e7",
    borderRadius: 4,
    backgroundColor: "#ffffff",
    boxSizing: "border-box",
    width: "100%",
  } satisfies CSSProperties,
  leaderItemContent: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    gap: 4,
    minWidth: 0,
  } satisfies CSSProperties,
  leaderName: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "20px",
    color: "#3f3f46",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  leaderOrg: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    opacity: 0.3,
  } satisfies CSSProperties,
  leaderOrgSep: {
    width: 1,
    height: 10,
    backgroundColor: "black",
  } satisfies CSSProperties,
  leaderOrgText: {
    fontFamily: FONT,
    fontSize: 12,
    fontWeight: 400,
    lineHeight: "18px",
    color: "black",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
};

function HistoryTimeline({ entries }: { entries: HistoryEntry[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {entries.map((entry, idx) => {
        const isFirst = idx === 0;
        const isLast = idx === entries.length - 1;
        return (
          <div key={idx} style={st.historyItem}>
            <div style={st.historyMark}>
              <div style={st.historyDotRow}>
                {!isFirst && (
                  <div style={{ position: "absolute", top: 0, bottom: "50%", width: 1, backgroundColor: "#e4e4e7" }} />
                )}
                <div style={{ ...st.historyDot, backgroundColor: entry.active ? "#7a5af8" : "#d4d4d8", position: "relative", zIndex: 1 }} />
                {!isLast && (
                  <div style={{ position: "absolute", top: "50%", bottom: 0, width: 1, backgroundColor: "#e4e4e7" }} />
                )}
              </div>
              {!isLast && <div style={st.historyLine} />}
            </div>
            <div style={st.historyCol}>
              <span style={st.historyName}>{entry.name}</span>
              <span style={st.historyDate}>{entry.date}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function L3ListItem({ item }: { item: L3Item }) {
  return (
    <div style={st.l3Item}>
      <div style={st.l3ItemContent}>
        <div style={st.l3ItemRow}>
          <div style={st.l3Badge}>
            <div style={st.l3BadgeDot}>
              <span style={st.l3BadgeDotText}>L3</span>
            </div>
            <span style={st.l3BadgeText}>{item.id}</span>
          </div>
          <span style={st.l3Name}>{item.name}</span>
        </div>
      </div>
      {item.hasBpd && (
        <div style={{ flexShrink: 0 }}>
          <BpdIcon />
        </div>
      )}
      <button style={st.l3IconBtn} type="button">
        <LinkIcon />
      </button>
      <button style={st.l3DeleteBtn} type="button">
        <DeleteIcon />
      </button>
    </div>
  );
}

function LeaderListItemRow({ leader, onDelete }: { leader: LeaderItem; onDelete: () => void }) {
  return (
    <div style={st.leaderItem}>
      <div style={st.leaderItemContent}>
        <span style={st.leaderName}>{leader.name}</span>
        <L2RoleIcon />
        <div style={st.leaderOrg}>
          <div style={st.leaderOrgSep} />
          <span style={st.leaderOrgText}>{leader.org}</span>
        </div>
      </div>
      <button style={st.l3DeleteBtn} type="button" onClick={onDelete}>
        <DeleteIcon />
      </button>
    </div>
  );
}

const BASE_DOMAIN_OPTIONS = DOMAIN_MOCK_DATA
  .filter((d) => d.useYn === "사용")
  .map((d) => ({ label: d.nameKo, value: d.nameKo }));

function getDomainOptions(currentValue?: string) {
  if (currentValue && !BASE_DOMAIN_OPTIONS.some((o) => o.value === currentValue)) {
    return [{ label: currentValue, value: currentValue }, ...BASE_DOMAIN_OPTIONS];
  }
  return BASE_DOMAIN_OPTIONS;
}

const USE_YN_OPTIONS = [
  { label: "사용", value: "사용" },
  { label: "미사용", value: "미사용" },
];

interface ComponentEditPopupProps {
  open: boolean;
  onClose: () => void;
  item: ComponentItem | null;
}

function ComponentEditPopup({ open, onClose, item }: ComponentEditPopupProps) {
  const [domainNameKo, setDomainNameKo] = useState("");
  const [nameKo, setNameKo] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [planLeaderInput, setPlanLeaderInput] = useState("");
  const [designLeaderInput, setDesignLeaderInput] = useState("");
  const [planLeaders, setPlanLeaders] = useState<LeaderItem[]>([]);
  const [designLeaders, setDesignLeaders] = useState<LeaderItem[]>([]);
  const [description, setDescription] = useState("");
  const [useYn, setUseYn] = useState("사용");

  useEffect(() => {
    if (open && item) {
      setDomainNameKo(item.domainNameKo);
      setNameKo(item.nameKo);
      setNameEn(item.nameEn);
      setPlanLeaderInput("");
      setDesignLeaderInput("");
      setPlanLeaders([{ name: item.planLeader, org: "Nova 추진팀" }]);
      setDesignLeaders([{ name: item.designLeader, org: "Nova 추진팀" }]);
      setDescription(item.description);
      setUseYn(item.useYn);
    }
  }, [open, item]);

  if (!open || !item) return null;

  const isValid = domainNameKo && nameKo.trim() && nameEn.trim() && planLeaders.length > 0 && designLeaders.length > 0;

  const handleAddPlanLeader = () => {
    if (!planLeaderInput.trim()) return;
    setPlanLeaders((prev) => [...prev, { name: planLeaderInput.trim(), org: "Nova 추진팀" }]);
    setPlanLeaderInput("");
  };

  const handleAddDesignLeader = () => {
    if (!designLeaderInput.trim()) return;
    setDesignLeaders((prev) => [...prev, { name: designLeaderInput.trim(), org: "Nova 추진팀" }]);
    setDesignLeaderInput("");
  };

  const handleSave = () => {
    if (!isValid) return;
    onClose();
  };

  return (
    <div style={st.overlay} onClick={onClose}>
      <div style={st.popup} onClick={(e) => e.stopPropagation()}>
        <div style={st.headerWithMessage}>
          <div style={st.titleRow}>
            <span style={st.titleText}>컴포넌트(L2) 수정</span>
            <button style={st.closeBtn} onClick={onClose} type="button">
              <CloseIcon />
            </button>
          </div>
          <div style={st.requiredRow}>
            <div style={st.requiredMark} />
            <span style={st.requiredText}>표시는 필수로 입력하세요.</span>
          </div>
        </div>

        <div style={st.main}>
          <div style={st.fieldRow}>
            <SelectBox
              label="도메인(한글) 명"
              required
              value={domainNameKo}
              onChange={setDomainNameKo}
              options={getDomainOptions(item.domainNameKo)}
              placeholder="도메인(L1) 명을 선택하세요."
            />
          </div>

          <div style={st.fieldRow}>
            <Input
              label="컴포넌트(한글) 명"
              required
              value={nameKo}
              onChange={(e) => setNameKo(e.target.value)}
              placeholder="컴포넌트(한글) 명을 입력하세요."
              maxLength={70}
              indicator={`${nameKo.length}/70`}
            />
          </div>

          <div style={st.fieldRow}>
            <Input
              label="컴포넌트(영문) 명"
              required
              value={nameEn}
              onChange={(e) => setNameEn(e.target.value)}
              placeholder="컴포넌트(영문) 명을 입력하세요."
              maxLength={70}
              indicator={`${nameEn.length}/70`}
            />
          </div>

          <div style={st.fieldRow}>
            <div style={st.labelRow}>
              <span style={st.label}>L2기획리더</span>
              <div style={st.requiredMark} />
            </div>
            <div style={st.inputWithBtn}>
              <Input
                value={planLeaderInput}
                onChange={(e) => setPlanLeaderInput(e.target.value)}
                placeholder="담당자를 선택하거나 검색하세요."
                style={{ flex: 1 }}
              />
              <Button
                size="l"
                variant="outlined"
                color="positive"
                disabled={!planLeaderInput.trim()}
                leadingIcon={<AddIcon />}
                onClick={handleAddPlanLeader}
              >
                추가
              </Button>
            </div>
            {planLeaders.length > 0 && (
              <div style={st.leaderList}>
                {planLeaders.map((leader, idx) => (
                  <LeaderListItemRow
                    key={`${leader.name}-${idx}`}
                    leader={leader}
                    onDelete={() => setPlanLeaders((prev) => prev.filter((_, i) => i !== idx))}
                  />
                ))}
              </div>
            )}
          </div>

          <div style={st.fieldRow}>
            <div style={st.labelRow}>
              <span style={st.label}>L2설계리더</span>
              <div style={st.requiredMark} />
            </div>
            <div style={st.inputWithBtn}>
              <Input
                value={designLeaderInput}
                onChange={(e) => setDesignLeaderInput(e.target.value)}
                placeholder="담당자를 선택하거나 검색하세요."
                style={{ flex: 1 }}
              />
              <Button
                size="l"
                variant="outlined"
                color="positive"
                disabled={!designLeaderInput.trim()}
                leadingIcon={<AddIcon />}
                onClick={handleAddDesignLeader}
              >
                추가
              </Button>
            </div>
            {designLeaders.length > 0 && (
              <div style={st.leaderList}>
                {designLeaders.map((leader, idx) => (
                  <LeaderListItemRow
                    key={`${leader.name}-${idx}`}
                    leader={leader}
                    onDelete={() => setDesignLeaders((prev) => prev.filter((_, i) => i !== idx))}
                  />
                ))}
              </div>
            )}
          </div>

          <div style={st.fieldRow}>
            <span style={st.editorLabel}>컴포넌트(L2) 설명</span>
            <TiptapEditor
              value={description}
              onChange={setDescription}
              placeholder="컴포넌트(L2) 설명을 입력하세요."
              minHeight={400}
            />
          </div>

          <div style={st.fieldRow}>
            <div style={st.labelRow}>
              <span style={st.label}>사용여부</span>
            </div>
            <RadioGroup
              value={useYn}
              onChange={setUseYn}
              options={USE_YN_OPTIONS}
              size="l"
              direction="horizontal"
              gap={32}
            />
          </div>
        </div>

        <div style={st.footer}>
          <div style={st.footerLeft}>
            <Button size="l" variant="outlined" color="info" onClick={onClose}>
              닫기
            </Button>
          </div>
          <div style={st.footerRight}>
            <Button size="l" variant="filled" color="positive" disabled={!isValid} onClick={handleSave}>
              저장
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ComponentDeletePopupProps {
  open: boolean;
  onClose: () => void;
  onConfirmDelete: () => void;
}

function ComponentDeletePopup({ open, onClose, onConfirmDelete }: ComponentDeletePopupProps) {
  const [reason, setReason] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);

  useEffect(() => {
    if (open) {
      setReason("");
      setAlertOpen(false);
    }
  }, [open]);

  if (!open) return null;

  const canDelete = reason.trim().length > 0;

  const handleDelete = () => {
    if (!canDelete) return;
    setAlertOpen(true);
  };

  const handleConfirmAlert = () => {
    setAlertOpen(false);
    onConfirmDelete();
  };

  return (
    <div style={{ ...st.overlay, zIndex: 1002 }} onClick={onClose}>
      <div style={{ ...st.popup, maxHeight: "auto", overflow: "visible" }} onClick={(e) => e.stopPropagation()}>
        <div style={st.header}>
          <div style={st.titleRow}>
            <span style={st.titleText}>삭제 사유</span>
            <button style={st.closeBtn} onClick={onClose} type="button">
              <CloseIcon />
            </button>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: "24px 32px" }}>
          <div style={st.labelRow}>
            <span style={{ fontFamily: FONT, fontSize: 15, fontWeight: 500, lineHeight: "18px", color: "#a1a1aa" }}>삭제 사유</span>
            <div style={st.requiredMark} />
          </div>
          <div style={{ position: "relative", width: "100%" }}>
            <textarea
              value={reason}
              onChange={(e) => {
                if (e.target.value.length <= 300) setReason(e.target.value);
              }}
              placeholder="삭제 사유를 입력하세요."
              maxLength={300}
              style={{
                width: "100%",
                minHeight: 120,
                padding: "8px 16px",
                border: "1px solid #e4e7ec",
                borderRadius: 4,
                backgroundColor: "#ffffff",
                fontFamily: FONT,
                fontSize: 17,
                fontWeight: 400,
                lineHeight: "24px",
                color: "#3f3f46",
                resize: "vertical",
                boxSizing: "border-box",
                outline: "none",
              }}
            />
            <div style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "4px 8px 0 0",
            }}>
              <span style={{
                fontFamily: FONT,
                fontSize: 13,
                fontWeight: 400,
                lineHeight: "18px",
                color: "#a1a1aa",
              }}>{reason.length}/300</span>
            </div>
          </div>
        </div>

        <div style={st.footer}>
          <div style={st.footerLeft}>
            <Button size="l" variant="outlined" color="info" onClick={onClose}>
              닫기
            </Button>
          </div>
          <div style={st.footerRight}>
            <Button
              size="l"
              variant="filled"
              color="negative"
              disabled={!canDelete}
              onClick={handleDelete}
            >
              삭제
            </Button>
          </div>
        </div>
      </div>

      <AlertModal
        open={alertOpen}
        onClose={() => setAlertOpen(false)}
        type="info"
        message="삭제되었습니다."
        confirmLabel="확인"
        onConfirm={handleConfirmAlert}
      />
    </div>
  );
}

export function ComponentDetailPopup({ open, onClose, item }: ComponentDetailPopupProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      setEditOpen(false);
      setDeleteOpen(false);
    }
  }, [open]);

  if (!open || !item) return null;

  const domain = DOMAIN_MOCK_DATA.find(
    (d) => d.nameKo === item.domainNameKo
  ) ?? DOMAIN_MOCK_DATA.find(
    (d) => item.domainNameKo.includes(d.nameKo) || d.nameKo.includes(item.domainNameKo)
  );

  return (
    <>
      <div style={st.overlay} onClick={onClose}>
        <div style={st.popup} onClick={(e) => e.stopPropagation()}>
          <div style={st.header}>
            <div style={st.titleRow}>
              <span style={st.titleText}>컴포넌트(L2) 조회</span>
              <button style={st.closeBtn} onClick={onClose} type="button">
                <CloseIcon />
              </button>
            </div>
          </div>

          <div style={st.main}>
            <div style={st.topArea}>
              <div style={st.leftCol}>
                <div style={st.infoRowWithHistory}>
                  <div style={{ display: "flex", gap: 32, alignItems: "flex-start", flex: 1 }}>
                    <div style={st.labelControl}>
                      <span style={st.label}>컴포넌트 ID</span>
                      <span style={st.value}>{item.componentId}</span>
                    </div>
                    <div style={st.labelControl}>
                      <span style={st.label}>컴포넌트(한글)</span>
                      <span style={st.value}>{item.nameKo}</span>
                    </div>
                    <div style={st.labelControl}>
                      <span style={st.label}>컴포넌트(영문)</span>
                      <span style={st.value}>{item.nameEn}</span>
                    </div>
                  </div>
                  <button style={st.historyBtn} type="button">
                    <HistoryIcon />
                    <span style={st.historyBtnText}>{MOCK_HISTORY.length} History</span>
                  </button>
                </div>

                <div style={st.infoRow}>
                  <div style={st.labelControl}>
                    <span style={st.label}>L2기획리더</span>
                    <span style={st.value}>{item.planLeader}</span>
                  </div>
                  <div style={st.labelControl}>
                    <span style={st.label}>L2설계리더</span>
                    <span style={st.value}>{item.designLeader}</span>
                  </div>
                </div>

                <div style={st.labelControlFull}>
                  <span style={st.label}>컴포넌트(L2) 설명</span>
                  <div style={st.value}>{item.description}</div>
                </div>

                <div style={st.labelControl}>
                  <span style={st.label}>사용여부</span>
                  <span style={st.value}>{item.useYn}</span>
                </div>
              </div>

              <div style={st.rightCol}>
                <HistoryTimeline entries={MOCK_HISTORY} />
              </div>
            </div>

            <div style={st.domainBox}>
              <div style={st.domainRow}>
                <div style={st.labelControl}>
                  <span style={st.label}>도메인(약어)</span>
                  <span style={st.value}>{domain?.abbr ?? "-"}</span>
                </div>
                <div style={st.labelControl}>
                  <span style={st.label}>도메인(한글)</span>
                  <span style={st.value}>{item.domainNameKo}</span>
                </div>
                <div style={st.labelControl}>
                  <span style={st.label}>도메인(영문)</span>
                  <span style={st.value}>{domain?.nameEn ?? "-"}</span>
                </div>
              </div>
              <div style={st.labelControlFull}>
                <span style={st.label}>도메인(L1) 설명</span>
                <span style={st.value}>{domain?.description ?? "-"}</span>
              </div>
            </div>

            <div style={st.labelControlFull}>
              <div style={st.l3Header}>
                <span style={{ ...st.l3Label, fontSize: 14 }}>업무(L3)</span>
                <div style={st.l3Actions}>
                  <Button size="s" variant="outlined" color="positive" leadingIcon={<span style={{ fontSize: 12 }}>+</span>}>
                    추가
                  </Button>
                  <Button size="s" variant="outlined" color="info">
                    BPD Map
                  </Button>
                  <Button size="s" variant="outlined" color="info">
                    의존성 Map
                  </Button>
                </div>
              </div>
              <div style={st.l3List}>
                {MOCK_L3_ITEMS.map((l3) => (
                  <L3ListItem key={l3.id} item={l3} />
                ))}
              </div>
            </div>
          </div>

          <div style={st.footer}>
            <div style={st.footerLeft}>
              <Button size="l" variant="outlined" color="info" onClick={onClose}>
                닫기
              </Button>
            </div>
            <div style={st.footerRight}>
              <Button size="l" variant="filled" color="negative" onClick={() => setDeleteOpen(true)}>
                삭제
              </Button>
              <Button size="l" variant="filled" color="positive" onClick={() => setEditOpen(true)}>
                수정
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ComponentEditPopup
        open={editOpen}
        onClose={() => setEditOpen(false)}
        item={item}
      />

      <ComponentDeletePopup
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirmDelete={() => {
          setDeleteOpen(false);
          onClose();
        }}
      />
    </>
  );
}
