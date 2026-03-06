import type { CSSProperties } from "react";
import { Button } from "@/shared/ui/global/Button";
import { popupStyles } from "@/shared/ui/styles";

interface PrivacyPopupProps {
  open: boolean;
  onClose: () => void;
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M5 5L15 15" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M15 5L5 15" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M8 10L12 14L16 10" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const FONT = "'Pretendard', sans-serif";

const s = {
  overlay: {
    ...popupStyles.overlay,
  } satisfies CSSProperties,
  popup: {
    ...popupStyles.popup,
    maxHeight: "90vh",
  } satisfies CSSProperties,
  header: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    paddingTop: 32,
    paddingLeft: 32,
    paddingRight: 32,
    paddingBottom: 16,
    flexShrink: 0,
  } satisfies CSSProperties,
  titleRow: {
    ...popupStyles.titleRow,
    marginBottom: undefined,
    width: "100%",
  } satisfies CSSProperties,
  titleText: {
    ...popupStyles.titleText,
    color: "#52525b",
  } satisfies CSSProperties,
  closeBtn: popupStyles.closeBtn,
  main: {
    flex: 1,
    overflowY: "auto",
    padding: "24px 32px",
  } satisfies CSSProperties,
  dateRow: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: 8,
  } satisfies CSSProperties,
  dateField: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    height: 40,
    padding: 8,
    border: "1px solid #e4e7ec",
    borderRadius: 4,
    backgroundColor: "#ffffff",
  } satisfies CSSProperties,
  dateText: {
    fontFamily: FONT,
    fontSize: 16,
    fontWeight: 400,
    lineHeight: "24px",
    color: "#a1a1aa",
    whiteSpace: "nowrap",
    padding: "0 8px",
  } satisfies CSSProperties,
  content: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
    paddingBottom: 24,
  } satisfies CSSProperties,
  chapterTitle: {
    fontFamily: FONT,
    fontSize: 16,
    fontWeight: 700,
    lineHeight: "24px",
    color: "#000000",
  } satisfies CSSProperties,
  articleWrap: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  } satisfies CSSProperties,
  articleTitle: {
    fontFamily: FONT,
    fontSize: 20,
    fontWeight: 400,
    lineHeight: "32px",
    color: "#000000",
  } satisfies CSSProperties,
  articleBody: {
    fontFamily: FONT,
    fontSize: 16,
    fontWeight: 400,
    lineHeight: "24px",
    color: "#3f3f46",
    margin: 0,
  } satisfies CSSProperties,
  articleBodyCol: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  } satisfies CSSProperties,
  bulletList: {
    fontFamily: FONT,
    fontSize: 16,
    fontWeight: 400,
    lineHeight: "24px",
    color: "#3f3f46",
    margin: 0,
    paddingLeft: 24,
    listStyleType: "disc",
  } satisfies CSSProperties,
  orderedList: {
    fontFamily: FONT,
    fontSize: 16,
    fontWeight: 400,
    lineHeight: "24px",
    color: "#3f3f46",
    margin: 0,
    paddingLeft: 24,
  } satisfies CSSProperties,
  listItem: {
    marginBottom: 0,
  } satisfies CSSProperties,
  footer: {
    ...popupStyles.footer,
    padding: undefined,
    borderTop: undefined,
    paddingTop: 16,
    paddingBottom: 32,
    paddingLeft: 32,
    paddingRight: 32,
  } satisfies CSSProperties,
};

export function PrivacyPopup({ open, onClose }: PrivacyPopupProps) {
  if (!open) return null;

  return (
    <div style={s.overlay} onClick={onClose}>
      <div style={s.popup} onClick={(e) => e.stopPropagation()}>
        <div style={s.header}>
          <div style={s.titleRow}>
            <span style={s.titleText}>개인정보 처리방침</span>
            <button style={s.closeBtn} onClick={onClose}>
              <CloseIcon />
            </button>
          </div>
        </div>

        <div style={s.main}>
          <div style={s.dateRow}>
            <div style={s.dateField}>
              <span style={s.dateText}>개정일자: 2026.02.03</span>
              <ChevronDownIcon />
            </div>
          </div>

          <div style={s.content}>
            <span style={s.chapterTitle}>제1장 총칙</span>

            <div style={s.articleWrap}>
              <span style={s.articleTitle}>1. 총칙</span>
              <p style={s.articleBody}>
                {`본 약관은 회원이 개별 서비스의 아이디(ID)를 통합하여 하나의 ID로 사용할 수 있도록 에스케이텔레콤 주식회사(이하 "회사")가 제공하는 "T ID" 서비스를 이용하는 데 필요한 회원과 회사 간의 권리, 의무 및 책임사항, 이용조건 및 절차 등 기본적인 사항을 규정함을 목적으로 합니다.`}
              </p>
            </div>

            <div style={s.articleWrap}>
              <span style={s.articleTitle}>2. 개인정보의 수집·이용 목적, 항목 및 보유기간</span>
              <div style={s.articleBodyCol}>
                <p style={s.articleBody}>
                  SK텔레콤은 본질적인 서비스 제공을 위한 '필수 항목'과 고객의 기호와 필요에 맞는 서비스를 제공하기 위한 '선택 항목'으로 구분하여 개인정보를 수집·이용하고 있습니다. 선택 항목 수집·이용에 동의하지 않아도 본질적인 서비스를 이용할 수 있습니다.
                </p>
                <p style={s.articleBody}>
                  SK텔레콤은 아래 어느 하나에 해당하는 경우에 고객의 개인정보를 수집할 수 있으며, 그 수집 목적의 범위에서 이용할 수 있습니다.
                </p>
                <ul style={s.bulletList}>
                  <li style={s.listItem}>가. 고객의 동의를 받은 경우</li>
                  <li style={s.listItem}>나. 법률에 특별한 규정이 있거나 법령상 의무를 준수하기 위하여 불가피한 경우</li>
                  <li style={s.listItem}>다. 고객과 체결한 계약을 이행하거나 계약을 체결하는 과정에서 고객 요청에 따른 조치를 이행하기 위하여 필요한 경우</li>
                  <li style={s.listItem}>라. 명백히 고객 또는 제3자의 급박한 생명, 신체, 재산의 이익을 위하여 필요하다고 인정되는 경우</li>
                  <li style={s.listItem}>마. SK텔레콤의 정당한 이익을 달성하기 위하여 필요한 경우로서 명백하게 고객 권리보다 우선하는 경우</li>
                  <li style={s.listItem}>바. 공중위생 등 공공의 안정과 안녕을 위하여 긴급히 필요한 경우</li>
                </ul>
              </div>
              <div style={s.articleBodyCol}>
                <ol style={s.orderedList}>
                  <li style={s.listItem}>
                    T ID : 회사 또는 관계사가 제공하는 개별 서비스를 통합된 하나의 ID 계정으로 회원 인증, 회원정보 변경, 회원 가입 및 탈퇴 등을 관리할 수 있도록 회사가 제공하는 서비스를 말합니다.
                  </li>
                  <li style={s.listItem}>
                    회원 : T ID가 적용된 개별 서비스 또는 T ID 사이트에서 본 약관에 동의하고, ID와 Password(비밀번호)를 발급 받은 고객을 말합니다. 회원의 자격 및 권한 등은 본 약관에서 정한 바에 따라 일부 제한될 수 있습니다.
                  </li>
                  <li style={s.listItem}>
                    관계사 : 회사와 제휴 관계를 맺고 T ID를 공동 제공하기로 합의한 법인을 말합니다. 개별 관계사는 추후 추가/변동될 수 있으며 관계사가 추가/변동될 때에는 본 약관에서 정한 방식으로 회원에게 공지합니다.
                  </li>
                  <li style={s.listItem}>
                    개별 서비스 : T ID를 이용하여 접속 가능한 서비스를 말합니다. 개별 서비스는 추후 추가/변동될 수 있으며 서비스가 추가/변동될 때에는 본 약관에서 정한 방식으로 회원에게 공지합니다.
                  </li>
                  <li style={s.listItem}>
                    {`아이디 ("ID") : T ID를 통해 개별 서비스에 동일하게 사용할 수 있는 ID로 회원 식별과 회원의 서비스 이용을 위해 회원이 선정하고 회사가 승인하는 영문자, 숫자 및 특수문자의 조합을 의미하며, 회사는 일관된 ID정책을 위해 특정 유형의 ID를 회원이 선정하도록 사전에 정할 수 있습니다.`}
                  </li>
                  <li style={s.listItem}>
                    비밀번호("Password") : 회원의 정보보호를 위해 회원 자신이 설정한 문자, 숫자 및 특수문자의 조합을 의미합니다.
                  </li>
                  <li style={s.listItem}>
                    T ID 사이트 : T ID 서비스를 제공하는 온라인 기반 유무선 홈페이지를 말합니다. (http://www.skt-id.co.kr, T ID 앱 등)
                  </li>
                  <li style={s.listItem}>
                    T ID 제공화면 : 회원이 개별 서비스 등에서 T ID 가입 등의 행위를 할 때 제공되는 화면을 말합니다.
                  </li>
                  <li style={s.listItem}>
                    공통관리정보 : T ID를 이용하기 위해 회사가 정한 가입절차에 따라 입력한 ID 정보와 필수 입력 항목으로 T ID 사이트를 통해 정보확인, 변경처리 등을 관리할 수 있는 회원정보 항목을 말하며 해당 정보는 T ID 제공을 위해 회원의 동의 하에 개별 서비스에서 공유합니다.
                  </li>
                  <li style={s.listItem}>
                    운영자 : T ID의 전반적인 관리와 원활한 운영을 위하여 회사가 선정한 자를 말합니다.
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div style={s.footer}>
          <div>
            <Button
              size="l"
              variant="outlined"
              color="info"
              onClick={onClose}
            >
              닫기
            </Button>
          </div>
          <div />
        </div>
      </div>
    </div>
  );
}
