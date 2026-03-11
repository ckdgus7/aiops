import { useState, useRef, useEffect, useCallback } from "react";
import { RadioGroup } from "@/shared/ui/global/RadioGroup";
import { Input } from "@/shared/ui/global/Input";
import { Button } from "@/shared/ui/global/Button";
import { Checkbox } from "@/shared/ui/global/Checkbox";
import { DatePicker } from "@/shared/ui/global/DatePicker";
import { ToastEditor } from "@/shared/ui/service/ToastEditor";
import { AlertModal } from "@/shared/ui/global/AlertModal";
import { Snackbar } from "@/shared/ui/global/Snackbar";
import type { NoticeDetail } from "@/features/notices/model/types";
import { popupStyles as ps } from "@/shared/ui/styles";

interface NoticeEditPopupProps {
  open: boolean;
  onClose: () => void;
  notice: NoticeDetail | null;
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
  { label: "공통", value: "공통" },
  { label: "서비스", value: "서비스" },
  { label: "업무", value: "업무" },
];

interface EditFile {
  id: string;
  name: string;
  isExisting: boolean;
}

function mapCategoryToRadio(notice: NoticeDetail): string {
  return notice.category;
}

async function saveNoticeEdit(_params: {
  category: string;
  title: string;
  publishDate: string;
  content: string;
  pinned: boolean;
  isDraft: boolean;
}) {
  await new Promise((resolve) => setTimeout(resolve, 300));
}

export function NoticeEditPopup({ open, onClose, notice }: NoticeEditPopupProps) {
  const [category, setCategory] = useState("공통");
  const [title, setTitle] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [pinned, setPinned] = useState(false);
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<EditFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [closeAlertOpen, setCloseAlertOpen] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({ open: false, message: "" });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragCounterRef = useRef(0);

  const addFiles = useCallback((fileList: FileList) => {
    const newFiles: EditFile[] = Array.from(fileList).map((f) => ({
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      name: f.name,
      isExisting: false,
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  }, []);

  useEffect(() => {
    if (open && notice) {
      setCategory(mapCategoryToRadio(notice));
      setTitle(notice.title);
      setPublishDate(notice.createdAt?.split(" ")[0] ?? "");
      setPinned(false);
      setContent(notice.content);
      setFiles(
        notice.attachments.map((a) => ({
          id: a.id,
          name: a.name,
          isExisting: true,
        }))
      );
    }
  }, [open, notice]);

  if (!open || !notice) return (
    <Snackbar
      open={snackbar.open}
      onClose={() => setSnackbar({ open: false, message: "" })}
      type="success"
      message={snackbar.message}
    />
  );

  const resetAndClose = () => {
    setCloseAlertOpen(false);
    onClose();
  };

  const handleSave = async () => {
    await saveNoticeEdit({ category, title, publishDate, content, pinned, isDraft: false });
    onClose();
    setSnackbar({ open: true, message: "저장 되었습니다." });
  };

  const handleTempSave = async () => {
    await saveNoticeEdit({ category, title, publishDate, content, pinned, isDraft: true });
    onClose();
    setSnackbar({ open: true, message: "임시저장 되었습니다." });
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) setCloseAlertOpen(true);
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

  return (
    <>
    <div style={ps.overlay} onClick={handleOverlayClick}>
      <div style={ps.popup}>
        <div style={ps.header}>
          <div style={ps.titleRow}>
            <span style={ps.titleText}>공지사항 수정</span>
            <button style={ps.closeBtn} onClick={() => setCloseAlertOpen(true)}>
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
                <span style={ps.labelText}>공지유형</span>
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
                  label="제목명"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="제목을 입력하세요."
                  maxLength={100}
                />
              </div>
              <div style={{ flex: 244, minWidth: 0 }}>
                <DatePicker
                  label="게시일"
                  required
                  value={publishDate}
                  onChange={setPublishDate}
                />
              </div>
            </div>

            <div style={{ ...ps.fieldGroup, alignItems: "flex-start" }}>
              <div style={ps.fieldLabel}>
                <span style={ps.labelText}>상단고정</span>
              </div>
              <Checkbox
                checked={pinned}
                onChange={setPinned}
                label="사용"
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
                placeholder="내용을 입력하세요."
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
            </div>
          </div>
        </div>

        <div style={ps.footer}>
          <div style={ps.footerLeft}>
            <Button
              size="l"
              variant="outlined"
              color="info"
              onClick={() => setCloseAlertOpen(true)}
            >
              닫기
            </Button>
          </div>
          <div style={ps.footerRight}>
            <Button
              size="l"
              variant="outlined"
              color="positive"
              onClick={handleTempSave}
            >
              임시저장
            </Button>
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
      onConfirm={resetAndClose}
    />

    <Snackbar
      open={snackbar.open}
      onClose={() => setSnackbar({ open: false, message: "" })}
      type="success"
      message={snackbar.message}
    />
    </>
  );
}
