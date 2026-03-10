import { useRef, useEffect, type CSSProperties } from "react";
// @ts-expect-error - toast-ui/editor types don't resolve with package.json exports
import Editor from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";

interface ToastEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  minHeight?: number;
  height?: string;
  maxLength?: number;
}

const wrapperStyle: CSSProperties = {
  width: "100%",
  borderRadius: 4,
  overflow: "hidden",
};

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ");
}

export function ToastEditor({
  value = "",
  onChange,
  placeholder = "",
  minHeight = 300,
  height = "auto",
  maxLength,
}: ToastEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<Editor | null>(null);
  const isInternalChange = useRef(false);
  const onChangeRef = useRef(onChange);
  const maxLengthRef = useRef(maxLength);
  const valueRef = useRef(value);
  onChangeRef.current = onChange;
  maxLengthRef.current = maxLength;
  valueRef.current = value;

  useEffect(() => {
    if (!editorRef.current) return;

    const editor = new Editor({
      el: editorRef.current,
      initialEditType: "wysiwyg",
      previewStyle: "vertical",
      height: height === "auto" ? `${minHeight}px` : height,
      initialValue: "",
      placeholder,
      hideModeSwitch: false,
      toolbarItems: [
        ["heading", "bold", "italic", "strike"],
        ["hr", "quote"],
        ["ul", "ol", "task"],
        ["table", "link"],
        ["code", "codeblock"],
      ],
    });

    editor.on("change", () => {
      const cb = onChangeRef.current;
      if (!cb) return;
      isInternalChange.current = true;
      const html = editor.getHTML();
      const plainLen = stripHtml(html).length;
      const limit = maxLengthRef.current;
      if (limit && plainLen > limit) {
        isInternalChange.current = false;
        return;
      }
      cb(html);
      isInternalChange.current = false;
    });

    instanceRef.current = editor;

    const frameId = requestAnimationFrame(() => {
      const v = valueRef.current;
      if (editor && v) {
        const current = editor.getHTML();
        if (current !== v) {
          isInternalChange.current = true;
          editor.setHTML(v);
          isInternalChange.current = false;
        }
      }
    });

    return () => {
      cancelAnimationFrame(frameId);
      editor.destroy();
      instanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!instanceRef.current || isInternalChange.current) return;
    const frameId = requestAnimationFrame(() => {
      if (!instanceRef.current) return;
      const current = instanceRef.current.getHTML();
      if (current !== value) {
        instanceRef.current.setHTML(value || "");
      }
    });
    return () => cancelAnimationFrame(frameId);
  }, [value]);

  return (
    <div style={wrapperStyle}>
      <div ref={editorRef} />
    </div>
  );
}
