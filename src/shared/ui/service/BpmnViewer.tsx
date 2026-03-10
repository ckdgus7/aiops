import { useEffect, useRef, useCallback, useState, forwardRef, useImperativeHandle, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import NavigatedViewer from "bpmn-js/lib/NavigatedViewer";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";

interface BpmnViewerHandle {
  zoomIn: () => void;
  zoomOut: () => void;
  fitViewport: () => void;
  resetZoom: () => void;
}

interface BpmnViewerProps {
  xml: string;
  onLoading?: (loading: boolean) => void;
  onError?: (error: Error) => void;
  onImport?: (warnings: string[]) => void;
  onElementClick?: (element: { id: string; type: string; businessObject?: unknown }) => void;
  fitOnImport?: boolean;
  hideToolbar?: boolean;
  width?: number | string;
  height?: number | string;
  style?: CSSProperties;
  className?: string;
}

function ZoomInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="8" cy="8" r="5" stroke="#71717a" strokeWidth="1.2" />
      <path d="M12 12L15 15" stroke="#71717a" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M8 6V10M6 8H10" stroke="#71717a" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function ZoomOutIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="8" cy="8" r="5" stroke="#71717a" strokeWidth="1.2" />
      <path d="M12 12L15 15" stroke="#71717a" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M6 8H10" stroke="#71717a" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function FullScreenIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M3 6V4C3 3.44772 3.44772 3 4 3H6" stroke="#71717a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 3H14C14.5523 3 15 3.44772 15 4V6" stroke="#71717a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 12V14C15 14.5523 14.5523 15 14 15H12" stroke="#71717a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 15H4C3.44772 15 3 14.5523 3 14V12" stroke="#71717a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M18 6L6 18M6 6L18 18" stroke="#3f3f46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FullScreenViewer({ xml, onClose }: { xml: string; onClose: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<NavigatedViewer | null>(null);

  const handleZoomIn = useCallback(() => {
    const canvas = viewerRef.current?.get("canvas") as { zoom: (level?: number | string, center?: string) => number } | undefined;
    if (canvas) {
      const current = canvas.zoom();
      canvas.zoom(current * 1.2, "auto");
    }
  }, []);

  const handleZoomOut = useCallback(() => {
    const canvas = viewerRef.current?.get("canvas") as { zoom: (level?: number | string, center?: string) => number } | undefined;
    if (canvas) {
      const current = canvas.zoom();
      canvas.zoom(current / 1.2, "auto");
    }
  }, []);

  const handleFit = useCallback(() => {
    const canvas = viewerRef.current?.get("canvas") as { zoom: (level: string, center?: string) => void } | undefined;
    if (canvas) canvas.zoom("fit-viewport", "auto");
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (!containerRef.current) return;
    const viewer = new NavigatedViewer({ container: containerRef.current });
    viewerRef.current = viewer;

    viewer
      .importXML(xml)
      .then(() => {
        const canvas = viewer.get("canvas") as { zoom: (level: string, center?: string) => void } | undefined;
        if (canvas) canvas.zoom("fit-viewport", "auto");
      })
      .catch(() => {});

    return () => {
      viewer.destroy();
      viewerRef.current = null;
    };
  }, [xml]);

  return createPortal(
    <div style={fullScreenStyles.overlay}>
      <div style={fullScreenStyles.header}>
        <div style={fullScreenStyles.toolbarGroup}>
          <button type="button" style={fullScreenStyles.toolBtn} onClick={handleZoomIn} title="확대"><ZoomInIcon /></button>
          <button type="button" style={fullScreenStyles.toolBtn} onClick={handleZoomOut} title="축소"><ZoomOutIcon /></button>
          <button type="button" style={fullScreenStyles.toolBtn} onClick={handleFit} title="화면 맞춤"><FullScreenIcon /></button>
        </div>
        <button type="button" style={fullScreenStyles.closeBtn} onClick={onClose} title="닫기">
          <CloseIcon />
        </button>
      </div>
      <div ref={containerRef} style={fullScreenStyles.viewerArea} />
    </div>,
    document.body,
  );
}

const fullScreenStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
  } satisfies CSSProperties,
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 20px",
    borderBottom: "1px solid #e4e7ec",
    flexShrink: 0,
  } satisfies CSSProperties,
  toolbarGroup: {
    display: "flex",
    gap: 4,
  } satisfies CSSProperties,
  toolBtn: {
    width: 36,
    height: 36,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #e4e7ec",
    borderRadius: 6,
    backgroundColor: "#ffffff",
    cursor: "pointer",
    padding: 0,
  } satisfies CSSProperties,
  closeBtn: {
    width: 36,
    height: 36,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    borderRadius: 6,
    backgroundColor: "transparent",
    cursor: "pointer",
    padding: 0,
  } satisfies CSSProperties,
  viewerArea: {
    flex: 1,
    width: "100%",
    overflow: "hidden",
  } satisfies CSSProperties,
};

const BpmnViewer = forwardRef<BpmnViewerHandle, BpmnViewerProps>(function BpmnViewer({
  xml,
  onLoading,
  onError,
  onImport,
  onElementClick,
  fitOnImport = true,
  hideToolbar = false,
  width = "100%",
  height = 500,
  style,
  className,
}: BpmnViewerProps, ref) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<NavigatedViewer | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fullScreen, setFullScreen] = useState(false);

  const handleZoomIn = useCallback(() => {
    const canvas = viewerRef.current?.get("canvas") as { zoom: (level?: number | string, center?: string) => number } | undefined;
    if (canvas) {
      const current = canvas.zoom();
      canvas.zoom(current * 1.2, "auto");
    }
  }, []);

  const handleZoomOut = useCallback(() => {
    const canvas = viewerRef.current?.get("canvas") as { zoom: (level?: number | string, center?: string) => number } | undefined;
    if (canvas) {
      const current = canvas.zoom();
      canvas.zoom(current / 1.2, "auto");
    }
  }, []);

  const handleFitViewport = useCallback(() => {
    const canvas = viewerRef.current?.get("canvas") as { zoom: (level?: number | string, center?: string) => number } | undefined;
    if (canvas) canvas.zoom("fit-viewport", "auto");
  }, []);

  const handleResetZoom = useCallback(() => {
    const canvas = viewerRef.current?.get("canvas") as { zoom: (level?: number | string, center?: string) => number } | undefined;
    if (canvas) canvas.zoom(1, "auto");
  }, []);

  useImperativeHandle(ref, () => ({
    zoomIn: handleZoomIn,
    zoomOut: handleZoomOut,
    fitViewport: handleFitViewport,
    resetZoom: handleResetZoom,
  }), [handleZoomIn, handleZoomOut, handleFitViewport, handleResetZoom]);

  useEffect(() => {
    if (!containerRef.current) return;

    const viewer = new NavigatedViewer({
      container: containerRef.current,
    });

    viewerRef.current = viewer;

    if (onElementClick) {
      const eventBus = viewer.get("eventBus") as { on: (event: string, callback: (e: { element: { id: string; type: string; businessObject?: unknown } }) => void) => void };
      eventBus.on("element.click", (e: { element: { id: string; type: string; businessObject?: unknown } }) => {
        onElementClick(e.element);
      });
    }

    return () => {
      viewer.destroy();
      viewerRef.current = null;
    };
  }, []);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer || !xml) return;

    setError(null);
    onLoading?.(true);

    viewer
      .importXML(xml)
      .then((result: { warnings: string[] }) => {
        onLoading?.(false);
        onImport?.(result.warnings || []);

        if (fitOnImport) {
          const canvas = viewer.get("canvas") as { zoom: (level: string, center?: string) => void } | undefined;
          if (canvas) canvas.zoom("fit-viewport", "auto");
        }
      })
      .catch((err: Error) => {
        onLoading?.(false);
        setError(err.message);
        onError?.(err);
      });
  }, [xml, fitOnImport]);

  const containerStyle: CSSProperties = {
    width,
    height,
    position: "relative",
    overflow: "hidden",
    border: "1px solid #e4e7ec",
    borderRadius: 8,
    backgroundColor: "#ffffff",
    ...style,
  };

  const toolbarStyle: CSSProperties = {
    position: "absolute",
    top: 8,
    right: 8,
    display: "flex",
    gap: 4,
    zIndex: 10,
    backgroundColor: "#ffffff",
    borderRadius: 6,
    boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
    padding: 4,
  };

  const toolBtnStyle: CSSProperties = {
    width: 32,
    height: 32,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #e4e7ec",
    borderRadius: 4,
    backgroundColor: "#ffffff",
    cursor: "pointer",
    padding: 0,
  };

  const errorStyle: CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "#f04438",
    fontFamily: "'Pretendard', sans-serif",
    fontSize: 14,
    textAlign: "center",
    padding: 24,
    maxWidth: "80%",
  };

  const handleCloseFullScreen = useCallback(() => setFullScreen(false), []);

  return (
    <div style={containerStyle} className={className}>
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
      {/* {error && <div style={errorStyle}>{error}</div>} */}
      {xml && (
      // {!error && xml && !hideToolbar && (
        <div style={toolbarStyle}>
          <button type="button" style={toolBtnStyle} onClick={handleZoomIn} title="확대">
            <ZoomInIcon />
          </button>
          <button type="button" style={toolBtnStyle} onClick={handleZoomOut} title="축소">
            <ZoomOutIcon />
          </button>
          <button type="button" style={toolBtnStyle} onClick={() => setFullScreen(true)} title="전체화면">
            <FullScreenIcon />
          </button>
        </div>
      )}
      {fullScreen && <FullScreenViewer xml={xml} onClose={handleCloseFullScreen} />}
    </div>
  );
});

export { BpmnViewer };
export type { BpmnViewerProps, BpmnViewerHandle };
