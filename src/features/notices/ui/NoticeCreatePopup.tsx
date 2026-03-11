import { useState } from "react";
import { RadioGroup } from "@/shared/ui/global/RadioGroup";
import { Input } from "@/shared/ui/global/Input";
import { Button } from "@/shared/ui/global/Button";
import { Checkbox } from "@/shared/ui/global/Checkbox";
import { DatePicker } from "@/shared/ui/global/DatePicker";
import { FileUpload } from "@/shared/ui/global/FileUpload";
import { ToastEditor } from "@/shared/ui/service/ToastEditor";
import { AlertModal } from "@/shared/ui/global/AlertModal";
import { Snackbar } from "@/shared/ui/global/Snackbar";
import { popupStyles as ps } from "@/shared/ui/styles";

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

const CATEGORY_OPTIONS = [
  { label: "공통", value: "공통" },
  { label: "서비스", value: "서비스" },
  { label: "업무", value: "업무" },
];

interface UploadedFile {
  id: string;
  name: string;
}

async function saveNotice(_params: {
  category: string;
  title: string;
  publishDate: string;
  content: string;
  pinned: boolean;
  isDraft: boolean;
}) {
  await new Promise((resolve) => setTimeout(resolve, 300));
}

export function NoticeCreatePopup({ open, onClose }: NoticeCreatePopupProps) {
  const [category, setCategory] = useState("공통");
  const [title, setTitle] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [pinned, setPinned] = useState(false);
  const [closeAlertOpen, setCloseAlertOpen] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({ open: false, message: "" });

  if (!open) return (
    <Snackbar
      open={snackbar.open}
      onClose={() => setSnackbar({ open: false, message: "" })}
      type="success"
      message={snackbar.message}
    />
  );

  const resetAndClose = () => {
    setCategory("공통");
    setTitle("");
    setPublishDate("");
    setContent("");
    setFiles([]);
    setPinned(false);
    setCloseAlertOpen(false);
    onClose();
  };

  const handleSave = async () => {
    await saveNotice({ category, title, publishDate, content, pinned, isDraft: false });
    resetAndClose();
    setSnackbar({ open: true, message: "저장 되었습니다." });
  };

  const handleTempSave = async () => {
    await saveNotice({ category, title, publishDate, content, pinned, isDraft: true });
    resetAndClose();
    setSnackbar({ open: true, message: "임시저장 되었습니다." });
  };

  return (
    <>
      <div style={ps.overlay} onClick={(e) => { if (e.target === e.currentTarget) setCloseAlertOpen(true); }}>
        <div style={ps.popup}>
          <div style={ps.header}>
            <div style={ps.titleRow}>
              <span style={ps.titleText}>공지사항 등록</span>
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
                <FileUpload
                  value={files}
                  onChange={setFiles}
                />
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
