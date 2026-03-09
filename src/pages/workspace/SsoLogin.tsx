import { useEffect } from "react";
import { useNavigate } from "react-router";

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires};path=/`;
}

export function SsoLoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSsoData = async () => {
      try {
        const response = await fetch("/ssoLoginData.json");
        if (!response.ok) {
          navigate("/login-error", { replace: true });
          return;
        }
        const data = await response.json();
        if (!data || !data.id || !data.name) {
          navigate("/login-error", { replace: true });
          return;
        }
        setCookie("sso_id", data.id, 1);
        setCookie("sso_name", data.name, 1);
        navigate("/", { replace: true });
      } catch {
        navigate("/login-error", { replace: true });
      }
    };

    fetchSsoData();
  }, [navigate]);

  return null;
}
