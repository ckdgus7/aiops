import { useEffect } from "react";
import type { CSSProperties } from "react";
import { useMdiStore } from "@/shared/model/mdi.store";
import { usePageHeader } from "@/shared/hooks/usePageHeader";

const styles = {
  outer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    fontFamily: "'Pretendard', sans-serif",
  } satisfies CSSProperties,
  content: {
    flex: 1,
    padding: "20px 32px 20px",
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
  } satisfies CSSProperties,
  placeholder: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    background: "#fff",
    borderRadius: 8,
    color: "#a1a1aa",
    fontSize: 14,
  } satisfies CSSProperties,
};

interface BlankPageProps {
  title: string;
  gnbName: string;
  path: string;
}

export function BlankPage({ title, gnbName, path }: BlankPageProps) {
  const addTab = useMdiStore((st) => st.addTab);

  usePageHeader({
    breadcrumbItems: [{ label: gnbName }, { label: title }],
    title,
    favoriteKey: title,
  });

  useEffect(() => {
    addTab({ id: path, label: title, path });
  }, [addTab, path, title]);

  return (
    <div style={styles.outer}>
      <div style={styles.content}>
        <div style={styles.placeholder}>
          페이지 준비 중입니다.
        </div>
      </div>
    </div>
  );
}
