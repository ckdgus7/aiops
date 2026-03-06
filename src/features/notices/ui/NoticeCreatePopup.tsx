import { useState } from "react";
import { RadioGroup } from "@/shared/ui/global/RadioGroup";
import { Input } from "@/shared/ui/global/Input";
import { Button } from "@/shared/ui/global/Button";
import { DatePicker } from "@/shared/ui/global/DatePicker";
import { FileUpload } from "@/shared/ui/global/FileUpload";
import { TiptapEditor } from "@/shared/ui/service/TiptapEditor";
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

export function NoticeCreatePopup({ open, onClose }: NoticeCreatePopupProps) {
  const [category, setCategory] = useState("공통");
  const [title, setTitle] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [pinnedFiles, setPinnedFiles] = useState<UploadedFile[]>([]);

  if (!open) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleReset = () => {
    setCategory("공통");
    setTitle("");
    setPublishDate("");
    setContent("");
    setFiles([]);
    setPinnedFiles([]);
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

            <div style={ps.fieldGroup}>
              <div style={ps.fieldLabel}>
                <span style={ps.labelText}>상단고정</span>
              </div>
              <FileUpload
                value={pinnedFiles}
                onChange={setPinnedFiles}
              />
            </div>

            <div style={ps.fieldGroup}>
              <div style={ps.fieldLabel}>
                <span style={ps.labelText}>내용</span>
                <span style={ps.requiredDot} />
              </div>
              <TiptapEditor
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
