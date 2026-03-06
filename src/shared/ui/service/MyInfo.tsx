import { useState } from "react";
import type { CSSProperties } from "react";
import { FONT } from "@/shared/ui/styles";
import { SelectBox } from "@/shared/ui/global/SelectBox";
import { Button } from "@/shared/ui/global/Button";

interface UserInfo {
  employeeId: string;
  name: string;
  company: string;
  department: string;
  email: string;
  phone: string;
}

interface RoleGroup {
  id: string;
  level: "L3" | "L4";
  name: string;
  status?: "신청" | "승인";
  appliedAt?: string;
  approvedAt?: string;
}

interface MyInfoProps {
  open: boolean;
  userInfo: UserInfo;
  roleGroups: RoleGroup[];
  lastLogin?: string;
  language?: string;
  onClose: () => void;
  onLanguageChange?: (lang: string) => void;
  onLanguageSave?: () => void;
  onRoleGroupRequest?: () => void;
}

const s = {
  overlay: {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    width: 340,
    zIndex: 100,
    fontFamily: FONT,
  } satisfies CSSProperties,
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    background: "#98a2b3",
    borderLeft: "1px solid #e4e4e7",
    boxSizing: "border-box",
    padding: "24px 24px 32px 24px",
    overflowY: "auto",
  } satisfies CSSProperties,
  col: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    width: "100%",
  } satisfies CSSProperties,
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  } satisfies CSSProperties,
  titleRow: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  } satisfies CSSProperties,
  titleText: {
    fontFamily: FONT,
    fontSize: 16,
    fontWeight: 600,
    lineHeight: "28px",
    color: "#ffffff",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  closeBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 18,
    height: 18,
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
    flexShrink: 0,
  } satisfies CSSProperties,
  section: {
    display: "flex",
    flexDirection: "column",
    gap: 32,
    width: "100%",
  } satisfies CSSProperties,
  article: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    width: "100%",
  } satisfies CSSProperties,
  articleHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  } satisfies CSSProperties,
  articleTitle: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "20px",
    color: "#ffffff",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  card: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    background: "#ffffff",
    borderRadius: 8,
    padding: "12px 16px",
    width: "100%",
    boxSizing: "border-box",
  } satisfies CSSProperties,
  labelControl: {
    display: "flex",
    gap: 4,
    alignItems: "flex-start",
  } satisfies CSSProperties,
  label: {
    display: "flex",
    alignItems: "center",
    height: 20,
    fontFamily: FONT,
    fontSize: 10,
    fontWeight: 400,
    lineHeight: "16px",
    color: "#a1a1aa",
    whiteSpace: "nowrap",
    flexShrink: 0,
  } satisfies CSSProperties,
  value: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "20px",
    color: "#3f3f46",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  roleHeaderRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    width: "100%",
  } satisfies CSSProperties,
  roleHeaderTitle: {
    flex: "1 0 0",
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "20px",
    color: "#ffffff",
  } satisfies CSSProperties,
  roleCard: {
    display: "flex",
    flexDirection: "column",
    background: "#ffffff",
    borderRadius: 8,
    padding: "12px 16px",
    width: "100%",
    boxSizing: "border-box",
  } satisfies CSSProperties,
  roleRow: {
    display: "flex",
    gap: 8,
    alignItems: "flex-start",
    width: "100%",
  } satisfies CSSProperties,
  roleIcon: {
    width: 20,
    height: 20,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    fontSize: 9,
    fontWeight: 700,
    color: "#ffffff",
  } satisfies CSSProperties,
  roleName: {
    flex: "1 0 0",
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "20px",
    color: "#3f3f46",
  } satisfies CSSProperties,
  badgeBase: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "4px 10px",
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 500,
    fontFamily: FONT,
    lineHeight: "12px",
    flexShrink: 0,
  } satisfies CSSProperties,
  badgeApproved: {
    background: "#f2fdf5",
    border: "1px solid #1ac057",
    color: "#1ac057",
  } satisfies CSSProperties,
  badgePending: {
    background: "#fafafa",
    border: "1px solid #a1a1aa",
    color: "#a1a1aa",
  } satisfies CSSProperties,
  tooltip: {
    position: "absolute",
    top: "50%",
    right: "calc(100% + 4px)",
    transform: "translateY(-50%)",
    display: "flex",
    alignItems: "center",
    zIndex: 10,
  } satisfies CSSProperties,
  tooltipBox: {
    background: "#52525b",
    borderRadius: 8,
    padding: "4px 8px",
    maxWidth: 216,
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  tooltipText: {
    fontFamily: FONT,
    fontSize: 12,
    fontWeight: 400,
    lineHeight: "18px",
    color: "#ffffff",
  } satisfies CSSProperties,
  tooltipArrow: {
    width: 0,
    height: 0,
    borderTop: "5px solid transparent",
    borderBottom: "5px solid transparent",
    borderLeft: "6px solid #52525b",
    flexShrink: 0,
  } satisfies CSSProperties,
  accessCard: {
    display: "flex",
    flexDirection: "column",
    gap: 0,
    background: "#ffffff",
    borderRadius: 8,
    padding: "12px 16px",
    width: "100%",
    boxSizing: "border-box",
  } satisfies CSSProperties,
  langSection: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    background: "#667085",
    borderRadius: 4,
    padding: 8,
    width: "100%",
    boxSizing: "border-box",
    alignItems: "flex-end",
  } satisfies CSSProperties,
  langFieldWrap: {
    width: "100%",
  } satisfies CSSProperties,
  saveBtnWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  } satisfies CSSProperties,
};

function TitleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" stroke="#ffffff" strokeWidth="1.5" />
      <path d="M5 20C5 17.2386 7.23858 15 10 15H14C16.7614 15 19 17.2386 19 20V21H5V20Z" stroke="#ffffff" strokeWidth="1.5" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M1 1L11 11M11 1L1 11" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function RoleIconBadge({ level }: { level: "L3" | "L4" }) {
  const bg = level === "L3" ? "#6366f1" : "#8b5cf6";
  return (
    <div style={{ ...s.roleIcon, background: bg }}>
      {level}
    </div>
  );
}

function StatusBadge({ status, appliedAt, approvedAt }: { status: "신청" | "승인"; appliedAt?: string; approvedAt?: string }) {
  const [hovered, setHovered] = useState(false);
  const badgeStyle = status === "승인"
    ? { ...s.badgeBase, ...s.badgeApproved }
    : { ...s.badgeBase, ...s.badgePending };

  return (
    <div
      style={{ position: "relative", display: "flex", alignItems: "flex-start", flexShrink: 0 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={badgeStyle}>{status}</div>
      {hovered && (appliedAt || approvedAt) && (
        <div style={s.tooltip}>
          <div style={s.tooltipBox}>
            {appliedAt && <div style={s.tooltipText}>신청일시: {appliedAt}</div>}
            {approvedAt && <div style={s.tooltipText}>승인일시: {approvedAt}</div>}
          </div>
          <div style={s.tooltipArrow} />
        </div>
      )}
    </div>
  );
}

const LANGUAGE_OPTIONS = [
  { label: "English", value: "en" },
  { label: "한국어", value: "ko" },
];

export function MyInfo({
  open,
  userInfo,
  roleGroups,
  lastLogin,
  language = "en",
  onClose,
  onLanguageChange,
  onLanguageSave,
  onRoleGroupRequest,
}: MyInfoProps) {
  if (!open) return null;

  return (
    <div style={s.overlay}>
      <div style={s.container}>
        <div style={s.col}>
          <div style={s.header}>
            <div style={s.titleRow}>
              <TitleIcon />
              <span style={s.titleText}>나의 정보</span>
            </div>
            <button style={s.closeBtn} onClick={onClose}>
              <CloseIcon />
            </button>
          </div>

          <div style={s.section}>
            <div style={s.article}>
              <div style={s.articleHeader}>
                <span style={s.articleTitle}>개인 정보</span>
              </div>
              <div style={s.card}>
                <div style={s.labelControl}>
                  <span style={s.label}>사번</span>
                  <span style={s.value}>{userInfo.employeeId}</span>
                </div>
                <div style={s.labelControl}>
                  <span style={s.label}>이름</span>
                  <span style={s.value}>{userInfo.name}</span>
                </div>
                <div style={s.labelControl}>
                  <span style={s.label}>소속 그룹사</span>
                  <span style={s.value}>{userInfo.company}</span>
                </div>
                <div style={s.labelControl}>
                  <span style={s.label}>소속 조직</span>
                  <span style={s.value}>{userInfo.department}</span>
                </div>
                <div style={s.labelControl}>
                  <span style={s.label}>이메일</span>
                  <span style={s.value}>{userInfo.email}</span>
                </div>
                <div style={s.labelControl}>
                  <span style={s.label}>핸드폰 번호</span>
                  <span style={s.value}>{userInfo.phone}</span>
                </div>
              </div>
            </div>

            <div style={s.article}>
              <div style={s.roleHeaderRow}>
                <span style={s.roleHeaderTitle}>역할그룹</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
                {roleGroups.map((role) => (
                  <div key={role.id} style={s.roleCard}>
                    <div style={s.roleRow}>
                      <RoleIconBadge level={role.level} />
                      <span style={s.roleName}>{role.name}</span>
                      {role.status && (
                        <StatusBadge
                          status={role.status}
                          appliedAt={role.appliedAt}
                          approvedAt={role.approvedAt}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={s.article}>
              <div style={s.articleHeader}>
                <span style={s.articleTitle}>접속 정보</span>
              </div>
              <div style={s.accessCard}>
                <div style={s.labelControl}>
                  <span style={s.label}>마지막 로그인</span>
                  <span style={s.value}>{lastLogin ?? "-"}</span>
                </div>
              </div>
            </div>

            <div style={s.article}>
              <div style={s.articleHeader}>
                <span style={s.articleTitle}>언어 선택</span>
              </div>
              <div style={s.langSection}>
                <div style={s.langFieldWrap}>
                  <SelectBox
                    options={LANGUAGE_OPTIONS}
                    value={language}
                    onChange={(val) => onLanguageChange?.(val)}
                  />
                </div>
                <div style={s.saveBtnWrap}>
                  <Button
                    variant="outlined"
                    size="m"
                    onClick={() => onLanguageSave?.()}
                    style={{ borderColor: "#ffffff", color: "#ffffff" }}
                  >
                    저장
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
