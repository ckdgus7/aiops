import { useState, type CSSProperties, type ReactNode } from "react";
import { BpmnViewer } from "@/shared/ui/service/BpmnViewer";
import { ToastEditor } from "@/shared/ui/service/ToastEditor";
import { RadioGroup } from "@/shared/ui/global/RadioGroup";
import { Button } from "@/shared/ui/global/Button";
import { FONT } from "@/shared/ui/styles";

const BPD_ITEMS = [
  {
    id: "bpd-1",
    name: "Biz Process Diagram 01",
    version: "v 2.11.029",
    status: "Deployed" as const,
    url: "https://aidevops.nova.com/bizasset/asset/bpd/XSyRe1g6UOdG9FChcYmacQ",
  },
  {
    id: "bpd-2",
    name: "Biz Process Diagram 02",
    version: "v 1.02.000.01",
    status: "Deployed" as const,
    url: "https://aidevops.nova.com/bizasset/asset/bpd/XSyRe1g6UOdG9FChcYmacQ",
    history: [
      { version: "v 1.02.000.01", status: "Deployed" as const, user: "전우치", date: "2025-11-28 15:24", active: true },
      { version: "v 1.02.000", status: "Retired" as const, user: "전우치", date: "2025-11-28 15:24", active: false },
      { version: "v 1.01.000", status: "Retired" as const, user: "전우치", date: "2025-11-28 15:24", active: false },
      { version: "v 1.00.000", status: "Retired" as const, user: "전우치", date: "2025-11-28 15:24", active: false },
    ],
    spec: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];

const BPMN_XML = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"
  xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
  xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
  xmlns:di="http://www.omg.org/spec/DD/20100524/DI"
  id="Definitions_1"
  targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="Process_ApprovalFlow" name="Approval Process" isExecutable="false">
    <bpmn:startEvent id="StartEvent_1" name="Start">
      <bpmn:outgoing>Flow_1</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:userTask id="Task_Request" name="Submit Request">
      <bpmn:incoming>Flow_1</bpmn:incoming>
      <bpmn:outgoing>Flow_2</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:userTask id="Task_Review" name="Manager Review">
      <bpmn:incoming>Flow_2</bpmn:incoming>
      <bpmn:outgoing>Flow_3</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:exclusiveGateway id="Gateway_Approval" name="Approved?">
      <bpmn:incoming>Flow_3</bpmn:incoming>
      <bpmn:outgoing>Flow_4</bpmn:outgoing>
      <bpmn:outgoing>Flow_5</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:serviceTask id="Task_Process" name="Process Request">
      <bpmn:incoming>Flow_4</bpmn:incoming>
      <bpmn:outgoing>Flow_6</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:endEvent id="EndEvent_Success" name="Completed">
      <bpmn:incoming>Flow_6</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:endEvent id="EndEvent_Rejected" name="Rejected">
      <bpmn:incoming>Flow_5</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="Flow_1" sourceRef="StartEvent_1" targetRef="Task_Request"/>
    <bpmn:sequenceFlow id="Flow_2" sourceRef="Task_Request" targetRef="Task_Review"/>
    <bpmn:sequenceFlow id="Flow_3" sourceRef="Task_Review" targetRef="Gateway_Approval"/>
    <bpmn:sequenceFlow id="Flow_4" name="Yes" sourceRef="Gateway_Approval" targetRef="Task_Process"/>
    <bpmn:sequenceFlow id="Flow_5" name="No" sourceRef="Gateway_Approval" targetRef="EndEvent_Rejected"/>
    <bpmn:sequenceFlow id="Flow_6" sourceRef="Task_Process" targetRef="EndEvent_Success"/>
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_ApprovalFlow">
      <bpmndi:BPMNShape id="StartEvent_1_di" bpmnElement="StartEvent_1">
        <dc:Bounds x="150" y="120" width="36" height="36"/>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_Request_di" bpmnElement="Task_Request">
        <dc:Bounds x="250" y="100" width="120" height="80"/>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_Review_di" bpmnElement="Task_Review">
        <dc:Bounds x="420" y="100" width="120" height="80"/>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_Approval_di" bpmnElement="Gateway_Approval" isMarkerVisible="true">
        <dc:Bounds x="610" y="110" width="50" height="50"/>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_Process_di" bpmnElement="Task_Process">
        <dc:Bounds x="760" y="100" width="120" height="80"/>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="EndEvent_Success_di" bpmnElement="EndEvent_Success">
        <dc:Bounds x="930" y="120" width="36" height="36"/>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="EndEvent_Rejected_di" bpmnElement="EndEvent_Rejected">
        <dc:Bounds x="760" y="250" width="36" height="36"/>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_1_di" bpmnElement="Flow_1">
        <di:waypoint x="186" y="138"/>
        <di:waypoint x="250" y="138"/>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_2_di" bpmnElement="Flow_2">
        <di:waypoint x="370" y="138"/>
        <di:waypoint x="420" y="138"/>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_3_di" bpmnElement="Flow_3">
        <di:waypoint x="540" y="138"/>
        <di:waypoint x="610" y="135"/>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_4_di" bpmnElement="Flow_4">
        <di:waypoint x="660" y="135"/>
        <di:waypoint x="760" y="138"/>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_5_di" bpmnElement="Flow_5">
        <di:waypoint x="635" y="160"/>
        <di:waypoint x="635" y="268"/>
        <di:waypoint x="760" y="268"/>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_6_di" bpmnElement="Flow_6">
        <di:waypoint x="880" y="138"/>
        <di:waypoint x="930" y="138"/>
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`;

function SectionHeader({ title, right }: { title: string; right?: ReactNode }) {
  return (
    <div style={s.sectionHeader}>
      <span style={s.sectionTitle}>{title}</span>
      {right && <div style={s.sectionRight}>{right}</div>}
    </div>
  );
}

function HistoryIcon() {
  return (
    <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
      <path d="M10 4C6.13 4 3 7.13 3 11C3 14.87 6.13 18 10 18C13.87 18 17 14.87 17 11" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 7V11L13 13" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BpdIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M4 5C4 4.44772 4.44772 4 5 4H9L11 6H19C19.5523 6 20 6.44772 20 7V10H4V5Z" fill="white" fillOpacity="0.9" />
      <path d="M4 10H20V19C20 19.5523 19.5523 20 19 20H5C4.44772 20 4 19.5523 4 19V10Z" fill="white" fillOpacity="0.7" />
      <path d="M9 14H15" stroke="white" strokeOpacity="0.9" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 4V16M4 10H16" stroke="#7a5af8" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ExpandIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d={expanded ? "M14 12L10 8L6 12" : "M6 8L10 12L14 8"} stroke="#3f3f46" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ZoomInIcon() {
  return (
    <svg width="18" height="24" viewBox="0 0 18 24" fill="none">
      <circle cx="8" cy="12" r="5" stroke="#71717a" strokeWidth="1.2" />
      <path d="M12 16L15 19" stroke="#71717a" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M8 10V14M6 12H10" stroke="#71717a" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function ZoomOutIcon() {
  return (
    <svg width="18" height="24" viewBox="0 0 18 24" fill="none">
      <circle cx="8" cy="12" r="5" stroke="#71717a" strokeWidth="1.2" />
      <path d="M12 16L15 19" stroke="#71717a" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M6 12H10" stroke="#71717a" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function FitIcon() {
  return (
    <svg width="18" height="24" viewBox="0 0 18 24" fill="none">
      <rect x="3" y="8" width="12" height="8" rx="1" stroke="#71717a" strokeWidth="1.2" />
      <path d="M6 8V7M12 8V7M6 16V17M12 16V17" stroke="#71717a" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M12.5 3.5L14.5 5.5L5.5 14.5H3.5V12.5L12.5 3.5Z" stroke="#7a5af8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function VersionBadge({ status }: { status: "Deployed" | "Retired" }) {
  const isDeployed = status === "Deployed";
  return (
    <span
      style={{
        ...s.versionBadge,
        color: isDeployed ? "#1ac057" : "#a1a1aa",
        backgroundColor: isDeployed ? "#f2fdf5" : "#fafafa",
        borderColor: isDeployed ? "#1ac057" : "#a1a1aa",
      }}
    >
      {status}
    </span>
  );
}

function BpdVersionItem({
  version,
  status,
  user,
  date,
  isFirst,
  isLast,
  active,
}: {
  version: string;
  status: "Deployed" | "Retired";
  user: string;
  date: string;
  isFirst: boolean;
  isLast: boolean;
  active: boolean;
}) {
  return (
    <div style={s.bpdVerRow}>
      <div style={s.historyMark}>
        {!isFirst && <div style={s.historyLineTop} />}
        <div style={{ ...s.historyDot, backgroundColor: active ? "#7a5af8" : "#d4d4d8" }} />
        {!isLast && <div style={s.historyLineBottom} />}
      </div>
      <div style={s.bpdVerContent}>
        <span style={s.bpdVersionText}>{version}</span>
        <VersionBadge status={status} />
        <span style={s.bpdVerUser}>{user}</span>
        <span style={s.bpdVerDate}>{date}</span>
      </div>
    </div>
  );
}

function AssetAccordion({
  name,
  version,
  status,
  url,
  history,
  spec,
  expanded,
  onToggle,
}: {
  name: string;
  version: string;
  status: "Deployed" | "Retired";
  url: string;
  history?: { version: string; status: "Deployed" | "Retired"; user: string; date: string; active: boolean }[];
  spec?: string;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div style={s.assetAccordion}>
      <div style={s.assetHeader}>
        <div style={s.assetIconWrap}>
          <BpdIcon />
        </div>
        <div style={s.assetInfo}>
          <div style={s.assetLabelRow}>
            <VersionBadge status={status} />
            <span style={s.assetVersion}>{version}</span>
            <span style={s.assetName}>{name}</span>
          </div>
          <div style={s.assetUrlRow}>
            <a href={url} target="_blank" rel="noopener noreferrer" style={s.assetUrl}>{url}</a>
          </div>
        </div>
        <button type="button" style={s.lvToggleBtn} onClick={onToggle}>
          <ExpandIcon expanded={expanded} />
        </button>
      </div>

      {expanded && (
        <div style={s.assetMain}>
          {history && history.length > 0 && (
            <div style={s.assetHistoryCol}>
              {history.map((h, i) => (
                <BpdVersionItem
                  key={`${h.version}-${i}`}
                  version={h.version}
                  status={h.status}
                  user={h.user}
                  date={h.date}
                  isFirst={i === 0}
                  isLast={i === history.length - 1}
                  active={h.active}
                />
              ))}
            </div>
          )}
          <div style={s.assetBpdInfo}>
            <div style={s.bpdViewerContainer}>
              <div style={s.bpdToolbar}>
                <div style={s.bpdToolbarLeft}>
                  <button type="button" style={s.bpdToolBtn}><ZoomInIcon /></button>
                  <button type="button" style={s.bpdToolBtn}><ZoomOutIcon /></button>
                  <button type="button" style={s.bpdToolBtn}><FitIcon /></button>
                </div>
              </div>
              <div style={s.bpdViewerArea}>
                <div style={s.bpdPlaceholder}>
                  <BpmnViewer xml={BPMN_XML} />
                </div>
              </div>
            </div>
            <div style={s.bpdSeparator} />
            {spec && (
              <div style={s.bpdSpecSection}>
                <div style={s.bpdSpecHeader}>
                  <div style={s.bpdSpecLabelRow}>
                    <span style={s.fieldLabel}>BPD 명세</span>
                    <button style={s.historyBtn} type="button">
                      <HistoryIcon />
                      <span style={s.historyBtnText}>3 History</span>
                    </button>
                  </div>
                </div>
                <p style={s.bpdSpecText}>{spec}</p>
                <div style={s.bpdSpecActions}>
                  <button type="button" style={s.bpdEditBtn}>
                    <EditIcon />
                    <span style={s.bpdEditBtnText}>편집</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function BpmnManagement() {
  const [expandedBpd, setExpandedBpd] = useState<string | null>("bpd-2");
  const [bpdAddOpen, setBpdAddOpen] = useState(false);
  const [bpdSpec, setBpdSpec] = useState("");
  const [bpdVersionType, setBpdVersionType] = useState("Major");
  const [bpdVersionDesc, setBpdVersionDesc] = useState("");

  return (
    <div style={s.bpdContainer}>
      <div style={s.bpdInner}>
        <SectionHeader title="BPD 관리" />
        <button
          type="button"
          style={s.bpdAddBtn}
          onClick={() => {
            setBpdAddOpen(!bpdAddOpen);
            if (!bpdAddOpen) {
              setBpdSpec("");
              setBpdVersionType("Major");
              setBpdVersionDesc("");
            }
          }}
        >
          <PlusIcon />
          <span style={s.bpdAddBtnText}>BPD 추가</span>
        </button>

        {bpdAddOpen && (
          <div style={s.addArea}>
            <div style={s.addFieldGroup}>
              <div style={s.addLabelRow}>
                <span style={s.addLabel}>업무(L3) BPD 명세</span>
                <div style={s.addRequiredDot} />
              </div>
              <ToastEditor value={bpdSpec} onChange={setBpdSpec} placeholder="업무(L3) BPD 명세를 입력하세요." minHeight={300} />
            </div>

            <div style={s.addFieldGroup}>
              <div style={s.addLabelRow}>
                <span style={s.addLabel}>Version 유형</span>
              </div>
              <RadioGroup
                value={bpdVersionType}
                onChange={setBpdVersionType}
                options={[
                  { label: "Major", value: "Major" },
                  { label: "Minor", value: "Minor" },
                  { label: "Patch", value: "Patch" },
                  { label: "Hot fix", value: "Hot fix" },
                ]}
                direction="horizontal"
                size="l"
              />
            </div>

            <div style={s.addFieldGroup}>
              <div style={s.addLabelRow}>
                <span style={s.addLabel}>Version 설명</span>
              </div>
              <ToastEditor value={bpdVersionDesc} onChange={setBpdVersionDesc} placeholder="설명을 입력할 수 있습니다." minHeight={300} />
            </div>

            <div style={s.addActionRow}>
              <Button size="l" variant="outlined" color="info" onClick={() => setBpdAddOpen(false)}>닫기</Button>
              <Button size="l" variant="filled" color="positive" style={{ flex: 1 }} onClick={() => setBpdAddOpen(false)}>추가</Button>
            </div>
          </div>
        )}

        <div style={s.bpdList}>
          {BPD_ITEMS.map((bpd) => (
            <AssetAccordion
              key={bpd.id}
              name={bpd.name}
              version={bpd.version}
              status={bpd.status}
              url={bpd.url}
              history={"history" in bpd ? bpd.history : undefined}
              spec={"spec" in bpd ? bpd.spec : undefined}
              expanded={expandedBpd === bpd.id}
              onToggle={() => setExpandedBpd(expandedBpd === bpd.id ? null : bpd.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const s = {
  sectionHeader: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    minHeight: 40,
    width: "100%",
  } satisfies CSSProperties,
  sectionTitle: {
    fontFamily: FONT,
    fontSize: 16,
    fontWeight: 700,
    lineHeight: "24px",
    color: "#000000",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  sectionRight: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    flex: 1,
    minHeight: 20,
  } satisfies CSSProperties,
  fieldLabel: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "18px",
    color: "#a1a1aa",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  historyBtn: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    border: "none",
    background: "transparent",
    cursor: "pointer",
    padding: "0 4px",
  } satisfies CSSProperties,
  historyBtnText: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "20px",
    color: "#71717a",
  } satisfies CSSProperties,
  historyMark: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "stretch",
    width: 20,
    flexShrink: 0,
    position: "relative",
  } satisfies CSSProperties,
  historyLineTop: {
    width: 1,
    height: 6,
    backgroundColor: "#e4e4e7",
    flexShrink: 0,
  } satisfies CSSProperties,
  historyDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    flexShrink: 0,
  } satisfies CSSProperties,
  historyLineBottom: {
    width: 1,
    flex: 1,
    backgroundColor: "#e4e4e7",
  } satisfies CSSProperties,
  lvToggleBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    padding: 0,
  } satisfies CSSProperties,
  bpdContainer: {
    borderTop: "1px solid #e4e4e7",
    display: "flex",
    flexDirection: "column",
  } satisfies CSSProperties,
  bpdInner: {
    padding: "24px 32px",
    display: "flex",
    flexDirection: "column",
    gap: 24,
  } satisfies CSSProperties,
  bpdAddBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    padding: 6,
    border: "1px solid #7a5af8",
    borderRadius: 4,
    background: "#ffffff",
    cursor: "pointer",
    alignSelf: "flex-start",
  } satisfies CSSProperties,
  bpdAddBtnText: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "20px",
    color: "#7a5af8",
  } satisfies CSSProperties,
  addArea: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    padding: 16,
    border: "1px solid #e4e4e7",
    borderRadius: 8,
    backgroundColor: "#ffffff",
    width: "100%",
  } satisfies CSSProperties,
  addFieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    width: "100%",
  } satisfies CSSProperties,
  addLabelRow: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  } satisfies CSSProperties,
  addLabel: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "18px",
    color: "#a1a1aa",
    whiteSpace: "nowrap",
  } satisfies CSSProperties,
  addRequiredDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#36bffa",
    flexShrink: 0,
  } satisfies CSSProperties,
  addActionRow: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    width: "100%",
  } satisfies CSSProperties,
  bpdList: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  } satisfies CSSProperties,
  assetAccordion: {
    border: "1px solid #e4e4e7",
    borderRadius: 8,
    backgroundColor: "#ffffff",
    overflow: "hidden",
  } satisfies CSSProperties,
  assetHeader: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: 8,
    cursor: "pointer",
  } satisfies CSSProperties,
  assetIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 5,
    backgroundColor: "#7a5af8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  } satisfies CSSProperties,
  assetInfo: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
  } satisfies CSSProperties,
  assetLabelRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    width: "100%",
  } satisfies CSSProperties,
  assetVersion: {
    fontFamily: FONT,
    fontSize: 12,
    fontWeight: 700,
    lineHeight: "18px",
    color: "#3f3f46",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  } satisfies CSSProperties,
  assetName: {
    fontFamily: FONT,
    fontSize: 12,
    fontWeight: 400,
    lineHeight: "18px",
    color: "#3f3f46",
    flex: 1,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    minWidth: 0,
  } satisfies CSSProperties,
  assetUrlRow: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  } satisfies CSSProperties,
  assetUrl: {
    fontFamily: FONT,
    fontSize: 10,
    fontWeight: 400,
    lineHeight: "16px",
    color: "#0ba5ec",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    flex: 1,
    minWidth: 0,
    textDecoration: "none",
  } satisfies CSSProperties,
  assetMain: {
    borderTop: "1px solid #e4e4e7",
    display: "flex",
    padding: 16,
    gap: 0,
  } satisfies CSSProperties,
  assetHistoryCol: {
    display: "flex",
    flexDirection: "column",
    width: 142,
    flexShrink: 0,
  } satisfies CSSProperties,
  assetBpdInfo: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 16,
    minWidth: 0,
  } satisfies CSSProperties,
  versionBadge: {
    fontFamily: FONT,
    fontSize: 10,
    fontWeight: 500,
    lineHeight: "12px",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 12,
    padding: "3px 10px",
    whiteSpace: "nowrap",
    flexShrink: 0,
  } satisfies CSSProperties,
  bpdVerRow: {
    display: "flex",
    gap: 8,
    alignItems: "flex-start",
  } satisfies CSSProperties,
  bpdVerContent: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    paddingBottom: 16,
  } satisfies CSSProperties,
  bpdVersionText: {
    fontFamily: FONT,
    fontSize: 12,
    fontWeight: 700,
    lineHeight: "18px",
    color: "#3f3f46",
  } satisfies CSSProperties,
  bpdVerUser: {
    fontFamily: FONT,
    fontSize: 12,
    fontWeight: 400,
    lineHeight: "18px",
    color: "#3f3f46",
  } satisfies CSSProperties,
  bpdVerDate: {
    fontFamily: FONT,
    fontSize: 12,
    fontWeight: 400,
    lineHeight: "18px",
    color: "#a1a1aa",
  } satisfies CSSProperties,
  bpdViewerContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    width: "100%",
  } satisfies CSSProperties,
  bpdToolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  } satisfies CSSProperties,
  bpdToolbarLeft: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  } satisfies CSSProperties,
  bpdToolBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 24,
    height: 30,
    border: "1px solid #71717a",
    borderRadius: 4,
    background: "#ffffff",
    cursor: "pointer",
    padding: 3,
  } satisfies CSSProperties,
  bpdViewerArea: {
    width: "100%",
    minHeight: 300,
    border: "1px solid #e4e4e7",
    borderRadius: 4,
    backgroundColor: "#fafafa",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  } satisfies CSSProperties,
  bpdPlaceholder: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    minHeight: 300,
  } satisfies CSSProperties,
  bpdSeparator: {
    width: "100%",
    height: 1,
    backgroundColor: "#e4e4e7",
  } satisfies CSSProperties,
  bpdSpecSection: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    width: "100%",
  } satisfies CSSProperties,
  bpdSpecHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  } satisfies CSSProperties,
  bpdSpecLabelRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  } satisfies CSSProperties,
  bpdSpecText: {
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "20px",
    color: "#3f3f46",
    margin: 0,
  } satisfies CSSProperties,
  bpdSpecActions: {
    display: "flex",
    alignItems: "center",
    gap: 0,
  } satisfies CSSProperties,
  bpdEditBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    padding: 3,
    border: "1px solid #7a5af8",
    borderRadius: 4,
    background: "#ffffff",
    cursor: "pointer",
  } satisfies CSSProperties,
  bpdEditBtnText: {
    fontFamily: FONT,
    fontSize: 12,
    fontWeight: 400,
    lineHeight: "18px",
    color: "#7a5af8",
  } satisfies CSSProperties,
};
