import { useState, useRef, useCallback, type CSSProperties } from "react";
import { FONT } from "@/shared/ui/styles";

interface UploadedFile {
  id: string;
  name: string;
}

interface FileUploadProps {
  value: UploadedFile[];
  onChange: (files: UploadedFile[]) => void;
  multiple?: boolean;
  accept?: string;
  dragText?: string;
  buttonText?: string;
}

function UploadIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 16V4M12 4L8 8M12 4L16 8" stroke="#a1a1aa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 17V19C4 19.5523 4.44772 20 5 20H19C19.5523 20 20 19.5523 20 19V17" stroke="#a1a1aa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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

function DeleteIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M12 4L4 12" stroke="#a1a1aa" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 4L12 12" stroke="#a1a1aa" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const s = {
  uploadArea: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: "24px 16px",
    border: "1px dashed #d4d4d8",
    borderRadius: 8,
    cursor: "pointer",
    transition: "border-color 0.15s",
  } satisfies CSSProperties,
  uploadAreaDragging: {
    borderColor: "#7a5af8",
    backgroundColor: "#fafaff",
  } satisfies CSSProperties,
  uploadText: {
    fontFamily: FONT,
    fontSize: 13,
    color: "#a1a1aa",
    lineHeight: "18px",
    textAlign: "center",
  } satisfies CSSProperties,
  uploadBtn: {
    fontFamily: FONT,
    fontSize: 13,
    fontWeight: 500,
    color: "#7a5af8",
    background: "none",
    border: "1px solid #7a5af8",
    borderRadius: 6,
    padding: "6px 16px",
    cursor: "pointer",
    lineHeight: "18px",
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
    borderRadius: 6,
    backgroundColor: "#fafafa",
  } satisfies CSSProperties,
  fileName: {
    fontFamily: FONT,
    fontSize: 13,
    color: "#18181b",
    lineHeight: "18px",
    flex: 1,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  fileDeleteBtn: {
    background: "none",
    border: "none",
    padding: 2,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  } satisfies CSSProperties,
};

export function FileUpload({
  value,
  onChange,
  multiple = true,
  accept,
  dragText = "파일을 드래그하거나 클릭하여 업로드하세요.",
  buttonText = "파일 선택",
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragCounterRef = useRef(0);

  const addFiles = useCallback(
    (fileList: FileList) => {
      const newFiles: UploadedFile[] = Array.from(fileList).map((f) => ({
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        name: f.name,
      }));
      onChange([...value, ...newFiles]);
    },
    [value, onChange],
  );

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;
    addFiles(selectedFiles);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDelete = (id: string) => {
    onChange(value.filter((f) => f.id !== id));
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
    <div>
      <input
        ref={fileInputRef}
        type="file"
        multiple={multiple}
        accept={accept}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <div
        style={isDragging ? { ...s.uploadArea, ...s.uploadAreaDragging } : s.uploadArea}
        onClick={handleClick}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <UploadIcon />
        <span style={s.uploadText}>{dragText}</span>
        <button
          style={s.uploadBtn}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
        >
          {buttonText}
        </button>
      </div>
      {value.length > 0 && (
        <div style={s.fileList}>
          {value.map((file) => (
            <div key={file.id} style={s.fileItem}>
              <FileIcon />
              <span style={s.fileName}>{file.name}</span>
              <button
                style={s.fileDeleteBtn}
                onClick={() => handleDelete(file.id)}
              >
                <DeleteIcon />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
