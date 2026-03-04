import { useState, useRef, type CSSProperties } from "react";
import { RadioGroup } from "@/shared/ui/RadioGroup";
import { Input } from "@/shared/ui/Input";
import { Textarea } from "@/shared/ui/Textarea";
import { Button } from "@/shared/ui/Button";

const FONT = "'Pretendard', sans-serif";

interface NoticeCreatePopupProps {
  open: boolean;
  onClose: () => void;
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M18 6L6 18" stroke="#18181b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 6L18 18" stroke="#18181b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M11 2H5C4.44772 2 4 2.44772 4 3V17C4 17.5523 4.44772 18 5 18H15C15.5523 18 16 17.5523 16 17V7L11 2Z" stroke="#a1a1aa" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 2V7H16" stroke="#a1a1aa" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 16V4M12 4L8 8M12 4L16 8" stroke="#a1a1aa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 17V19C4 19.5523 4.44772 20 5 20H19C19.5523 20 20 19.5523 20 19V17" stroke="#a1a1aa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DeleteIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M12 4L4 12" stroke="#a1a1aa" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 4L12 12" stroke="#a1a1aa" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const CATEGORY_OPTIONS = [
  { label: "공지", value: "공지" },
  { label: "필독공지", value: "필독공지" },
  { label: "일반", value: "일반" },
];

const POST_TYPE_OPTIONS = [
  { label: "즉시", value: "즉시" },
];

const ps = {
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
    zIndex: 9999,
  } satisfies CSSProperties,
  popup: {
    width: 880,
    maxHeight: "90vh",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    fontFamily: FONT,
  } satisfies CSSProperties,
  header: {
    padding: "32px 32px 16px",
    flexShrink: 0,
  } satisfies CSSProperties,
  titleRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  } satisfies CSSProperties,
  titleText: {
    fontFamily: FONT,
    fontSize: 24,
    fontWeight: 700,
    lineHeight: "32px",
    color: "#18181b",
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
    padding: 0,
    borderRadius: 4,
  } satisfies CSSProperties,
  requiredRow: {
    display: "flex",
    alignItems: "center",
    gap: 6,
  } satisfies CSSProperties,
  requiredDot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    backgroundColor: "#36bffa",
    flexShrink: 0,
  } satisfies CSSProperties,
  requiredText: {
    fontFamily: FONT,
    fontSize: 12,
    fontWeight: 400,
    lineHeight: "18px",
    color: "#a1a1aa",
  } satisfies CSSProperties,
  main: {
    flex: 1,
    overflowY: "auto",
    padding: "24px 32px 32px",
  } satisfies CSSProperties,
  formSection: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  } satisfies CSSProperties,
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  } satisfies CSSProperties,
  fieldLabel: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  } satisfies CSSProperties,
  labelText: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "18px",
    color: "#52525b",
  } satisfies CSSProperties,
  fieldRow: {
    display: "flex",
    gap: 32,
  } satisfies CSSProperties,
  uploadArea: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    minHeight: 120,
    border: "1px dashed #e4e7ec",
    borderRadius: 8,
    backgroundColor: "#fafafa",
    cursor: "pointer",
    padding: 24,
  } satisfies CSSProperties,
  uploadText: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "20px",
    color: "#a1a1aa",
    textAlign: "center",
  } satisfies CSSProperties,
  uploadBtn: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "20px",
    color: "#7a5af8",
    cursor: "pointer",
    textDecoration: "underline",
    background: "none",
    border: "none",
    padding: 0,
  } satisfies CSSProperties,
  fileList: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    marginTop: 8,
  } satisfies CSSProperties,
  fileItem: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "6px 8px",
    backgroundColor: "#f4f4f5",
    borderRadius: 4,
  } satisfies CSSProperties,
  fileName: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "20px",
    color: "#3f3f46",
    flex: 1,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  fileDeleteBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 20,
    height: 20,
    border: "none",
    background: "transparent",
    cursor: "pointer",
    padding: 0,
    flexShrink: 0,
  } satisfies CSSProperties,
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 32px 24px",
    flexShrink: 0,
    borderTop: "1px solid #f4f4f5",
  } satisfies CSSProperties,
  footerLeft: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  } satisfies CSSProperties,
  footerRight: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  } satisfies CSSProperties,
};

interface UploadedFile {
  id: string;
  name: string;
}

export function NoticeCreatePopup({ open, onClose }: NoticeCreatePopupProps) {
  const [category, setCategory] = useState("공지");
  const [title, setTitle] = useState("");
  const [author] = useState("Admin");
  const [postType, setPostType] = useState("즉시");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!open) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;
    const newFiles: UploadedFile[] = Array.from(selectedFiles).map((f) => ({
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      name: f.name,
    }));
    setFiles((prev) => [...prev, ...newFiles]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFileDelete = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleReset = () => {
    setCategory("공지");
    setTitle("");
    setPostType("즉시");
    setContent("");
    setFiles([]);
    onClose();
  };

  return (
    <div style={ps.overlay} onClick={handleOverlayClick}>
      <div style={ps.popup}>
        <div style={ps.header}>
          <div style={ps.titleRow}>
            <span style={ps.titleText}>공지사항 등록</span>
            <button style={ps.closeBtn} onClick={onClose}>
              <CloseIcon />
            </button>
          </div>
          <div style={ps.requiredRow}>
            <span style={ps.requiredDot} />
            <span style={ps.requiredText}>표시는 필수로 입력하세요.</span>
          </div>
        </div>

        <div style={ps.main}>
          <div style={ps.formSection}>
            <div style={ps.fieldGroup}>
              <div style={ps.fieldLabel}>
                <span style={ps.labelText}>분류</span>
                <span style={ps.requiredDot} />
              </div>
              <RadioGroup
                value={category}
                onChange={setCategory}
                options={CATEGORY_OPTIONS}
                size="m"
                gap={16}
              />
            </div>

            <div style={ps.fieldRow}>
              <div style={{ flex: 540, minWidth: 0 }}>
                <Input
                  label="제목"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="제목을 입력하세요."
                  maxLength={100}
                />
              </div>
              <div style={{ flex: 244, minWidth: 0 }}>
                <Input
                  label="작성자"
                  value={author}
                  readOnly
                />
              </div>
            </div>

            <div style={ps.fieldGroup}>
              <div style={ps.fieldLabel}>
                <span style={ps.labelText}>게시</span>
                <span style={ps.requiredDot} />
              </div>
              <RadioGroup
                value={postType}
                onChange={setPostType}
                options={POST_TYPE_OPTIONS}
                size="m"
                gap={16}
              />
            </div>

            <div style={ps.fieldGroup}>
              <Textarea
                label="내용"
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="내용을 입력하세요."
                maxLength={2000}
                style={{ minHeight: 300 }}
              />
            </div>

            <div style={ps.fieldGroup}>
              <div style={ps.fieldLabel}>
                <span style={ps.labelText}>첨부</span>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <div
                style={ps.uploadArea}
                onClick={handleFileSelect}
              >
                <UploadIcon />
                <span style={ps.uploadText}>
                  파일을 드래그하거나 클릭하여 업로드하세요.
                </span>
                <button
                  style={ps.uploadBtn}
                  type="button"
                  onClick={(e) => { e.stopPropagation(); handleFileSelect(); }}
                >
                  파일 선택
                </button>
              </div>
              {files.length > 0 && (
                <div style={ps.fileList}>
                  {files.map((file) => (
                    <div key={file.id} style={ps.fileItem}>
                      <FileIcon />
                      <span style={ps.fileName}>{file.name}</span>
                      <button
                        style={ps.fileDeleteBtn}
                        onClick={() => handleFileDelete(file.id)}
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div style={ps.footer}>
          <div style={ps.footerLeft}>
            <Button
              size="l"
              variant="outlined"
              color="info"
              onClick={handleReset}
            >
              취소
            </Button>
          </div>
          <div style={ps.footerRight}>
            <Button
              size="l"
              variant="outlined"
              color="positive"
            >
              임시저장
            </Button>
            <Button
              size="l"
              variant="filled"
              color="positive"
            >
              등록
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
