import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect, type CSSProperties } from "react";

const FONT = "'Pretendard', sans-serif";

interface TiptapEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: number;
}

function ToolbarButton({
  active,
  onClick,
  title,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      style={{
        ...ts.toolbarBtn,
        ...(active ? ts.toolbarBtnActive : {}),
      }}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <span style={ts.divider} />;
}

const ts = {
  wrap: {
    border: "1px solid #d4d4d8",
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#ffffff",
  } satisfies CSSProperties,
  toolbar: {
    display: "flex",
    alignItems: "center",
    gap: 2,
    padding: "6px 8px",
    borderBottom: "1px solid #e4e4e7",
    backgroundColor: "#fafafa",
    flexWrap: "wrap",
  } satisfies CSSProperties,
  toolbarBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 28,
    height: 28,
    border: "none",
    background: "transparent",
    borderRadius: 4,
    cursor: "pointer",
    padding: 0,
    color: "#52525b",
    fontFamily: FONT,
    fontSize: 13,
    fontWeight: 600,
    lineHeight: "18px",
    transition: "background-color 0.1s",
  } satisfies CSSProperties,
  toolbarBtnActive: {
    backgroundColor: "#e4e4e7",
    color: "#18181b",
  } satisfies CSSProperties,
  divider: {
    width: 1,
    height: 18,
    backgroundColor: "#e4e4e7",
    margin: "0 4px",
    flexShrink: 0,
  } satisfies CSSProperties,
  editorWrap: {
    fontFamily: FONT,
    fontSize: 14,
    lineHeight: "22px",
    color: "#3f3f46",
  } satisfies CSSProperties,
};

const editorCSS = `
.tiptap-editor .ProseMirror {
  outline: none;
  padding: 12px 16px;
  font-family: 'Pretendard', sans-serif;
  font-size: 14px;
  line-height: 22px;
  color: #3f3f46;
}
.tiptap-editor .ProseMirror p {
  margin: 0 0 4px 0;
}
.tiptap-editor .ProseMirror h1 { font-size: 24px; font-weight: 700; margin: 0 0 8px 0; }
.tiptap-editor .ProseMirror h2 { font-size: 20px; font-weight: 700; margin: 0 0 6px 0; }
.tiptap-editor .ProseMirror h3 { font-size: 16px; font-weight: 600; margin: 0 0 4px 0; }
.tiptap-editor .ProseMirror ul,
.tiptap-editor .ProseMirror ol {
  padding-left: 24px;
  margin: 0 0 4px 0;
}
.tiptap-editor .ProseMirror blockquote {
  border-left: 3px solid #d4d4d8;
  padding-left: 12px;
  margin: 0 0 4px 0;
  color: #71717a;
}
.tiptap-editor .ProseMirror hr {
  border: none;
  border-top: 1px solid #e4e4e7;
  margin: 12px 0;
}
.tiptap-editor .ProseMirror code {
  background-color: #f4f4f5;
  padding: 2px 4px;
  border-radius: 3px;
  font-size: 13px;
}
.tiptap-editor .ProseMirror pre {
  background-color: #18181b;
  color: #fafafa;
  padding: 12px 16px;
  border-radius: 6px;
  overflow-x: auto;
  margin: 0 0 4px 0;
}
.tiptap-editor .ProseMirror pre code {
  background: none;
  padding: 0;
  color: inherit;
  font-size: 13px;
}
.tiptap-editor .ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #a1a1aa;
  pointer-events: none;
  height: 0;
}
`;

export function TiptapEditor({
  value,
  onChange,
  placeholder = "내용을 입력하세요.",
  minHeight = 300,
}: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder }),
    ],
    content: value,
    onUpdate: ({ editor: e }) => {
      onChange(e.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <>
      <style>{editorCSS}</style>
      <div style={ts.wrap} className="tiptap-editor">
        <div style={ts.toolbar}>
          <ToolbarButton
            active={editor.isActive("heading", { level: 1 })}
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            title="제목 1"
          >
            H1
          </ToolbarButton>
          <ToolbarButton
            active={editor.isActive("heading", { level: 2 })}
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            title="제목 2"
          >
            H2
          </ToolbarButton>
          <ToolbarButton
            active={editor.isActive("heading", { level: 3 })}
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            title="제목 3"
          >
            H3
          </ToolbarButton>

          <Divider />

          <ToolbarButton
            active={editor.isActive("bold")}
            onClick={() => editor.chain().focus().toggleBold().run()}
            title="굵게"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 2.5H9C9.79565 2.5 10.5587 2.81607 11.1213 3.37868C11.6839 3.94129 12 4.70435 12 5.5C12 6.29565 11.6839 7.05871 11.1213 7.62132C10.5587 8.18393 9.79565 8.5 9 8.5H4V2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4 8.5H9.5C10.2956 8.5 11.0587 8.81607 11.6213 9.37868C12.1839 9.94129 12.5 10.7043 12.5 11.5C12.5 12.2956 12.1839 13.0587 11.6213 13.6213C11.0587 14.1839 10.2956 14.5 9.5 14.5H4V8.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </ToolbarButton>
          <ToolbarButton
            active={editor.isActive("italic")}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            title="기울임"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10.5 2.5H6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M9.5 2.5L6.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M9.5 13.5H5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </ToolbarButton>
          <ToolbarButton
            active={editor.isActive("underline")}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            title="밑줄"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 2.5V7.5C4 8.56087 4.42143 9.57828 5.17157 10.3284C5.92172 11.0786 6.93913 11.5 8 11.5C9.06087 11.5 10.0783 11.0786 10.8284 10.3284C11.5786 9.57828 12 8.56087 12 7.5V2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M3.5 14H12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </ToolbarButton>
          <ToolbarButton
            active={editor.isActive("strike")}
            onClick={() => editor.chain().focus().toggleStrike().run()}
            title="취소선"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2.5 8H13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M10.5 3.5C10.1 2.9 9.2 2.5 8 2.5C6.34 2.5 5 3.34 5 4.5C5 5.5 5.8 6 8 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M5.5 12.5C5.9 13.1 6.8 13.5 8 13.5C9.66 13.5 11 12.66 11 11.5C11 10.5 10.2 10 8 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </ToolbarButton>

          <Divider />

          <ToolbarButton
            active={editor.isActive("bulletList")}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            title="글머리 기호"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="3" cy="4" r="1.2" fill="currentColor"/>
              <circle cx="3" cy="8" r="1.2" fill="currentColor"/>
              <circle cx="3" cy="12" r="1.2" fill="currentColor"/>
              <path d="M6.5 4H13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M6.5 8H13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M6.5 12H13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </ToolbarButton>
          <ToolbarButton
            active={editor.isActive("orderedList")}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            title="번호 목록"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <text x="1.5" y="5" fontSize="5.5" fontWeight="600" fill="currentColor">1.</text>
              <text x="1.5" y="9" fontSize="5.5" fontWeight="600" fill="currentColor">2.</text>
              <text x="1.5" y="13" fontSize="5.5" fontWeight="600" fill="currentColor">3.</text>
              <path d="M6.5 4H13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M6.5 8H13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M6.5 12H13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </ToolbarButton>

          <Divider />

          <ToolbarButton
            active={editor.isActive("blockquote")}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            title="인용"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 4H4.5C5.33 4 6 4.67 6 5.5V7C6 7.83 5.33 8.5 4.5 8.5H3.5C3.22 8.5 3 8.72 3 9V10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M9 4H10.5C11.33 4 12 4.67 12 5.5V7C12 7.83 11.33 8.5 10.5 8.5H9.5C9.22 8.5 9 8.72 9 9V10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </ToolbarButton>
          <ToolbarButton
            active={editor.isActive("codeBlock")}
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            title="코드 블록"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M5.5 4L2.5 8L5.5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10.5 4L13.5 8L10.5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            title="구분선"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 8H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </ToolbarButton>

          <Divider />

          <ToolbarButton
            active={editor.isActive({ textAlign: "left" })}
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            title="왼쪽 정렬"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 3.5H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M2 6.5H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M2 9.5H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M2 12.5H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </ToolbarButton>
          <ToolbarButton
            active={editor.isActive({ textAlign: "center" })}
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            title="가운데 정렬"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 3.5H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M4 6.5H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M2 9.5H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M4 12.5H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </ToolbarButton>
          <ToolbarButton
            active={editor.isActive({ textAlign: "right" })}
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            title="오른쪽 정렬"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 3.5H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M6 6.5H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M2 9.5H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M6 12.5H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </ToolbarButton>

          <Divider />

          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            title="실행 취소"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 6L2 8L4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 8H10C12.2091 8 14 9.79086 14 12V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            title="다시 실행"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12 6L14 8L12 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 8H6C3.79086 8 2 9.79086 2 12V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </ToolbarButton>
        </div>

        <div style={{ ...ts.editorWrap, minHeight }}>
          <EditorContent editor={editor} />
        </div>
      </div>
    </>
  );
}
