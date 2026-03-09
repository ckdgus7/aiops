import { useState, useRef, useCallback } from "react";
import { RadioGroup } from "@/shared/ui/global/RadioGroup";
import { Input } from "@/shared/ui/global/Input";
import { Button } from "@/shared/ui/global/Button";
import { ToastEditor } from "@/shared/ui/service/ToastEditor";
import { AlertModal } from "@/shared/ui/global/AlertModal";
import { Snackbar } from "@/shared/ui/global/Snackbar";
import { popupStyles as ps } from "@/shared/ui/styles";

interface QnACreatePopupProps {
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
  { label: "계정", value: "계정" },
  { label: "이용방법", value: "이용방법" },
  { label: "기타문의", value: "기타문의" },
];

interface UploadedFile {
  id: string;
  name: string;
}

export function QnACreatePopup({ open, onClose }: QnACreatePopupProps) {
  const [category, setCategory] = useState("계정");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [closeAlertOpen, setCloseAlertOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragCounterRef = useRef(0);

  const addFiles = useCallback((fileList: FileList) => {
    const newFiles: UploadedFile[] = Array.from(fileList).map((f) => ({
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      name: f.name,
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  }, []);

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
    addFiles(selectedFiles);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFileDelete = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current += 1;
    if (e.dataTransfer.types.includes("Files")) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current -= 1;
    if (dragCounterRef.current === 0) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current = 0;
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFiles(e.dataTransfer.files);
    }
  };

  const handleReset = () => {
    setCategory("계정");
    setTitle("");
    setContent("");
    setFiles([]);
  };

  const handleCloseClick = () => {
    setCloseAlertOpen(true);
  };

  const handleCloseConfirm = () => {
    setCloseAlertOpen(false);
    handleReset();
    onClose();
  };

  const handleSave = () => {
    handleReset();
    setSnackbarOpen(true);
    onClose();
  };

  return (
    <div style={ps.overlay} onClick={handleOverlayClick}>
      <div style={ps.popup}>
        <div style={ps.header}>
          <div style={ps.titleRow}>
            <span style={ps.titleText}>Q&A 등록</span>
            <button style={ps.closeBtn} onClick={handleCloseClick}>
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
                <span style={ps.labelText}>구분</span>
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

            <div style={ps.fieldGroup}>
              <Input
                label="제목명"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목을 입력하세요."
                maxLength={100}
              />
            </div>

            <div style={ps.fieldGroup}>
              <div style={ps.fieldLabel}>
                <span style={ps.labelText}>내용</span>
                <span style={ps.requiredDot} />
              </div>
              <ToastEditor
                value={content}
                onChange={setContent}
                placeholder="문의하실 내용을 입력하세요."
                minHeight={300}
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
                style={isDragging ? { ...ps.uploadArea, ...ps.uploadAreaDragging } : ps.uploadArea}
                onClick={handleFileSelect}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
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
              onClick={handleCloseClick}
            >
              닫기
            </Button>
          </div>
          <div style={ps.footerRight}>
            <Button
              size="l"
              variant="filled"
              color="positive"
              onClick={handleSave}
            >
              저장
            </Button>
          </div>
        </div>

        <AlertModal
          open={closeAlertOpen}
          onClose={() => setCloseAlertOpen(false)}
          type="warning"
          message="변경된 사항을 저장하지 않고 창을 닫습니다."
          showCancel
          cancelLabel="취소"
          confirmLabel="확인"
          onCancel={() => setCloseAlertOpen(false)}
          onConfirm={handleCloseConfirm}
        />
      </div>

      <Snackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        type="success"
        message="저장 되었습니다."
      />
    </div>
  );
}
