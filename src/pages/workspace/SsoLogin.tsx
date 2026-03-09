import { useState, useEffect, type CSSProperties } from "react";
import { useNavigate } from "react-router";

const FONT_FAMILY = "'Pretendard', sans-serif";

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires};path=/`;
}

function SpinnerIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ animation: "spin 1s linear infinite" }}>
      <circle cx="24" cy="24" r="20" stroke="#e4e7ec" strokeWidth="4" fill="none" />
      <path d="M44 24C44 12.954 35.046 4 24 4" stroke="#7a5af8" strokeWidth="4" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="20" stroke="#1ac057" strokeWidth="3" fill="none" />
      <path d="M15 24L21 30L33 18" stroke="#1ac057" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type Status = "loading" | "success" | "error";

const s = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    minHeight: "100vh",
    backgroundColor: "#ffffff",
    fontFamily: FONT_FAMILY,
  } satisfies CSSProperties,
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 24,
    padding: 48,
    borderRadius: 16,
    backgroundColor: "#fafafa",
    border: "1px solid #e4e7ec",
    minWidth: 400,
  } satisfies CSSProperties,
  logo: {
    fontSize: 14,
    fontWeight: 700,
    lineHeight: "20px",
    color: "#a1a1aa",
    letterSpacing: 2,
    textTransform: "uppercase",
  } satisfies CSSProperties,
  title: {
    fontSize: 20,
    fontWeight: 700,
    lineHeight: "28px",
    color: "#18181b",
    textAlign: "center",
  } satisfies CSSProperties,
  status: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "20px",
    color: "#71717a",
    textAlign: "center",
  } satisfies CSSProperties,
  stepList: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    width: "100%",
  } satisfies CSSProperties,
  stepItem: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "20px",
    color: "#71717a",
  } satisfies CSSProperties,
  stepDot: (active: boolean): CSSProperties => ({
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: active ? "#7a5af8" : "#e4e7ec",
    flexShrink: 0,
    transition: "background-color 0.3s ease",
  }),
  stepText: (active: boolean): CSSProperties => ({
    color: active ? "#18181b" : "#a1a1aa",
    fontWeight: active ? 500 : 400,
    transition: "color 0.3s ease",
  }),
  userInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    padding: "12px 24px",
    borderRadius: 8,
    backgroundColor: "#ffffff",
    border: "1px solid #e4e7ec",
    width: "100%",
    boxSizing: "border-box",
  } satisfies CSSProperties,
  userName: {
    fontSize: 16,
    fontWeight: 600,
    lineHeight: "24px",
    color: "#18181b",
  } satisfies CSSProperties,
  userId: {
    fontSize: 13,
    fontWeight: 400,
    lineHeight: "18px",
    color: "#a1a1aa",
  } satisfies CSSProperties,
};

const STEPS = [
  "SSO 인증 정보 확인 중",
  "사용자 데이터 조회 중",
  "세션 정보 저장 중",
  "메인 페이지로 이동 중",
];

export function SsoLoginPage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<Status>("loading");
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    const runSsoLogin = async () => {
      try {
        setCurrentStep(0);
        await delay(600);

        setCurrentStep(1);
        const response = await fetch("/ssoLoginData.json");
        await delay(400);

        if (!response.ok) {
          setStatus("error");
          await delay(500);
          navigate("/login-error", { replace: true });
          return;
        }

        const data = await response.json();
        if (!data || !data.id || !data.name) {
          setStatus("error");
          await delay(500);
          navigate("/login-error", { replace: true });
          return;
        }

        setUserData(data);
        setCurrentStep(2);
        await delay(500);

        setCookie("sso_id", data.id, 1);
        setCookie("sso_name", data.name, 1);

        setCurrentStep(3);
        setStatus("success");
        await delay(800);

        navigate("/", { replace: true });
      } catch {
        setStatus("error");
        await delay(500);
        navigate("/login-error", { replace: true });
      }
    };

    runSsoLogin();
  }, [navigate]);

  return (
    <div style={s.wrapper}>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      <div style={s.card}>
        <span style={s.logo}>NOVA AI DevOps</span>
        <span style={s.title}>SSO 로그인</span>

        {status === "loading" && <SpinnerIcon />}
        {status === "success" && <CheckIcon />}

        <span style={s.status}>
          {status === "loading" && "인증 처리 중입니다. 잠시만 기다려 주세요."}
          {status === "success" && "인증이 완료되었습니다."}
        </span>

        <div style={s.stepList}>
          {STEPS.map((step, i) => (
            <div key={i} style={s.stepItem}>
              <div style={s.stepDot(i <= currentStep)} />
              <span style={s.stepText(i <= currentStep)}>{step}</span>
            </div>
          ))}
        </div>

        {userData && status === "success" && (
          <div style={s.userInfo}>
            <span style={s.userName}>{userData.name}</span>
            <span style={s.userId}>{userData.id}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
