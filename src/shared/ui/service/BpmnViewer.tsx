import { useEffect, useRef, useCallback, useState, type CSSProperties } from "react";
import NavigatedViewer from "bpmn-js/lib/NavigatedViewer";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";

interface BpmnViewerProps {
  xml: string;
  onLoading?: (loading: boolean) => void;
  onError?: (error: Error) => void;
  onImport?: (warnings: string[]) => void;
  onElementClick?: (element: { id: string; type: string; businessObject?: unknown }) => void;
  fitOnImport?: boolean;
  width?: number | string;
  height?: number | string;
  style?: CSSProperties;
  className?: string;
}

function BpmnViewer({
  xml,
  onLoading,
  onError,
  onImport,
  onElementClick,
  fitOnImport = true,
  width = "100%",
  height = 500,
  style,
  className,
}: BpmnViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<NavigatedViewer | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleZoomIn = useCallback(() => {
    const canvas = viewerRef.current?.get("canvas") as { zoom: (level: string | number, center?: string) => void } | undefined;
    if (canvas) {
      canvas.zoom("in" as never);
    }
  }, []);

  const handleZoomOut = useCallback(() => {
    const canvas = viewerRef.current?.get("canvas") as { zoom: (level: string | number, center?: string) => void } | undefined;
    if (canvas) {
      canvas.zoom("out" as never);
    }
  }, []);

  const handleFitViewport = useCallback(() => {
    const canvas = viewerRef.current?.get("canvas") as { zoom: (level: string, center?: string) => void } | undefined;
    if (canvas) {
      canvas.zoom("fit-viewport", "auto");
    }
  }, []);

  const handleResetZoom = useCallback(() => {
    const canvas = viewerRef.current?.get("canvas") as { zoom: (level: number, center?: string) => void } | undefined;
    if (canvas) {
      canvas.zoom(1, "auto");
    }
  }, []);

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
          if (canvas) {
            canvas.zoom("fit-viewport", "auto");
          }
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
    bottom: 16,
    right: 16,
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
    fontSize: 16,
    fontWeight: 600,
    color: "#52525b",
    padding: 0,
    lineHeight: 1,
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

  return (
    <div style={containerStyle} className={className}>
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
      {error && <div style={errorStyle}>{error}</div>}
      {!error && xml && (
        <div style={toolbarStyle}>
          <button type="button" style={toolBtnStyle} onClick={handleZoomIn} title="확대">
            +
          </button>
          <button type="button" style={toolBtnStyle} onClick={handleZoomOut} title="축소">
            −
          </button>
          <button type="button" style={toolBtnStyle} onClick={handleFitViewport} title="화면 맞춤">
            ⊞
          </button>
          <button type="button" style={toolBtnStyle} onClick={handleResetZoom} title="1:1">
            1:1
          </button>
        </div>
      )}
    </div>
  );
}

export { BpmnViewer };
export type { BpmnViewerProps };
